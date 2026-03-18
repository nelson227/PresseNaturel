import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer;

export function initSocket(httpServer: HttpServer, frontendUrl: string) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: frontendUrl,
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('🔌 Client connecté:', socket.id);

    // Rejoindre une room admin si authentifié
    socket.on('join:admin', () => {
      socket.join('admin');
      console.log('👑 Admin rejoint:', socket.id);
    });

    // Rejoindre une room utilisateur pour ses commandes
    socket.on('join:user', (userId: string) => {
      if (userId) {
        socket.join(`user:${userId}`);
        console.log('👤 User rejoint:', userId);
      }
    });

    socket.on('disconnect', () => {
      console.log('🔌 Client déconnecté:', socket.id);
    });
  });

  return io;
}

export function getIO(): SocketIOServer {
  if (!io) {
    throw new Error('Socket.IO non initialisé');
  }
  return io;
}
