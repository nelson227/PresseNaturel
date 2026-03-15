import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

// Prix des produits (synchronisés avec le frontend)
const PRICES = {
  '60ml': 4,
  '350ml': 9,
  '500ml': 11,
};

// Créer une commande
router.post('/', async (req, res) => {
  try {
    const {
      customer,
      items,
      deliveryMethod,
      paymentMethod,
      notes,
    } = req.body;

    // Vérifier si l'utilisateur est connecté
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; type: string };
        if (decoded.type === 'user') {
          userId = decoded.userId;
        }
      } catch {}
    }

    // Calculer le prix total
    let totalPrice = 0;
    const orderItems: any[] = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        return res.status(400).json({ error: `Produit non trouvé: ${item.productId}` });
      }

      let unitPrice: number;
      if (product.category === 'pack' && product.packPrice) {
        unitPrice = product.packPrice;
      } else {
        unitPrice = PRICES[item.size as keyof typeof PRICES] || 7;
      }

      totalPrice += unitPrice * item.quantity;
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
        unitPrice,
      });
    }

    // Créer la commande
    const order = await prisma.order.create({
      data: {
        userId,
        customerFirstName: customer.firstName,
        customerLastName: customer.lastName,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        customerAddress: customer.address,
        customerCity: customer.city,
        customerPostalCode: customer.postalCode,
        totalPrice,
        deliveryMethod,
        paymentMethod,
        notes,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    res.status(201).json({ order });
  } catch (error) {
    console.error('Erreur création commande:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la commande' });
  }
});

// Historique des commandes d'un utilisateur connecté (DOIT être AVANT /:orderNumber)
router.get('/user/history', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token manquant' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; type: string };

    if (decoded.type !== 'user') {
      return res.status(401).json({ error: 'Token invalide' });
    }

    const orders = await prisma.order.findMany({
      where: { userId: decoded.userId },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ orders });
  } catch (error) {
    console.error('Erreur historique:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

// Récupérer une commande par numéro
router.get('/:orderNumber', async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Erreur récupération commande:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

export default router;
