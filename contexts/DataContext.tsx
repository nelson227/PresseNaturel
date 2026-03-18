'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product, OrderStatus } from '@/lib/types';
import { PRODUCTS as INITIAL_PRODUCTS } from '@/lib/products';
import { productsAPI, adminAPI } from '@/lib/api';
import { useSocket } from '@/contexts/SocketContext';

export interface Order {
  id: string;
  orderNumber?: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    postalCode?: string;
  };
  product: {
    id: string;
    name: string;
  };
  size: string;
  quantity: number;
  totalPrice: number;
  deliveryMethod: 'pickup' | 'delivery';
  paymentMethod: 'interac' | 'cash';
  notes?: string;
  status: OrderStatus;
  createdAt: string;
}

interface DataContextType {
  products: Product[];
  orders: Order[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  getProductsByCategory: (category: 'jus' | 'shot' | 'pack') => Product[];
  refreshProducts: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  getStats: () => {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalRevenue: number;
    todayOrders: number;
    todayRevenue: number;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { socket, joinAdmin } = useSocket();

  // Charger les produits depuis l'API backend
  const refreshProducts = useCallback(async () => {
    try {
      const response = await productsAPI.getAll();
      if (response.products && response.products.length > 0) {
        // Mapper les produits de l'API vers notre format
        const mappedProducts = response.products.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description || '',
          category: p.category,
          ingredients: p.ingredients || [],
          benefits: p.benefits || [],
          image: p.image,
          featured: p.featured || false,
          createdAt: p.createdAt,
        }));
        setProducts(mappedProducts);
      }
    } catch (error) {
      console.log('API non disponible, utilisation des données locales');
      // Fallback: utiliser localStorage si l'API n'est pas disponible
      const storedProducts = localStorage.getItem('presse_naturel_products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    }
  }, []);

  // Charger les commandes depuis l'API backend (admin)
  const refreshOrders = useCallback(async () => {
    try {
      const response = await adminAPI.getOrders() as any;
      if (response.orders) {
        const mappedOrders = response.orders.map((o: any) => ({
          id: o.id,
          orderNumber: o.orderNumber,
          customer: {
            firstName: o.customerFirstName || '',
            lastName: o.customerLastName || '',
            email: o.customerEmail || '',
            phone: o.customerPhone || '',
            address: o.customerAddress || '',
            city: o.customerCity || '',
            postalCode: o.customerPostalCode || '',
          },
          product: {
            id: o.items?.[0]?.productId || '',
            name: o.items?.[0]?.product?.name || 'Produit',
          },
          size: o.items?.[0]?.size || '350ml',
          quantity: o.items?.[0]?.quantity || 1,
          totalPrice: o.totalPrice || 0,
          deliveryMethod: o.deliveryMethod || 'pickup',
          paymentMethod: o.paymentMethod || 'interac',
          notes: o.notes,
          status: o.status,
          createdAt: o.createdAt,
        }));
        setOrders(mappedOrders);
      }
    } catch (error) {
      console.log('Admin API non disponible');
      // Fallback localStorage
      const storedOrders = localStorage.getItem('presse_naturel_orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    }
  }, []);

  // Charger les données au démarrage
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await refreshProducts();
      // Ne charger les commandes que si admin connecté
      if (adminAPI.isAuthenticated()) {
        await refreshOrders();
      }
      setLoading(false);
    };
    loadData();
  }, [refreshProducts, refreshOrders]);

  // Écouter les événements WebSocket pour les mises à jour en temps réel
  useEffect(() => {
    if (!socket) return;

    // Si admin connecté, rejoindre la room admin
    if (adminAPI.isAuthenticated()) {
      joinAdmin();
    }

    // === Événements Produits (tous les clients) ===
    const handleProductCreated = (product: any) => {
      const mapped: Product = {
        id: product.id,
        name: product.name,
        description: product.description || '',
        category: product.category,
        ingredients: product.ingredients || [],
        benefits: product.benefits || [],
        image: product.image,
        featured: product.featured || false,
        createdAt: product.createdAt,
      };
      setProducts(prev => {
        if (prev.some(p => p.id === mapped.id)) return prev;
        return [...prev, mapped];
      });
    };

    const handleProductUpdated = (product: any) => {
      setProducts(prev => prev.map(p => p.id === product.id ? {
        ...p,
        name: product.name,
        description: product.description || p.description,
        category: product.category || p.category,
        ingredients: product.ingredients || p.ingredients,
        benefits: product.benefits || p.benefits,
        image: product.image !== undefined ? product.image : p.image,
        featured: product.featured ?? p.featured,
      } : p));
    };

    const handleProductDeleted = (productId: string) => {
      setProducts(prev => prev.filter(p => p.id !== productId));
    };

    // === Événements Commandes (admin uniquement) ===
    const handleNewOrder = (order: any) => {
      const mapped: Order = {
        id: order.id,
        orderNumber: order.orderNumber,
        customer: {
          firstName: order.customerFirstName || '',
          lastName: order.customerLastName || '',
          email: order.customerEmail || '',
          phone: order.customerPhone || '',
          address: order.customerAddress || '',
          city: order.customerCity || '',
          postalCode: order.customerPostalCode || '',
        },
        product: {
          id: order.items?.[0]?.productId || '',
          name: order.items?.[0]?.product?.name || 'Produit',
        },
        size: order.items?.[0]?.size || '350ml',
        quantity: order.items?.[0]?.quantity || 1,
        totalPrice: order.totalPrice || 0,
        deliveryMethod: order.deliveryMethod || 'pickup',
        paymentMethod: order.paymentMethod || 'interac',
        notes: order.notes,
        status: order.status,
        createdAt: order.createdAt,
      };
      setOrders(prev => {
        if (prev.some(o => o.id === mapped.id)) return prev;
        return [mapped, ...prev];
      });
    };

    const handleOrderUpdated = (order: any) => {
      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: order.status } : o));
    };

    socket.on('product:created', handleProductCreated);
    socket.on('product:updated', handleProductUpdated);
    socket.on('product:deleted', handleProductDeleted);
    socket.on('order:new', handleNewOrder);
    socket.on('order:updated', handleOrderUpdated);

    return () => {
      socket.off('product:created', handleProductCreated);
      socket.off('product:updated', handleProductUpdated);
      socket.off('product:deleted', handleProductDeleted);
      socket.off('order:new', handleNewOrder);
      socket.off('order:updated', handleOrderUpdated);
    };
  }, [socket, joinAdmin]);

  // Ajouter un produit via API
  const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      const response = await adminAPI.createProduct(product) as any;
      if (response.product) {
        setProducts(prev => [...prev, response.product]);
      }
    } catch (error) {
      console.error('Erreur création produit:', error);
      // Fallback local
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setProducts(prev => [...prev, newProduct]);
    }
  };

  // Modifier un produit via API
  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      await adminAPI.updateProduct(id, updates);
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    } catch (error) {
      console.error('Erreur mise à jour produit:', error);
      // Mise à jour locale quand même
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    }
  };

  // Supprimer un produit via API
  const deleteProduct = async (id: string) => {
    try {
      await adminAPI.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Erreur suppression produit:', error);
      // Suppression locale quand même
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const addOrder = (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  // Modifier le statut d'une commande via API
  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      await adminAPI.updateOrderStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    }
  };

  const getProductsByCategory = (category: 'jus' | 'shot' | 'pack') => {
    return products.filter(p => p.category === category);
  };

  const getStats = () => {
    const today = new Date().toDateString();
    const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
    
    return {
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending' || o.status === 'confirmed' || o.status === 'ready').length,
      completedOrders: orders.filter(o => o.status === 'completed').length,
      totalRevenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.totalPrice, 0),
      todayOrders: todayOrders.length,
      todayRevenue: todayOrders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.totalPrice, 0),
    };
  };

  return (
    <DataContext.Provider value={{
      products,
      orders,
      loading,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      updateOrderStatus,
      getProductsByCategory,
      refreshProducts,
      refreshOrders,
      getStats,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
