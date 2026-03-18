// Configuration constants pour le site

export const PRICES = {
  '60ml': 3,
  '350ml': 6,
  '500ml': 7,
  shot: 3,
  jus: {
    '350ml': 6,
    '500ml': 7
  },
  pack: {
    '350ml': 22,
    '500ml': 26
  }
};

export const SITE_CONFIG = {
  name: 'Pressé Naturel',
  description: 'Des jus naturels, pressés avec passion. 100% fruits et légumes – 0% compromis.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  // Contacto
  contact: {
    email: 'contact@pressenaturel.ca',
    whatsapp: 'https://wa.me/your_number',
    instagram: 'https://instagram.com/pressenaturel',
    location: 'H2A – Près de la station de métro Saint-Michel, Montréal',
  },

  // Configuration de commande
  orders: {
    minOrderValue: 6,
    acceptedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    processingDays: 1,
  },

  // Sizes et prices
  sizes: {
    '350ml': 6,
    '500ml': 7,
  },

  // Métadonnées SEO
  seo: {
    keywords: ['jus naturel', 'jus frais', 'détox', 'santé', 'Montréal', 'bio'],
    author: 'Pressé Naturel',
  },
};

export const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/jus', label: 'Nos Jus' },
  { href: '/shots', label: 'Shots Santé' },
  { href: '/commander', label: 'Commander' },
  { href: '/apropos', label: 'À propos' },
  { href: '/avis', label: 'Avis' },
  { href: '/contact', label: 'Contact' },
];
