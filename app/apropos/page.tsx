'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Feature from '@/components/Feature';

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-presse-white">
      <Header />

      <section className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-5xl font-bold text-presse-dark mb-12">
            À propos de nous
          </h1>

          {/* Histoire */}
          <div className="mb-16">
            <h2 className="font-poppins text-3xl font-bold text-presse-dark mb-6">
              Notre histoire
            </h2>
            <p className="text-lg text-presse-dark font-inter leading-relaxed mb-4">
              Pressé Naturel est née d&apos;une passion simple : faire découvrir à Montréal les vrais jus naturels, sans compromis. Fondée avec la conviction que la santé commence par l&apos;assiette, notre marque crée des jus frais pressés quotidiennement avec les meilleurs fruits et légumes.
            </p>
            <p className="text-lg text-presse-dark font-inter leading-relaxed">
              Chaque bouteille est un engagement envers votre bien-être et notre environnement.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="font-poppins text-2xl font-bold text-presse-green mb-4">
                Notre Vision
              </h3>
              <p className="text-presse-dark font-inter">
                Offrir des jus naturels et sains qui transforment la vie quotidienne de nos clients et les inspirent à choisir le naturel.
              </p>
            </div>
            <div>
              <h3 className="font-poppins text-2xl font-bold text-presse-green mb-4">
                Notre Mission
              </h3>
              <p className="text-presse-dark font-inter">
                Promouvoir une alimentation saine et durable en fournissant des jus frais, d&apos;excellente qualité et accessibles à tous.
              </p>
            </div>
          </div>

          {/* Valeurs */}
          <div>
            <h2 className="font-poppins text-3xl font-bold text-presse-dark mb-12">
              Nos Valeurs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Feature
                icon="🍃"
                title="Naturel"
                description="Aucun additif, conservateur ou ingrédient artificiel. Juste la pureté de la nature."
              />
              <Feature
                icon="⚡"
                title="Fraîcheur"
                description="Pressés avec passion chaque jour pour vous garantir la meilleure qualité."
              />
              <Feature
                icon="❤️"
                title="Santé"
                description="Votre bien-être est notre priorité. Des jus qui vous nourrisent vraiment."
              />
              <Feature
                icon="🌍"
                title="Durabilité"
                description="Engagement envers notre communauté et notre environnement pour un futur meilleur."
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
