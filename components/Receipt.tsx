'use client';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Button from './Button';
import Image from 'next/image';

interface ReceiptProps {
  orderNumber: string;
  productName: string;
  size: string;
  quantity: string;
  unitPrice: number;
  totalPrice: number;
  deliveryMethod: string;
  paymentMethod: string;
  notes: string;
  orderDate: string;
}

export default function Receipt({
  orderNumber,
  productName,
  size,
  quantity,
  unitPrice,
  totalPrice,
  deliveryMethod,
  paymentMethod,
  notes,
  orderDate,
}: ReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return;

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`Recu_Presse_Naturel_${orderNumber}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    }
  };

  const paymentMethodMap: Record<string, string> = {
    interac: 'Virement Interac',
    cash: 'Comptant',
  };
  const paymentMethodLabel = paymentMethodMap[paymentMethod] || paymentMethod;

  const deliveryMap: Record<string, string> = {
    pickup: 'Cueillette (H2A – près métro St Michel)',
    delivery: 'Livraison',
  };
  const deliveryLabel = deliveryMap[deliveryMethod] || deliveryMethod;

  return (
    <div>
      <div
        ref={receiptRef}
        className="bg-white p-8 rounded-lg max-w-2xl mx-auto"
        style={{
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Logo et en-tête */}
        <div className="text-center mb-8 border-b-2 border-presse-green pb-6">
          <div className="flex justify-center mb-4">
            <Image
              src="/logos/logo.svg"
              alt="Pressé Naturel"
              width={80}
              height={80}
            />
          </div>
          <h1 className="text-3xl font-bold text-presse-dark">Pressé Naturel</h1>
          <p className="text-presse-green font-semibold">100% Naturel • 100% Frais</p>
        </div>

        {/* Détails de commande */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Numéro de commande</p>
              <p className="text-lg font-bold text-presse-dark">{orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Date de commande</p>
              <p className="text-lg font-bold text-presse-dark">{orderDate}</p>
            </div>
          </div>

          <div className="bg-presse-beige p-4 rounded-lg">
            <h3 className="font-bold text-presse-dark mb-3">Détails de la commande</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-presse-green-light">
                  <td className="py-2 text-presse-dark">Produit</td>
                  <td className="py-2 text-right text-presse-dark">{productName}</td>
                </tr>
                <tr className="border-b border-presse-green-light">
                  <td className="py-2 text-presse-dark">Taille</td>
                  <td className="py-2 text-right text-presse-dark">{size}</td>
                </tr>
                <tr className="border-b border-presse-green-light">
                  <td className="py-2 text-presse-dark">Quantité</td>
                  <td className="py-2 text-right text-presse-dark">{quantity}</td>
                </tr>
                <tr className="border-b border-presse-green-light">
                  <td className="py-2 text-presse-dark">Prix unitaire</td>
                  <td className="py-2 text-right text-presse-dark">${unitPrice.toFixed(2)}</td>
                </tr>
                <tr className="bg-presse-green text-white font-bold">
                  <td className="py-2">Total</td>
                  <td className="py-2 text-right">${totalPrice.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Informations de livraison et paiement */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="font-bold text-presse-dark mb-2">Mode de réception</h4>
            <p className="text-sm text-presse-dark">{deliveryLabel}</p>
          </div>
          <div>
            <h4 className="font-bold text-presse-dark mb-2">Mode de paiement</h4>
            <p className="text-sm text-presse-dark">{paymentMethodLabel}</p>
          </div>
        </div>

        {/* Notes spéciales */}
        {notes && (
          <div className="mb-8 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-bold text-presse-dark mb-2">Notes spéciales</h4>
            <p className="text-sm text-presse-dark">{notes}</p>
          </div>
        )}

        {/* Informations de contact */}
        <div className="bg-presse-green-light p-4 rounded-lg text-sm text-presse-dark">
          <p className="font-bold mb-2">📞 Informations de contact</p>
          <p>📍 Cueillette: H2A – Montréal (près métro St Michel)</p>
          <p>📧 Email: info@pressenaturel.com</p>
          <p className="mt-3 text-xs text-gray-600 italic">
            Merci pour votre commande! Nous vous contacterons bientôt pour confirmer les détails.
          </p>
        </div>
      </div>

      {/* Bouton de téléchargement */}
      <div className="flex gap-4 justify-center mt-8">
        <Button size="lg" onClick={handleDownloadPDF}>
          📥 Télécharger en PDF
        </Button>
      </div>
    </div>
  );
}
