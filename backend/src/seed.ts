import bcrypt from 'bcryptjs';
import { prisma } from './db.js';

// Produits initiaux - Catalogue complet Pressé Naturel
const initialProducts = [
  // ============ JUS (10 produits) ============
  {
    name: 'Citrus Boost',
    description: 'Un mélange énergisant d\'agrumes frais pour bien démarrer la journée',
    category: 'jus' as const,
    ingredients: ['Orange', 'Pamplemousse', 'Citron', 'Gingembre'],
    benefits: ['Vitamine C', 'Énergie', 'Immunité'],
    featured: true,
  },
  {
    name: 'Tropical Sunrise',
    description: 'Évadez-vous sous les tropiques avec ce mélange exotique ensoleillé',
    category: 'jus' as const,
    ingredients: ['Mangue', 'Ananas', 'Fruit de la passion', 'Coco'],
    benefits: ['Vitamines A & C', 'Antioxydants', 'Bonne humeur'],
    featured: true,
  },
  {
    name: 'Golden Zest',
    description: 'Un mélange doré plein de vitalité et de saveurs acidulées',
    category: 'jus' as const,
    ingredients: ['Orange', 'Citron', 'Curcuma', 'Miel'],
    benefits: ['Anti-inflammatoire', 'Digestion', 'Éclat'],
    featured: true,
  },
  {
    name: 'Green Detox',
    description: 'Purifiez votre corps avec ce jus vert riche en nutriments',
    category: 'jus' as const,
    ingredients: ['Épinard', 'Concombre', 'Céleri', 'Pomme verte', 'Citron'],
    benefits: ['Détoxification', 'Hydratation', 'Chlorophylle'],
    featured: true,
  },
  {
    name: 'Sunny Blend',
    description: 'Un rayon de soleil dans votre verre, sucré et vitaminé',
    category: 'jus' as const,
    ingredients: ['Orange', 'Carotte', 'Pomme', 'Gingembre'],
    benefits: ['Vitamines A & C', 'Énergie', 'Vision'],
    featured: false,
  },
  {
    name: 'Bissap',
    description: 'La boisson traditionnelle africaine aux fleurs d\'hibiscus',
    category: 'jus' as const,
    ingredients: ['Hibiscus', 'Menthe', 'Vanille', 'Sucre de canne'],
    benefits: ['Antioxydants', 'Rafraîchissant', 'Tradition'],
    featured: false,
  },
  {
    name: 'Fresh Oasis',
    description: 'Une oasis de fraîcheur pour les journées chaudes',
    category: 'jus' as const,
    ingredients: ['Concombre', 'Menthe', 'Citron vert', 'Aloe vera'],
    benefits: ['Hydratation', 'Fraîcheur', 'Digestion'],
    featured: false,
  },
  {
    name: 'Apple Zest',
    description: 'Le croquant de la pomme avec une touche de peps',
    category: 'jus' as const,
    ingredients: ['Pomme verte', 'Pomme rouge', 'Citron', 'Cannelle'],
    benefits: ['Fibres', 'Énergie', 'Antioxydants'],
    featured: false,
  },
  {
    name: 'Red Roots',
    description: 'La puissance des légumes racines pour un boost naturel',
    category: 'jus' as const,
    ingredients: ['Betterave', 'Carotte', 'Gingembre', 'Pomme'],
    benefits: ['Fer', 'Endurance', 'Circulation'],
    featured: false,
  },
  {
    name: 'Golden Glow',
    description: 'Lumineux et anti-inflammatoire avec la puissance du curcuma',
    category: 'jus' as const,
    ingredients: ['Ananas', 'Curcuma', 'Citron', 'Poivre noir'],
    benefits: ['Curcumine', 'Anti-inflammatoire', 'Immune boost'],
    featured: false,
  },
  // ============ SHOTS SANTÉ (4 produits) ============
  {
    name: 'Ginger Kick',
    description: 'Un coup de poing de gingembre pour booster votre immunité',
    category: 'shot' as const,
    ingredients: ['Gingembre', 'Citron', 'Miel'],
    benefits: ['Immunité', 'Digestion', 'Anti-nausée'],
    shotOnly: true,
  },
  {
    name: 'Carrot Boost',
    description: 'Concentré de bêta-carotène pour une peau éclatante',
    category: 'shot' as const,
    ingredients: ['Carotte', 'Orange', 'Gingembre', 'Curcuma'],
    benefits: ['Vision', 'Peau', 'Anti-inflammatoire'],
    shotOnly: true,
  },
  {
    name: 'Green Boost',
    description: 'Chlorophylle concentrée pour une détox express',
    category: 'shot' as const,
    ingredients: ['Épinard', 'Spiruline', 'Citron', 'Pomme'],
    benefits: ['Détox', 'Énergie', 'Chlorophylle'],
    shotOnly: true,
  },
  {
    name: 'Turmeric Power',
    description: 'Le pouvoir du curcuma pour votre santé',
    category: 'shot' as const,
    ingredients: ['Curcuma', 'Gingembre', 'Citron', 'Poivre noir'],
    benefits: ['Anti-inflammatoire', 'Antioxydants', 'Immunité'],
    shotOnly: true,
  },
  // ============ PACKS (3 produits) ============
  {
    name: 'Pack Découverte',
    description: 'Idéal pour découvrir nos saveurs : 4 jus variés pour explorer notre gamme',
    category: 'pack' as const,
    ingredients: ['Golden Zest', 'Citrus Boost', 'Green Detox', 'Tropical Sunrise'],
    benefits: ['Variété', 'Découverte', 'Économies'],
    packPrice: 22,
  },
  {
    name: 'Pack Énergie',
    description: 'Pour un boost d\'énergie naturelle tout au long de la semaine',
    category: 'pack' as const,
    ingredients: ['Citrus Boost', 'Tropical Sunrise', 'Golden Glow', 'Carrot Boost'],
    benefits: ['Énergie', 'Vitalité', 'Performance'],
    packPrice: 22,
  },
  {
    name: 'Pack Détox',
    description: 'Une cure purifiante pour nettoyer votre organisme naturellement',
    category: 'pack' as const,
    ingredients: ['Green Detox', 'Apple Zest', 'Fresh Oasis', 'Green Boost'],
    benefits: ['Détoxification', 'Légèreté', 'Bien-être'],
    packPrice: 22,
  },
];

export async function seedDatabase() {
  try {
    console.log('🌱 Démarrage du seed...');
    
    // Créer l'admin par défaut s'il n'existe pas
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@pressenaturel.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'PresseAdmin2024!';

    const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await prisma.admin.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: 'Administrateur',
        },
      });
      console.log('✅ Admin créé:', adminEmail);
    } else {
      console.log('ℹ️ Admin existe déjà:', adminEmail);
    }

    // Vérifier si on doit mettre à jour les produits (force refresh une fois)
    const productCount = await prisma.product.count();
    const expectedCount = initialProducts.length; // 17 produits
    
    // Si le nombre de produits ne correspond pas, on force la mise à jour
    if (productCount !== expectedCount) {
      console.log(`🔄 Mise à jour produits: ${productCount} -> ${expectedCount}`);
      await prisma.product.deleteMany({});
      for (const product of initialProducts) {
        await prisma.product.create({ data: product });
      }
      console.log(`✅ ${initialProducts.length} produits créés`);
    } else {
      console.log(`ℹ️ ${productCount} produits déjà présents`);
    }
  } catch (error) {
    console.error('❌ Erreur seed:', error);
  }
}
