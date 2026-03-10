'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { FiMail, FiPhone, FiMapPin, FiMessageCircle } from 'react-icons/fi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-presse-white">
      <Header />

      <section className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-5xl font-bold text-presse-dark mb-4">
            Nous Contacter
          </h1>
          <p className="text-lg text-presse-dark font-inter mb-12">
            Une question? Un besoin ? Nous&apos;aimerions vous entendre!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6 bg-presse-beige p-8 rounded-lg">
                <div>
                  <label className="block font-poppins font-semibold text-presse-dark mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-poppins font-semibold text-presse-dark mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-poppins font-semibold text-presse-dark mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-presse-green-light rounded-lg focus:border-presse-green focus:outline-none"
                  />
                </div>

                <Button size="lg" className="w-full" type="submit">
                  Envoyer le message
                </Button>

                {submitted && (
                  <div className="p-4 bg-presse-green text-white rounded-lg">
                    ✓ Message reçu! Nous vous répondrons bientôt.
                  </div>
                )}
              </form>
            </div>

            {/* Infos de contact */}
            <div className="space-y-8">
              {/* Localisation */}
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-presse-green-light rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-lg text-presse-dark mb-2">
                      Localisation
                    </h3>
                    <p className="text-presse-dark font-inter">
                      H2A – Près de la station de métro Saint-Michel<br/>
                      Montréal, QC
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-presse-green-light rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-lg text-presse-dark mb-2">
                      Email
                    </h3>
                    <a href="mailto:contact@pressenaturel.ca" className="text-presse-green hover:text-presse-dark transition-colors font-inter">
                      contact@pressenaturel.ca
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-presse-green-light rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    💬
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-lg text-presse-dark mb-2">
                      WhatsApp
                    </h3>
                    <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="text-presse-green hover:text-presse-dark transition-colors font-inter">
                      Nous contacter sur WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-presse-green-light rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    📱
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-lg text-presse-dark mb-2">
                      Instagram
                    </h3>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-presse-green hover:text-presse-dark transition-colors font-inter">
                      @pressenaturel
                    </a>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="mt-12 p-6 bg-presse-beige rounded-lg">
                <h3 className="font-poppins font-bold text-lg text-presse-dark mb-4">
                  Commandes
                </h3>
                <div className="space-y-2 text-sm text-presse-dark font-inter">
                  <p><strong>Commandes acceptées:</strong> Lundi à jeudi</p>
                  <p><strong>Traitement après jeudi:</strong> Semaine suivante</p>
                  <p><strong>Cueillette / Livraison:</strong> Sur demande</p>
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
