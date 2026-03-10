import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pressé Naturel – Jus Naturels Frais à Montréal',
  description: 'Des jus naturels pressés avec passion. 100% fruits et légumes – 0% compromis. Commander vos jus frais dès aujourd\'hui!',
  keywords: 'jus naturel, jus frais, détox, santé, Montréal, bio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-inter bg-presse-white text-presse-dark">
        {children}
      </body>
    </html>
  );
}
