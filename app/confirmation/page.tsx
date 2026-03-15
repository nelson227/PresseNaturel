'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { FiArrowLeft, FiCheckCircle, FiDownload, FiLoader } from 'react-icons/fi';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pressenaturel-production.up.railway.app/api';

interface CartItem {
  productId: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
}

interface OrderData {
  orderNumber: string;
  orderDate: string;
  items: CartItem[];
  total: number;
  deliveryMethod: string;
  paymentMethod: string;
  notes: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    postalCode?: string;
  };
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const receiptRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const orderNumber = searchParams.get('orderNumber');

      if (!orderNumber) {
        setError('Numéro de commande manquant');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/orders/${orderNumber}`);
        
        if (!response.ok) {
          throw new Error('Commande non trouvée');
        }

        const data = await response.json();
        const order = data.order;

        // Transformer les données du backend au format attendu
        const orderDate = new Date(order.createdAt).toLocaleDateString('fr-CA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const transformedOrder: OrderData = {
          orderNumber: order.orderNumber,
          orderDate,
          items: order.items.map((item: any) => ({
            productId: item.productId,
            name: item.product?.name || 'Produit',
            size: item.size,
            quantity: item.quantity,
            price: item.unitPrice,
          })),
          total: order.totalPrice,
          deliveryMethod: order.deliveryMethod,
          paymentMethod: order.paymentMethod,
          notes: order.notes || '',
          customer: {
            firstName: order.customerFirstName,
            lastName: order.customerLastName,
            email: order.customerEmail,
            phone: order.customerPhone,
            address: order.customerAddress || '',
            city: order.customerCity || '',
            postalCode: order.customerPostalCode || '',
          },
        };

        setOrderData(transformedOrder);
      } catch (err) {
        console.error('Erreur lors de la récupération de la commande:', err);
        setError('Impossible de charger les détails de la commande');
      }

      setLoading(false);
    };

    fetchOrder();
  }, [searchParams]);

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
      pdf.save(`Recu_Presse_Naturel_${orderData?.orderNumber}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    }
  };

  const getPaymentLabel = (method: string) => {
    const labels: Record<string, string> = {
      interac: 'Virement Interac',
      cash: 'Comptant',
    };
    return labels[method] || method;
  };

  const getDeliveryLabel = (method: string) => {
    const labels: Record<string, string> = {
      pickup: 'Cueillette (H2A – près métro St-Michel)',
      delivery: 'Livraison',
    };
    return labels[method] || method;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-lg text-presse-dark">
          <FiLoader className="animate-spin" />
          Chargement de votre commande...
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-presse-white">
        <Header />
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-red-600 mb-6">{error || 'Données de commande manquantes'}</p>
            <Link href="/commander">
              <Button>Retourner à la commande</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-presse-white">
      <Header />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Icône et titre de succès */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FiCheckCircle className="text-6xl text-presse-green" />
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-presse-dark mb-4">
              Commande confirmée!
            </h1>
            <p className="text-xl text-presse-dark font-inter">
              Merci pour votre achat, {orderData.customer.firstName}!
            </p>
          </div>

          {/* Reçu */}
          <div
            ref={receiptRef}
            className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mb-8"
          >
            {/* En-tête du reçu */}
            <div className="text-center mb-8 border-b-2 border-presse-green pb-6">
              <div className="flex justify-center mb-4">
                <Image
                  src="/logos/logo.svg"
                  alt="Pressé Naturel"
                  width={80}
                  height={80}
                />
              </div>
              <h2 className="text-3xl font-bold text-presse-dark">Pressé Naturel</h2>
              <p className="text-presse-green font-semibold">100% Naturel • 100% Frais</p>
            </div>

            {/* Info commande */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Numéro de commande</p>
                <p className="text-lg font-bold text-presse-dark">{orderData.orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Date</p>
                <p className="text-lg font-bold text-presse-dark">{orderData.orderDate}</p>
              </div>
            </div>

            {/* Client */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold text-presse-dark">
                {orderData.customer.firstName} {orderData.customer.lastName}
              </p>
              <p className="text-sm text-gray-600">{orderData.customer.email}</p>
              <p className="text-sm text-gray-600">{orderData.customer.phone}</p>
              {orderData.customer.address && (
                <p className="text-sm text-gray-600">
                  {orderData.customer.address}, {orderData.customer.city} {orderData.customer.postalCode}
                </p>
              )}
            </div>

            {/* Produits */}
            <div className="mb-6">
              <h3 className="font-bold text-presse-dark mb-3">Articles commandés</h3>
              <div className="bg-presse-beige rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-presse-green text-white">
                    <tr>
                      <th className="py-2 px-4 text-left">Produit</th>
                      <th className="py-2 px-4 text-center">Taille</th>
                      <th className="py-2 px-4 text-center">Qté</th>
                      <th className="py-2 px-4 text-right">Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.items.map((item, idx) => (
                      <tr key={idx} className="border-b border-presse-green-light">
                        <td className="py-2 px-4">{item.name}</td>
                        <td className="py-2 px-4 text-center">{item.size}</td>
                        <td className="py-2 px-4 text-center">{item.quantity}</td>
                        <td className="py-2 px-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-presse-green text-white font-bold">
                      <td colSpan={3} className="py-3 px-4">Total</td>
                      <td className="py-3 px-4 text-right">${orderData.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Livraison et paiement */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-bold text-presse-dark mb-1">Mode de réception</h4>
                <p className="text-sm text-gray-600">{getDeliveryLabel(orderData.deliveryMethod)}</p>
              </div>
              <div>
                <h4 className="font-bold text-presse-dark mb-1">Mode de paiement</h4>
                <p className="text-sm text-gray-600">{getPaymentLabel(orderData.paymentMethod)}</p>
              </div>
            </div>

            {orderData.notes && (
              <div className="mb-6">
                <h4 className="font-bold text-presse-dark mb-1">Notes</h4>
                <p className="text-sm text-gray-600">{orderData.notes}</p>
              </div>
            )}

            {/* Pied de page reçu */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">Merci de votre confiance!</p>
              <p className="text-xs text-gray-400 mt-2">contact@pressenaturel.ca • Montréal, QC</p>
            </div>
          </div>

          {/* Bouton télécharger PDF */}
          <div className="text-center mb-8">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 px-6 py-3 bg-presse-green text-white rounded-lg font-semibold hover:bg-presse-green/90 transition-colors"
            >
              <FiDownload size={20} />
              Télécharger le reçu PDF
            </button>
          </div>

          {/* Boutons de navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="secondary">
                <FiArrowLeft className="mr-2" /> Retourner à l'accueil
              </Button>
            </Link>
            <Link href="/compte">
              <Button>
                Voir mes commandes
              </Button>
            </Link>
          </div>

          {/* Messages informatifs */}
          <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <h3 className="font-bold text-presse-dark mb-3">📋 Prochaines étapes</h3>
            <ul className="space-y-2 text-presse-dark text-sm">
              <li>✓ Vous recevrez une confirmation par email dans les 24h</li>
              <li>✓ Notre équipe vous contactera pour confirmer les détails</li>
              <li>✓ Téléchargez et conservez votre reçu ci-dessus</li>
              {orderData.deliveryMethod === 'pickup' && (
                <li>✓ Présentez-vous au lieu de cueillette à la date convenue</li>
              )}
              {orderData.deliveryMethod === 'delivery' && (
                <li>✓ Préparez-vous pour la livraison (Vendredi ou Samedi)</li>
              )}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Chargement...</p></div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
