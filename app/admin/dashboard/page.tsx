'use client';

import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useData } from '@/contexts/DataContext';
import { FiShoppingCart, FiDollarSign, FiClock, FiCheckCircle, FiTrendingUp, FiPackage } from 'react-icons/fi';
import Link from 'next/link';

export default function DashboardPage() {
  const { orders, products, getStats } = useData();
  const stats = getStats();

  const recentOrders = orders.slice(0, 5);

  const statusLabels: { [key: string]: { label: string; color: string } } = {
    pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
    confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-800' },
    ready: { label: 'Prête', color: 'bg-purple-100 text-purple-800' },
    completed: { label: 'Complétée', color: 'bg-green-100 text-green-800' },
    cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-800' },
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bienvenue dans votre espace d'administration</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Commandes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiShoppingCart className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">En cours</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <FiClock className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Complétées</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedOrders}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiCheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenus Totaux</p>
                <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-presse-green-light rounded-full flex items-center justify-center">
                <FiDollarSign className="text-presse-green" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-presse-green to-green-600 p-6 rounded-xl text-white">
            <div className="flex items-center gap-4">
              <FiTrendingUp size={40} />
              <div>
                <p className="text-green-100">Aujourd'hui</p>
                <p className="text-2xl font-bold">{stats.todayOrders} commandes</p>
                <p className="text-green-100">${stats.todayRevenue.toFixed(2)} de revenus</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-xl text-white">
            <div className="flex items-center gap-4">
              <FiPackage size={40} />
              <div>
                <p className="text-purple-100">Catalogue</p>
                <p className="text-2xl font-bold">{products.length} produits</p>
                <p className="text-purple-100">
                  {products.filter(p => p.category === 'jus').length} jus, {' '}
                  {products.filter(p => p.category === 'shot').length} shots, {' '}
                  {products.filter(p => p.category === 'pack').length} packs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Dernières commandes</h2>
            <Link href="/admin/commandes" className="text-presse-green hover:underline text-sm">
              Voir tout
            </Link>
          </div>
          
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Aucune commande pour le moment
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">#{order.id.slice(-6)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {order.customer.firstName} {order.customer.lastName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.product.name} ({order.size}) x{order.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusLabels[order.status].color}`}>
                          {statusLabels[order.status].label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('fr-CA')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/jus" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🍊</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Gérer les Jus</p>
              <p className="text-sm text-gray-500">{products.filter(p => p.category === 'jus').length} produits</p>
            </div>
          </Link>

          <Link href="/admin/shots" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Gérer les Shots</p>
              <p className="text-sm text-gray-500">{products.filter(p => p.category === 'shot').length} produits</p>
            </div>
          </Link>

          <Link href="/admin/packs" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Gérer les Packs</p>
              <p className="text-sm text-gray-500">{products.filter(p => p.category === 'pack').length} produits</p>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
