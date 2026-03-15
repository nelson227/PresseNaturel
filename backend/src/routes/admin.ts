import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';

const router = Router();

// Fonction pour obtenir le secret JWT (évalué à chaque appel)
const getJwtSecret = () => process.env.JWT_SECRET || 'default-secret';

// Middleware pour vérifier l'admin
const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ Auth: Token manquant');
      return res.status(401).json({ error: 'Token manquant' });
    }

    const token = authHeader.split(' ')[1];
    const secret = getJwtSecret();
    console.log('🔐 JWT Secret utilisé (premiers 10 chars):', secret.substring(0, 10) + '...');
    
    const decoded = jwt.verify(token, secret) as { adminId: string; type: string };
    console.log('✅ Token décodé:', { adminId: decoded.adminId, type: decoded.type });

    if (decoded.type !== 'admin') {
      return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
    }

    const admin = await prisma.admin.findUnique({ where: { id: decoded.adminId } });
    if (!admin) {
      console.log('❌ Admin non trouvé pour ID:', decoded.adminId);
      return res.status(403).json({ error: 'Administrateur non trouvé' });
    }

    (req as any).admin = admin;
    next();
  } catch (error: any) {
    console.log('❌ Erreur vérification token:', error.message);
    res.status(401).json({ error: 'Token invalide' });
  }
};

// Connexion admin
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const secret = getJwtSecret();
    console.log('🔐 Login - JWT Secret utilisé (premiers 10 chars):', secret.substring(0, 10) + '...');
    const token = jwt.sign({ adminId: admin.id, type: 'admin' }, secret, { expiresIn: '24h' });

    res.json({
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
      token,
    });
  } catch (error) {
    console.error('Erreur connexion admin:', error);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

// Vérifier session admin
router.get('/me', requireAdmin, async (req, res) => {
  const admin = (req as any).admin;
  res.json({
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    },
  });
});

// Statistiques dashboard
router.get('/stats', requireAdmin, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalOrders,
      pendingOrders,
      completedOrders,
      allOrders,
      todayOrdersData,
      totalProducts,
      totalUsers,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'pending' } }),
      prisma.order.count({ where: { status: 'completed' } }),
      prisma.order.findMany({ select: { totalPrice: true } }),
      prisma.order.findMany({
        where: { createdAt: { gte: today } },
        select: { totalPrice: true },
      }),
      prisma.product.count({ where: { active: true } }),
      prisma.user.count(),
    ]);

    const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalPrice, 0);
    const todayOrders = todayOrdersData.length;
    const todayRevenue = todayOrdersData.reduce((sum, o) => sum + o.totalPrice, 0);

    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
      todayOrders,
      todayRevenue,
      totalProducts,
      totalUsers,
    });
  } catch (error) {
    console.error('Erreur stats:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des stats' });
  }
});

// Liste des commandes (admin)
router.get('/orders', requireAdmin, async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    const where = status && status !== 'all' ? { status: status as any } : {};

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: { product: true },
        },
        user: {
          select: { email: true, firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(offset),
    });

    const total = await prisma.order.count({ where });

    res.json({ orders, total });
  } catch (error) {
    console.error('Erreur liste commandes:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
  }
});

// Mettre à jour le statut d'une commande
router.patch('/orders/:id/status', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: { include: { product: true } },
      },
    });

    res.json({ order });
  } catch (error) {
    console.error('Erreur mise à jour commande:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

// Gestion des produits (CRUD)
router.post('/products', requireAdmin, async (req, res) => {
  try {
    const { name, description, category, ingredients, benefits, image, featured, shotOnly, packPrice } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        category,
        ingredients,
        benefits,
        image,
        featured: featured || false,
        shotOnly: shotOnly || false,
        packPrice,
      },
    });

    res.status(201).json({ product });
  } catch (error) {
    console.error('Erreur création produit:', error);
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
});

router.put('/products/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, ingredients, benefits, image, featured, shotOnly, packPrice, active } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        category,
        ingredients,
        benefits,
        image,
        featured,
        shotOnly,
        packPrice,
        active,
      },
    });

    res.json({ product });
  } catch (error) {
    console.error('Erreur mise à jour produit:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

router.delete('/products/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete (désactiver plutôt que supprimer)
    await prisma.product.update({
      where: { id },
      data: { active: false },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression produit:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

export default router;
