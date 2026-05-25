import { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from './SocketContext';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';


const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { socket } = useSocket();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!socket || !user) return;

    socket.on('notification', (data) => {
      setNotifications(p => [data, ...p]);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: data.type === 'like' ? 'success' : 'info',
        title: data.message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: 'var(--primary)',
        color: '#fff',
      });
    });

    return () => socket.off('notification');
  }, [socket, user]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);