'use client';

import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  [key: string]: any;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-poppins font-semibold transition-all duration-300 rounded-lg inline-flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'bg-presse-green text-white hover:bg-presse-dark shadow-md hover:shadow-lg',
    secondary: 'bg-presse-green-light text-presse-green hover:bg-presse-green hover:text-white',
    outline: 'border-2 border-presse-green text-presse-green hover:bg-presse-green hover:text-white',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
