'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useData } from '@/contexts/DataContext';

export default function ShotsPage() {
  const { getProductsByCategory } = useData();
  const shots = getProductsByCategory('shot');

  return (
    <div className="min-h-screen bg-presse-white">
      <Header />

      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="font-playfair text-5xl font-bold text-presse-dark mb-4">
              Shots Santé
            </h1>
            <p className="text-lg text-presse-dark font-inter max-w-2xl">
              Nos shots concentrés pour un coup de pouce énergisant. Petites doses, grands effets!
            </p>
            
            {/* Badge 60ml */}
            <div className="mt-6 inline-flex items-center gap-2 bg-presse-green text-white px-4 py-2 rounded-full">
              <span className="text-lg">⚡</span>
              <span className="font-poppins font-semibold">Format unique : 60ml – 3$</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shots.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Info section */}
          <div className="mt-12 bg-presse-beige p-8 rounded-lg">
            <h3 className="font-poppins font-bold text-xl text-presse-dark mb-4">
              Pourquoi les shots 60ml ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">💪</div>
                <p className="text-sm text-presse-dark">
                  <strong>Concentrés</strong><br />
                  Tous les bienfaits en une petite dose
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <p className="text-sm text-presse-dark">
                  <strong>Rapides</strong><br />
                  Absorption et effet immédiat
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-sm text-presse-dark">
                  <strong>Ciblés</strong><br />
                  Un objectif santé par shot
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
