'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { FiStar, FiArrowRight } from 'react-icons/fi';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const productUrl = `/${product.category === 'jus' ? 'jus' : 'shots'}/${product.id}`;

  return (
    <Link href={productUrl}>
      <div className={`group cursor-pointer transition-all duration-300 ${featured ? 'md:col-span-2' : ''}`}>
        <div className="bg-presse-beige rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
          {/* Image Container */}
          <div className="relative aspect-square bg-gradient-to-br from-presse-green-light to-presse-beige overflow-hidden">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-presse-green-light opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">{product.category === 'shot' ? '⚡' : '🥤'}</div>
                    <p className="text-sm text-presse-green font-inter">{product.name}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-poppins font-bold text-lg text-presse-dark mb-2 group-hover:text-presse-green transition-colors">
              {product.name}
            </h3>
            <p className="text-presse-dark text-sm font-inter mb-4 line-clamp-2">
              {product.description}
            </p>

            {/* Ingredients */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-presse-green mb-2">INGRÉDIENTS</p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="px-2 py-1 bg-presse-green-light text-presse-dark text-xs rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-presse-green mb-2">BIENFAITS</p>
              <div className="flex flex-wrap gap-2">
                {product.benefits.map((benefit) => (
                  <span key={benefit} className="text-xs text-presse-dark">
                    ✓ {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex items-center justify-between pt-4 border-t border-presse-green-light">
              <span className="text-sm font-poppins font-semibold text-presse-green">
                {product.category === 'shot' || product.shotOnly ? (
                  <>60ml – 4$</>
                ) : (
                  <>À partir de 9$</>
                )}
              </span>
              <div className="text-presse-green group-hover:translate-x-1 transition-transform">
                <FiArrowRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
