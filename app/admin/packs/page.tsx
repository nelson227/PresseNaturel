'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useData } from '@/contexts/DataContext';
import ImageUpload from '@/components/ImageUpload';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiPackage } from 'react-icons/fi';
import { Product } from '@/lib/types';

export default function AdminPacksPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const packs = products.filter(p => p.category === 'pack');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contents: '',
    benefits: '',
    packPrice: 22,
    image: null as string | null,
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      contents: '',
      benefits: '',
      packPrice: 22,
      image: null,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      contents: product.ingredients.join(', '),
      benefits: product.benefits.join(', '),
      packPrice: product.packPrice || 22,
      image: product.image || null,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      description: formData.description,
      ingredients: formData.contents.split(',').map(i => i.trim()).filter(i => i),
      benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b),
      category: 'pack' as const,
      packPrice: formData.packPrice,
      image: formData.image,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      deleteProduct(id);
    }
  };

  const getPackEmoji = (name: string) => {
    if (name.toLowerCase().includes('découverte')) return '🌟';
    if (name.toLowerCase().includes('énergie')) return '⚡';
    if (name.toLowerCase().includes('detox')) return '🍃';
    return '📦';
  };

  const getPackGradient = (name: string) => {
    if (name.toLowerCase().includes('découverte')) return 'from-purple-100 to-pink-100';
    if (name.toLowerCase().includes('énergie')) return 'from-orange-100 to-yellow-100';
    if (name.toLowerCase().includes('detox')) return 'from-green-100 to-teal-100';
    return 'from-gray-100 to-blue-100';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nos Packs</h1>
            <p className="text-gray-600">Gérez les packs découverte, énergie et detox</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-presse-green text-white rounded-lg hover:bg-presse-green/90 transition-colors"
          >
            <FiPlus size={20} />
            Ajouter un pack
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packs.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className={`aspect-video bg-gradient-to-br ${getPackGradient(product.name)} flex items-center justify-center relative`}>
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl">{getPackEmoji(product.name)}</span>
                )}
                <span className="absolute top-2 right-2 bg-presse-green text-white text-sm font-bold px-3 py-1 rounded-full">
                  {product.packPrice || 22}$
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">CONTENU DU PACK</p>
                  <div className="flex flex-wrap gap-1">
                    {product.ingredients.map((item, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">BIENFAITS</p>
                  <div className="flex flex-wrap gap-1">
                    {product.benefits.map((ben, idx) => (
                      <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {ben}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => openEditModal(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <FiEdit2 size={16} />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="flex items-center justify-center px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {packs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <FiPackage className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500">Aucun pack pour le moment</p>
            <button
              onClick={openAddModal}
              className="mt-4 text-presse-green hover:underline"
            >
              Ajouter votre premier pack
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingProduct ? 'Modifier le pack' : 'Ajouter un pack'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <FiX size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <ImageUpload
                  value={formData.image}
                  onChange={(image) => setFormData({ ...formData, image })}
                  maxSizeMB={10}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du pack *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-presse-green focus:border-transparent"
                    placeholder="Ex: Pack Découverte"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-presse-green focus:border-transparent"
                    placeholder="Description du pack..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contenu du pack * (séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    value={formData.contents}
                    onChange={(e) => setFormData({ ...formData, contents: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-presse-green focus:border-transparent"
                    placeholder="Ex: 3 Jus (350ml), 2 Shots (60ml)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bienfaits * (séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-presse-green focus:border-transparent"
                    placeholder="Ex: Découverte, Variété, Économique"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix du pack ($) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={formData.packPrice}
                    onChange={(e) => setFormData({ ...formData, packPrice: parseFloat(e.target.value) })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-presse-green focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-presse-green text-white rounded-lg hover:bg-presse-green/90 transition-colors"
                  >
                    <FiSave size={18} />
                    {editingProduct ? 'Enregistrer' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
