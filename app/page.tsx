'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Feature from '@/components/Feature';
import Button from '@/components/Button';
import { useData } from '@/contexts/DataContext';
import { getTestimonials } from '@/lib/testimonials';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  const { products } = useData();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const testimonials = getTestimonials();

  return (
    <div className="min-h-screen bg-presse-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-40 overflow-hidden flex">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h1 className="font-playfair text-5xl md:text-6xl font-bold text-presse-dark mb-4 leading-tight">
                Des jus naturels, pressés avec passion
              </h1>
              <p className="text-xl text-presse-dark mb-8 font-inter">
                100% fruits et légumes – 0% compromis
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/jus">
                  <Button>
                    Voir nos produits
                    <FiArrowRight />
                  </Button>
                </Link>
                <Link href="/commander">
                  <Button variant="secondary">
                    Commander maintenant
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-presse-green-light via-presse-beige to-presse-green-light rounded-2xl flex items-center justify-center">
                <div className="text-8xl animate-bounce">🥤</div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-presse-green rounded-full opacity-20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-presse-green rounded-full opacity-30 blur-3xl" />
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-presse-green-light rounded-full opacity-20 blur-3xl pointer-events-none" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-presse-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-4xl font-bold text-center text-presse-dark mb-16">
            Pourquoi choisir Pressé Naturel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Feature
              icon="🍃"
              title="100% Naturel"
              description="Aucun additif, conservateur ou sucre ajouté. Juste la nature, pure et simple."
            />
            <Feature
              icon="⚡"
              title="Fraîcheur Garantie"
              description="Pressés avec amour chaque jour. Consommez dans les 48h pour le meilleur goût."
            />
            <Feature
              icon="📍"
              title="Production Locale"
              description="Fabriqué à Montréal, avec des ingrédients de qualité supérieure et durables."
            />
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-playfair text-4xl font-bold text-presse-dark mb-4">
              Nos Favoris
            </h2>
            <p className="text-lg text-presse-dark font-inter">
              Découvrez les jus les plus demandés par nos clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/jus">
              <Button size="lg">
                Voir tous nos jus
                <FiArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-presse-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-4xl font-bold text-presse-dark mb-16 text-center">
            Ce que nos clients disent
          </h2>
          <TestimonialCarousel
            testimonials={testimonials}
            autoScroll
            autoScrollInterval={4000}
            itemsPerView={3}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-presse-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold mb-6">
            Prêt à transformer votre santé?
          </h2>
          <p className="text-lg mb-8 opacity-90 font-inter">
            Commandez vos jus frais dès maintenant et goûtez la différence
          </p>
          <Link href="/commander">
            <Button variant="white">
              Commander maintenant
              <FiArrowRight />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
