import bcrypt from 'bcryptjs';
import { prisma } from './db.js';

// Produits initiaux
const initialProducts = [
  {
    name: 'Citrus Boost',
    description: 'Un mélange énergisant d\'agrumes frais pour bien démarrer la journée',
    category: 'jus' as const,
    ingredients: ['Orange', 'Pamplemousse', 'Citron', 'Gingembre'],
    benefits: ['Vitamine C', 'Énergie', 'Immunité'],
    featured: true,
  },
  {
    name: 'Green Detox',
    description: 'Purifiez votre corps avec ce jus vert riche en nutriments',
    category: 'jus' as const,
    ingredients: ['Épinard', 'Concombre', 'Céleri', 'Pomme verte', 'Citron'],
    benefits: ['Détox', 'Hydratation', 'Antioxydants'],
    featured: true,
  },
  {
    name: 'Tropical Paradise',
    description: 'Évadez-vous sous les tropiques avec ce mélange exotique',
    category: 'jus' as const,
    ingredients: ['Ananas', 'Mangue', 'Fruit de la passion', 'Coco'],
    benefits: ['Vitamines', 'Digestion', 'Bien-être'],
    featured: true,
  },
  {
    name: 'Carrot Sunrise',
    description: 'Le plein de bêta-carotène pour une peau éclatante',
    category: 'jus' as const,
    ingredients: ['Carotte', 'Orange', 'Gingembre', 'Curcuma'],
    benefits: ['Vision', 'Peau', 'Anti-inflammatoire'],
    featured: false,
  },
  {
    name: 'Berry Blast',
    description: 'Une explosion de baies pour les amateurs de fruits rouges',
    category: 'jus' as const,
    ingredients: ['Fraise', 'Framboise', 'Myrtille', 'Açaï'],
    benefits: ['Antioxydants', 'Mémoire', 'Vitalité'],
    featured: false,
  },
  {
    name: 'Ginger Power',
    description: 'Shot concentré de gingembre pour booster votre immunité',
    category: 'shot' as const,
    ingredients: ['Gingembre', 'Citron', 'Miel', 'Cayenne'],
    benefits: ['Immunité', 'Digestion', 'Anti-inflammatoire'],
    shotOnly: true,
  },
  {
    name: 'Turmeric Gold',
    description: 'Le pouvoir anti-inflammatoire du curcuma',
    category: 'shot' as const,
    ingredients: ['Curcuma', 'Gingembre', 'Poivre noir', 'Orange'],
    benefits: ['Anti-inflammatoire', 'Articulations', 'Immunité'],
    shotOnly: true,
  },
  {
    name: 'Green Machine',
    description: 'Concentré de chlorophylle pour une détox express',
    category: 'shot' as const,
    ingredients: ['Herbe de blé', 'Spiruline', 'Citron', 'Menthe'],
    benefits: ['Détox', 'Énergie', 'Alcalinisant'],
    shotOnly: true,
  },
  {
    name: 'Pack Découverte',
    description: 'Découvrez nos best-sellers avec ce pack varié',
    category: 'pack' as const,
    ingredients: ['3 Jus (350ml)', '2 Shots (60ml)'],
    benefits: ['Variété', 'Économique', 'Idéal pour débuter'],
    packPrice: 22,
  },
  {
    name: 'Pack Énergie',
    description: 'Le pack parfait pour rester en forme toute la semaine',
    category: 'pack' as const,
    ingredients: ['2 Citrus Boost', '2 Ginger Power', '1 Green Detox'],
    benefits: ['Énergie', 'Immunité', 'Vitalité'],
    packPrice: 26,
  },
  {
    name: 'Pack Detox',
    description: 'Une cure détox complète pour purifier votre organisme',
    category: 'pack' as const,
    ingredients: ['2 Green Detox', '2 Green Machine', '1 Turmeric Gold'],
    benefits: ['Détox', 'Purification', 'Bien-être'],
    packPrice: 26,
  },
];

export async function seedDatabase() {
  try {
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
    }

    // Créer les produits initiaux s'il n'y en a pas
    const productCount = await prisma.product.count();
    
    if (productCount === 0) {
      for (const product of initialProducts) {
        await prisma.product.create({ data: product });
      }
      console.log(`✅ ${initialProducts.length} produits créés`);
    }
  } catch (error) {
    console.error('Erreur seed:', error);
  }
}
