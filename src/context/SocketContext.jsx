// src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  // Agar wrap na ho toh error crash hone ke bajaye warning dega
  if (!context) {
    console.warn("⚠️ useSocket must be used within a SocketProvider");
    return { socket: null }; 
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: ['polling', 'websocket'],
      withCredentials: true,
      autoConnect: true
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Hum object de rahe hain { socket } taake destructuring scale par error na aaye
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};