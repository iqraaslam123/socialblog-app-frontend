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
    // Vite ka environment variable call karein, agar na mile toh localhost par fallback karein
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    
    console.log("🔌 Connecting socket to:", SOCKET_URL); // Debugging ke liye taake console par sahi URL dikhe

    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'], // 'websocket' ko pehle rakhna behter hota hai
      withCredentials: true,
      autoConnect: true
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