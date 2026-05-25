// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useTheme } from '../../context/ThemeContext';
// import ThemeToggle from '../Theme/ThemeToggle';

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => { logout(); navigate('/login'); };

//   return (
//     <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center sticky top-0 z-50">
//       <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">SocialApp</Link>
//       <div className="flex items-center gap-4">
//         <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Home</Link>
//         <Link to="/explore" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Explore</Link>
//         <Link to="/messages" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Messages</Link>
//         {user && (
//           <Link to={`/profile/${user._id}`} className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
//             Profile
//           </Link>
//         )}
//         <ThemeToggle />
//         <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }


import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../Theme/ThemeToggle';
import axios from 'axios';

const BASE = import.meta.env.VITE_SOCKET_URL;
const API = import.meta.env.VITE_API_URL;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Real registered users ke liye states
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Aapki fixed email taake aap hamesha pehle number par aaein
  const MY_EMAIL = "iqraaslam1966@gmail.com"; 

  useEffect(() => {
    const fetchRealUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Agar token storage mein hai
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        
        // Backend se real users fetch kar rahe hain
        const { data } = await axios.get(`${API}/users/all-users`, config);
        
        // Sorting Logic: Iqra hamesha array ke start (Index 0) par rahegi, baki real users uske baad
        const sorted = data.sort((a, b) => {
          if (a.email === MY_EMAIL) return -1;
          if (b.email === MY_EMAIL) return 1;
          return 0;
        });

        setRegisteredUsers(sorted);
      } catch (error) {
        console.error("Real users load karne mein error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRealUsers();
    }
  }, [user]);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      
      {/* Left side: Logo */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 shrink-0">
          ✦ SocialApp
        </Link>

        {/* 👥 Center-Left: Real Users List (Navbar display) */}
        {user && !loading && (
          <div className="hidden md:flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-800 max-w-[400px] overflow-x-auto no-scrollbar">
            {registeredUsers.map((u) => {
              const isMe = u.email === MY_EMAIL;
              
              // Agar user ki real profile picture database mein hai to woh use hogi, warna random name ui-avatar nahi balki real username initials text avatar banega
              const userAvatar = u.profilePicture 
                ? `${BASE}${u.profilePicture}` 
                : `https://ui-avatars.com/api/?name=${u.username}&background=${isMe ? '2563eb' : '4b5563'}&color=fff&size=32`;

              return (
                <div 
                  key={u._id} 
                  onClick={() => navigate(`/profile/${u._id}`)}
                  className={`flex items-center gap-2 px-2 py-1 rounded-full cursor-pointer transition-all duration-200 shrink-0 select-none ${
                    isMe 
                      ? 'bg-blue-100 dark:bg-blue-950/40 border border-blue-400/30' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700/60'
                  }`}
                  title={`${u.username} (${u.email})`}
                >
                  <div className="relative w-6 h-6 shrink-0">
                    <img 
                      src={userAvatar} 
                      className={`w-full h-full rounded-full object-cover ${isMe ? 'ring-2 ring-blue-500' : ''}`} 
                      alt={u.username} 
                    />
                    {/* Active User Green dot */}
                    <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full bg-green-500 ring-1 ring-white dark:ring-gray-900"></span>
                  </div>
                  
                  <span className={`text-xs font-semibold max-w-[70px] truncate ${
                    isMe ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {u.username}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Right side: Navigation Links & Actions */}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 font-medium text-sm">Home</Link>
        <Link to="/explore" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 font-medium text-sm">Explore</Link>
        <Link to="/messages" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 font-medium text-sm">Messages</Link>
        {user && (
          <Link to={`/profile/${user._id}`} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 font-medium text-sm">
            Profile
          </Link>
        )}
        <ThemeToggle />
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm font-medium transition-colors">
          Logout
        </button>
      </div>
    </nav>
  );
}