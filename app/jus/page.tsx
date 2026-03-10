'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/products';

export default function JusPage() {
  const jus = getProductsByCategory('jus');

  return (
    <div className="min-h-screen bg-presse-white">
      <Header />

      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="font-playfair text-5xl font-bold text-presse-dark mb-4">
              Nos Jus Naturels
            </h1>
            <p className="text-lg text-presse-dark font-inter max-w-2xl">
              Découvrez notre sélection complète de jus frais, naturels et délicieux. Chaque bouteille est préparée avec les meilleurs ingrédients du marché.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jus.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
