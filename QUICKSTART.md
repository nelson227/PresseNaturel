# 📖 Guide Complet – Pressé Naturel

## Table des matières
1. [Installation locale](#installation-locale)
2. [Déploiement facile](#déploiement-facile)
3. [Gestion des produits](#gestion-des-produits)
4. [Système de commande](#système-de-commande)
5. [Avis clients](#avis-clients)
6. [Personnalisation](#personnalisation)
7. [Dépannage](#dépannage)

---

## Installation locale

### Étape 1: Préparation
```bash
# Windows: Exécuter setup.bat
# Mac/Linux: chmod +x scripts/setup.sh && ./scripts/setup.sh
```

### Étape 2: Configuration
Créer un fichier `.env.local`:
```env
NEXT_PUBLIC_CONTACT_EMAIL=contact@pressenaturel.ca
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
NEXT_PUBLIC_INSTAGRAM_USERNAME=pressenaturel
```

### Étape 3: Lancer
```bash
npm run dev
```
✅ Site live à `http://localhost:3000`

---

## 🚀 Déploiement facile

### Option 1: Vercel (RECOMMANDÉ - 1 minute)

1. **Créer un compte**: vercel.com (gratuit)
2. **Connecter GitHub**: 
   - Créer repo GitHub si nécessaire
   - Pousser le code: `git push`
3. **Deploy**:
   - Aller sur vercel.com/import
   - Sélectionner le repo
   - Cliquer "Deploy" ✅
4. **Domaine**:
   - Domaine gratuit temporaire

### Option 2: Netlify (Alternative)

```bash
npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=.next
```

### Option 3: VPS Personnel (Avancé)

```bash
# Sur votre serveur
npm run build
npm start &
```

---

## 🛒 Gestion des produits

### Ajouter un nouveau produit

Éditer `lib/products.ts`:

```typescript
{
  id: 'mon-jus',
  name: 'Mon Jus',
  category: 'jus',
  description: 'Description du jus',
  ingredients: ['Ingrédient 1', 'Ingrédient 2'],
  benefits: ['Bénéfice 1', 'Bénéfice 2'],
  createdAt: new Date().toISOString(),
}
```

### Modifier un prix

Vous pouvez changer les prix directement dans `lib/products.ts`:

```typescript
const PRICES: PriceBySize = {
  '350ml': 6,    // Modifier ici
  '500ml': 7,    // Modifier ici
};
```

### Modifier la description d'un produit

Trouvez le produit dans `lib/products.ts` et modifiez la propriété `description`.

---

## 📝 Système de commande

### Comment ça marche?

1. **Client sélectionne** → Produit, taille, quantité
2. **Système calcule** → Prix total
3. **Client confirme** → Mode réception, paiement
4. **Message envoyé** → Confirmation affichée

### Données des commandes

Les commandes sont sauvegardées en **localStorage** (client-side) par défaut.

**Pour une vraie base de données**, intégrez **Supabase**:

```bash
npm install @supabase/supabase-js
```

Puis modifier `lib/supabase.ts` (à créer):

```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

---

## ⭐ Avis clients

### Fonctionnement actuel

- Les avis sont **stockés en localStorage**
- Démo avec 4 avis par défaut
- Format: nom, note (1-5), commentaire

### Intégrer une vraie base de données

Remplacez localStorage par Supabase ou autre BD:

```typescript
// Avant: localStorage
const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');

// Après: Supabase
const { data: reviews } = await supabase
  .from('reviews')
  .select('*')
  .order('created_at', { ascending: false });
```

---

## 🎨 Personnalisation

### Modifier les couleurs

Éditer `tailwind.config.js`:

```javascript
colors: {
  'presse-green': '#3A8F5B',  // Votre couleur ici
  'presse-beige': '#F7F5F2',
}
```

### Modifier les polices

Éditer `app/layout.tsx`:

```tsx
<link 
  href="https://fonts.googleapis.com/css2?family=VotrePolice:wght@400;700" 
  rel="stylesheet" 
/>
```

### Personnaliser le contenu

- **Page d'accueil**: `app/page.tsx`
- **À propos**: `app/apropos/page.tsx`
- **Contact**: `app/contact/page.tsx`

### Ajouter une nouvelle page

1. Créer dossier: `app/ma-page`
2. Créer fichier: `app/ma-page/page.tsx`
3. Ajouter au menu: `components/Header.tsx`

Exemple:
```tsx
// app/ma-page/page.tsx
export default function MonPage() {
  return (
    <div>
      <Header />
      <section>
        <h1>Ma Page</h1>
      </section>
      <Footer />
    </div>
  );
}
```

---

## 🔧 Dépannage

### Problème: Port 3000 déjà utilisé
```bash
# Windows
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill

# Mac
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Linux
sudo lsof -i :3000
```

### Problème: node_modules corrompu
```bash
rm -rf node_modules
npm install
```

### Problème: Build échoue
```bash
npm run build --verbose
```

### Problème: Styles non appliqués
```bash
# Vérifier que Tailwind est dans globals.css:
# @import 'tailwindcss/base';
# @import 'tailwindcss/components';
# @import 'tailwindcss/utilities';
```

---

## 📈 Statistiques & Analytics (Futur)

Intégrer Google Analytics:

```tsx
// app/layout.tsx
<script async src={`https://www.googletagmanager.com/gtag/js?id=GA_ID`} />
<script dangerouslySetInnerHTML={{__html: `...`}} />
```

---

## 💾 Backup & Version Control

```bash
# Sauvegarder
git add .
git commit -m "Mise à jour du site"
git push

# Restaurer version précédente
git revert <commit-hash>
```

---

## 📧 Support & Questions

- Email: contact@pressenaturel.ca
- Whatsapp: [Lien]
- Documentation: README.md
- Guide du logo: LOGO_GUIDE.md

---

**Site créé avec ❤️ pour Pressé Naturel**
