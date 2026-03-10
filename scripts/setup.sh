#!/bin/bash
# Script d'installation pour Pressé Naturel

echo "🚀 Installation de Pressé Naturel..."
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 18+ depuis nodejs.org"
    exit 1
fi

echo "✅ Node.js détecté: $(node --version)"
echo ""

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Créer les fichiers d'environnement
if [ ! -f .env.local ]; then
    echo "📝 Création du fichier .env.local..."
    cp .env.example .env.local
    echo "   ⚠️  N'oubliez pas de configurer .env.local"
fi

# Créer les dossiers nécessaires
mkdir -p public/images
mkdir -p public/logos

echo ""
echo "✅ Installation terminée!"
echo ""
echo "🎯 Prochaines étapes:"
echo "1. Configurez les variables d'environnement dans .env.local"
echo "2. Lancez le serveur: npm run dev"
echo "3. Ouvrez http://localhost:3000"
echo ""
echo "📚 Documentation: voir README.md"
