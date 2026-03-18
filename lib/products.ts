import { Product, PriceBySize } from './types';

interface ExtendedPrices {
  '60ml': number;
  '350ml': number;
  '500ml': number;
}

const PRICES: ExtendedPrices = {
  '60ml': 3,
  '350ml': 6,
  '500ml': 7,
};

export const PRODUCTS: Product[] = [
  // ============ JUS ============
  {
    id: 'citrus-boost',
    name: 'Citrus Boost',
    category: 'jus',
    description: 'Un mélange vibrant d\'orange et de carotte pour un coup de pouce énergisant',
    ingredients: ['Orange', 'Carotte'],
    benefits: ['Vitamine C', 'Énergie', 'Antioxydants'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'tropical-sunrise',
    name: 'Tropical Sunrise',
    category: 'jus',
    description: 'L\'essence tropicale en chaque gorgée, parfait pour commencer la journée',
    ingredients: ['Ananas', 'Orange', 'Carotte'],
    benefits: ['Bromélaïne', 'Vitamine C', 'Énergie'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'golden-zest',
    name: 'Golden Zest',
    category: 'jus',
    description: 'Un mélange doré et épicé pour réveiller vos papilles',
    ingredients: ['Ananas', 'Gingembre', 'Citron'],
    benefits: ['Anti-inflammatoire', 'Digestion', 'Immunité'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'green-detox',
    name: 'Green Detox',
    category: 'jus',
    description: 'Purifiant et revigorant pour une détoxification naturelle',
    ingredients: ['Épinard', 'Pomme verte', 'Citron'],
    benefits: ['Détoxification', 'Chlorophylle', 'Énergie'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sunny-blend',
    name: 'Sunny Blend',
    category: 'jus',
    description: 'L\'harmonie parfaite entre douceur et fraîcheur',
    ingredients: ['Orange', 'Pomme', 'Carotte'],
    benefits: ['Vitamine A', 'Vitamine C', 'Sucres naturels'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bissap',
    name: 'Bissap',
    category: 'jus',
    description: 'Traditionnel et exotique, une saveur unique africaine',
    ingredients: ['Fleur d\'hibiscus', 'Ananas', 'Sucre'],
    benefits: ['Antioxydants', 'Riche en minéraux', 'Rafraîchissant'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'fresh-oasis',
    name: 'Fresh Oasis',
    category: 'jus',
    description: 'Frais, léger et hydratant comme une oasis du désert',
    ingredients: ['Pastèque', 'Menthe', 'Citron'],
    benefits: ['Hydratation', 'Fraîcheur', 'Légèreté'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apple-zest',
    name: 'Apple Zest',
    category: 'jus',
    description: 'Croquant, acidulé et légèrement épicé',
    ingredients: ['Pomme verte', 'Gingembre', 'Citron'],
    benefits: ['Fibres', 'Anti-inflammatoire', 'Digestion'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'red-roots',
    name: 'Red Roots',
    category: 'jus',
    description: 'Un puissant élixir de santé à base de racines',
    ingredients: ['Betterave', 'Carotte', 'Pomme', 'Gingembre', 'Citron'],
    benefits: ['Fer', 'Énergie', 'Circulation'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'golden-glow',
    name: 'Golden Glow',
    category: 'jus',
    description: 'Un boost doré anti-inflammatoire pour votre bien-être',
    ingredients: ['Ananas', 'Curcuma', 'Citron'],
    benefits: ['Anti-inflammatoire', 'Antioxydants', 'Digestion'],
    featured: false,
    createdAt: new Date().toISOString(),
  },

  // ============ SHOTS ============
  {
    id: 'ginger-kick',
    name: 'Ginger Kick',
    category: 'shot',
    description: 'Un shot puissant au gingembre pour booster votre immunité',
    ingredients: ['Gingembre', 'Citron'],
    benefits: ['Immunité', 'Anti-inflammatoire', 'Digestion'],
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'carrot-boost',
    name: 'Carrot Boost',
    category: 'shot',
    description: 'Concentré de carotte épicé pour la vue et l\'énergie',
    ingredients: ['Carotte', 'Gingembre', 'Citron'],
    benefits: ['Vitamine A', 'Énergie', 'Vision'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'green-boost',
    name: 'Green Boost',
    category: 'shot',
    description: 'Fraîcheur et vitalité en un shot vert',
    ingredients: ['Concombre', 'Gingembre', 'Citron', 'Menthe'],
    benefits: ['Hydratation', 'Fraîcheur', 'Détox'],
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'turmeric-power',
    name: 'Turmeric Power',
    category: 'shot',
    description: 'Le pouvoir du curcuma pour votre santé',
    ingredients: ['Curcuma', 'Gingembre', 'Citron'],
    benefits: ['Anti-inflammatoire', 'Antioxydants', 'Immunité'],
    featured: false,
    createdAt: new Date().toISOString(),
  },

  // ============ PACKS ============
  {
    id: 'pack-decouverte',
    name: 'Pack Découverte',
    category: 'pack',
    description: 'Idéal pour découvrir nos saveurs : 4 jus variés pour explorer notre gamme',
    ingredients: ['Golden Zest', 'Citrus Boost', 'Green Detox', 'Tropical Sunrise'],
    benefits: ['Variété', 'Découverte', 'Économies'],
    packPrice: 22,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'pack-energie',
    name: 'Pack Énergie',
    category: 'pack',
    description: 'Pour un boost d\'énergie naturelle tout au long de la semaine',
    ingredients: ['Citrus Boost', 'Tropical Sunrise', 'Golden Glow', 'Carrot Boost Shot'],
    benefits: ['Énergie', 'Vitalité', 'Performance'],
    packPrice: 22,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'pack-detox',
    name: 'Pack Détox',
    category: 'pack',
    description: 'Une cure purifiante pour nettoyer votre organisme naturellement',
    ingredients: ['Green Detox', 'Apple Zest', 'Fresh Oasis', 'Green Boost Shot'],
    benefits: ['Détoxification', 'Légèreté', 'Bien-être'],
    packPrice: 22,
    createdAt: new Date().toISOString(),
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(category: 'jus' | 'shot' | 'pack'): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured === true);
}

export function getPrices(): ExtendedPrices {
  return PRICES;
}

export function getPackPrices() {
  return {
    '350ml': 22, // Pack de 4 jus 350ml
    '500ml': 26, // Pack de 4 jus 500ml
  };
}
