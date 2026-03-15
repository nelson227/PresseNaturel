'use client';

import React, { useRef, useState } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';

interface ImageUploadProps {
  value?: string;
  onChange: (base64: string | undefined) => void;
  maxSizeMB?: number;
}

export default function ImageUpload({ value, onChange, maxSizeMB = 10 }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    setError(null);

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Le fichier doit être une image (JPG, PNG, GIF, etc.)');
      return;
    }

    // Vérifier la taille (max 10MB par défaut)
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`L'image ne doit pas dépasser ${maxSizeMB}Mo`);
      return;
    }

    // Convertir en base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onChange(base64);
    };
    reader.onerror = () => {
      setError('Erreur lors de la lecture du fichier');
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = () => {
    onChange(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Photo du produit
      </label>

      {value ? (
        // Aperçu de l'image
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
          <img
            src={value}
            alt="Aperçu"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>
      ) : (
        // Zone d'upload
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            w-full aspect-video rounded-lg border-2 border-dashed cursor-pointer
            flex flex-col items-center justify-center gap-3 transition-colors
            ${isDragging 
              ? 'border-presse-green bg-presse-green/10' 
              : 'border-gray-300 bg-gray-50 hover:border-presse-green hover:bg-presse-green/5'
            }
          `}
        >
          <div className={`p-3 rounded-full ${isDragging ? 'bg-presse-green/20' : 'bg-gray-200'}`}>
            <FiImage className={`w-8 h-8 ${isDragging ? 'text-presse-green' : 'text-gray-400'}`} />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              Cliquez ou glissez une image
            </p>
            <p className="text-xs text-gray-500">
              JPG, PNG, GIF • Max {maxSizeMB}Mo
            </p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <FiX size={14} />
          {error}
        </p>
      )}
    </div>
  );
}
