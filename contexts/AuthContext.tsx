'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem('presse_naturel_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Connexion
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Récupérer les utilisateurs stockés
      const usersData = localStorage.getItem('presse_naturel_users');
      const users: { [email: string]: { user: User; password: string } } = usersData ? JSON.parse(usersData) : {};

      // Vérifier si l'utilisateur existe
      const userData = users[email.toLowerCase()];
      if (!userData) {
        return { success: false, error: 'Aucun compte trouvé avec cet email' };
      }

      // Vérifier le mot de passe
      if (userData.password !== password) {
        return { success: false, error: 'Mot de passe incorrect' };
      }

      // Connexion réussie
      setUser(userData.user);
      localStorage.setItem('presse_naturel_user', JSON.stringify(userData.user));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la connexion' };
    }
  };

  // Inscription
  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      // Récupérer les utilisateurs existants
      const usersData = localStorage.getItem('presse_naturel_users');
      const users: { [email: string]: { user: User; password: string } } = usersData ? JSON.parse(usersData) : {};

      // Vérifier si l'email existe déjà
      if (users[userData.email.toLowerCase()]) {
        return { success: false, error: 'Un compte existe déjà avec cet email' };
      }

      // Créer le nouvel utilisateur
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email.toLowerCase(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        postalCode: userData.postalCode,
        createdAt: new Date().toISOString(),
      };

      // Sauvegarder l'utilisateur
      users[userData.email.toLowerCase()] = {
        user: newUser,
        password: userData.password,
      };
      localStorage.setItem('presse_naturel_users', JSON.stringify(users));

      // Connecter automatiquement
      setUser(newUser);
      localStorage.setItem('presse_naturel_user', JSON.stringify(newUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erreur lors de l\'inscription' };
    }
  };

  // Déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem('presse_naturel_user');
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
