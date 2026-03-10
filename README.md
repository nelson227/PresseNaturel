# Pressé Naturel – Site Web

Un site web moderne et professionnel pour **Pressé Naturel**, une marque de jus naturels frais à Montréal.

## 🚀 Fonctionnalités

✅ **Vitrine digitale complète** avec catalogue de 10 jus et 4 shots santé
✅ **Système de commande intégré** avec personnalisation
✅ **Avis clients** publique et modérés
✅ **Page À propos** racontant l'histoire de la marque
✅ **Formulaire de contact**
✅ **Design minimaliste et moderne** inspiré des marques bio
✅ **Responsive design** (mobile-first)
✅ **SEO optimisé**
✅ **Performance optimale**

## 🛠️ Stack Technologique

- **Next.js 14** – Framework React moderne
- **TypeScript** – Sécurité des types
- **Tailwind CSS** – Styling utilitaire
- **Framer Motion** – Animations fluides
- **React Hook Form** – Gestion des formulaires
- **React Icons** – Icônes modernes

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation locale

```bash
# 1. Cloner le projet
cd "Pressé Naturel"

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev

# 4. Accéder au site
# Ouvrir http://localhost:3000 dans votre navigateur
```

## 📁 Structure du Projet

```
presse_naturel/
├── app/                    # Pages et layouts (Next.js App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── jus/               # Catalogue des jus
│   ├── shots/             # Catalogue des shots santé
│   ├── commander/         # Page de commande
│   ├── apropos/           # À propos
│   ├── avis/              # Avis clients
│   ├── contact/           # Contact
│   ├── layout.tsx         # Layout principal
│   └── globals.css        # Styles globaux
├── components/            # Composants réutilisables
│   ├── Header.tsx         # Barre de navigation
│   ├── Footer.tsx         # Pied de page
│   ├── ProductCard.tsx    # Cartes produits
│   ├── Button.tsx         # Boutons
│   ├── Feature.tsx        # Bloc de fonctionnalité
│   └── Testimonial.tsx    # Avis clients
├── lib/                   # Utilitaires et configuration
│   ├── types.ts           # Types TypeScript
│   └── products.ts        # Données des produits
├── public/                # Fichiers statiques
│   └── logo.jpg           # Logo de l'entreprise
├── package.json           # Dépendances
├── tailwind.config.js     # Config Tailwind
├── tsconfig.json          # Config TypeScript
└── next.config.js         # Config Next.js
```

## 🎨 Palette Couleurs

- **Blanc (#FFFFFF)** – Pureté, fraîcheur
- **Vert pâle (#CFE8D5)** – Nature, santé
- **Vert naturel (#3A8F5B)** – Accent principal
- **Beige clair (#F7F5F2)** – Fond secondaire
- **Noir (#1a1a1a)** – Texte et accents

## 🔤 Typographie

- **Titres** : Playfair Display / Poppins (700 bold)
- **Texte courant** : Inter / Open Sans (400)

## 📱 Pages du Site

### 1. **Accueil** (`/`)
- Hero section attirante
- Présentation rapide
- 4 produits favoris
- Section "Pourquoi choisir Pressé Naturel"
- Témoignages clients
- CTA décision

### 2. **Nos Jus** (`/jus`)
- Catalogue complet des 10 jus
- Détail des ingrédients et bienfaits
- Accès rapide aux commandes

### 3. **Shots Santé** (`/shots`)
- 4 shots santé disponibles
- Informations nutritionnelles et usages

### 4. **Détail Produit** (`/[category]/[slug]`)
- Image haute résolution
- Description détaillée
- Liste des ingrédients
- Bienfaits
- Bouton de commande

### 5. **Commander** (`/commander`)
- Sélection du produit
- Choix de la taille (350ml/500ml)
- Sélection de la quantité
- Personnalisation (notes spéciales)
- Mode de réception (cueillette/livraison)
- Mode de paiement (Interac/comptant)
- Résumé du panier

### 6. **À Propos** (`/apropos`)
- Histoire de la marque
- Vision et mission
- Valeurs principales

### 7. **Avis Clients** (`/avis`)
- Formulaire de nouvel avis
- Affichage des avis existants
- Système de notation (1-5 étoiles)

### 8. **Contact** (`/contact`)
- Formulaire de contact
- Informations de localisation
- WhatsApp
- Email
- Instagram
- Horaires de commande

## 🔧 Déploiement

### Déploiement sur Vercel (Recommandé)

```bash
# 1. Initialiser un repo Git
git init
git add .
git commit -m "Initial commit"

# 2. Pousser sur GitHub
git remote add origin <votre-repo-url>
git push -u origin main

# 3. Connecter à Vercel
# Allez sur vercel.com, connectez votre compte GitHub
# Sélectionnez ce repo et déployez en 1 clic!
```

### Déploiement sur autre serveur

```bash
# Build pour production
npm run build

# Lancer le serveur
npm start
```

## 🛒 Intégrations Futures

- [ ] Base de données (Supabase/PostgreSQL)
- [ ] Système d'authentification utilisateur
- [ ] Paiement en ligne (Stripe/Square)
- [ ] Gestion d'inventaire
- [ ] Dashboard admin
- [ ] Push notifications
- [ ] Analytics

## 📧 Support

Pour toute question ou suggestion:
- Email: contact@pressenaturel.ca
- WhatsApp: [Lien WhatsApp]
- Instagram: @pressenaturel

## 📄 Licence

Tous droits réservés © 2026 Pressé Naturel

---

**Site créé avec ❤️ pour Pressé Naturel**
