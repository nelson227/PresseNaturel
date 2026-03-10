# 🏗️ Architecture – Pressé Naturel

## Vue d'ensemble

```
┌─────────────────────────────────────────┐
│        Navigateur Utilisateur           │
│  (Desktop, Tablet, Mobile)              │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│           Next.js Frontend              │
│  • React Components                     │
│  • Tailwind CSS Styling                 │
│  • Client-side State (localStorage)     │
└────────────────┬────────────────────────┘
                 │
                 ├──────────────────┐
                 ↓                  ↓
    ┌──────────────────┐  ┌──────────────────┐
    │  Static Content  │  │  API Routes      │
    │                  │  │  (Futur)         │
    │ • Pages          │  │ • /api/orders    │
    │ • Produits       │  │ • /api/reviews   │
    │ • Avis           │  │ • /api/contact   │
    └──────────────────┘  └────────┬─────────┘
                                   │
                                   ↓
                          ┌─────────────────┐
                          │  Base de Données│
                          │  (Supabase)     │
                          │  (PostgreSQL)   │
                          └─────────────────┘
```

## Couches de l'architecture

### 1. Présentation (Frontend)

**Lieu**: `/app`, `/components`

```
Header (Barre de nav)
    ↓
Page Content
    ↓
ProductCard, Testimonial, Button (Composants)
    ↓
Footer
```

**Technos**:
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion (animations)

### 2. Logique métier (Business Logic)

**Lieu**: `/lib`

```
Products Catalog (products.ts)
    ↓
Type Definitions (types.ts)
    ↓
Utilities (utils.ts)
    ↓
Constants (constants.ts)
```

### 3. Persistance (Data Layer)

**Actuel**: localStorage (client-side)
**Futur**: Supabase + PostgreSQL

**Données stockées**:
- Produits ✅ (statique)
- Commandes 🔄 (futur: BD)
- Avis clients 🔄 (futur: BD)
- Messages contact 🔄 (futur: BD)

## Flux de données

```
┌────────────────────────────────────────┐
│     Product Listing Page (/jus)        │
└────────────────┬───────────────────────┘
                 │
                 ↓
        ┌────────────────────┐
        │ Import PRODUCTS    │
        │ from products.ts   │
        └────────┬───────────┘
                 │
                 ↓
        ┌────────────────────┐
        │  Map over Products │
        └────────┬───────────┘
                 │
                 ↓
    ┌────────────────────────────┐
    │  Render ProductCard for    │
    │  each product              │
    └────────┬───────────────────┘
             │
             ↓
    ┌────────────────────────────┐
    │  Display in Grid Layout    │
    │  with Tailwind CSS         │
    └────────────────────────────┘
```

## Modèles de données

```typescript
// TypeScript Types (lib/types.ts)

interface Product {
  id: string;
  name: string;
  category: 'jus' | 'shot';
  description: string;
  ingredients: string[];
  benefits: string[];
  createdAt: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'ready' | 'completed';
  createdAt: string;
}

interface Review {
  productId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  authorName: string;
  createdAt: string;
}
```

## Patterns utilisés

### 1. Client Components ('use client')

```typescript
// Pour les composants interactifs
'use client';

export default function ProductCard() {
  const [quantity, setQuantity] = useState(1);
  // ...
}
```

### 2. Server Components (Par défaut)

```typescript
// Pour le contenu statique
export default function HomePage() {
  const products = PRODUCTS;
  return <ProductCard product={products[0]} />;
}
```

### 3. Props Drilling Minimal

Utiliser des composants parents pour passer les données:

```typescript
// Bon
<ProductCard product={product} />

// Éviter
<Header products={products} />
```

## Performance

### Images optimisées

```typescript
// ✅ Utiliser next/image
<Image
  src="/logo.png"
  alt="Logo"
  width={80}
  height={80}
  priority // Pour hero images
/>
```

### Lazy Loading

```typescript
// ✅ Charger les images au besoin
<Image
  src="/product.jpg"
  alt="Product"
  loading="lazy"
/>
```

### Code Splitting

Next.js 14 fait ça automatiquement:
- Chaque page = code chunk séparé
- Imports dynamiques pour gros composants

## Sécurité

### Variables sensibles

```env
# ✅ BON - Dans .env.local
NEXT_PUBLIC_CONTACT_EMAIL=contact@pressenaturel.ca

# ❌ MAUVAIS - En HTML/Code
<a href="mailto:contact@pressenaturel.ca">
```

### Validation des formulaires

```typescript
// ✅ Valider avant d'envoyer
if (!isValidEmail(email)) {
  return error('Email invalide');
}

// Futur: Zod ou autres
```

## Mise à l'échelle (Scaling)

### Étape 1: Aujourd'hui
- Site statique avec localStorage
- Données en mémoire (products.ts)

### Étape 2: Prochains mois
- Intégrer Supabase/PostgreSQL
- Ajouter API routes `/api/orders`, `/api/reviews`
- Dashboard admin simple

### Étape 3: Long terme
- Cache Redis pour produits populaires
- CDN global (Vercel Edge Network)
- Micro-services si nécessaire
- Mobile app native

## Déploiement

```
Git Push
    ↓
GitHub Actions (tests, build)
    ↓
Vercel (déploiement auto)
    ↓
CDN Global (distribution)
    ↓
Production Live
```

## Monitoring

```
Vercel Analytics
    ↓ (Performance metrics)
    ↓
Sentry (Error tracking)
    ↓ (Futur)
    ↓
Google Analytics (User behavior)
```

---

**Architecture pensée pour évolutivité et performance!** 🚀
