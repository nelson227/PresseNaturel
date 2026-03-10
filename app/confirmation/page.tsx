'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Receipt from '@/components/Receipt';
import Button from '@/components/Button';
import { PRODUCTS } from '@/lib/products';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les données de la commande depuis les paramètres
    const productId = searchParams.get('productId');
    const size = searchParams.get('size');
    const quantity = searchParams.get('quantity');
    const deliveryMethod = searchParams.get('deliveryMethod');
    const paymentMethod = searchParams.get('paymentMethod');
    const notes = searchParams.get('notes') || '';

    if (productId && size && quantity && deliveryMethod && paymentMethod) {
      const product = PRODUCTS.find(p => p.id === productId);
      const prices: { [key: string]: number } = { '350ml': 5.5, '500ml': 7.5 };
      const unitPrice = prices[size] || 5.5;
      const totalPrice = unitPrice * parseInt(quantity);

      const orderNumber = `PN${Date.now().toString().slice(-8)}`;
      const orderDate = new Date().toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      setOrderData({
        orderNumber,
        productName: product?.name || 'Produit',
        size,
        quantity,
        unitPrice,
        totalPrice,
        deliveryMethod,
        paymentMethod,
        notes,
        orderDate,
      });
    }

    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-presse-dark">Chargement...</p>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-presse-white">
        <Header />
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-red-600 mb-6">Erreur: Données de commande manquantes</p>
            <Link href="/commander">
              <Button>Retourner à la commande</Button>
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

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Icône et titre de succès */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FiCheckCircle className="text-6xl text-presse-green" />
            </div>
            <h1 className="font-playfair text-5xl font-bold text-presse-dark mb-4">
              Commande confirmée!
            </h1>
            <p className="text-xl text-presse-dark font-inter">
              Merci pour votre achat. Voici votre reçu.
            </p>
          </div>

          {/* Reçu */}
          <Receipt {...orderData} />

          {/* Boutons de navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/">
              <Button variant="secondary">
                <FiArrowLeft /> Retourner à l'accueil
              </Button>
            </Link>
            <Link href="/jus">
              <Button>
                Voir d'autres produits
              </Button>
            </Link>
          </div>

          {/* Messages informatifs */}
          <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-bold text-presse-dark mb-3">📋 Prochaines étapes</h3>
            <ul className="space-y-2 text-presse-dark text-sm">
              <li>✓ Vous recevrez une confirmation par email dans les 24h</li>
              <li>✓ Notre équipe vous contactera pour confirmer les détails</li>
              <li>✓ Téléchargez et conservez votre reçu ci-dessus</li>
              <li>✓ Préparez-vous pour la cueillette ou la livraison</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Chargement...</p></div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
