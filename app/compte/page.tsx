'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function ComptePage() {
  const router = useRouter();
  const { user, login, register, logout, isLoading } = useAuth();
  
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

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isLogin) {
        // Connexion
        const result = await login(email, password);
        if (result.success) {
          router.push('/');
        } else {
          setError(result.error || 'Erreur de connexion');
        }
      } else {
        // Inscription
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

        if (result.success) {
          router.push('/');
        } else {
          setError(result.error || 'Erreur lors de l\'inscription');
        }
      }
    } catch (err) {
      setError('Une erreur est survenue');
    }

    setIsSubmitting(false);
  };

  // Si l'utilisateur est connecté, afficher son profil
  if (user) {
    return (
      <div className="min-h-screen bg-presse-white">
        <Header />
        <section className="pt-20 pb-12">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-playfair text-5xl font-bold text-presse-dark mb-4">
                Mon Compte
              </h1>
              <p className="text-lg text-presse-dark font-inter">
                Bienvenue, {user.firstName} !
              </p>
            </div>

            <div className="bg-presse-beige p-8 rounded-lg">
              <h2 className="font-poppins font-bold text-xl text-presse-dark mb-6">
                Informations personnelles
              </h2>
              
              <div className="space-y-4 mb-8">
                <p className="text-presse-dark">
                  <strong>Nom:</strong> {user.firstName} {user.lastName}
                </p>
                <p className="text-presse-dark">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-presse-dark">
                  <strong>Téléphone:</strong> {user.phone}
                </p>
                {user.address && (
                  <p className="text-presse-dark">
                    <strong>Adresse:</strong> {user.address}, {user.city} {user.postalCode}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <Link href="/commander" className="flex-1">
                  <Button className="w-full">Commander</Button>
                </Link>
                <button
                  onClick={logout}
                  className="flex-1 px-6 py-3 border-2 border-presse-green text-presse-green rounded-lg font-poppins font-semibold hover:bg-presse-green hover:text-white transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            </div>
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
                : 'Rejoignez notre communauté pour profiter des abonnements et offres exclusives'}
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
              {!isLogin && (
                <p className="text-xs text-presse-dark mt-1">Minimum 6 caractères</p>
              )}
            </div>

            {/* Confirmation mot de passe - Inscription seulement */}
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

            {/* Adresse - Inscription seulement (optionnel) */}
            {!isLogin && (
              <div className="border-t border-presse-green-light pt-6">
                <p className="text-sm text-presse-dark mb-4">
                  Adresse (optionnel - pour faciliter vos futures commandes)
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block font-poppins font-semibold text-presse-dark mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                      placeholder="123 rue Exemple"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins font-semibold text-presse-dark mb-2">
                        Ville
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                        placeholder="Montréal"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins font-semibold text-presse-dark mb-2">
                        Code postal
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                        placeholder="H2A 1A1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button size="lg" className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? 'Chargement...' 
                : (isLogin ? 'Se connecter' : 'Créer mon compte')
              }
            </Button>
          </form>

          {/* Avantages du compte */}
          {!isLogin && (
            <div className="mt-12 bg-presse-green-light p-8 rounded-lg">
              <h3 className="font-poppins font-bold text-xl text-presse-dark mb-6 text-center">
                Pourquoi créer un compte?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="font-semibold text-presse-dark">Suivi de commandes</p>
                    <p className="text-sm text-presse-dark">Suivez vos commandes en temps réel</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔄</span>
                  <div>
                    <p className="font-semibold text-presse-dark">Abonnements</p>
                    <p className="text-sm text-presse-dark">Recevez vos jus préférés régulièrement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="font-semibold text-presse-dark">Commande rapide</p>
                    <p className="text-sm text-presse-dark">Vos infos pré-remplies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="font-semibold text-presse-dark">Offres exclusives</p>
                    <p className="text-sm text-presse-dark">Promotions réservées aux membres</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
