'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { PRODUCTS, getPrices, getProduct } from '@/lib/products';

export default function CommanderPage() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [size, setSize] = useState<'60ml' | '350ml' | '500ml'>('350ml');
  const [quantity, setQuantity] = useState('1');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('interac');
  const [notes, setNotes] = useState('');
  
  // Informations client
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const prices = getPrices();
  const selectedProductData = getProduct(selectedProduct);
  const isShot = selectedProductData?.shotOnly || selectedProductData?.category === 'shot';
  
  // Ajuster la taille si c'est un shot
  useEffect(() => {
    if (isShot) {
      setSize('60ml');
    }
  }, [isShot, selectedProduct]);

  const basePrice = prices[size];
  const quantityNum = parseInt(quantity) || 1;
  const totalPrice = basePrice * quantityNum;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier les champs requis
    if (!selectedProduct) {
      alert('Veuillez sélectionner un produit');
      return;
    }

    if (!firstName || !lastName || !email || !phone) {
      alert('Veuillez remplir toutes les informations de contact');
      return;
    }

    if (deliveryMethod === 'delivery' && (!address || !city || !postalCode)) {
      alert('Veuillez remplir votre adresse de livraison');
      return;
    }

    // Créer les paramètres de requête
    const params = new URLSearchParams({
      productId: selectedProduct,
      size,
      quantity,
      deliveryMethod,
      paymentMethod,
      notes,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
    });

    // Rediriger vers la page de confirmation
    router.push(`/confirmation?${params.toString()}`);
  };

  // Filtrer les tailles disponibles selon le produit
  const availableSizes = isShot 
    ? [{ value: '60ml', label: '60ml (Shot)', price: prices['60ml'] }]
    : [
        { value: '350ml', label: '350ml', price: prices['350ml'] },
        { value: '500ml', label: '500ml', price: prices['500ml'] },
      ];

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
                
                {/* Informations Client */}
                <div className="border-b border-presse-green-light pb-6">
                  <h2 className="font-poppins font-bold text-xl text-presse-dark mb-6">
                    Vos informations
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins font-semibold text-presse-dark mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins font-semibold text-presse-dark mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins font-semibold text-presse-dark mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins font-semibold text-presse-dark mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                        placeholder="514-XXX-XXXX"
                      />
                    </div>
                  </div>
                </div>

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
                    <optgroup label="Jus">
                      {PRODUCTS.filter(p => p.category === 'jus').map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Shots (60ml uniquement)">
                      {PRODUCTS.filter(p => p.category === 'shot').map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} (Shot 60ml)
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  {isShot && (
                    <p className="mt-2 text-sm text-presse-green font-inter">
                      Ce produit est uniquement disponible en format shot (60ml)
                    </p>
                  )}
                </div>

                {/* Taille */}
                <div>
                  <label className="block font-poppins font-semibold text-presse-dark mb-4">
                    Taille
                  </label>
                  <div className="space-y-3">
                    {availableSizes.map((sizeOption) => (
                      <label key={sizeOption.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value={sizeOption.value}
                          checked={size === sizeOption.value}
                          onChange={(e) => setSize(e.target.value as '60ml' | '350ml' | '500ml')}
                          className="w-4 h-4"
                          disabled={isShot && sizeOption.value !== '60ml'}
                        />
                        <span className="text-presse-dark font-inter">
                          {sizeOption.label} – ${sizeOption.price}
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

                {/* Notes */}
                <div>
                  <label className="block font-poppins font-semibold text-presse-dark mb-4">
                    Notes spéciales (optionnel)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: sans sucre, allergies, préférences..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                  />
                </div>

                {/* Mode de réception */}
                <div className="border-t border-presse-green-light pt-6">
                  <label className="block font-poppins font-semibold text-presse-dark mb-4">
                    Mode de réception
                  </label>
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer p-4 border-2 border-presse-green-light rounded-lg hover:border-presse-green transition-colors">
                      <input
                        type="radio"
                        value="pickup"
                        checked={deliveryMethod === 'pickup'}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="w-4 h-4 mt-1"
                      />
                      <div>
                        <span className="text-presse-dark font-inter font-semibold">
                          Cueillette sur rendez-vous
                        </span>
                        <p className="text-sm text-presse-dark mt-1">
                          Secteur H2A – Près du métro St-Michel
                        </p>
                        <p className="text-xs text-presse-green mt-1">
                          Contactez-nous pour fixer un rendez-vous
                        </p>
                      </div>
                    </label>
                    
                    <label className="flex items-start gap-3 cursor-pointer p-4 border-2 border-presse-green-light rounded-lg hover:border-presse-green transition-colors">
                      <input
                        type="radio"
                        value="delivery"
                        checked={deliveryMethod === 'delivery'}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="w-4 h-4 mt-1"
                      />
                      <div>
                        <span className="text-presse-dark font-inter font-semibold">
                          Livraison
                        </span>
                        <p className="text-sm text-presse-dark mt-1">
                          Livraison disponible dans les zones suivantes
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Infos livraison */}
                  {deliveryMethod === 'delivery' && (
                    <div className="mt-6 p-4 bg-presse-green-light rounded-lg">
                      <h3 className="font-poppins font-semibold text-presse-dark mb-4">
                        Adresse de livraison
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-inter text-presse-dark mb-2">
                            Adresse *
                          </label>
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required={deliveryMethod === 'delivery'}
                            className="w-full px-4 py-3 border-2 border-presse-green rounded-lg focus:border-presse-green focus:outline-none bg-white"
                            placeholder="123 rue Exemple"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-inter text-presse-dark mb-2">
                              Ville *
                            </label>
                            <input
                              type="text"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              required={deliveryMethod === 'delivery'}
                              className="w-full px-4 py-3 border-2 border-presse-green rounded-lg focus:border-presse-green focus:outline-none bg-white"
                              placeholder="Montréal"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-inter text-presse-dark mb-2">
                              Code postal *
                            </label>
                            <input
                              type="text"
                              value={postalCode}
                              onChange={(e) => setPostalCode(e.target.value)}
                              required={deliveryMethod === 'delivery'}
                              className="w-full px-4 py-3 border-2 border-presse-green rounded-lg focus:border-presse-green focus:outline-none bg-white"
                              placeholder="H2A 1A1"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Zones de livraison */}
                      <div className="mt-4 p-3 bg-white rounded-lg">
                        <p className="text-sm font-semibold text-presse-dark mb-2">Zones de livraison :</p>
                        <ul className="text-xs text-presse-dark space-y-1">
                          <li>• Montréal (tous les arrondissements)</li>
                          <li>• Laval</li>
                          <li>• Longueuil / Rive-Sud</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Jours de livraison */}
                  <div className="mt-4 p-4 bg-presse-beige border-2 border-presse-green-light rounded-lg">
                    <p className="font-poppins font-semibold text-presse-dark mb-2">Jours de livraison :</p>
                    <p className="text-sm text-presse-dark">
                      <strong>Vendredi</strong> et <strong>Samedi</strong>
                    </p>
                    <p className="text-xs text-presse-green mt-2">
                      Commandes acceptées du lundi au jeudi. Les commandes après jeudi seront traitées la semaine suivante.
                    </p>
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
                        Comptant (paiement à la cueillette/livraison)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <Button size="lg" className="w-full" type="submit">
                  Confirmer la commande
                </Button>
              </form>
            </div>

            {/* Résumé */}
            <div className="space-y-6">
              <div className="bg-presse-beige p-6 rounded-lg h-fit sticky top-24">
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
                      {isShot && <span className="text-presse-green ml-2">(Shot)</span>}
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

                {firstName && (
                  <div className="mt-4 pt-4 border-t border-presse-green-light">
                    <p className="text-xs text-presse-dark">
                      <strong>Client:</strong> {firstName} {lastName}
                    </p>
                    {email && <p className="text-xs text-presse-dark">{email}</p>}
                    {phone && <p className="text-xs text-presse-dark">{phone}</p>}
                  </div>
                )}

                <div className="mt-6 p-4 bg-presse-green-light rounded text-sm text-presse-dark">
                  <p className="font-semibold mb-2">Important :</p>
                  <ul className="text-xs space-y-1">
                    <li>• Cueillette sur rendez-vous uniquement</li>
                    <li>• Livraisons: Vendredi et Samedi</li>
                    <li>• Commandes acceptées lun-jeu</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
