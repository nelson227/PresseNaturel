// Configuration API - Pressé Naturel
// Ce fichier centralise toutes les requêtes API vers le backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Helper pour les requêtes
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('pn_token') : null;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erreur réseau' }));
    throw new Error(error.error || 'Une erreur est survenue');
  }

  return response.json();
}

// ==================== AUTH ====================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authAPI = {
  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<AuthResponse> => {
    const response = await fetchAPI<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.token) {
      localStorage.setItem('pn_token', response.token);
      localStorage.setItem('pn_user', JSON.stringify(response.user));
    }
    return response;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetchAPI<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (response.token) {
      localStorage.setItem('pn_token', response.token);
      localStorage.setItem('pn_user', JSON.stringify(response.user));
    }
    return response;
  },

  logout: () => {
    localStorage.removeItem('pn_token');
    localStorage.removeItem('pn_user');
  },

  getProfile: async (): Promise<{ user: User }> => {
    return fetchAPI('/auth/me');
  },

  updateProfile: async (data: Partial<User>): Promise<{ user: User }> => {
    const response = await fetchAPI<{ user: User }>('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    localStorage.setItem('pn_user', JSON.stringify(response.user));
    return response;
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('pn_user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('pn_token');
  },
};

// ==================== ADMIN ====================

export interface Admin {
  id: string;
  email: string;
  name: string;
}

export interface AdminAuthResponse {
  admin: Admin;
  token: string;
}

export const adminAPI = {
  login: async (email: string, password: string): Promise<AdminAuthResponse> => {
    const response = await fetchAPI<AdminAuthResponse>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (response.token) {
      localStorage.setItem('pn_admin_token', response.token);
      localStorage.setItem('pn_admin', JSON.stringify(response.admin));
    }
    return response;
  },

  logout: () => {
    localStorage.removeItem('pn_admin_token');
    localStorage.removeItem('pn_admin');
  },

  getStats: async () => {
    const token = localStorage.getItem('pn_admin_token');
    return fetchAPI('/admin/stats', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getOrders: async (status?: string) => {
    const token = localStorage.getItem('pn_admin_token');
    const query = status && status !== 'all' ? `?status=${status}` : '';
    return fetchAPI(`/admin/orders${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const token = localStorage.getItem('pn_admin_token');
    return fetchAPI(`/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
  },

  createProduct: async (data: any) => {
    const token = localStorage.getItem('pn_admin_token');
    return fetchAPI('/admin/products', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  },

  updateProduct: async (id: string, data: any) => {
    const token = localStorage.getItem('pn_admin_token');
    return fetchAPI(`/admin/products/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  },

  deleteProduct: async (id: string) => {
    const token = localStorage.getItem('pn_admin_token');
    return fetchAPI(`/admin/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('pn_admin_token');
  },

  getCurrentAdmin: (): Admin | null => {
    if (typeof window === 'undefined') return null;
    const admin = localStorage.getItem('pn_admin');
    return admin ? JSON.parse(admin) : null;
  },
};

// ==================== PRODUCTS ====================

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'jus' | 'shot' | 'pack';
  ingredients: string[];
  benefits: string[];
  image?: string;
  featured: boolean;
  shotOnly: boolean;
  packPrice?: number;
  active: boolean;
  createdAt: string;
}

export const productsAPI = {
  getAll: async (): Promise<{ products: Product[] }> => {
    return fetchAPI('/products');
  },

  getById: async (id: string): Promise<{ product: Product }> => {
    return fetchAPI(`/products/${id}`);
  },

  getByCategory: async (category: string): Promise<{ products: Product[] }> => {
    return fetchAPI(`/products/category/${category}`);
  },

  getFeatured: async (): Promise<{ products: Product[] }> => {
    return fetchAPI('/products/featured/all');
  },
};

// ==================== ORDERS ====================

export interface OrderItem {
  productId: string;
  quantity: number;
  size: string;
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

export interface CreateOrderData {
  customer: CustomerInfo;
  items: OrderItem[];
  deliveryMethod: 'pickup' | 'delivery';
  paymentMethod: 'interac' | 'cash';
  notes?: string;
}

export const ordersAPI = {
  create: async (data: CreateOrderData) => {
    return fetchAPI('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getByNumber: async (orderNumber: string) => {
    return fetchAPI(`/orders/${orderNumber}`);
  },

  getHistory: async () => {
    return fetchAPI('/orders/user/history');
  },
};

export default {
  auth: authAPI,
  admin: adminAPI,
  products: productsAPI,
  orders: ordersAPI,
};
