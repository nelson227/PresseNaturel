'use client';

import React from 'react';
import { FiStar } from 'react-icons/fi';

interface TestimonialProps {
  name: string;
  rating: number;
  comment: string;
}

export default function Testimonial({ name, rating, comment }: TestimonialProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-presse-green-light">
      {/* Stars */}
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            size={18}
            className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-presse-dark text-sm font-inter mb-4 leading-relaxed">
        "{comment}"
      </p>

      {/* Author */}
      <p className="font-poppins font-semibold text-presse-green">
        {name}
      </p>
    </div>
  );
}
