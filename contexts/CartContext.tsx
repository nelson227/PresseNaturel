'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/types';
import { PRICES } from '@/lib/constants';

export interface CartItem {
  productId: string;
  name: string;
  category: 'jus' | 'shot' | 'pack';
  size: '60ml' | '350ml' | '500ml';
  quantity: number;
  price: number;
  image?: string | null;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: '60ml' | '350ml' | '500ml', quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'presse_naturel_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (e) {
          console.error('Erreur chargement panier:', e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const getPriceForSize = (category: 'jus' | 'shot' | 'pack', size: '60ml' | '350ml' | '500ml', packPrice?: number): number => {
    if (category === 'shot') {
      return PRICES.shot;
    }
    if (category === 'pack') {
      return size === '350ml' ? 22 : 26;
    }
    // Jus
    return size === '350ml' ? PRICES.jus['350ml'] : PRICES.jus['500ml'];
  };

  const addToCart = (product: Product, size: '60ml' | '350ml' | '500ml', quantity: number = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.size === size
      );

      if (existingIndex >= 0) {
        // Mettre à jour la quantité si le produit existe déjà
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      // Ajouter un nouveau produit
      const price = getPriceForSize(product.category, size, product.packPrice);
      return [...prev, {
        productId: product.id,
        name: product.name,
        category: product.category,
        size,
        quantity,
        price,
        image: product.image,
      }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setItems(prev => prev.filter(
      item => !(item.productId === productId && item.size === size)
    ));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setItems(prev => prev.map(item => 
      item.productId === productId && item.size === size
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemCount,
      getTotalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
