// Exemple d'API routes pour le futur backend

// app/api/orders/route.ts
/*
import { NextRequest, NextResponse } from 'next/server';
import { Order } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

// GET - Récupérer toutes les commandes (admin)
export async function GET(request: NextRequest) {
  try {
    // À intégrer avec votre base de données
    // const orders = await db.orders.findAll();
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle commande
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Panier vide' },
        { status: 400 }
      );
    }

    // Créer la commande
    const order: Order = {
      id: uuidv4(),
      items: body.items,
      totalPrice: body.totalPrice,
      deliveryMethod: body.deliveryMethod,
      paymentMethod: body.paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Sauvegarder (intégrer avec BD)
    // await db.orders.create(order);
    
    // Envoyer email de confirmation (optionnel)
    // await sendEmail(body.email, 'Commande confirmée', ...);

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}
*/

/* 
// app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ReviewData } from '@/lib/types';

// GET - Récupérer les avis d'un produit
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get('productId');

  // Intégrer avec la base de données
  // const reviews = await db.reviews.findByProduct(productId);
  
  return NextResponse.json({ success: true, data: [] });
}

// POST - Créer un nouvel avis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const review: ReviewData = {
      ...body,
      createdAt: new Date().toISOString(),
    };

    // Valider et sauvegarder
    // await db.reviews.create(review);

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
*/

/*
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ContactMessage } from '@/lib/types';

// POST - Envoyer un message de contact
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const message: ContactMessage = {
      ...body,
      createdAt: new Date().toISOString(),
    };

    // Sauvegarder
    // await db.messages.create(message);
    
    // Envoyer email
    // await sendEmail(ADMIN_EMAIL, 'Nouveau contact', ...);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}
*/
