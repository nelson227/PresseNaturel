'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useData, Order } from '@/contexts/DataContext';
import { FiEye, FiX, FiClock, FiCheckCircle, FiPackage, FiTruck, FiXCircle } from 'react-icons/fi';
import { OrderStatus } from '@/lib/types';

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode; bgColor: string }> = {
  pending: { 
    label: 'En attente', 
    color: 'text-yellow-700', 
    bgColor: 'bg-yellow-100',
    icon: <FiClock size={16} /> 
  },
  confirmed: { 
    label: 'Confirmée', 
    color: 'text-blue-700', 
    bgColor: 'bg-blue-100',
    icon: <FiCheckCircle size={16} /> 
  },
  preparing: { 
    label: 'En préparation', 
    color: 'text-purple-700', 
    bgColor: 'bg-purple-100',
    icon: <FiPackage size={16} /> 
  },
  ready: { 
    label: 'Prête', 
    color: 'text-green-700', 
    bgColor: 'bg-green-100',
    icon: <FiTruck size={16} /> 
  },
  completed: { 
    label: 'Terminée', 
    color: 'text-gray-700', 
    bgColor: 'bg-gray-100',
    icon: <FiCheckCircle size={16} /> 
  },
  cancelled: { 
    label: 'Annulée', 
    color: 'text-red-700', 
    bgColor: 'bg-red-100',
    icon: <FiXCircle size={16} /> 
  },
};

const statusOrder: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready', 'completed'];

export default function AdminCommandesPage() {
  const { orders, updateOrderStatus } = useData();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === statusOrder.length - 1) return null;
    return statusOrder[currentIndex + 1];
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
            <p className="text-gray-600">Gérez et suivez toutes les commandes</p>
          </div>
          
          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filterStatus === 'all' 
                  ? 'bg-presse-green text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Toutes ({orders.length})
            </button>
            {(Object.keys(statusConfig) as OrderStatus[]).map((status) => {
              const count = orders.filter(o => o.status === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 ${
                    filterStatus === status 
                      ? `${statusConfig[status].bgColor} ${statusConfig[status].color}` 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {statusConfig[status].icon}
                  {statusConfig[status].label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Commande
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status];
                  const nextStatus = getNextStatus(order.status);
                  
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm text-gray-900">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.customer.firstName} {order.customer.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{order.customer.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-gray-900">{order.product.name}</p>
                          <p className="text-sm text-gray-500">{order.size} × {order.quantity}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-900">{order.totalPrice.toFixed(2)}€</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                          {status.icon}
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Voir les détails"
                          >
                            <FiEye size={18} />
                          </button>
                          {nextStatus && (
                            <button
                              onClick={() => handleStatusChange(order.id, nextStatus)}
                              className="px-3 py-1 text-xs bg-presse-green text-white rounded-lg hover:bg-presse-green/90 transition-colors"
                            >
                              → {statusConfig[nextStatus].label}
                            </button>
                          )}
                          {order.status !== 'cancelled' && order.status !== 'completed' && (
                            <button
                              onClick={() => handleStatusChange(order.id, 'cancelled')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Annuler"
                            >
                              <FiXCircle size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <FiPackage className="mx-auto text-5xl text-gray-300 mb-4" />
              <p className="text-gray-500">
                {filterStatus === 'all' 
                  ? 'Aucune commande pour le moment' 
                  : `Aucune commande ${statusConfig[filterStatus].label.toLowerCase()}`}
              </p>
            </div>
          )}
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Commande #{selectedOrder.id.slice(0, 8).toUpperCase()}
                  </h2>
                  <p className="text-sm text-gray-500">{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Status */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Statut</h3>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(statusConfig) as OrderStatus[]).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(selectedOrder.id, status)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                          selectedOrder.status === status 
                            ? `${statusConfig[status].bgColor} ${statusConfig[status].color} ring-2 ring-offset-2` 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {statusConfig[status].icon}
                        {statusConfig[status].label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Informations Client</h3>
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Nom</p>
                      <p className="font-medium">{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Téléphone</p>
                      <p className="font-medium">{selectedOrder.customer.phone}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium">{selectedOrder.customer.email}</p>
                    </div>
                    {selectedOrder.customer.address && (
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Adresse</p>
                        <p className="font-medium">
                          {selectedOrder.customer.address}
                          {selectedOrder.customer.city && `, ${selectedOrder.customer.city}`}
                          {selectedOrder.customer.postalCode && ` ${selectedOrder.customer.postalCode}`}
                        </p>
                      </div>
                    )}
                    {selectedOrder.notes && (
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Notes</p>
                        <p className="font-medium">{selectedOrder.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Details */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Détails de la commande</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{selectedOrder.product.name}</p>
                        <p className="text-sm text-gray-500">{selectedOrder.size}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Qté: {selectedOrder.quantity}</p>
                      </div>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Mode de livraison</p>
                        <p className="font-medium">{selectedOrder.deliveryMethod === 'pickup' ? 'Retrait sur place' : 'Livraison'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Paiement</p>
                        <p className="font-medium">{selectedOrder.paymentMethod === 'interac' ? 'Interac' : 'Espèces'}</p>
                      </div>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                      <p className="font-semibold text-lg">Total</p>
                      <p className="font-bold text-xl text-presse-green">{selectedOrder.totalPrice.toFixed(2)}€</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
