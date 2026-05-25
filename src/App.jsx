// import { useState, useEffect } from 'react'; 
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { ThemeProvider } from './context/ThemeContext';
// import { SocketProvider } from './context/SocketContext';
// import { NotificationProvider } from './context/NotificationContext';
// import Sidebar from './components/Common/Sidebar';
// import Home from './pages/Home';
// import Explore from './pages/Explore';
// import Messages from './pages/Messages';
// import ProfilePage from './pages/ProfilePage';
// import Notifications from './pages/Notifications';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import LoadingSpinner from './components/Common/LoadingSpinner';
// import AIChatBot from './components/Common/AIChatBot';
// import Write from './components/Posts/WritePost';

// function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
//   if (loading) return <LoadingSpinner />;
//   return user ? children : <Navigate to="/login" />;
// }

// function AppLayout({ children }) {
//   const { user } = useAuth();
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const mobileView = window.innerWidth <= 992;
//       setIsMobile(mobileView);
//       if (!mobileView) setIsSidebarOpen(false);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   if (!user) return <>{children}</>;

//   return (
//     <div style={{ 
//       display: 'flex', 
//       flexDirection: isMobile ? 'column' : 'row', 
//       height: '100vh', 
//       width: '100vw',
//       overflow: 'hidden', 
//       background: 'var(--theme-bg)',
//       position: 'relative'
//     }}>
      
//       {/* 📱 MOBILE TOP NAV BAR */}
//       {isMobile && (
//         <div style={{
//           height: '60px',
//           width: '100%',
//           background: '#09090b',
//           borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '0 20px',
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           zIndex: 100000,
//           boxSizing: 'border-box'
//         }}>
//           <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '20px', fontFamily: 'sans-serif', letterSpacing: '0.5px' }}>
//             ✦ SocialApp
//           </span>
//           <button 
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             style={{
//               background: 'rgba(255, 255, 255, 0.03)',
//               border: '1px solid rgba(255, 255, 255, 0.08)',
//               borderRadius: '8px',
//               color: '#fff',
//               fontSize: '22px',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: '40px',
//               height: '40px'
//             }}
//           >
//             {isSidebarOpen ? '✕' : '☰'}
//           </button>
//         </div>
//       )}

//       {/* 🗂️ SIDEBAR LAYER */}
//       <div style={{
//         position: isMobile ? 'fixed' : 'relative',
//         top: isMobile ? '60px' : '0',
//         left: '0',
//         width: isMobile ? '280px' : '260px',
//         minWidth: isMobile ? '280px' : '260px',
//         height: isMobile ? 'calc(100vh - 60px)' : '100vh',
//         transform: isMobile && !isSidebarOpen ? 'translateX(-280px)' : 'translateX(0)',
//         transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//         zIndex: 99999,
//         background: '#09090b',
//         borderRight: '1px solid rgba(255, 255, 255, 0.08)',
//         overflowY: 'auto'
//       }}>
//         <Sidebar isMobile={isMobile} closeMobileMenu={() => setIsSidebarOpen(false)} />
//       </div>

//       {/* 📱 MOBILE OVERLAY */}
//       {isMobile && isSidebarOpen && (
//         <div 
//           onClick={() => setIsSidebarOpen(false)}
//           style={{
//             position: 'fixed',
//             top: '60px',
//             left: 0,
//             width: '100vw',
//             height: 'calc(100vh - 60px)',
//             background: 'rgba(0, 0, 0, 0.5)',
//             backdropFilter: 'blur(4px)',
//             zIndex: 99998
//           }}
//         />
//       )}
      
//       {/* 🚀 MAIN CONTENT FEED CONTAINER */}
//       <main style={{
//         marginLeft: isMobile ? '0px' : '260px',
//         marginTop: isMobile ? '60px' : '0px',
//         flex: 1,
//         height: isMobile ? 'calc(100vh - 60px)' : '100vh',
//         overflowY: 'auto',
//         padding: isMobile ? '16px' : '24px',
//         background: 'var(--theme-bg)',
//         color: 'var(--text)',
//         position: 'relative',
//         boxSizing: 'border-box',
//         width: '100%', /* 🔥 Yeh pure main content zone ko full desktop par phailne dega */
//         maxWidth: '100%'
//       }}>
//         {children}
//         <AIChatBot />
//       </main>
//     </div>
//   );
// }

// function AppRoutes() {
//   const { user } = useAuth();
//   return (
//     <AppLayout>
//       <Routes>
//         <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
//         <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
//         <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
//         <Route path="/write" element={<ProtectedRoute><Write /></ProtectedRoute>} />
//         <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
//         <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
//         <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
//         <Route path="/profile/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
//       </Routes>
//     </AppLayout>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <ThemeProvider>
//         <AuthProvider>
//           <SocketProvider>
//             <NotificationProvider>
//               <AppRoutes />
//             </NotificationProvider>
//           </SocketProvider>
//         </AuthProvider>
//       </ThemeProvider>
//     </BrowserRouter>
//   );
// }
// new
// import { useState, useEffect } from 'react'; 
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { ThemeProvider } from './context/ThemeContext';
// import { SocketProvider } from './context/SocketContext';
// import { NotificationProvider } from './context/NotificationContext';
// import Sidebar from './components/Common/Sidebar';
// import Home from './pages/Home';
// import Explore from './pages/Explore';
// import Messages from './pages/Messages';
// import ProfilePage from './pages/ProfilePage';
// import Notifications from './pages/Notifications';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import LoadingSpinner from './components/Common/LoadingSpinner';
// import AIChatBot from './components/Common/AIChatBot';
// import Write from './components/Posts/WritePost';
// // import Dashboard from './pages/Dashboard';

// function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
//   if (loading) return <LoadingSpinner />;
//   return user ? children : <Navigate to="/login" />;
// }   


// function AppLayout({ children }) {
//   const { user } = useAuth();
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const mobileView = window.innerWidth <= 992;
//       setIsMobile(mobileView);
//       if (!mobileView) setIsSidebarOpen(false);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   if (!user) return <>{children}</>;

//   return (
//     <div style={{ 
//       display: 'flex', 
//       flexDirection: 'row', 
//       height: '100vh', 
//       width: '100vw',
//       overflow: 'hidden', 
//       background: 'var(--theme-bg)',
//       position: 'relative'
//     }}>
      
//       {/* 📱 MOBILE TOP NAV BAR */}
//       {isMobile && (
//         <div style={{
//           height: '60px',
//           width: '100%',
//           background: '#09090b',
//           borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '0 20px',
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           zIndex: 100000,
//           boxSizing: 'border-box'
//         }}>
//           <span style={{ color: 'var(--primary, #ef4444)', fontWeight: 'bold', fontSize: '20px', fontFamily: 'sans-serif', letterSpacing: '0.5px' }}>
//             ✦ SocialApp
//           </span>
//           <button 
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             style={{
//               background: 'rgba(255, 255, 255, 0.03)',
//               border: '1px solid rgba(255, 255, 255, 0.08)',
//               borderRadius: '8px',
//               color: '#fff',
//               fontSize: '22px',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: '40px',
//               height: '40px'
//             }}
//           >
//             {isSidebarOpen ? '✕' : '☰'}
//           </button>
//         </div>
//       )}

//       {/* 🗂️ SIDEBAR LAYER */}
//       <div style={{
//         position: 'fixed',
//         top: isMobile ? '60px' : '0',
//         left: '0',
//         width: isMobile ? '280px' : '260px',
//         minWidth: isMobile ? '280px' : '260px',
//         height: isMobile ? 'calc(100vh - 60px)' : '100vh',
//         transform: isMobile && !isSidebarOpen ? 'translateX(-280px)' : 'translateX(0)',
//         transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//         zIndex: 99999,
//         background: '#09090b',
//         borderRight: '1px solid rgba(255, 255, 255, 0.08)',
//         overflowY: 'auto'
//       }}>
//         <Sidebar isMobile={isMobile} closeMobileMenu={() => setIsSidebarOpen(false)} />
//       </div>

//       {/* 📱 MOBILE OVERLAY */}
//       {isMobile && isSidebarOpen && (
//         <div 
//           onClick={() => setIsSidebarOpen(false)}
//           style={{
//             position: 'fixed',
//             top: '60px',
//             left: 0,
//             width: '100vw',
//             height: 'calc(100vh - 60px)',
//             background: 'rgba(0, 0, 0, 0.5)',
//             backdropFilter: 'blur(4px)',
//             zIndex: 99998
//           }}
//         />
//       )}
      
//       {/* 🚀 MAIN CONTENT FEED CONTAINER (Optimized Alignment & Smooth Sizing Engine) */}
//       <main style={{
//         paddingLeft: isMobile ? '0px' : '260px',
//         paddingTop: isMobile ? '60px' : '0px',
//         flex: 1,
//         height: '100vh',
//         overflowY: 'auto',
//         paddingRight: '0px',
//         paddingBottom: '0px',
//         background: 'var(--theme-bg)',
//         color: 'var(--text)',
//         position: 'relative',
//         boxSizing: 'border-box',
//         width: '100%', 
//         maxWidth: '100%'
//       }}>
//         <div style={{ padding: isMobile ? '16px' : '24px', boxSizing: 'border-box', width: '100%' }}>
//           {children}
//         </div>
//         <AIChatBot />
//       </main>
//     </div>
//   );
// }

// function AppRoutes() {
//   const { user } = useAuth();
//   return (
//     <AppLayout>
//       <Routes>
//         <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
//         <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
//         <Route path="/%" element={<ProtectedRoute><Home /></ProtectedRoute>} /> {/* Added fallback handler adjustment */}
//         <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
//         {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> New Dashboard Route */}
//         <Route path="/write" element={<ProtectedRoute><Write /></ProtectedRoute>} />
//         <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
//         <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
//         <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
//         <Route path="/profile/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
//       </Routes>
//     </AppLayout>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <ThemeProvider>
//         <AuthProvider>
//           <SocketProvider>
//             <NotificationProvider>
//               <AppRoutes />
//             </NotificationProvider>
//           </SocketProvider>
//         </AuthProvider>
//       </ThemeProvider>
//     </BrowserRouter>
//   );
// }

import { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { SocketProvider } from './context/SocketContext';
import { NotificationProvider } from './context/NotificationContext';
import Sidebar from './components/Common/Sidebar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Messages from './pages/Messages';
import ProfilePage from './pages/ProfilePage';
import Notifications from './pages/Notifications';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LoadingSpinner from './components/Common/LoadingSpinner';
import AIChatBot from './components/Common/AIChatBot';
import Write from './components/Posts/WritePost';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return user ? children : <Navigate to="/login" />;
}   

function AppLayout({ children }) {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 992;
      setIsMobile(mobileView);
      if (!mobileView) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user) return <>{children}</>;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      height: '100vh', 
      width: '100vw',
      overflow: 'hidden', 
      background: 'var(--theme-bg)',
      position: 'relative'
    }}>
      
      {/* 📱 MOBILE TOP NAV BAR */}
      {isMobile && (
        <div style={{
          height: '60px',
          width: '100%',
          background: '#09090b',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100000,
          boxSizing: 'border-box'
        }}>
          <span style={{ color: 'var(--primary, #ef4444)', fontWeight: 'bold', fontSize: '20px', fontFamily: 'sans-serif', letterSpacing: '0.5px' }}>
            ✦ DevBlog
          </span>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '22px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px'
            }}
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
        </div>
      )}

      {/* 🗂️ MAIN GLOBAL SIDEBAR */}
      <div style={{
        position: isMobile ? 'fixed' : 'relative',
        top: isMobile ? '60px' : '0',
        left: '0',
        width: isMobile ? '280px' : '260px',
        minWidth: isMobile ? '280px' : '260px',
        height: isMobile ? 'calc(100vh - 60px)' : '100vh',
        transform: isMobile && !isSidebarOpen ? 'translateX(-280px)' : 'translateX(0)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 99999,
        background: '#09090b',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        overflowY: 'auto'
      }}>
        <Sidebar isMobile={isMobile} closeMobileMenu={() => setIsSidebarOpen(false)} />
      </div>

      {/* 📱 MOBILE OVERLAY */}
      {isMobile && isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            width: '100vw',
            height: 'calc(100vh - 60px)',
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 99998
          }}
        />
      )}
      
      {/* 🚀 MAIN CONTENT CONTAINER */}
      <main style={{
        flex: 1,
        height: '100vh',
        overflowY: 'auto',
        background: 'var(--theme-bg)',
        color: 'var(--text)',
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%', 
        maxWidth: '100%'
      }}>
        <div style={{ padding: isMobile ? '16px' : '24px', boxSizing: 'border-box', width: '100%' }}>
          {children}
        </div>
        <AIChatBot />
      </main>
    </div>
  );
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <AppLayout>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/write" element={<ProtectedRoute><Write /></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
    </AppLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SocketProvider>
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </SocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}