import { Router } from 'express';
import { prisma } from '../index';

const router = Router();

// Liste tous les produits actifs
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;

    const where: any = { active: true };
    if (category) where.category = category;
    if (featured === 'true') where.featured = true;

    const products = await prisma.product.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    res.json({ products });
  } catch (error) {
    console.error('Erreur liste produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

// Récupérer un produit par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product || !product.active) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Erreur récupération produit:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
  }
});

// Produits par catégorie
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;

    const products = await prisma.product.findMany({
      where: {
        category: category as any,
        active: true,
      },
      orderBy: [
        { featured: 'desc' },
        { name: 'asc' },
      ],
    });

    res.json({ products });
  } catch (error) {
    console.error('Erreur liste par catégorie:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

// Produits incontournables
router.get('/featured/all', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        featured: true,
        active: true,
      },
    });

    res.json({ products });
  } catch (error) {
    console.error('Erreur produits featured:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

export default router;
