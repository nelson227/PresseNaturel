'use client';

import React, { useState, useEffect } from 'react';
import Testimonial from './Testimonial';
import { TestimonialType } from '@/lib/testimonials';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface TestimonialCarouselProps {
  testimonials: TestimonialType[];
  autoScroll?: boolean;
  autoScrollInterval?: number;
  itemsPerView?: number;
}

export default function TestimonialCarousel({
  testimonials,
  autoScroll = true,
  autoScrollInterval = 4000,
  itemsPerView = 3,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedTestimonials, setDisplayedTestimonials] = useState<TestimonialType[]>([]);

  // Créer une boucle infinie des avis
  useEffect(() => {
    if (testimonials.length > 0) {
      const infiniteList = [...testimonials, ...testimonials, ...testimonials];
      setDisplayedTestimonials(infiniteList);
    }
  }, [testimonials]);

  // Auto-scroll
  useEffect(() => {
    if (!autoScroll || displayedTestimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        // Si on dépasse la moitié, réinitialiser pour la boucle infinie
        if (nextIndex > testimonials.length * 2) {
          return 0;
        }
        return nextIndex;
      });
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [autoScroll, autoScrollInterval, testimonials.length, displayedTestimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      if (newIndex < 0) {
        return Math.max(0, testimonials.length - itemsPerView);
      }
      return newIndex;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, testimonials.length - itemsPerView);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  if (testimonials.length === 0) {
    return <div className="text-center text-presse-dark">Aucun avis pour le moment</div>;
  }

  const visibleTestimonials = displayedTestimonials.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="relative group">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleTestimonials.map((testimonial, idx) => (
          <Testimonial
            key={`${testimonial.id}-${idx}`}
            name={testimonial.name}
            rating={testimonial.rating}
            comment={testimonial.comment}
          />
        ))}
      </div>

      {/* Boutons de navigation */}
      {testimonials.length > itemsPerView && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-presse-green text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-presse-dark"
            aria-label="Avis précédents"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-presse-green text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-presse-dark"
            aria-label="Avis suivants"
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicateurs */}
      {testimonials.length > itemsPerView && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(testimonials.length / itemsPerView) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx * itemsPerView)}
              className={`w-3 h-3 rounded-full transition-all ${
                Math.floor(currentIndex / itemsPerView) === idx
                  ? 'bg-presse-green w-8'
                  : 'bg-presse-green-light hover:bg-presse-green'
              }`}
              aria-label={`Aller aux avis ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
