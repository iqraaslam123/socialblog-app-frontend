// // main.jsx - BrowserRouter NAHI hona chahiye yahan
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// SARE PROVIDERS KO IMPORT KAREIN (Paths apne folder names ke mutabiq verify karlein)
import { AuthProvider } from './context/AuthContext'; // Ya jahan aapka AuthContext hai
import { SocketProvider } from './context/SocketContext'; 
import { NotificationProvider } from './context/NotificationContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. AuthProvider sabse top par (Kyunki baki sabko user authentication details chahiye) */}
    <AuthProvider>
      {/* 2. SocketProvider uske andar (Kyunki socket connection user ID use kar sakta hai) */}
      <SocketProvider>
        {/* 3. NotificationProvider in dono ke andar (Ab isko user aur socket dono milenge!) */}
        <NotificationProvider>
          
          <App />
          
        </NotificationProvider>
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);