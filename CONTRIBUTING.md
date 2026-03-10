# 🤝 Guide de Contribution – Pressé Naturel

## Comment contribuer?

Merci de votre intérêt pour Pressé Naturel! Ce projet est open-source et nous accueillons les contributions.

## 📋 Prérequis

- Node.js 18+
- npm ou yarn
- Git
- Connaissance de React/TypeScript (recommandé)

## 🚀 Processus de contribution

### 1. Fork et Clone

```bash
# Fork le repo sur GitHub
git clone https://github.com/YOUR-USERNAME/presse-naturel.git
cd presse-naturel
npm install
```

### 2. Créer une branche

```bash
# Toujours une branche pour chaque fonctionnalité
git checkout -b feature/ma-fonctionnalite
# ou
git checkout -b fix/mon-bug-fix
```

### 3. Faire les changements

- Respectez les style existant
- Testez localement: `npm run dev`
- Commites atomiques: `git commit -m "feat: ajouter nouvelle fonctionnalité"`

### 4. Push et Pull Request

```bash
git push origin feature/ma-fonctionnalite
```
Créer une Pull Request sur GitHub avec description claire.

## 📝 Conventions de code

### Nommage

- **Dossiers**: minuscule `components/`, `lib/`
- **Fichiers React**: PascalCase `Header.tsx`
- **Fichiers utils**: camelCase `utils.ts`
- **Variables**: camelCase `const userName = '...';`
- **Constantes**: UPPER_SNAKE_CASE `const MAX_SIZE = 100;`

### Formatage

```typescript
// ✅ BON
export default function ProductCard() {
  return <div>Contenu</div>;
}

// ❌ MAUVAIS
export default function productCard() {
  return <div>Contenu</div>;
}
```

### TypeScript

```typescript
// ✅ Typer les props
interface ProductCardProps {
  name: string;
  price: number;
}

function ProductCard({ name, price }: ProductCardProps) {
  return <div>{name} - {price}$</div>;
}

// ❌ Pas de typage
function ProductCard(props) {
  return <div>{props.name}</div>;
}
```

### Commentaires

```typescript
// Expliquer le POURQUOI, pas le QUOI

// ✅ BON
// On utilise debounce pour éviter trop d'appels API
const handleSearch = debounce((term) => searchProducts(term), 500);

// ❌ MAUVAIS
// La fonction searchProducts
const handleSearch = () => searchProducts();
```

## 🧪 Tests

```bash
# Linter (avant commit)
npm run lint

# Build test (avant PR)
npm run build

# Tests (quand dispos)
npm test
```

## 📂 Ajouter un nouveau produit

```typescript
// FICHIER: lib/products.ts

export const PRODUCTS: Product[] = [
  // ... produits existants ...
  {
    id: 'mon-nouveau-jus',
    name: 'Mon Nouveau Jus',
    category: 'jus',
    description: 'Description courte du jus',
    ingredients: ['Ingredient 1', 'Ingredient 2'],
    benefits: ['Bénéfice 1', 'Bénéfice 2'],
    createdAt: new Date().toISOString(),
  },
];
```

## 📄 Ajouter une nouvelle page

1. Créer le dossier: `mkdir -p app/nouvelle-page`
2. Créer le fichier: `touch app/nouvelle-page/page.tsx`
3. Écrire le contenu:

```typescript
// app/nouvelle-page/page.tsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NouvellePage() {
  return (
    <div className="min-h-screen bg-presse-white">
      <Header />
      
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-5xl font-bold text-presse-dark">
            Titre
          </h1>
          {/* Contenu */}
        </div>
      </section>

      <Footer />
    </div>
  );
}
```

4. Ajouter au menu dans `components/Header.tsx`

## 🎨 Respecter le design

- **Couleurs**: Voir `tailwind.config.js`
- **Fonts**: Poppins (titres), Inter (texte)
- **Spacing**: Utiliser classes Tailwind (`py-20`, `px-4`)
- **Responsive**: Mobile-first avec `md:`, `lg:`

## 🐛 Signaler un bug

1. Aller sur [GitHub Issues](https://github.com/pressenaturel/site/issues)
2. Cliquer "New Issue"
3. Décrire:
   - **Titre clair**: "Header n'affiche pas sur mobile"
   - **Description**: Reproduction steps
   - **Attendu vs Réel**: What should happen vs what happens
   - **Environment**: OS, browser, version

Exemple:

```
### Bug: Logo n'affiche pas sur mobile

**Description**: Le logo dans le header disparaît sur les écrans < 768px.

**Reproduction**:
1. Ouvrir le site sur mobile
2. Regarder la barre de navigation
3. Logo manquant

**Attendu**: Logo visible sur tous les écrans

**Environnement**:
- OS: iOS 17
- Browser: Safari
- Version du site: v1.0
```

## 💡 Proposer une fonctionnalité

1. Ouvrir une [GitHub Discussion](https://github.com/pressenaturel/site/discussions)
2. Décrire votre idée
3. Attendre feedback de la communauté

## ✅ Checklist avant Push

- [ ] Code formaté et clean
- [ ] Pas de console.logs
- [ ] Pas de variables inutilisées
- [ ] `npm run build` passe
- [ ] Testé sur mobile et desktop
- [ ] Typecheck sans erreurs

## 📚 Ressources utiles

- [Docs Next.js](https://nextjs.org/docs)
- [Docs Tailwind CSS](https://tailwindcss.com/docs)
- [React Design Patterns](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🎯 Objectifs du projet

✅ Site modern et rapide
✅ UX excellente
✅ Code maintenable
✅ Contributions bienvenues
✅ Croissance durable

## ❓ Questions?

- Ouvrir une [GitHub Discussion](https://github.com/pressenaturel/site/discussions)
- Email: dev@pressenaturel.ca
- WhatsApp: Lien WhatsApp

---

**Merci de contribuer à Pressé Naturel! 🙏**
