'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, getFeaturedProducts } from '@/lib/products';

export default function JusPage() {
  const allJus = getProductsByCategory('jus');
  const featuredJus = allJus.filter(j => j.featured);
  const otherJus = allJus.filter(j => !j.featured);

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

          {/* Incontournables */}
          {featuredJus.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">⭐</span>
                <h2 className="font-playfair text-3xl font-bold text-presse-dark">
                  Les Incontournables
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredJus.map((product) => (
                  <ProductCard key={product.id} product={product} featured />
                ))}
              </div>
            </div>
          )}

          {/* Autres jus */}
          {otherJus.length > 0 && (
            <div>
              <h2 className="font-playfair text-2xl font-bold text-presse-dark mb-8">
                Tous nos jus
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherJus.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
