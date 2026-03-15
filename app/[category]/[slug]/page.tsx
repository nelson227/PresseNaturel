'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { useData } from '@/contexts/DataContext';
import { useCart } from '@/contexts/CartContext';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiCheckCircle, FiShoppingCart, FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { PRICES } from '@/lib/constants';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Array.isArray(params.slug) ? params.slug[1] : params.slug;
  const { products } = useData();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<'60ml' | '350ml' | '500ml'>('350ml');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find(p => p.id === productId);
      setProduct(found || null);
      if (found?.category === 'shot') {
        setSelectedSize('60ml');
      }
      setLoading(false);
    }
  }, [products, productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, selectedSize, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const getPrice = () => {
    if (!product) return 0;
    if (product.category === 'shot') return PRICES.shot;
    if (product.category === 'pack') {
      return selectedSize === '350ml' ? 22 : 26;
    }
    return selectedSize === '350ml' ? PRICES.jus['350ml'] : PRICES.jus['500ml'];
  };

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

  const backLink = product.category === 'jus' ? '/jus' : product.category === 'shot' ? '/shots' : '/packs';

  return (
    <div className="min-h-screen bg-presse-white">
      <Header />

      <section className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href={backLink} className="inline-flex items-center text-presse-green hover:text-presse-dark transition-colors mb-8">
            <FiArrowLeft className="mr-2" />
            Retour
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
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
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-presse-dark mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-presse-dark font-inter mb-6">
                {product.description}
              </p>

              {/* Ingrédients */}
              <div className="mb-6">
                <h3 className="font-poppins font-semibold text-lg text-presse-dark mb-3">
                  Ingrédients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient) => (
                    <span key={ingredient} className="px-3 py-1 bg-presse-beige rounded-full text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bienfaits */}
              <div className="mb-8">
                <h3 className="font-poppins font-semibold text-lg text-presse-dark mb-3">
                  Bienfaits
                </h3>
                <div className="space-y-2">
                  {product.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <FiCheckCircle className="text-presse-green flex-shrink-0" />
                      <span className="text-presse-dark font-inter">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Options de commande */}
              <div className="bg-presse-beige rounded-xl p-6 space-y-4">
                {/* Sélection de taille (sauf pour shots) */}
                {product.category !== 'shot' && (
                  <div>
                    <label className="block font-semibold text-presse-dark mb-2">Taille</label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedSize('350ml')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                          selectedSize === '350ml'
                            ? 'border-presse-green bg-presse-green text-white'
                            : 'border-gray-200 bg-white hover:border-presse-green'
                        }`}
                      >
                        <div className="font-semibold">350ml</div>
                        <div className="text-sm opacity-80">
                          {product.category === 'pack' ? '$22' : `$${PRICES.jus['350ml']}`}
                        </div>
                      </button>
                      <button
                        onClick={() => setSelectedSize('500ml')}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                          selectedSize === '500ml'
                            ? 'border-presse-green bg-presse-green text-white'
                            : 'border-gray-200 bg-white hover:border-presse-green'
                        }`}
                      >
                        <div className="font-semibold">500ml</div>
                        <div className="text-sm opacity-80">
                          {product.category === 'pack' ? '$26' : `$${PRICES.jus['500ml']}`}
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Shot - prix fixe */}
                {product.category === 'shot' && (
                  <div className="text-center py-2">
                    <span className="text-2xl font-bold text-presse-green">${PRICES.shot}</span>
                    <span className="text-gray-500 ml-2">/ 60ml</span>
                  </div>
                )}

                {/* Quantité */}
                <div>
                  <label className="block font-semibold text-presse-dark mb-2">Quantité</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-xl hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-xl hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Prix total */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="font-semibold text-presse-dark">Total</span>
                  <span className="text-2xl font-bold text-presse-green">
                    ${(getPrice() * quantity).toFixed(2)}
                  </span>
                </div>

                {/* Bouton Ajouter au panier */}
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
                    addedToCart
                      ? 'bg-green-500 text-white'
                      : 'bg-presse-green text-white hover:bg-presse-green/90'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <FiCheck size={20} />
                      Ajouté au panier !
                    </>
                  ) : (
                    <>
                      <FiShoppingCart size={20} />
                      Ajouter au panier
                    </>
                  )}
                </button>

                {/* Lien vers le panier */}
                <Link href="/commander" className="block">
                  <button className="w-full py-3 rounded-lg font-semibold border-2 border-presse-green text-presse-green hover:bg-presse-green hover:text-white transition-all">
                    Voir le panier
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
