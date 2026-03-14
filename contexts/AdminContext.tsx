'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Identifiants admin
const ADMIN_EMAIL = 'admin@pressenaturel.com';
const ADMIN_PASSWORD = 'PresseAdmin2024!';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  adminLogin: (email: string, password: string) => { success: boolean; error?: string };
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminSession = localStorage.getItem('presse_naturel_admin');
    if (adminSession === 'authenticated') {
      setIsAdmin(true);
    }
    setIsLoading(false);
  }, []);

  const adminLogin = (email: string, password: string): { success: boolean; error?: string } => {
    if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('presse_naturel_admin', 'authenticated');
      return { success: true };
    }
    return { success: false, error: 'Identifiants incorrects' };
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('presse_naturel_admin');
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
