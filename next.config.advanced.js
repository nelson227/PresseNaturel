// Configuration avancée de Next.js avec optimisations de performance

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mode stricte React pour développement
  reactStrictMode: true,

  // Optimisations d'images
  images: {
    // Formats optimisés
    formats: ['image/avif', 'image/webp'],
    
    // Tailles d'appareil responsive
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Domaines autorisés (pour futures images distantes)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    
    // Cache des images optimisées
    minimumCacheTTL: 60,
  },

  // Compression Gzip
  compress: true,

  // Mode de sortie optimisé
  output: 'standalone',

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Redirections simples
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/jus',
        permanent: true,
      },
    ];
  },

  // Réécriture des routes
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  // Variables d'environnement
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

  // Chemins publics optimisés
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:3000/api',
  },
};

module.exports = nextConfig;
