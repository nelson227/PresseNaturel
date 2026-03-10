// Utilitaires et fonctions helper

/**
 * Format un prix en dollars canadiens
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

/**
 * Format une date lisible
 */
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Valide une adresse email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Ajoute un produit au panier (localStorage)
 */
export const addToCart = (productId: string, quantity: number, size: '350ml' | '500ml') => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cart.find(
    (item: any) => item.productId === productId && item.size === size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity, size });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

/**
 * Récupère le panier depuis localStorage
 */
export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};

/**
 * Vide le panier
 */
export const clearCart = () => {
  localStorage.removeItem('cart');
};

/**
 * Génère un ID unique
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Classe pour gérer les erreurs d'application
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}
