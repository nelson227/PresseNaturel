'use client';

import React from 'react';
import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FiInstagram, FiMessageCircle } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-presse-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-poppins font-bold text-lg mb-4">Pressé Naturel</h3>
            <p className="text-gray-400 text-sm font-inter">
              Des jus naturels, pressés avec passion. 100% fruits et légumes – 0% compromis.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/jus" className="hover:text-presse-green transition-colors">Nos Jus</Link></li>
              <li><Link href="/shots" className="hover:text-presse-green transition-colors">Shots Santé</Link></li>
              <li><Link href="/commander" className="hover:text-presse-green transition-colors">Commander</Link></li>
              <li><Link href="/apropos" className="hover:text-presse-green transition-colors">À propos</Link></li>
            </ul>
          </div>

          {/* Infos */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Infos</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center space-x-2">
                <FiMapPin size={16} />
                <span>H2A – près métro St Michel</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail size={16} />
                <span>contact@pressenaturel.ca</span>
              </li>
            </ul>
          </div>

          {/* Réseaux Sociaux */}
          <div>
            <h4 className="font-poppins font-semibold mb-4">Nous Suivre</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-presse-green transition-colors"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-presse-green transition-colors"
              >
                <FiMessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} Pressé Naturel. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
