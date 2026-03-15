'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Link from 'next/link';
import { useData } from '@/contexts/DataContext';
import { getPackPrices } from '@/lib/products';

export default function PacksPage() {
  const { getProductsByCategory } = useData();
  const packs = getProductsByCategory('pack');
  const packPrices = getPackPrices();

  return (
    <div className="min-h-screen bg-presse-white">
      <Header />

      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-5xl font-bold text-presse-dark mb-4">
              Nos Packs
            </h1>
            <p className="text-lg text-presse-dark font-inter max-w-2xl mx-auto">
              Découvrez nos combinaisons de jus soigneusement sélectionnées pour répondre à vos besoins. 
              Chaque pack contient 4 jus et est disponible en 350ml ou 500ml.
            </p>
          </div>

          {/* Prix info */}
          <div className="flex justify-center gap-6 mb-12">
            <div className="bg-presse-beige px-6 py-3 rounded-full">
              <span className="font-poppins font-semibold text-presse-dark">
                Pack 350ml : <span className="text-presse-green">${packPrices['350ml']}</span>
              </span>
            </div>
            <div className="bg-presse-beige px-6 py-3 rounded-full">
              <span className="font-poppins font-semibold text-presse-dark">
                Pack 500ml : <span className="text-presse-green">${packPrices['500ml']}</span>
              </span>
            </div>
          </div>

          {/* Packs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packs.map((pack) => (
              <PackCard key={pack.id} pack={pack} prices={packPrices} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-presse-green-light p-12 rounded-lg">
            <h2 className="font-playfair text-3xl font-bold text-presse-dark mb-4">
              Envie d'un pack personnalisé?
            </h2>
            <p className="text-presse-dark font-inter mb-6 max-w-xl mx-auto">
              Contactez-nous pour créer votre propre combinaison de jus selon vos goûts et besoins!
            </p>
            <Link href="/contact">
              <Button size="lg">Nous contacter</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

interface PackCardProps {
  pack: {
    id: string;
    name: string;
    description: string;
    ingredients: string[];
    benefits: string[];
  };
  prices: {
    '350ml': number;
    '500ml': number;
  };
}

function PackCard({ pack, prices }: PackCardProps) {
  const [selectedSize, setSelectedSize] = useState<'350ml' | '500ml'>('350ml');

  // Couleurs et icônes par type de pack
  const packStyles: { [key: string]: { icon: string; gradient: string } } = {
    'pack-decouverte': { icon: '🎁', gradient: 'from-orange-100 to-yellow-100' },
    'pack-energie': { icon: '⚡', gradient: 'from-red-100 to-orange-100' },
    'pack-detox': { icon: '🌿', gradient: 'from-green-100 to-emerald-100' },
  };

  const style = packStyles[pack.id] || { icon: '📦', gradient: 'from-gray-100 to-gray-200' };

  return (
    <div className="bg-presse-beige rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Header avec icône */}
      <div className={`bg-gradient-to-br ${style.gradient} p-8 text-center`}>
        <span className="text-6xl">{style.icon}</span>
        <h3 className="font-playfair text-2xl font-bold text-presse-dark mt-4">
          {pack.name}
        </h3>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <p className="text-presse-dark font-inter text-sm mb-6">
          {pack.description}
        </p>

        {/* Contenu du pack */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-presse-green mb-2 uppercase">
            Contenu du pack (4 jus)
          </p>
          <ul className="space-y-1">
            {pack.ingredients.map((item, index) => (
              <li key={index} className="text-sm text-presse-dark flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-presse-green rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Bienfaits */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-presse-green mb-2 uppercase">
            Bienfaits
          </p>
          <div className="flex flex-wrap gap-2">
            {pack.benefits.map((benefit, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-presse-green-light text-presse-dark text-xs rounded-full"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>

        {/* Sélection taille */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-presse-green mb-2 uppercase">
            Taille
          </p>
          <div className="flex gap-2">
            {(['350ml', '500ml'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 py-2 px-4 rounded-lg font-poppins font-semibold text-sm transition-colors ${
                  selectedSize === size
                    ? 'bg-presse-green text-white'
                    : 'bg-presse-green-light text-presse-dark hover:bg-presse-green hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Prix et CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-presse-green-light">
          <div>
            <span className="text-2xl font-poppins font-bold text-presse-green">
              ${prices[selectedSize]}
            </span>
            <span className="text-xs text-presse-dark ml-2">/ pack</span>
          </div>
          <Link href={`/commander?pack=${pack.id}&size=${selectedSize}`}>
            <Button size="sm">Commander</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
