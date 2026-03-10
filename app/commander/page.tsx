'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { PRODUCTS, getPrices } from '@/lib/products';
import Link from 'next/link';

export default function CommanderPage() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [size, setSize] = useState<'350ml' | '500ml'>('350ml');
  const [quantity, setQuantity] = useState('1');
  const [customization, setCustomization] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('interac');
  const [submitted, setSubmitted] = useState(false);
  const [notes, setNotes] = useState('');

  const prices = getPrices();
  const basePrice = prices[size];
  const quantityNum = parseInt(quantity) || 1;
  const totalPrice = basePrice * quantityNum;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset après 5 secondes
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-presse-white">
      <Header />

      <section className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-5xl font-bold text-presse-dark mb-4">
            Passer une commande
          </h1>
          <p className="text-lg text-presse-dark font-inter mb-12">
            Configurez votre commande et choisissez vos options préférées
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8 bg-presse-beige p-8 rounded-lg">
                {/* Sélection Produit */}
                <div>
                  <label className="block font-poppins font-semibold text-presse-dark mb-4">
                    Sélectionner un produit
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                  >
                    <option value="">-- Choisir un produit --</option>
                    {PRODUCTS.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Taille */}
                <div>
                  <label className="block font-poppins font-semibold text-presse-dark mb-4">
                    Taille
                  </label>
                  <div className="space-y-3">
                    {(['350ml', '500ml'] as const).map((sizeOption) => (
                      <label key={sizeOption} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value={sizeOption}
                          checked={size === sizeOption}
                          onChange={(e) => setSize(e.target.value as '350ml' | '500ml')}
                          className="w-4 h-4"
                        />
                        <span className="text-presse-dark font-inter">
                          {sizeOption} – ${prices[sizeOption]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Quantité */}
                <div>
                  <label className="block font-poppins font-semibold text-presse-dark mb-4">
                    Quantité
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                  />
                </div>

                {/* Personnalisation */}
                <div>
                  <label className="block font-poppins font-semibold text-presse-dark mb-4">
                    Notes speciales (optionnel)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: sans sucre, allergies, préférences..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                  />
                </div>

                {/* Mode de réception */}
                <div>
                  <label className="block font-poppins font-semibold text-presse-dark mb-4">
                    Mode de réception
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="pickup"
                        checked={deliveryMethod === 'pickup'}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-presse-dark font-inter">
                        Cueillette (H2A – près métro St Michel)
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="delivery"
                        checked={deliveryMethod === 'delivery'}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-presse-dark font-inter">
                        Livraison
                      </span>
                    </label>
                  </div>
                </div>

                {/* Paiement */}
                <div>
                  <label className="block font-poppins font-semibold text-presse-dark mb-4">
                    Mode de paiement
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="interac"
                        checked={paymentMethod === 'interac'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-presse-dark font-inter">
                        Virement Interac
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-presse-dark font-inter">
                        Comptant (paiement à la cueillette)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <Button size="lg" className="w-full" type="submit">
                  Confirmer la commande
                </Button>

                {submitted && (
                  <div className="p-4 bg-presse-green text-white rounded-lg">
                    ✓ Commande soumise! Vous serez contacté bientôt.
                  </div>
                )}
              </form>
            </div>

            {/* Résumé */}
            <div className="bg-presse-beige p-6 rounded-lg h-fit">
              <h3 className="font-poppins font-bold text-xl text-presse-dark mb-6">
                Résumé de la commande
              </h3>

              {selectedProduct && (
                <div className="space-y-4 border-b border-presse-green-light pb-4 mb-4">
                  <p className="text-sm text-presse-dark">
                    <strong>Produit:</strong> {PRODUCTS.find(p => p.id === selectedProduct)?.name}
                  </p>
                  <p className="text-sm text-presse-dark">
                    <strong>Taille:</strong> {size}
                  </p>
                  <p className="text-sm text-presse-dark">
                    <strong>Quantité:</strong> {quantity}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-presse-dark">
                  <span>Sous-total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-presse-green-light">
                  <div className="flex justify-between font-poppins font-bold text-lg text-presse-green">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-presse-green-light rounded text-sm text-presse-dark">
                <p>
                  <strong>⏰ Délai de traitement:</strong>
                </p>
                <p>Commandes acceptées lundi à jeudi. Après jeudi, traitement la semaine suivante.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
