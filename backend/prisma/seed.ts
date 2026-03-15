import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seed...');

  // Créer l'admin par défaut
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pressenaturel.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'PresseAdmin2024!';
  
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrateur'
      }
    });
    console.log('✅ Admin créé:', adminEmail);
  } else {
    console.log('ℹ️ Admin existe déjà:', adminEmail);
  }

  // Supprimer les anciens produits pour éviter les doublons
  await prisma.product.deleteMany({});
  console.log('🗑️ Anciens produits supprimés');

  // ============ JUS (10 produits) ============
  const jus = [
    {
      name: 'Citrus Boost',
      category: 'jus' as const,
      description: 'Un mélange énergisant d\'agrumes frais pour bien démarrer la journée',
      ingredients: ['Orange', 'Pamplemousse', 'Citron', 'Gingembre'],
      benefits: ['Vitamine C', 'Énergie', 'Immunité'],
      featured: true,
    },
    {
      name: 'Tropical Sunrise',
      category: 'jus' as const,
      description: 'Évadez-vous sous les tropiques avec ce mélange exotique ensoleillé',
      ingredients: ['Mangue', 'Ananas', 'Fruit de la passion', 'Coco'],
      benefits: ['Vitamines A & C', 'Antioxydants', 'Bonne humeur'],
      featured: true,
    },
    {
      name: 'Golden Zest',
      category: 'jus' as const,
      description: 'Un mélange doré plein de vitalité et de saveurs acidulées',
      ingredients: ['Orange', 'Citron', 'Curcuma', 'Miel'],
      benefits: ['Anti-inflammatoire', 'Digestion', 'Éclat'],
      featured: true,
    },
    {
      name: 'Green Detox',
      category: 'jus' as const,
      description: 'Purifiez votre corps avec ce jus vert riche en nutriments',
      ingredients: ['Épinard', 'Concombre', 'Céleri', 'Pomme verte', 'Citron'],
      benefits: ['Détoxification', 'Hydratation', 'Chlorophylle'],
      featured: true,
    },
    {
      name: 'Sunny Blend',
      category: 'jus' as const,
      description: 'Un rayon de soleil dans votre verre, sucré et vitaminé',
      ingredients: ['Orange', 'Carotte', 'Pomme', 'Gingembre'],
      benefits: ['Vitamines A & C', 'Énergie', 'Vision'],
      featured: false,
    },
    {
      name: 'Bissap',
      category: 'jus' as const,
      description: 'La boisson traditionnelle africaine aux fleurs d\'hibiscus',
      ingredients: ['Hibiscus', 'Menthe', 'Vanille', 'Sucre de canne'],
      benefits: ['Antioxydants', 'Rafraîchissant', 'Tradition'],
      featured: false,
    },
    {
      name: 'Fresh Oasis',
      category: 'jus' as const,
      description: 'Une oasis de fraîcheur pour les journées chaudes',
      ingredients: ['Concombre', 'Menthe', 'Citron vert', 'Aloe vera'],
      benefits: ['Hydratation', 'Fraîcheur', 'Digestion'],
      featured: false,
    },
    {
      name: 'Apple Zest',
      category: 'jus' as const,
      description: 'Le croquant de la pomme avec une touche de peps',
      ingredients: ['Pomme verte', 'Pomme rouge', 'Citron', 'Cannelle'],
      benefits: ['Fibres', 'Énergie', 'Antioxydants'],
      featured: false,
    },
    {
      name: 'Red Roots',
      category: 'jus' as const,
      description: 'La puissance des légumes racines pour un boost naturel',
      ingredients: ['Betterave', 'Carotte', 'Gingembre', 'Pomme'],
      benefits: ['Fer', 'Endurance', 'Circulation'],
      featured: false,
    },
    {
      name: 'Golden Glow',
      category: 'jus' as const,
      description: 'Lumineux et anti-inflammatoire avec la puissance du curcuma',
      ingredients: ['Ananas', 'Curcuma', 'Citron', 'Poivre noir'],
      benefits: ['Curcumine', 'Anti-inflammatoire', 'Immune boost'],
      featured: false,
    },
  ];

  // ============ SHOTS SANTÉ (4 produits) ============
  const shots = [
    {
      name: 'Ginger Kick',
      category: 'shot' as const,
      description: 'Un coup de poing de gingembre pour booster votre immunité',
      ingredients: ['Gingembre', 'Citron', 'Miel'],
      benefits: ['Immunité', 'Digestion', 'Anti-nausée'],
      shotOnly: true,
    },
    {
      name: 'Carrot Boost',
      category: 'shot' as const,
      description: 'Concentré de bêta-carotène pour une peau éclatante',
      ingredients: ['Carotte', 'Orange', 'Gingembre', 'Curcuma'],
      benefits: ['Vision', 'Peau', 'Anti-inflammatoire'],
      shotOnly: true,
    },
    {
      name: 'Green Boost',
      category: 'shot' as const,
      description: 'Chlorophylle concentrée pour une détox express',
      ingredients: ['Épinard', 'Spiruline', 'Citron', 'Pomme'],
      benefits: ['Détox', 'Énergie', 'Chlorophylle'],
      shotOnly: true,
    },
    {
      name: 'Turmeric Power',
      category: 'shot' as const,
      description: 'Le pouvoir du curcuma pour votre santé',
      ingredients: ['Curcuma', 'Gingembre', 'Citron', 'Poivre noir'],
      benefits: ['Anti-inflammatoire', 'Antioxydants', 'Immunité'],
      shotOnly: true,
    },
  ];

  // ============ PACKS (3 produits) ============
  const packs = [
    {
      name: 'Pack Découverte',
      category: 'pack' as const,
      description: 'Idéal pour découvrir nos saveurs : 4 jus variés pour explorer notre gamme',
      ingredients: ['Golden Zest', 'Citrus Boost', 'Green Detox', 'Tropical Sunrise'],
      benefits: ['Variété', 'Découverte', 'Économies'],
      packPrice: 22,
    },
    {
      name: 'Pack Énergie',
      category: 'pack' as const,
      description: 'Pour un boost d\'énergie naturelle tout au long de la semaine',
      ingredients: ['Citrus Boost', 'Tropical Sunrise', 'Golden Glow', 'Carrot Boost'],
      benefits: ['Énergie', 'Vitalité', 'Performance'],
      packPrice: 22,
    },
    {
      name: 'Pack Détox',
      category: 'pack' as const,
      description: 'Une cure purifiante pour nettoyer votre organisme naturellement',
      ingredients: ['Green Detox', 'Apple Zest', 'Fresh Oasis', 'Green Boost'],
      benefits: ['Détoxification', 'Légèreté', 'Bien-être'],
      packPrice: 22,
    },
  ];

  // Insérer tous les produits
  const allProducts = [...jus, ...shots, ...packs];
  
  for (const product of allProducts) {
    await prisma.product.create({
      data: product
    });
  }

  console.log(`✅ ${jus.length} jus créés`);
  console.log(`✅ ${shots.length} shots créés`);
  console.log(`✅ ${packs.length} packs créés`);
  console.log('🎉 Seed terminé avec succès!');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
