export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface Product {
  id: string;
  name: string;
  category: 'jus' | 'shot' | 'pack';
  description: string;
  ingredients: string[];
  benefits: string[];
  image?: string;
  shotOnly?: boolean; // Pour les produits disponibles uniquement en shot (60ml)
  featured?: boolean; // Pour les incontournables
  packPrice?: number; // Prix pour les packs
  createdAt: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  size: '60ml' | '350ml' | '500ml';
  customization?: string;
}

export interface Order {
  id: string;
  customer: CustomerInfo;
  items: OrderItem[];
  totalPrice: number;
  deliveryMethod: 'pickup' | 'delivery';
  paymentMethod: 'interac' | 'cash';
  pickupLocation?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface ReviewData {
  productId: string;
  rating: number;
  comment: string;
  authorName: string;
  createdAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface PriceBySize {
  '350ml': number;
  '500ml': number;
}
