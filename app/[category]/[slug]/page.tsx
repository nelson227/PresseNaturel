'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { useData } from '@/contexts/DataContext';
import { useParams } from 'next/navigation';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';
import { Product } from '@/lib/types';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Array.isArray(params.slug) ? params.slug[1] : params.slug;
  const { products } = useData();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find(p => p.id === productId);
      setProduct(found || null);
      setLoading(false);
    }
  }, [products, productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Chargement...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Produit non trouvé</h1>
          <Link href="/">
            <Button>Retour à l&apos;accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-presse-white">
      <Header />

      <section className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href={product.category === 'jus' ? '/jus' : '/shots'} className="inline-flex items-center text-presse-green hover:text-presse-dark transition-colors mb-8">
            <FiArrowLeft className="mr-2" />
            Retour
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="aspect-square bg-gradient-to-br from-presse-green-light to-presse-beige rounded-2xl flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-9xl">{product.category === 'shot' ? '⚡' : '🥤'}</div>
              )}
            </div>

            {/* Content */}
            <div>
              <h1 className="font-playfair text-5xl font-bold text-presse-dark mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-presse-dark font-inter mb-8">
                {product.description}
              </p>

              {/* Ingrédients */}
              <div className="mb-8">
                <h3 className="font-poppins font-semibold text-lg text-presse-dark mb-4">
                  Ingrédients
                </h3>
                <div className="space-y-2">
                  {product.ingredients.map((ingredient) => (
                    <div key={ingredient} className="flex items-center gap-3">
                      <FiCheckCircle className="text-presse-green" />
                      <span className="text-presse-dark font-inter">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bienfaits */}
              <div className="mb-8">
                <h3 className="font-poppins font-semibold text-lg text-presse-dark mb-4">
                  Bienfaits
                </h3>
                <div className="space-y-2">
                  {product.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <FiCheckCircle className="text-presse-green" />
                      <span className="text-presse-dark font-inter">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link href={`/commander?product=${productId}`}>
                <Button size="lg" className="w-full">
                  Commander maintenant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
