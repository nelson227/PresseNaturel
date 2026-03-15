'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiX, FiUser, FiLock } from 'react-icons/fi';
import Link from 'next/link';

export default function CommanderPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getItemCount } = useCart();
  const { user, login, register } = useAuth();
  const isAuthenticated = !!user;
  
  // Modal d'authentification
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authFirstName, setAuthFirstName] = useState('');
  const [authLastName, setAuthLastName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  
  // Formulaire de commande
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('interac');
  const [notes, setNotes] = useState('');
  
  // Informations client (auto-remplies si connecté)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Auto-remplir les infos si l'utilisateur est connecté
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setCity(user.city || '');
      setPostalCode(user.postalCode || '');
    }
  }, [user]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      let result;
      if (authMode === 'login') {
        result = await login(authEmail, authPassword);
      } else {
        result = await register({
          email: authEmail,
          password: authPassword,
          firstName: authFirstName,
          lastName: authLastName,
          phone: ''
        });
      }
      
      if (!result.success) {
        setAuthError(result.error || 'Une erreur est survenue');
        setAuthLoading(false);
        return;
      }
      
      setShowAuthModal(false);
      setAuthEmail('');
      setAuthPassword('');
      setAuthFirstName('');
      setAuthLastName('');
    } catch (error: any) {
      setAuthError(error.message || 'Une erreur est survenue');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier si l'utilisateur est connecté
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Vérifier que le panier n'est pas vide
    if (items.length === 0) {
      alert('Votre panier est vide');
      return;
    }

    // Vérifier les champs requis
    if (!firstName || !lastName || !email || !phone) {
      alert('Veuillez remplir toutes les informations de contact');
      return;
    }

    if (deliveryMethod === 'delivery' && (!address || !city || !postalCode)) {
      alert('Veuillez remplir votre adresse de livraison');
      return;
    }

    // Créer le résumé du panier pour la confirmation
    const cartSummary = items.map(item => ({
      productId: item.productId,
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      price: item.price
    }));

    // Créer les paramètres de requête
    const params = new URLSearchParams({
      cart: JSON.stringify(cartSummary),
      total: getTotalPrice().toFixed(2),
      deliveryMethod,
      paymentMethod,
      notes,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
    });

    // Vider le panier et rediriger vers la confirmation
    clearCart();
    router.push(`/confirmation?${params.toString()}`);
  };

  const totalPrice = getTotalPrice();
  const itemCount = getItemCount();

  // Panier vide
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-presse-white">
        <Header />
        <section className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FiShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
            <h1 className="font-playfair text-4xl font-bold text-presse-dark mb-4">
              Votre panier est vide
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              Découvrez nos jus frais et ajoutez-les à votre panier
            </p>
            <Link href="/jus">
              <Button size="lg">Voir nos jus</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-presse-white">
      <Header />

      <section className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-presse-dark mb-4">
            Votre panier
          </h1>
          <p className="text-lg text-presse-dark font-inter mb-8">
            {itemCount} article{itemCount > 1 ? 's' : ''} dans votre panier
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des produits */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 bg-gradient-to-br from-presse-green-light to-presse-beige rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">{item.category === 'shot' ? '⚡' : '🥤'}</span>
                    )}
                  </div>
                  
                  {/* Détails */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-presse-dark truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.size}</p>
                    <p className="text-presse-green font-semibold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  
                  {/* Quantité */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                  
                  {/* Prix total ligne */}
                  <div className="text-right">
                    <p className="font-bold text-presse-dark">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.productId, item.size)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Bouton vider le panier */}
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 text-sm font-semibold flex items-center gap-2"
              >
                <FiTrash2 size={16} />
                Vider le panier
              </button>
            </div>

            {/* Résumé et formulaire */}
            <div className="space-y-6">
              {/* Résumé des prix */}
              <div className="bg-presse-beige p-6 rounded-xl sticky top-24">
                <h3 className="font-poppins font-bold text-xl text-presse-dark mb-4">
                  Résumé
                </h3>
                
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-presse-green-light pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-presse-green">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Connexion requise */}
                {!isAuthenticated ? (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-800 mb-2">
                      <FiLock size={18} />
                      <span className="font-semibold">Connexion requise</span>
                    </div>
                    <p className="text-sm text-yellow-700 mb-3">
                      Connectez-vous pour finaliser votre commande
                    </p>
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="w-full bg-presse-green text-white py-3 rounded-lg font-semibold hover:bg-presse-green/90 transition-colors"
                    >
                      Se connecter
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <FiUser size={18} />
                      <span className="font-semibold">Connecté en tant que {user?.firstName}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Formulaire de commande (visible seulement si connecté) */}
          {isAuthenticated && (
            <form onSubmit={handleSubmit} className="mt-12 bg-white rounded-xl shadow-sm p-8">
              <h2 className="font-playfair text-2xl font-bold text-presse-dark mb-6">
                Finaliser la commande
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Informations Client */}
                <div>
                  <h3 className="font-poppins font-semibold text-lg text-presse-dark mb-4">
                    Vos informations
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-presse-dark mb-2">Prénom *</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-presse-dark mb-2">Nom *</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-presse-dark mb-2">Email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-presse-dark mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Mode de réception */}
                <div>
                  <h3 className="font-poppins font-semibold text-lg text-presse-dark mb-4">
                    Mode de réception
                  </h3>
                  
                  <div className="space-y-3">
                    <label className={`flex items-start gap-3 cursor-pointer p-4 border-2 rounded-lg transition-colors ${deliveryMethod === 'pickup' ? 'border-presse-green bg-presse-green-light' : 'border-gray-200 hover:border-presse-green'}`}>
                      <input
                        type="radio"
                        value="pickup"
                        checked={deliveryMethod === 'pickup'}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="w-4 h-4 mt-1"
                      />
                      <div>
                        <span className="font-semibold text-presse-dark">Cueillette sur rendez-vous</span>
                        <p className="text-sm text-gray-500">Secteur H2A – Près du métro St-Michel</p>
                      </div>
                    </label>
                    
                    <label className={`flex items-start gap-3 cursor-pointer p-4 border-2 rounded-lg transition-colors ${deliveryMethod === 'delivery' ? 'border-presse-green bg-presse-green-light' : 'border-gray-200 hover:border-presse-green'}`}>
                      <input
                        type="radio"
                        value="delivery"
                        checked={deliveryMethod === 'delivery'}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="w-4 h-4 mt-1"
                      />
                      <div>
                        <span className="font-semibold text-presse-dark">Livraison</span>
                        <p className="text-sm text-gray-500">Montréal, Laval, Longueuil</p>
                      </div>
                    </label>
                  </div>

                  {deliveryMethod === 'delivery' && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-presse-dark mb-2">Adresse *</label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-presse-dark mb-2">Ville *</label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-presse-dark mb-2">Code postal *</label>
                          <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Paiement et notes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="font-poppins font-semibold text-lg text-presse-dark mb-4">
                    Mode de paiement
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="interac"
                        checked={paymentMethod === 'interac'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span>Virement Interac</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span>Comptant (à la cueillette/livraison)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-poppins font-semibold text-lg text-presse-dark mb-4">
                    Notes (optionnel)
                  </h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Instructions spéciales, allergies, préférences..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                  />
                </div>
              </div>

              {/* Bouton de confirmation */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-500">Total de la commande</p>
                  <p className="text-3xl font-bold text-presse-green">${totalPrice.toFixed(2)}</p>
                </div>
                <Button size="lg" type="submit" className="w-full sm:w-auto">
                  Confirmer la commande
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Modal d'authentification */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FiX size={24} />
            </button>

            <h2 className="font-playfair text-2xl font-bold text-presse-dark mb-6">
              {authMode === 'login' ? 'Connexion' : 'Créer un compte'}
            </h2>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Prénom</label>
                    <input
                      type="text"
                      value={authFirstName}
                      onChange={(e) => setAuthFirstName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nom</label>
                    <input
                      type="text"
                      value={authLastName}
                      onChange={(e) => setAuthLastName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Mot de passe</label>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-presse-green focus:outline-none"
                />
              </div>

              {authError && (
                <p className="text-red-500 text-sm">{authError}</p>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-presse-green text-white py-3 rounded-lg font-semibold hover:bg-presse-green/90 transition-colors disabled:opacity-50"
              >
                {authLoading ? 'Chargement...' : (authMode === 'login' ? 'Se connecter' : 'Créer mon compte')}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              {authMode === 'login' ? (
                <p>
                  Pas encore de compte ?{' '}
                  <button
                    onClick={() => { setAuthMode('register'); setAuthError(''); }}
                    className="text-presse-green font-semibold hover:underline"
                  >
                    Créer un compte
                  </button>
                </p>
              ) : (
                <p>
                  Déjà un compte ?{' '}
                  <button
                    onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    className="text-presse-green font-semibold hover:underline"
                  >
                    Se connecter
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
