export interface TestimonialType {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt?: Date;
}

// Stockage en mémoire (pour la démo; en production, utiliser une vraie DB)
let testimonials: TestimonialType[] = [
  {
    id: '1',
    name: 'Sarah M.',
    rating: 5,
    comment: 'Les jus sont absolument délicieux! Je sens vraiment la fraîcheur. Commande chaque semaine.',
    createdAt: new Date('2025-01-15'),
  },
  {
    id: '2',
    name: 'Marc T.',
    rating: 5,
    comment: 'Excellente qualité. Les ingrédients sont visiblement frais et naturels. Très recommandé!',
    createdAt: new Date('2025-01-20'),
  },
  {
    id: '3',
    name: 'Julie L.',
    rating: 5,
    comment: 'Pressé Naturel est devenu un essentiellement dans ma routine quotidienne. Merci!',
    createdAt: new Date('2025-02-01'),
  },
  {
    id: '4',
    name: 'Pierre D.',
    rating: 5,
    comment: 'Service impeccable et produits de très haute qualité. Je recommande vivement!',
    createdAt: new Date('2025-02-05'),
  },
];

export function getTestimonials(): TestimonialType[] {
  return testimonials;
}

export function addTestimonial(testimonial: Omit<TestimonialType, 'id' | 'createdAt'>): TestimonialType {
  const newTestimonial: TestimonialType = {
    ...testimonial,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  testimonials = [newTestimonial, ...testimonials];
  return newTestimonial;
}

export function getLatestTestimonials(count: number = 3): TestimonialType[] {
  return testimonials.slice(0, count);
}
