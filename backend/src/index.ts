import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import { seedDatabase } from './seed';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Démarrage du serveur
async function main() {
  try {
    // Connexion à la base de données
    await prisma.$connect();
    console.log('✅ Connecté à PostgreSQL');

    // Seed initial (admin + produits)
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erreur de démarrage:', error);
    process.exit(1);
  }
}

main();

// Gestion propre de l'arrêt
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export { prisma };
