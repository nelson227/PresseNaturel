# PROJECT STRUCTURE – Pressé Naturel

```
presse-naturel/
├── .github/
│   └── workflows/
│       └── deploy.yml                # CI/CD avec GitHub Actions & Vercel
│
├── app/                              # Pages et layouts (Next.js 14 App Router)
│   ├── page.tsx                      # 📍 Page d'accueil
│   ├── layout.tsx                    # Layout principal + metadata
│   ├── globals.css                   # Styles globaux
│   │
│   ├── jus/
│   │   └── page.tsx                  # 📍 Catalogue des jus
│   │
│   ├── shots/
│   │   └── page.tsx                  # 📍 Catalogue des shots santé
│   │
│   ├── [category]/
│   │   └── [slug]/
│   │       └── page.tsx              # 📍 Détail d'un produit
│   │
│   ├── commander/
│   │   └── page.tsx                  # 📍 Page de commande
│   │
│   ├── apropos/
│   │   └── page.tsx                  # 📍 À propos
│   │
│   ├── avis/
│   │   └── page.tsx                  # 📍 Avis clients
│   │
│   └── contact/
│       └── page.tsx                  # 📍 Page de contact
│
├── components/                       # Composants réutilisables
│   ├── Header.tsx                    # 🔝 Barre de navigation
│   ├── Footer.tsx                    # 🔻 Pied de page
│   ├── ProductCard.tsx               # Cartes produits
│   ├── Button.tsx                    # Boutons réutilisables
│   ├── Feature.tsx                   # Bloc de fonctionnalité
│   └── Testimonial.tsx               # Avis clients
│
├── lib/                              # Utilitaires et logique métier
│   ├── types.ts                      # Types TypeScript (Product, Order, etc.)
│   ├── products.ts                   # 📝 BASE DE DONNÉES DES PRODUITS
│   ├── constants.ts                  # Configuration globale
│   ├── utils.ts                      # Fonctions utilities
│   ├── api-examples.ts               # Exemples d'API routes (futur)
│   └── supabase.ts (optionnel)       # Client Supabase
│
├── public/                           # Fichiers statiques (images, logos)
│   ├── logos/
│   │   ├── logo.png                  # Logo principal
│   │   ├── logo.webp                 # Format optimisé
│   │   ├── logo-favicon.ico          # Favicon navigateur
│   │   └── logo-full.png             # Haute résolution
│   │
│   └── images/
│       ├── jus-1.jpg                 # Images produits (futur)
│       ├── hero-bg.jpg               # Image hero
│       └── ...
│
├── scripts/                          # Scripts d'automatisation
│   ├── setup.sh                      # Installation (Mac/Linux)
│   └── setup.bat                     # Installation (Windows)
│
├── .env.example                      # Variables d'environnement (template)
├── .env.local (à créer)              # Variables d'environnement (local)
├── .gitignore                        # Fichiers ignorés par Git
│
├── package.json                      # Dépendances Node.js
├── tsconfig.json                     # Configuration TypeScript
├── tailwind.config.js                # Configuration Tailwind CSS
├── postcss.config.js                 # Configuration PostCSS
├── next.config.js                    # Configuration Next.js
├── next.config.advanced.js           # Configuration avancée (optionnel)
│
├── README.md                         # 📖 Documentation principale
├── QUICKSTART.md                     # 🚀 Guide de démarrage rapide
├── LOGO_GUIDE.md                     # 🎨 Guide du logo
└── DEPLOYMENT_CHECKLIST.md           # ✅ Checklist déploiement

```

## 📊 Hiérarchie des dossiers principaux

### `/app` – Pages (Next.js App Router)
Chaque dossier = une route URL
- `/app/page.tsx` → `/`
- `/app/jus/page.tsx` → `/jus`
- `/app/commander/page.tsx` → `/commander`

### `/components` – Éléments réutilisables
Composants React importés dans les pages
- `Header.tsx` – Navigation
- `ProductCard.tsx` – Affichage produits
- `Button.tsx` – Boutons personnalisés

### `/lib` – Logique métier
Données, types, utilitaires
- **products.ts** ← MODIFIER ICI POUR AJOUTER/CHANGER PRODUITS
- **types.ts** ← Types TypeScript
- **constants.ts** ← Configuration

### `/public` – Fichiers statiques
Logos, images, icônes
- Tous les fichiers ici sont accessibles sur le site

## 🔄 Flux de données

```
Utilisateur
    ↓
Header (Navigation)
    ↓
Page (jus/shots/accueil/etc)
    ↓
Composants (ProductCard, Testimonial, etc)
    ↓
lib/products.ts (Données)
    ↓ (Futur: Base de données)
Supabase / PostgreSQL
```

## 🚀 Commandes principales

```bash
# Développement
npm run dev                # Lancer serveur (port 3000)

# Production
npm run build              # Compiler pour production
npm start                  # Lancer serveur compilé

# Maintenance
npm run lint              # Vérifier la qualité du code
npm install              # Installer dépendances
```

## 📌 Points d'entrée importants

**Pour modifier...**
- ✏️ **Les produits**: `lib/products.ts`
- ✏️ **Les prix**: Dans `getPrices()` dans `lib/products.ts`
- ✏️ **Le contenu des pages**: Pages dans `app/`
- ✏️ **Les couleurs/fonts**: `tailwind.config.js`
- ✏️ **Le menu**: `components/Header.tsx` → `navLinks`
- ✏️ **Le logo**: Importer depuis `public/logos/`

---

**Cette structure est clean, scalable et suit les standards Next.js 14! 🎉**
