export interface Product {
  id: string;
  name: string;
  category: 'jus' | 'shot';
  description: string;
  ingredients: string[];
  benefits: string[];
  image?: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  size: '350ml' | '500ml';
  customization?: string;
}

export interface Order {
  id: string;
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
