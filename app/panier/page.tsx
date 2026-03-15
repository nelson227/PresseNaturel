'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { FiShoppingBag } from 'react-icons/fi';
import Link from 'next/link';

export default function PanierPage() {
  // Pour l'instant, redirigeons vers la page commander
  // Le panier sera implémenté ultérieurement avec un CartContext
  
  return (
    <div className="min-h-screen bg-presse-white">
      <Header />
      <div className="pt-32 pb-20 flex flex-col items-center justify-center">
        <FiShoppingBag className="text-6xl text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-presse-dark mb-4">Votre panier</h1>
        <p className="text-gray-500 mb-8">Pour commander, rendez-vous sur notre page de commande</p>
        <div className="flex gap-4">
          <Link href="/jus">
            <Button variant="outline">Voir nos jus</Button>
          </Link>
          <Link href="/commander">
            <Button>Commander</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
