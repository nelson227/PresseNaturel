'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pressenaturel-production.up.railway.app/api';

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

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Charger l'utilisateur depuis le token au démarrage
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('presse_naturel_token');
      if (token) {
        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            // Token invalide, le supprimer
            localStorage.removeItem('presse_naturel_token');
          }
        } catch (error) {
          console.error('Erreur chargement profil:', error);
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  // Connexion via API backend
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Erreur de connexion' };
      }

      // Stocker le token et l'utilisateur
      localStorage.setItem('presse_naturel_token', data.token);
      setUser(data.user);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erreur réseau lors de la connexion' };
    }
  };

  // Inscription via API backend
  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Erreur lors de l\'inscription' };
      }

      // Stocker le token et connecter automatiquement
      localStorage.setItem('presse_naturel_token', data.token);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erreur réseau lors de l\'inscription' };
    }
  };

  // Déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem('presse_naturel_token');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
