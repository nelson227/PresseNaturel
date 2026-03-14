'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/jus', label: 'Nos Jus' },
    { href: '/shots', label: 'Shots Santé' },
    { href: '/packs', label: 'Packs' },
    { href: '/commander', label: 'Commander' },
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

          {/* Account & Cart Icons */}
          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/compte"
                  className="flex items-center gap-2 text-presse-dark hover:text-presse-green transition-colors"
                >
                  <FiUser size={20} />
                  <span className="text-sm font-inter">{user.firstName}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-presse-dark hover:text-red-500 transition-colors"
                  title="Déconnexion"
                >
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/compte"
                className="flex items-center gap-2 text-presse-dark hover:text-presse-green transition-colors"
                title="Connexion / Inscription"
              >
                <FiUser size={22} />
                <span className="text-sm font-inter">Connexion</span>
              </Link>
            )}
            <Link
              href="/panier"
              className="flex items-center text-presse-green hover:text-presse-dark transition-colors"
            >
              <FiShoppingCart size={24} />
            </Link>
          </div>

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
            <div className="pt-4 mt-4 border-t border-presse-green-light">
              {user ? (
                <div className="space-y-2">
                  <Link
                    href="/compte"
                    className="flex items-center gap-2 py-2 text-presse-green font-inter text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiUser size={18} />
                    Mon compte ({user.firstName})
                  </Link>
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="flex items-center gap-2 py-2 text-red-500 font-inter text-sm"
                  >
                    <FiLogOut size={18} />
                    Déconnexion
                  </button>
                </div>
              ) : (
                <Link
                  href="/compte"
                  className="flex items-center gap-2 py-2 text-presse-green font-inter text-sm font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <FiUser size={18} />
                  Connexion / Inscription
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
