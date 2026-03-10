# 📋 Checklist Déploiement – Pressé Naturel

## ✅ Avant le lancement

### Frontend
- [ ] Logo optimisé et intégré
- [ ] Toutes les images optimisées (WebP, compressées)
- [ ] URLs des réseaux sociaux à jour
- [ ] Email de contact valide
- [ ] Numéro WhatsApp correct
- [ ] Adresse physique à jour
- [ ] Horaires de commande corrects

### Contenu
- [ ] Prix à jour dans `lib/products.ts`
- [ ] Description des produits validée
- [ ] Ingédients exacts listés
- [ ] Photos produits légales/authentiques
- [ ] Témoignages clients réels

### Performance
- [ ] Site teste en production (`npm run build`)
- [ ] Lighthouse score > 90
- [ ] Mobile responsive testé
- [ ] Lenteur réseau testée
- [ ] Cache et CDN configurés

### Sécurité
- [ ] Variables d'environnement sensibles en `.env.local`
- [ ] Pas de secrets en Git
- [ ] HTTPS activé
- [ ] Headers de sécurité configurés

### SEO
- [ ] Meta descriptions précises
- [ ] Keywords pertinents
- [ ] sitemap.xml généré
- [ ] robots.txt configuré
- [ ] Open Graph tags (partages réseaux)

## 🚀 Déploiement

### Étape 1: Git
```bash
git init
git add .
git commit -m "Pressé Naturel v1.0"
git remote add origin https://github.com/username/presse-naturel
git push -u origin main
```

### Étape 2: Vercel
1. Aller sur vercel.com
2. "Import Project"
3. Sélectionner le repo GitHub
4. Configurer les env vars
5. Cliquer "Deploy"

### Étape 3: Domaine
- [ ] Commander domaine (GoDaddy, Namecheap, etc.)
- [ ] Configurer DNS chez Vercel
- [ ] Attendre propagation DNS (24-48h)

### Étape 4: Monitoring
- [ ] Erreurs de produit surveillées (Sentry)
- [ ] Analytics configurés (Google Analytics)
- [ ] Uptime monitoring (UptimeRobot)

## 📊 Post-Lancement

### Semaine 1
- [ ] Tests en production
- [ ] Fixes des bugs découverts
- [ ] Feedback utilisateurs collecté
- [ ] Avis clients commencent

### Mois 1
- [ ] Analytics analysés
- [ ] Optimisations SEO appliquées
- [ ] Base de données intégrée (si nécessaire)
- [ ] Système d'email mis en place

### Mois 3+
- [ ] Intégration paiement en ligne
- [ ] Dashboard admin développé
- [ ] Automatisation des emails

## 🔗 Ressources utiles

### Domaines
- GoDaddy: godaddy.com
- Namecheap: namecheap.com

### Email
- SendGrid: sendgrid.com (intégration gratuite)
- MailChimp: mailchimp.com
- Resend: resend.com (priorité Next.js)

### Paiement
- Stripe: stripe.com
- Square: squareup.com
- PayPal: paypal.com

### Base de données
- Supabase: supabase.com (PostgreSQL gratuit)
- Firebase: firebase.google.com
- MongoDB Atlas: mongodb.com

### Analytics
- Google Analytics: google.com/analytics
- Plausible: plausible.io

### Erreurs & Monitoring
- Sentry: sentry.io
- Rollbar: rollbar.com

## 📞 Support

pour toda question:
- Documentation: README.md, QUICKSTART.md
- Communauté: Vercel Community (vercel.com/community)
- GitHub Issues: Créer issue si bug

---

**✨ Bon lancement! À bientôt sur pressenaturel.ca!**
