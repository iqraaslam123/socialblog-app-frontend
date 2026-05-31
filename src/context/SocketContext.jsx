// // // src/context/SocketContext.jsx
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const SocketContext = createContext(null);

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     console.warn("⚠️ useSocket must be used within a SocketProvider");
//     return { socket: null };
//   }
//   return context;
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

//     const newSocket = io(SOCKET_URL, {
//       // ✅ FIXED: Vercel serverless hai, polling baar-baar 400 error degi.
//       // Isliye direct 'websocket' force karein taake handshake bypass ho jaye.
//       transports: ['websocket'], 
//       withCredentials: true,
//       autoConnect: true,
//       reconnection: true,
//       reconnectionAttempts: 5, // Thoda sa badha diya taake connection stable ho sake
//       reconnectionDelay: 2000,
//     });

//     newSocket.on('connect_error', (err) => {
//       console.warn('Socket connection issue:', err.message);
//     });

//     setSocket(newSocket);

//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

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
      // ✅ FIXED FOR VERCEL: Forced only 'websocket' to stop 400 Bad Request polling errors
      transports: ['websocket'],
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5, // Tries 5 times before calming down to avoid log spam
      reconnectionDelay: 2000,
    });

    newSocket.on('connect_error', (err) => {
      // Handles connection warnings silently in console
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