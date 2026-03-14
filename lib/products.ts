import { Product, PriceBySize } from './types';

interface ExtendedPrices {
  '60ml': number;
  '350ml': number;
  '500ml': number;
}

const PRICES: ExtendedPrices = {
  '60ml': 4,
  '350ml': 6,
  '500ml': 7,
};

export const PRODUCTS: Product[] = [
  // Jus - Incontournables en premier
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
    featured: true,
    createdAt: new Date().toISOString(),
  },
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
    description: 'L\'essence de la tropicale en chaque gorgée',
    ingredients: ['Ananas', 'Orange', 'Carotte'],
    benefits: ['Bromélaïne', 'Vitamine C', 'Énergie'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sunny-blend',
    name: 'Sunny Blend',
    category: 'jus',
    description: 'L\'harmonie parfaite entre douceur et fraîcheur',
    ingredients: ['Orange', 'Pomme', 'Carotte'],
    benefits: ['Vitamine A', 'Vitamine C', 'Sucres naturels'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bissap',
    name: 'Bissap',
    category: 'jus',
    description: 'Traditionnel et exotique, une saveur unique africaine',
    ingredients: ['Fleur d\'hibiscus', 'Ananas', 'Sucre'],
    benefits: ['Antioxydants', 'Riche en minéraux', 'Goût unique'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'fresh-oasis',
    name: 'Fresh Oasis',
    category: 'jus',
    description: 'Frais, léger et hydratant comme une oasis du désert',
    ingredients: ['Pastèque', 'Menthe', 'Citron'],
    benefits: ['Hydratation', 'Fraîcheur', 'Légèreté'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apple-zest',
    name: 'Apple Zest',
    category: 'jus',
    description: 'Croquant, acidulé et légèrement épicé',
    ingredients: ['Pomme verte', 'Gingembre', 'Citron'],
    benefits: ['Fibres', 'Anti-inflammatoire', 'Digestion'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'red-roots',
    name: 'Red Roots',
    category: 'jus',
    description: 'Un puissant élixir de santé à base de racines',
    ingredients: ['Betterave', 'Carotte', 'Pomme', 'Gingembre', 'Citron'],
    benefits: ['Fer', 'Énergie', 'Circulation'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'golden-glow',
    name: 'Golden Glow',
    category: 'jus',
    description: 'Lumineux et anti-inflammatoire avec la puissance du curcuma',
    ingredients: ['Ananas', 'Curcuma', 'Citron'],
    benefits: ['Curcumine', 'Anti-inflammatoire', 'Immune boost'],
    createdAt: new Date().toISOString(),
  },
  // Shots Santé - Disponibles uniquement en 60ml
  {
    id: 'ginger-kick',
    name: 'Ginger Kick',
    category: 'shot',
    description: 'Un coup de poing du gingembre pour votre système immunitaire',
    ingredients: ['Gingembre', 'Citron'],
    benefits: ['Immunité', 'Digestion', 'Anti-nausée'],
    shotOnly: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'carrot-boost',
    name: 'Carrot Boost',
    category: 'shot',
    description: 'Concentré de vitamine A et énergie',
    ingredients: ['Carotte', 'Gingembre', 'Citron'],
    benefits: ['Vision', 'Peau', 'Énergie'],
    shotOnly: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'green-boost',
    name: 'Green Boost',
    category: 'shot',
    description: 'Chlorophylle et fraîcheur concentrée',
    ingredients: ['Concombre', 'Gingembre', 'Citron', 'Menthe'],
    benefits: ['Détoxification', 'Fraîcheur', 'Chlorophylle'],
    shotOnly: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'turmeric-power',
    name: 'Turmeric Power',
    category: 'shot',
    description: 'L\'or liquide pour une santé optimale',
    ingredients: ['Curcuma', 'Gingembre', 'Citron'],
    benefits: ['Anti-inflammatoire', 'Antioxydants', 'Bien-être'],
    shotOnly: true,
    createdAt: new Date().toISOString(),
  },
  // Packs
  {
    id: 'pack-decouverte',
    name: 'Pack Découverte',
    category: 'pack',
    description: 'Idéal pour découvrir nos saveurs : 4 jus variés pour explorer notre gamme',
    ingredients: ['Golden Zest', 'Citrus Boost', 'Green Detox', 'Tropical Sunrise'],
    benefits: ['Variété', 'Découverte', 'Économies'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'pack-energie',
    name: 'Pack Énergie',
    category: 'pack',
    description: 'Pour un boost d\'énergie naturelle tout au long de la semaine',
    ingredients: ['Citrus Boost', 'Tropical Sunrise', 'Golden Glow', 'Carrot Boost Shot'],
    benefits: ['Énergie', 'Vitalité', 'Performance'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'pack-detox',
    name: 'Pack Détox',
    category: 'pack',
    description: 'Une cure purifiante pour nettoyer votre organisme naturellement',
    ingredients: ['Green Detox', 'Apple Zest', 'Fresh Oasis', 'Green Boost Shot'],
    benefits: ['Détoxification', 'Légèreté', 'Bien-être'],
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
