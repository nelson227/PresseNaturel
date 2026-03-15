'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { FiUser, FiPackage, FiEdit2, FiSave, FiX, FiShoppingCart, FiDollarSign, FiCalendar, FiMapPin, FiLoader } from 'react-icons/fi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pressenaturel-production.up.railway.app/api';

interface Order {
  id: string;
  date: string;
  items: Array<{ name: string; quantity: number; price: number; size: string }>;
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  deliveryMethod: string;
}

export default function ComptePage() {
  const router = useRouter();
  const { user, login, register, logout, isLoading } = useAuth();
  
  // Onglet actif
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  
  // Mode édition profil
  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editPostalCode, setEditPostalCode] = useState('');
  
  // Historique des commandes
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  
  // Auth form state
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les données du profil en mode édition
  useEffect(() => {
    if (user) {
      setEditFirstName(user.firstName);
      setEditLastName(user.lastName);
      setEditPhone(user.phone);
      setEditAddress(user.address || '');
      setEditCity(user.city || '');
      setEditPostalCode(user.postalCode || '');
    }
  }, [user]);

  // Charger l'historique des commandes depuis l'API backend
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      setOrdersLoading(true);
      try {
        const token = localStorage.getItem('presse_naturel_token');
        const response = await fetch(`${API_URL}/orders/user/history`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Transformer les données du backend au format attendu
          const transformedOrders: Order[] = (data.orders || []).map((order: any) => ({
            id: order.orderNumber,
            date: order.createdAt,
            items: order.items.map((item: any) => ({
              name: item.product?.name || 'Produit',
              quantity: item.quantity,
              price: item.unitPrice,
              size: item.size,
            })),
            total: order.totalPrice,
            status: order.status,
            deliveryMethod: order.deliveryMethod,
          }));
          setOrders(transformedOrders);
        } else {
          console.error('Erreur lors du chargement des commandes');
          setOrders([]);
        }
      } catch (error) {
        console.error('Erreur réseau:', error);
        setOrders([]);
      }
      setOrdersLoading(false);
    };

    fetchOrders();
  }, [user]);

  // Calcul des statistiques
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, order) => 
    sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
  );

  const handleSaveProfile = () => {
    if (!user) return;
    
    // Mettre à jour l'utilisateur dans localStorage
    const usersData = localStorage.getItem('presse_naturel_users');
    const users = usersData ? JSON.parse(usersData) : {};
    
    const updatedUser = {
      ...user,
      firstName: editFirstName,
      lastName: editLastName,
      phone: editPhone,
      address: editAddress,
      city: editCity,
      postalCode: editPostalCode
    };
    
    users[user.email] = {
      ...users[user.email],
      user: updatedUser
    };
    
    localStorage.setItem('presse_naturel_users', JSON.stringify(users));
    localStorage.setItem('presse_naturel_user', JSON.stringify(updatedUser));
    
    // Rafraîchir la page pour mettre à jour le contexte
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (!result.success) {
          setError(result.error || 'Erreur de connexion');
        }
      } else {
        if (password !== confirmPassword) {
          setError('Les mots de passe ne correspondent pas');
          setIsSubmitting(false);
          return;
        }

        if (password.length < 6) {
          setError('Le mot de passe doit contenir au moins 6 caractères');
          setIsSubmitting(false);
          return;
        }

        const result = await register({
          email,
          password,
          firstName,
          lastName,
          phone,
          address: address || undefined,
          city: city || undefined,
          postalCode: postalCode || undefined,
        });

        if (!result.success) {
          setError(result.error || 'Erreur lors de l\'inscription');
        }
      }
    } catch (err) {
      setError('Une erreur est survenue');
    }

    setIsSubmitting(false);
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending': return { text: 'En attente', color: 'bg-yellow-100 text-yellow-800' };
      case 'confirmed': return { text: 'Confirmée', color: 'bg-blue-100 text-blue-800' };
      case 'delivered': return { text: 'Livrée', color: 'bg-green-100 text-green-800' };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Si l'utilisateur est connecté, afficher le dashboard
  if (user) {
    return (
      <div className="min-h-screen bg-presse-white">
        <Header />
        <section className="pt-20 pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* En-tête du profil */}
            <div className="bg-gradient-to-r from-presse-green to-presse-green/80 rounded-2xl p-8 mb-8 text-white">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                  {user.firstName.charAt(0).toUpperCase()}
                </div>
                <div className="text-center md:text-left flex-1">
                  <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
                    Bonjour, {user.firstName} !
                  </h1>
                  <p className="text-white/80">{user.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors"
                >
                  Déconnexion
                </button>
              </div>
              
              {/* Statistiques */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <FiShoppingCart className="mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold">{totalOrders}</p>
                  <p className="text-sm text-white/80">Commandes</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <FiPackage className="mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold">{totalItems}</p>
                  <p className="text-sm text-white/80">Produits achetés</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <FiDollarSign className="mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
                  <p className="text-sm text-white/80">Total dépensé</p>
                </div>
              </div>
            </div>

            {/* Onglets */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-presse-green text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FiUser size={18} />
                Mon profil
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-presse-green text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FiPackage size={18} />
                Mes commandes
              </button>
            </div>

            {/* Contenu des onglets */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-playfair text-2xl font-bold text-presse-dark">
                    Informations personnelles
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-presse-green hover:text-presse-dark transition-colors"
                    >
                      <FiEdit2 size={18} />
                      Modifier
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-presse-green text-white rounded-lg hover:bg-presse-green/90"
                      >
                        <FiSave size={18} />
                        Enregistrer
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
                      >
                        <FiX size={18} />
                        Annuler
                      </button>
                    </div>
                  )}
                </div>

                {!isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Prénom</p>
                      <p className="font-semibold text-presse-dark">{user.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Nom</p>
                      <p className="font-semibold text-presse-dark">{user.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-semibold text-presse-dark">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                      <p className="font-semibold text-presse-dark">{user.phone || 'Non renseigné'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500 mb-1">Adresse</p>
                      <p className="font-semibold text-presse-dark">
                        {user.address ? `${user.address}, ${user.city} ${user.postalCode}` : 'Non renseignée'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Prénom</label>
                      <input
                        type="text"
                        value={editFirstName}
                        onChange={(e) => setEditFirstName(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Nom</label>
                      <input
                        type="text"
                        value={editLastName}
                        onChange={(e) => setEditLastName(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Adresse</label>
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Ville</label>
                      <input
                        type="text"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Code postal</label>
                      <input
                        type="text"
                        value={editPostalCode}
                        onChange={(e) => setEditPostalCode(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Bouton commander */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Link href="/commander">
                    <Button size="lg" className="w-full md:w-auto">
                      <FiShoppingCart className="mr-2" />
                      Passer une commande
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                {ordersLoading ? (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <FiLoader size={48} className="mx-auto text-presse-green mb-4 animate-spin" />
                    <p className="text-gray-500">Chargement de vos commandes...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <FiPackage size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="font-semibold text-xl text-presse-dark mb-2">Aucune commande</h3>
                    <p className="text-gray-500 mb-6">Vous n'avez pas encore passé de commande</p>
                    <Link href="/jus">
                      <Button>Découvrir nos produits</Button>
                    </Link>
                  </div>
                ) : (
                  orders.map((order) => {
                    const status = getStatusLabel(order.status);
                    return (
                      <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                          <div>
                            <p className="font-semibold text-presse-dark">{order.id}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <FiCalendar size={14} />
                              {formatDate(order.date)}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status.color}`}>
                              {status.text}
                            </span>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <FiMapPin size={14} />
                              {order.deliveryMethod === 'pickup' ? 'Cueillette' : 'Livraison'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-4">
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-600">
                                  {item.name} ({item.size}) x{item.quantity}
                                </span>
                                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                            <span className="font-semibold text-presse-dark">Total</span>
                            <span className="text-xl font-bold text-presse-green">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-presse-white flex items-center justify-center">
        <p className="text-presse-dark">Chargement...</p>
      </div>
    );
  }

  // Formulaire de connexion/inscription
  return (
    <div className="min-h-screen bg-presse-white">
      <Header />

      <section className="pt-20 pb-12">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-5xl font-bold text-presse-dark mb-4">
              {isLogin ? 'Connexion' : 'Créer un compte'}
            </h1>
            <p className="text-lg text-presse-dark font-inter">
              {isLogin 
                ? 'Accédez à votre espace personnel' 
                : 'Rejoignez notre communauté'}
            </p>
          </div>

          {/* Toggle Connexion/Inscription */}
          <div className="flex justify-center mb-8">
            <div className="bg-presse-beige p-1 rounded-lg inline-flex">
              <button
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`px-6 py-2 rounded-lg font-poppins font-semibold transition-colors ${
                  isLogin 
                    ? 'bg-presse-green text-white' 
                    : 'text-presse-dark hover:bg-presse-green-light'
                }`}
              >
                Connexion
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`px-6 py-2 rounded-lg font-poppins font-semibold transition-colors ${
                  !isLogin 
                    ? 'bg-presse-green text-white' 
                    : 'text-presse-dark hover:bg-presse-green-light'
                }`}
              >
                Inscription
              </button>
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-presse-beige p-8 rounded-lg space-y-6">
            {/* Inscription - Infos personnelles */}
            {!isLogin && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-poppins font-semibold text-presse-dark mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required={!isLogin}
                      className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label className="block font-poppins font-semibold text-presse-dark mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required={!isLogin}
                      className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-poppins font-semibold text-presse-dark mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required={!isLogin}
                    className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                    placeholder="514-XXX-XXXX"
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block font-poppins font-semibold text-presse-dark mb-2">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                placeholder="votre@email.com"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block font-poppins font-semibold text-presse-dark mb-2">
                Mot de passe *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Confirmation mot de passe */}
            {!isLogin && (
              <div>
                <label className="block font-poppins font-semibold text-presse-dark mb-2">
                  Confirmer le mot de passe *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={!isLogin}
                  className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            )}

            <Button size="lg" className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? 'Chargement...' 
                : (isLogin ? 'Se connecter' : 'Créer mon compte')
              }
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
