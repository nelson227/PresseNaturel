import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-presse-green-light rounded-full flex items-center justify-center mb-4 text-3xl">
        {icon}
      </div>
      <h3 className="font-poppins font-bold text-lg text-presse-dark mb-2">
        {title}
      </h3>
      <p className="text-presse-dark text-sm font-inter">
        {description}
      </p>
    </div>
  );
}
