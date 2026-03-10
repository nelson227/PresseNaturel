# Guide du Logo – Pressé Naturel

## 📸 Logo Actuel

Vous avez un fichier logo en JPG: `pressé naturel.jpg`

## 🔧 Optimisation du Logo

### Format recommandé: PNG transparent

Le JPG n'est pas idéal pour un logo car il n'a pas de transparence.

**Actions recommandées:**

1. **Convertir en PNG** (gratuit):
   - Utilisez un outil comme CloudConvert ou Online-Convert
   - Assurez-vous que le fond soit transparent

2. **Redimensionner**:
   - Toujours utiliser une image haute résolution comme source
   - Faire plusieurs versions:
     - **Favicon (16x16, 32x32)** – Pour l'onglet du navigateur
     - **Header (80x80, 200x200)** – Pour la navigation
     - **Social (1200x1200)** – Pour partages sociaux
     - **Full (2000x2000)** – Archive haute résolution

3. **Optimisation**:
   - Compression PNG: TinyPNG.com
   - Générer format WebP pour plus de performance

### Structure de dossiers

```
public/
├── logos/
│   ├── logo.png                    # Logo principal (transprent)
│   ├── logo-compressed.png         # Compressé pour web
│   ├── logo.webp                   # Format WebP optimisé
│   ├── logo-favicon.ico            # Favicon navigateur
│   ├── logo-square.png             # Version carrée
│   └── logo-full.png               # Version haute résolution
├── images/
│   ├── jus-1.jpg                   # Images produits
│   ├── hero-bg.jpg                 # Image hero
│   └── ...
└── favicon.ico
```

### Intégration dans le site

**En-tête (Header.tsx)**:
```tsx
<Image 
  src="/logos/logo.png" 
  alt="Pressé Naturel" 
  width={80} 
  height={80}
/>
```

**Favicon**:
```tsx
// app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  icons: '/favicon.ico',
};
```

## 🎨 Paramètres de Logo

- **Couleur primaire**: #3A8F5B (vert naturel)
- **Couleur alternative**: #CFE8D5 (vert pâle)
- **Police**: Poppins / Playfair Display
- **Style**: Minimaliste, naturel, moderne

## 📝 Outils recommandés

### Gratuits:
- **Convertir**: CloudConvert.com, Online-Convert.com
- **Compresser**: TinyPNG.com, Compressor.io
- **Redimensionner**: Pixlr.com, Photopea.com
- **Favicon**: Favicon-Generator.org

### Payants (meilleur qualité):
- **Adobe Photoshop** – Édition professionnelle
- **Affinity Photo** – Alternative à Photoshop

## ✅ Checklist

- [ ] Logo converti en PNG transparent
- [ ] Logo compressé et optimisé
- [ ] Favicon généré (16x16, 32x32)
- [ ] Format WebP créé
- [ ] Logo intégré dans Header.tsx
- [ ] Favicon configuré dans layout.tsx
- [ ] Tous fichiers dans `/public/logos`

## 🚀 Déploiement

Assurez-vous que tous les fichiers de logo sont dans le dossier `/public/` pour qu'ils se déploient correctement.

**Vercel**: Les fichiers dans `/public` sont automatiquement optimisés et envoyés au CDN.

---

Besoin d'aide? Utilisez les outils gratuits listés ci-dessus ou demandez à ChatGPT comment redimensionner/convertir le logo!
