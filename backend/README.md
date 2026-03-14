# Pressé Naturel - Backend API

Backend Express + Prisma pour le site Pressé Naturel.

## Stack Technique

- **Express.js** - API REST
- **Prisma** - ORM pour PostgreSQL
- **TypeScript** - Typage statique
- **JWT** - Authentification
- **bcrypt** - Hash des mots de passe

## Installation locale

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env
# Puis modifier les valeurs dans .env

# Générer le client Prisma
npm run prisma:generate

# Lancer les migrations
npx prisma migrate dev

# Démarrer en développement
npm run dev
```

## Déploiement sur Railway

### 1. Créer un projet Railway

1. Aller sur [railway.app](https://railway.app)
2. Créer un nouveau projet
3. Ajouter un service PostgreSQL
4. Ajouter un service depuis GitHub (ce dossier backend)

### 2. Variables d'environnement Railway

Dans les settings du service backend, ajouter :

```
DATABASE_URL=<automatique avec le plugin PostgreSQL>
JWT_SECRET=<générer une clé sécurisée>
FRONTEND_URL=https://votre-site.vercel.app
ADMIN_EMAIL=admin@pressenaturel.com
ADMIN_PASSWORD=VotreMotDePasseSecurise!
```

### 3. Commandes de build Railway

- **Build Command:** `npm run build && npm run prisma:migrate`
- **Start Command:** `npm start`

## Endpoints API

### Auth (utilisateurs)
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil (auth required)
- `PUT /api/auth/me` - Modifier profil (auth required)

### Admin
- `POST /api/admin/login` - Connexion admin
- `GET /api/admin/me` - Vérifier session admin
- `GET /api/admin/stats` - Statistiques dashboard
- `GET /api/admin/orders` - Liste des commandes
- `PATCH /api/admin/orders/:id/status` - Modifier statut commande
- `POST /api/admin/products` - Créer produit
- `PUT /api/admin/products/:id` - Modifier produit
- `DELETE /api/admin/products/:id` - Supprimer produit

### Products (public)
- `GET /api/products` - Tous les produits
- `GET /api/products/:id` - Détail produit
- `GET /api/products/category/:category` - Par catégorie
- `GET /api/products/featured/all` - Incontournables

### Orders
- `POST /api/orders` - Créer une commande
- `GET /api/orders/:orderNumber` - Détail commande
- `GET /api/orders/user/history` - Historique (auth required)

## Structure

```
backend/
├── prisma/
│   └── schema.prisma    # Schéma de la DB
├── src/
│   ├── index.ts         # Point d'entrée
│   ├── seed.ts          # Données initiales
│   └── routes/
│       ├── auth.ts      # Auth utilisateurs
│       ├── admin.ts     # Routes admin
│       ├── products.ts  # Produits (public)
│       └── orders.ts    # Commandes
├── package.json
└── tsconfig.json
```
