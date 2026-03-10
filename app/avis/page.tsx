'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Testimonial from '@/components/Testimonial';
import { PRODUCTS } from '@/lib/products';

export default function AvisPage() {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([
    {
      name: 'Sarah M.',
      rating: 5,
      comment: 'Les jus sont absolument délicieux! Je sens vraiment la fraîcheur. Commande chaque semaine.',
    },
    {
      name: 'Marc T.',
      rating: 5,
      comment: 'Excellente qualité. Les ingrédients sont visiblement frais et naturels. Très recommandé!',
    },
    {
      name: 'Julie L.',
      rating: 5,
      comment: 'Pressé Naturel est devenu un essentiellement dans ma routine quotidienne. Merci!',
    },
    {
      name: 'Pierre D.',
      rating: 5,
      comment: 'Service impeccable et produits de très haute qualité. Je recommande vivement!',
    },
  ]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (authorName && comment && selectedProduct) {
      setReviews([
        {
          name: authorName,
          rating,
          comment,
        },
        ...reviews,
      ]);
      setAuthorName('');
      setComment('');
      setRating(5);
      setSelectedProduct('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-presse-white">
      <Header />

      <section className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-5xl font-bold text-presse-dark mb-12">
            Avis Clients
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Formulaire d'avis */}
            <div className="lg:col-span-1">
              <div className="bg-presse-beige p-8 rounded-lg sticky top-24">
                <h2 className="font-poppins font-bold text-xl text-presse-dark mb-6">
                  Laisser un avis
                </h2>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Produit */}
                  <div>
                    <label className="block text-sm font-poppins font-semibold text-presse-dark mb-2">
                      Produit
                    </label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      required
                      className="w-full px-3 py-2 border-2 border-presse-green-light rounded focus:border-presse-green focus:outline-none text-sm"
                    >
                      <option value="">-- Sélectionner --</option>
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Nom */}
                  <div>
                    <label className="block text-sm font-poppins font-semibold text-presse-dark mb-2">
                      Votre nom
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      required
                      className="w-full px-3 py-2 border-2 border-presse-green-light rounded focus:border-presse-green focus:outline-none text-sm"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-poppins font-semibold text-presse-dark mb-2">
                      Note
                    </label>
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`text-2xl cursor-pointer transition-transform hover:scale-110 ${
                            star <= rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Commentaire */}
                  <div>
                    <label className="block text-sm font-poppins font-semibold text-presse-dark mb-2">
                      Votre avis
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border-2 border-presse-green-light rounded focus:border-presse-green focus:outline-none text-sm"
                    />
                  </div>

                  <Button size="md" className="w-full" type="submit">
                    Publier l&apos;avis
                  </Button>

                  {submitted && (
                    <div className="p-3 bg-presse-green text-white rounded text-sm">
                      ✓ Avis publié! Merci!
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Liste des avis */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {reviews.map((review, idx) => (
                  <Testimonial key={idx} {...review} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
