'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminAPI } from '@/lib/api';
import { useSocket } from '@/contexts/SocketContext';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  adminLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { joinAdmin } = useSocket();

  useEffect(() => {
    // Vérifier si un token admin valide existe
    const token = localStorage.getItem('pn_admin_token');
    if (token) {
      setIsAdmin(true);
      joinAdmin();
    }
    setIsLoading(false);
  }, [joinAdmin]);

  const adminLogin = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await adminAPI.login(email, password);
      setIsAdmin(true);
      joinAdmin();
      return { success: true };
    } catch (error: any) {
      console.error('Erreur connexion admin:', error);
      return { success: false, error: error.message || 'Identifiants incorrects' };
    }
  };

  const adminLogout = () => {
    setIsAdmin(false);
    adminAPI.logout();
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
