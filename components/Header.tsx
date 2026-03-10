'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/jus', label: 'Nos Jus' },
    { href: '/shots', label: 'Shots Santé' },
    { href: '/commander', label: 'Commander' },
    { href: '/apropos', label: 'À propos' },
    { href: '/avis', label: 'Avis' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-presse-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/logos/logo.svg"
              alt="Pressé Naturel Logo"
              width={50}
              height={50}
              className="hover:scale-110 transition-transform"
              priority
            />
            <span className="font-poppins font-bold text-lg text-presse-dark hidden sm:inline">
              Pressé Naturel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-presse-dark hover:text-presse-green font-inter text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart Icon */}
          <Link
            href="/panier"
            className="hidden sm:flex items-center text-presse-green hover:text-presse-dark transition-colors"
          >
            <FiShoppingCart size={24} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-presse-dark"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-presse-green-light">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-presse-dark hover:text-presse-green font-inter text-sm transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
