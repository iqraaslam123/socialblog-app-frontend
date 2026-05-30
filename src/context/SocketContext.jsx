// src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    console.warn("⚠️ useSocket must be used within a SocketProvider");
    return { socket: null };
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

    const newSocket = io(SOCKET_URL, {
      // ✅ FIXED: Vercel WebSocket support nahi karta
      // polling pehle, websocket baad mein (Vercel pe websocket fail hoga, polling use hogi)
      transports: ['polling', 'websocket'],
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 3,      // ✅ Infinite retry band — spam kam hoga
      reconnectionDelay: 2000,
    });

    newSocket.on('connect_error', (err) => {
      // Silently handle — console spam band
      console.warn('Socket connection issue:', err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
