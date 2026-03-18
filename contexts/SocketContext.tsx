'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pressenaturel-production.up.railway.app';
// Socket.IO se connecte à la racine du serveur (pas /api)
const SOCKET_URL = API_URL.replace(/\/api\/?$/, '');

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinAdmin: () => void;
  joinUser: (userId: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  joinAdmin: () => {},
  joinUser: () => {},
});

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    newSocket.on('connect', () => {
      console.log('🔌 WebSocket connecté');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('🔌 WebSocket déconnecté');
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const joinAdmin = () => {
    if (socket?.connected) {
      socket.emit('join:admin');
    }
  };

  const joinUser = (userId: string) => {
    if (socket?.connected) {
      socket.emit('join:user', userId);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, isConnected, joinAdmin, joinUser }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
