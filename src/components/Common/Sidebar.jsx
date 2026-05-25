
// import { useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useTheme } from '../../context/ThemeContext';
// import { useNotification } from '../../context/NotificationContext';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const BASE = import.meta.env.VITE_SOCKET_URL;
// const API = import.meta.env.VITE_API_URL;

// const themeColors = [
//   { key: 'purple', hex: '#8B5CF6' },
//   { key: 'blue',   hex: '#3B82F6' },
//   { key: 'green',  hex: '#10B981' },
//   { key: 'rose',   hex: '#F43F5E' },
//   { key: 'orange', hex: '#F97316' },
// ];

// export default function Sidebar() {
//   const { user, logout, setUser } = useAuth();
//   const { dark, toggleTheme, color, setColor } = useTheme();
//   const { notifications } = useNotification();
//   const navigate = useNavigate();
//   const [allUsers, setAllUsers] = useState([]);
//   const [loadingUsers, setLoadingUsers] = useState(true);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const MY_EMAIL = "iqraaslam1966@gmail.com";

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const { data } = await axios.get(`${API}/users/all-users`);
//         const sorted = data.sort((a, b) => {
//           if (a.email === MY_EMAIL) return -1;
//           if (b.email === MY_EMAIL) return 1;
//           return 0;
//         });
//         setAllUsers(sorted);
//       } catch (err) { console.error(err); } finally { setLoadingUsers(false); }
//     };
//     fetchUsers();
//   }, []);

//   const avatar = user?.profilePicture
//     ? `${BASE}${user.profilePicture}`
//     : `https://ui-avatars.com/api/?name=${user?.username || 'U'}&background=random&color=fff&size=80`;

//   const handleLogout = () => {
//     Swal.fire({ 
//       title: 'Logout?', 
//       background: '#0f111a',
//       color: '#ffffff',
//       showCancelButton: true,
//       confirmButtonColor: '#ef4444', 
//       confirmButtonText: 'Logout Now' 
//     }).then(r => { if (r.isConfirmed) { logout(); navigate('/login'); } });
//   };

//   /* 💎 HIGH-END PREMIUM PROFILE STUDIO MODAL */
//   const handleEditProfile = async () => {
//     window.triggerAIBio = () => {
//       const bios = [
//         "🚀 MERN Architect | Transforming complex problems into elegant pixel-perfect code.",
//         "✨ UI/UX Weaver | Crafting high-end glassmorphic interfaces with React & Tailwind v4.0.",
//         "⚡ Full-Stack Engineer | Building scalable distributed systems and fluid web journeys."
//       ];
//       const randomBio = bios[Math.floor(Math.random() * bios.length)];
//       document.getElementById('studio-bio').value = randomBio;
//     };

//     const { value: formValues } = await Swal.fire({
//       title: '<span style="color:#fff; font-size:22px; font-weight:800;">Edit Profile Studio ✨</span>',
//       background: '#090a0f',
//       padding: '2rem',
//       showCancelButton: true,
//       confirmButtonColor: 'var(--primary, #8B5CF6)',
//       confirmButtonText: 'Save Studio Changes',
//       customClass: { popup: 'premium-studio-border' },
//       html: `
//         <div style="text-align: left; display: flex; flex-direction: column; gap: 20px; font-family: sans-serif;">
//           
//           <div style="background: rgba(255,255,255,0.03); padding: 15px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; gap: 15px;">
//              <img id="dp-preview" src="${avatar}" style="width: 65px; height: 65px; border-radius: 50%; border: 3px solid var(--primary); object-fit: cover;" />
//              <div style="flex: 1;">
//                 <label style="display:block; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 5px;">Profile Avatar</label>
//                 <input type="file" id="studio-file" accept="image/*" style="color: #fff; font-size: 12px; width: 100%;" onchange="document.getElementById('dp-preview').src = URL.createObjectURL(this.files[0])">
//              </div>
//           </div>

//           <div>
//             <label style="display:block; font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px;">Username handle</label>
//             <input id="studio-name" value="${user?.username || ''}" style="width: 100%; padding: 12px 15px; border-radius: 10px; background: #12141c; color: #fff; border: 1px solid rgba(255,255,255,0.1); font-size: 14px; outline: none;">
//           </div>

//           <div>
//             <div style="display:flex; justify-content: space-between; margin-bottom: 8px;">
//                <label style="font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase;">Engineering Bio</label>
//                <button type="button" onclick="window.triggerAIBio()" style="background: var(--primary); color: #fff; border: none; padding: 4px 10px; border-radius: 6px; font-size: 10px; cursor: pointer; font-weight: 700;">✨ AI Writer</button>
//             </div>
//             <textarea id="studio-bio" style="width: 100%; padding: 12px 15px; border-radius: 10px; background: #12141c; color: #fff; border: 1px solid rgba(255,255,255,0.1); font-size: 13px; min-height: 90px; outline: none; line-height: 1.5;">${user?.bio || ''}</textarea>
//           </div>

//           <div>
//              <label style="display:block; font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px;">Identity Badge 🏷️</label>
//              <select id="studio-badge" style="width: 100%; padding: 12px 15px; border-radius: 10px; background: #12141c; color: #fff; border: 1px solid rgba(255,255,255,0.1); font-size: 13px; outline: none;">
//                 <option value="none">Default Member</option>
//                 <option value="architect">⚡ MERN Architect</option>
//                 <option value="ninja">🥷 Code Ninja</option>
//                 <option value="creator">🚀 Content Creator</option>
//                 <option value="og">💎 SocialApp OG</option>
//              </select>
//           </div>

//         </div>
//       `,
//       preConfirm: () => {
//         return {
//           username: document.getElementById('studio-name').value,
//           bio: document.getElementById('studio-bio').value,
//           fileDp: document.getElementById('studio-file').files[0]
//         }
//       }
//     });

//     if (formValues) {
//       try {
//         const fd = new FormData();
//         fd.append('username', formValues.username);
//         fd.append('bio', formValues.bio);
//         if (formValues.fileDp) fd.append('profilePicture', formValues.fileDp);

//         const { data } = await axios.put(`${API}/users/me`, fd);
//         setUser(data);
//         Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Profile Updated!', showConfirmButton: false, timer: 1500 });
//       } catch (err) { Swal.fire('Error', 'Update failed', 'error'); }
//     }
//   };

//   const showStats = () => {
//     Swal.fire({
//       title: 'Your Stats 📊',
//       background: '#090a0f',
//       color: '#fff',
//       html: `
//         <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px;">
//            <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:15px; border:1px solid rgba(255,255,255,0.05);">
//               <h2 style="color:var(--primary); margin:0;">${user?.followers?.length || 0}</h2>
//               <p style="color:#94a3b8; font-size:12px;">Followers</p>
//            </div>
//            <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:15px; border:1px solid rgba(255,255,255,0.05);">
//               <h2 style="color:var(--primary); margin:0;">${user?.following?.length || 0}</h2>
//               <p style="color:#94a3b8; font-size:12px;">Following</p>
//            </div>
//         </div>
//       `
//     });
//   };

//   return (
//     <>
//       <div className="mobile-top-nav" style={{ display: 'none', position: 'fixed', top: 0, left: 0, right: 0, height: '60px', background: '#0d0d0e', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 20px', alignItems: 'center', justifyContent: 'space-between', zIndex: 1000 }}>
//         <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--primary)' }}>✦ SocialApp</div>
//         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px' }}>{isMobileMenuOpen ? '✕' : '☰'}</button>
//       </div>

//       <aside className={`main-responsive-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`} style={{ width: '260px', background: '#090a0f', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 900 }}>
//         
//         {/* Scrollable Content Section */}
//         <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }} className="active-members-scrollbar">
//           
//           <div style={{ padding: '0 20px 15px' }}>
//             <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--primary)' }}>✦ SocialApp</div>
//             <div style={{ fontSize: 11, color: '#6b7280' }}>Connect · Share · Discover</div>
//           </div>

//           {/* User Profile Card */}
//           <div style={{ margin: '0 14px 15px', padding: 15, borderRadius: 16, background: '#12141c', border: '1px solid rgba(255,255,255,0.05)' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//               <img src={avatar} style={{ width: 42, height: 42, borderRadius: '50%', border: '2px solid var(--primary)' }} />
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <div style={{ fontWeight: 800, fontSize: 14, color: '#fff', truncate: 'true' }}>{user?.username}</div>
//                 <div style={{ fontSize: 11, color: '#6b7280', truncate: 'true' }}>{user?.email}</div>
//               </div>
//             </div>
//             {user?.bio && (
//                <div style={{ marginTop: 10, padding: 10, background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)' }}>
//                   <p style={{ margin: 0, fontSize: 11, color: '#cbd5e1', fontStyle: 'italic', lineHeight: '1.4' }}>{user.bio}</p>
//                </div>
//             )}
//             <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
//               <button onClick={showStats} style={{ flex: 1, padding: '8px', borderRadius: 10, background: 'var(--primary)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>📊 Stats</button>
//               <button onClick={handleEditProfile} style={{ flex: 1, padding: '8px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>✏️ Edit</button>
//             </div>
//           </div>

//           <div style={{ padding: '0 14px' }}>
//             <div style={{ fontSize: 10, fontWeight: 700, color: '#6b7280', padding: '0 10px 8px', letterSpacing: 1.5 }}>👥 ACTIVE MEMBERS</div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
//               {allUsers.slice(0, 10).map(u => (
//                 <div key={u._id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 12, background: u.email === MY_EMAIL ? 'rgba(239,68,68,0.05)' : 'transparent', cursor: 'pointer' }}>
//                   <img src={u.profilePicture ? `${BASE}${u.profilePicture}` : `https://ui-avatars.com/api/?name=${u.username}`} style={{ width: 24, height: 24, borderRadius: '50%' }} />
//                   <span style={{ fontSize: 12, color: '#d1d5db', flex: 1 }}>{u.username}</span>
//                   <span style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%' }}></span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Fixed Bottom Section (Theme & Logout) */}
//         <div style={{ padding: '15px 14px 20px', background: '#090a0f', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
//           <div style={{ padding: 12, borderRadius: 15, background: '#12141c', marginBottom: 12 }}>
//             <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--primary)', marginBottom: 10, textAlign: 'center' }}>🎨 THEME SELECTOR</div>
//             <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 10 }}>
//               {themeColors.map(t => (
//                 <button key={t.key} onClick={() => setColor(t.key)} style={{ width: 22, height: 22, borderRadius: '50%', background: t.hex, border: color === t.key ? '2px solid #fff' : 'none', cursor: 'pointer' }} />
//               ))}
//             </div>
//             <button onClick={toggleTheme} style={{ width: '100%', padding: '8px', borderRadius: 10, background: 'var(--primary)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>{dark ? '☀️ Light' : '🌙 Dark'}</button>
//           </div>
//           <button onClick={handleLogout} style={{ width: '100%', padding: '10px', borderRadius: 12, background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>🚪 Logout Session</button>
//         </div>
//       </aside>

//       <style>{`
//         .active-members-scrollbar::-webkit-scrollbar { width: 3px; }
//         .active-members-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
//         .premium-studio-border { border: 1px solid rgba(255,255,255,0.1) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important; }
//         .sidebar-nav-link.active-link { background: var(--primary) !important; color: #fff !important; }
//         @media (max-width: 992px) {
//           .mobile-top-nav { display: flex !important; }
//           .main-responsive-sidebar { transform: translateX(-100%); transition: 0.3s; }
//           .main-responsive-sidebar.mobile-open { transform: translateX(0); }
//         }
//       `}</style>
//     </>
//   );
// }

import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const BASE = import.meta.env.VITE_SOCKET_URL;
const API = import.meta.env.VITE_API_URL;

const themeColors = [
  { key: 'purple', hex: '#8B5CF6', name: 'Purple Dream' },
  { key: 'blue',   hex: '#3B82F6', name: 'Ocean Blue' },
  { key: 'green',  hex: '#10B981', name: 'Emerald' },
  { key: 'rose',   hex: '#F43F5E', name: 'Rose Gold' },
  { key: 'orange', hex: '#F97316', name: 'Sunset' },
];

export default function Sidebar() {
  const { user, logout, setUser } = useAuth();
  const { dark, toggleTheme, color, setColor } = useTheme();
  const { notifications } = useNotification();
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const MY_EMAIL = "iqraaslam1966@gmail.com";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${API}/users/all-users`);
        const validUsers = data.filter(u => u && u.username && u.email);
        const sorted = validUsers.sort((a, b) => {
          if (a.email === MY_EMAIL) return -1;
          if (b.email === MY_EMAIL) return 1;
          return 0;
        });
        setAllUsers(sorted);
      } catch (err) { 
        console.error('Error fetching users:', err); 
      } finally { 
        setLoadingUsers(false); 
      }
    };
    fetchUsers();
  }, []);

  const avatar = user?.profilePicture
    ? `${BASE}${user.profilePicture}`
    : `https://ui-avatars.com/api/?name=${user?.username || 'U'}&background=random&color=fff&size=80&rounded=true&bold=true`;

  const handleLogout = () => {
    Swal.fire({ 
      title: 'Ready to leave?',
      text: 'You can always come back!',
      background: '#0f111a',
      color: '#ffffff',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', 
      confirmButtonText: '🚪 Logout',
      cancelButtonText: 'Stay',
      icon: 'question',
      iconColor: '#ef4444'
    }).then(r => { if (r.isConfirmed) { logout(); navigate('/login'); } });
  };

  /* Edit Profile Modal (same as before) */
  const handleEditProfile = async () => {
    const aiBios = [
      "🚀 Full-Stack Architect | Building the future, one component at a time | React • Node • MongoDB",
      "✨ UI/UX Alchemist | Transforming ideas into magical digital experiences | Design Systems Expert",
      "⚡ Performance Ninja | Making the web lightning fast | 100% Lighthouse scores enthusiast",
      "💎 Code Artist | Writing poetry in JavaScript | Clean code advocate",
      "🎨 Creative Technologist | Bridging design and development | Pixel perfect obsessed",
      "🔧 Problem Solver | Turning coffee into code | Debugging is my superpower",
      "🌐 Open Source Champion | Giving back to the community | OSS contributor",
      "🎯 Product Mindset | Building products users love | User-first approach",
      "🧠 AI Enthusiast | Exploring the intersection of AI and web | Future thinker",
      "🏆 Hackathon Winner | 10+ hackathons | Rapid prototyper"
    ];

    const userGithub = user?.github || '';
    const userTwitter = user?.twitter || '';
    const userWebsite = user?.website || '';

    const modalHtml = `
      <div style="position: relative; overflow: hidden;">
        <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at 30% 50%, rgba(139,92,246,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(59,130,246,0.15) 0%, transparent 50%); pointer-events: none;"></div>
        
        <div style="position: absolute; top: 20px; right: 20px; width: 100px; height: 100px; background: radial-gradient(circle, var(--primary) 0%, transparent 70%); border-radius: 50%; opacity: 0.1; animation: float 4s ease-in-out infinite;"></div>
        <div style="position: absolute; bottom: 20px; left: 20px; width: 80px; height: 80px; background: radial-gradient(circle, #3B82F6 0%, transparent 70%); border-radius: 50%; opacity: 0.1; animation: float 5s ease-in-out infinite reverse;"></div>

        <div style="background: linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.1) 100%); border-radius: 20px; padding: 20px; margin-bottom: 25px; border: 1px solid rgba(255,255,255,0.1);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 12px; color: var(--primary); font-weight: 700; letter-spacing: 2px;">PROFILE STUDIO</div>
              <div style="font-size: 11px; color: #6b7280; margin-top: 4px;">Customize your digital identity</div>
            </div>
            <div style="display: flex; gap: 15px;">
              <div style="text-align: center;">
                <div style="font-size: 20px; font-weight: 800; color: #fff;">${user?.followers?.length || 0}</div>
                <div style="font-size: 9px; color: #6b7280;">FOLLOWERS</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 20px; font-weight: 800; color: #fff;">${user?.following?.length || 0}</div>
                <div style="font-size: 9px; color: #6b7280;">FOLLOWING</div>
              </div>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; margin-bottom: 25px;">
          <div style="position: relative; display: inline-block;">
            <div style="position: absolute; inset: -3px; background: linear-gradient(135deg, var(--primary), #3B82F6, var(--primary)); border-radius: 50%; opacity: 0.6; filter: blur(8px);"></div>
            <img id="dp-preview" src="${avatar}" style="position: relative; width: 120px; height: 120px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.2); object-fit: cover; box-shadow: 0 20px 40px rgba(0,0,0,0.3);" />
            <label for="studio-file" style="position: absolute; bottom: 5px; right: 5px; background: linear-gradient(135deg, var(--primary), #6d28d9); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid rgba(255,255,255,0.2);">
              📷
            </label>
            <input type="file" id="studio-file" accept="image/*" style="display: none;" onchange="const reader = new FileReader(); reader.onload = function(e) { document.getElementById('dp-preview').src = e.target.result; }; reader.readAsDataURL(this.files[0]);">
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
            <span style="margin-right: 5px;">👤</span> Username
          </label>
          <div style="position: relative;">
            <div style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #6b7280;">@</div>
            <input id="studio-name" value="${user?.username || ''}" 
              style="width: 100%; padding: 13px 15px 13px 40px; border-radius: 14px; background: #12141c; color: #fff; border: 2px solid rgba(255,255,255,0.08); font-size: 14px; outline: none; transition: all 0.3s;"
              onfocus="this.style.borderColor = 'var(--primary)'; this.style.boxShadow = '0 0 0 4px rgba(139,92,246,0.1)'"
              onblur="this.style.borderColor = 'rgba(255,255,255,0.08)'; this.style.boxShadow = 'none'"
              placeholder="Choose a unique username"
            />
          </div>
          <div style="font-size: 10px; color: #6b7280; margin-top: 6px;">✨ 3-20 characters, letters and numbers only</div>
        </div>

        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <label style="font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px;">
              <span style="margin-right: 5px;">📝</span> Bio
            </label>
            <div style="display: flex; gap: 8px;">
              <button type="button" onclick="window.triggerAIBio()" 
                style="background: linear-gradient(135deg, var(--primary) 0%, #6d28d9 100%); color: #fff; border: none; padding: 4px 12px; border-radius: 20px; font-size: 10px; cursor: pointer; font-weight: 700; display: flex; align-items: center; gap: 5px; transition: all 0.3s;">
                ✨ AI Magic
              </button>
              <button type="button" onclick="window.clearBio()" 
                style="background: rgba(255,255,255,0.05); color: #94a3b8; border: 1px solid rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px; font-size: 10px; cursor: pointer; transition: all 0.3s;">
                Clear
              </button>
            </div>
          </div>
          <textarea id="studio-bio" 
            style="width: 100%; padding: 12px 15px; border-radius: 14px; background: #12141c; color: #fff; border: 2px solid rgba(255,255,255,0.08); font-size: 13px; min-height: 100px; outline: none; line-height: 1.5; resize: vertical; font-family: inherit; transition: all 0.3s;"
            placeholder="Tell the world who you are..."
            onfocus="this.style.borderColor = 'var(--primary)'; this.style.boxShadow = '0 0 0 4px rgba(139,92,246,0.1)'"
            onblur="this.style.borderColor = 'rgba(255,255,255,0.08)'; this.style.boxShadow = 'none'"
            onkeyup="const count = this.value.length; document.getElementById('charCount').innerHTML = count + '/160'; if(count > 160) this.style.borderColor = '#ef4444'; else this.style.borderColor = 'rgba(255,255,255,0.08)'"
          >${user?.bio || ''}</textarea>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
            <div style="font-size: 10px; color: #6b7280;">💡 Tip: Click AI Magic for inspiration</div>
            <div id="charCount" style="font-size: 10px; color: #6b7280;">${user?.bio?.length || 0}/160</div>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
            🏷️ Identity Badge
          </label>
          <select id="studio-badge" 
            style="width: 100%; padding: 13px 15px; border-radius: 14px; background: #12141c; color: #fff; border: 2px solid rgba(255,255,255,0.08); font-size: 13px; outline: none; cursor: pointer; transition: all 0.3s;"
            onfocus="this.style.borderColor = 'var(--primary)'"
            onblur="this.style.borderColor = 'rgba(255,255,255,0.08)'"
          >
            <option value="none">🌟 Default Member</option>
            <option value="architect">🚀 MERN Architect</option>
            <option value="ninja">🥷 Code Ninja</option>
            <option value="creator">✨ Content Creator</option>
            <option value="og">💎 SocialApp OG</option>
            <option value="designer">🎨 UI/UX Designer</option>
            <option value="devops">⚙️ DevOps Engineer</option>
            <option value="ai">🧠 AI Specialist</option>
            <option value="security">🔒 Security Expert</option>
          </select>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;">
            🔗 Connect Socials
          </label>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 12px;">
              <span style="font-size: 20px;">🐙</span>
              <input type="text" id="studio-github" value="${userGithub}" placeholder="github_username" 
                style="flex: 1; padding: 10px; border-radius: 10px; background: #12141c; color: #fff; border: 1px solid rgba(255,255,255,0.08); font-size: 13px; outline: none;"
                onfocus="this.style.borderColor = 'var(--primary)'"
                onblur="this.style.borderColor = 'rgba(255,255,255,0.08)'"
              />
            </div>
            <div style="display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 12px;">
              <span style="font-size: 20px;">🐦</span>
              <input type="text" id="studio-twitter" value="${userTwitter}" placeholder="@twitter_handle" 
                style="flex: 1; padding: 10px; border-radius: 10px; background: #12141c; color: #fff; border: 1px solid rgba(255,255,255,0.08); font-size: 13px; outline: none;"
                onfocus="this.style.borderColor = 'var(--primary)'"
                onblur="this.style.borderColor = 'rgba(255,255,255,0.08)'"
              />
            </div>
            <div style="display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 12px;">
              <span style="font-size: 20px;">🌐</span>
              <input type="text" id="studio-website" value="${userWebsite}" placeholder="yourwebsite.com" 
                style="flex: 1; padding: 10px; border-radius: 10px; background: #12141c; color: #fff; border: 1px solid rgba(255,255,255,0.08); font-size: 13px; outline: none;"
                onfocus="this.style.borderColor = 'var(--primary)'"
                onblur="this.style.borderColor = 'rgba(255,255,255,0.08)'"
              />
            </div>
          </div>
        </div>

        <style>
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.2; }
          }
        </style>
      </div>
    `;

    window.triggerAIBio = () => {
      const randomBio = aiBios[Math.floor(Math.random() * aiBios.length)];
      const bioTextarea = document.getElementById('studio-bio');
      if (bioTextarea) {
        bioTextarea.value = randomBio;
        bioTextarea.style.transform = 'scale(1.02)';
        setTimeout(() => { bioTextarea.style.transform = 'scale(1)'; }, 200);
        const event = new Event('keyup');
        bioTextarea.dispatchEvent(event);
      }
    };

    window.clearBio = () => {
      const bioTextarea = document.getElementById('studio-bio');
      if (bioTextarea) {
        bioTextarea.value = '';
        const event = new Event('keyup');
        bioTextarea.dispatchEvent(event);
      }
    };

    const { value: formValues } = await Swal.fire({
      title: `
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
          <span style="font-size: 32px; animation: pulse 2s infinite;">✨</span>
          <span style="background: linear-gradient(135deg, #fff 0%, var(--primary) 50%, #3B82F6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 28px; font-weight: 900;">Profile Studio Pro</span>
          <span style="font-size: 32px; animation: pulse 2s infinite reverse;">✨</span>
        </div>
      `,
      background: '#0a0c10',
      backdrop: `
        rgba(0,0,0,0.8)
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")
      `,
      padding: '2rem',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary)',
      confirmButtonText: '💾 Publish Changes',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#374151',
      customClass: {
        popup: 'premium-studio-border',
        confirmButton: 'premium-confirm-btn',
        cancelButton: 'premium-cancel-btn'
      },
      html: modalHtml,
      showClass: {
        popup: 'animate__animated animate__zoomIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut animate__faster'
      },
      preConfirm: () => {
        const username = document.getElementById('studio-name')?.value;
        const bio = document.getElementById('studio-bio')?.value;
        const badge = document.getElementById('studio-badge')?.value;
        const fileDp = document.getElementById('studio-file')?.files[0];
        const github = document.getElementById('studio-github')?.value;
        const twitter = document.getElementById('studio-twitter')?.value;
        const website = document.getElementById('studio-website')?.value;
        
        if (!username || username.trim().length < 3) {
          Swal.showValidationMessage('❌ Username must be at least 3 characters');
          return false;
        }
        
        if (username.length > 20) {
          Swal.showValidationMessage('❌ Username must be less than 20 characters');
          return false;
        }
        
        if (bio && bio.length > 160) {
          Swal.showValidationMessage('❌ Bio must be 160 characters or less');
          return false;
        }
        
        return { username, bio, badge, fileDp, github, twitter, website };
      }
    });

    if (formValues) {
      try {
        const fd = new FormData();
        fd.append('username', formValues.username);
        fd.append('bio', formValues.bio);
        if (formValues.fileDp) fd.append('profilePicture', formValues.fileDp);
        if (formValues.badge && formValues.badge !== 'none') fd.append('badge', formValues.badge);
        if (formValues.github) fd.append('github', formValues.github);
        if (formValues.twitter) fd.append('twitter', formValues.twitter);
        if (formValues.website) fd.append('website', formValues.website);

        const { data } = await axios.put(`${API}/users/me`, fd);
        setUser(data);
        
        Swal.fire({
          title: '✨ Profile Updated!',
          text: 'Your digital identity has been transformed',
          icon: 'success',
          showConfirmButton: true,
          confirmButtonColor: 'var(--primary)',
          background: 'var(--theme-bg)',
          color: 'var(--text-color)',
          iconColor: 'var(--primary)',
          timer: 3000,
          showClass: {
            popup: 'animate__animated animate__tada'
          }
        });
      } catch (err) { 
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: err.response?.data?.message || 'Something went wrong',
          confirmButtonColor: 'var(--primary)',
          background: 'var(--theme-bg)',
          color: 'var(--text-color)'
        });
      }
    }
  };

  const showStats = () => {
    Swal.fire({
      title: '📊 Analytics Dashboard',
      background: '#090a0f',
      color: '#fff',
      showClass: {
        popup: 'animate__animated animate__fadeInUp animate__faster'
      },
      html: `
        <div style="padding: 10px;">
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
             <div style="background:linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.1) 100%); padding:25px; border-radius:20px; border:1px solid rgba(255,255,255,0.05); transition: all 0.3s;">
                <div style="font-size: 48px; margin-bottom: 10px;">👥</div>
                <h2 style="color:var(--primary); margin:0; font-size: 36px; font-weight: 900;">${user?.followers?.length || 0}</h2>
                <p style="color:#94a3b8; font-size:12px; margin-top: 8px; letter-spacing: 1px;">FOLLOWERS</p>
                <div style="height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-top: 10px;">
                  <div style="width: ${Math.min((user?.followers?.length || 0) * 10, 100)}%; height: 100%; background: var(--primary); border-radius: 2px;"></div>
                </div>
             </div>
             <div style="background:linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.1) 100%); padding:25px; border-radius:20px; border:1px solid rgba(255,255,255,0.05);">
                <div style="font-size: 48px; margin-bottom: 10px;">👣</div>
                <h2 style="color:#10b981; margin:0; font-size: 36px; font-weight: 900;">${user?.following?.length || 0}</h2>
                <p style="color:#94a3b8; font-size:12px; margin-top: 8px; letter-spacing: 1px;">FOLLOWING</p>
                <div style="height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-top: 10px;">
                  <div style="width: ${Math.min((user?.following?.length || 0) * 10, 100)}%; height: 100%; background: #10b981; border-radius: 2px;"></div>
                </div>
             </div>
          </div>
          <div style="background:rgba(255,255,255,0.02); padding: 20px; border-radius: 20px; margin-top: 10px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
              <span style="font-size: 24px;">🏆</span>
              <span style="font-weight: 800; color: #fff;">Account Milestones</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; justify-content: space-between; font-size: 12px;">
                <span style="color: #94a3b8;">Member since</span>
                <span style="color: #fff; font-weight: 700;">${user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px;">
                <span style="color: #94a3b8;">Profile views</span>
                <span style="color: #fff; font-weight: 700;">${Math.floor(Math.random() * 1000) + 100}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 12px;">
                <span style="color: #94a3b8;">Content reach</span>
                <span style="color: #fff; font-weight: 700;">${Math.floor(Math.random() * 5000) + 500}</span>
              </div>
            </div>
          </div>
        </div>
      `
    });
  };

  const filteredUsers = allUsers.filter(u => {
    if (!u || !u.username) return false;
    return u.username.toLowerCase().includes((searchTerm || '').toLowerCase());
  });

  return (
    <>
      {/* Mobile Navigation Bar */}
      <motion.div 
        className="mobile-top-nav" 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        style={{ display: 'none', position: 'fixed', top: 0, left: 0, right: 0, height: '60px', background: 'rgba(13,13,14,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 20px', alignItems: 'center', justifyContent: 'space-between', zIndex: 1000 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} style={{ fontSize: '18px', fontWeight: 900, color: 'var(--primary)' }}>✦ SocialApp</motion.div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </motion.button>
      </motion.div>

      {/* Premium Sidebar */}
      <motion.aside 
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`main-responsive-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`} 
        style={{ 
          width: '280px', 
          background: 'linear-gradient(180deg, #090a0f 0%, #0a0c10 100%)',
          borderRight: '1px solid rgba(255,255,255,0.08)', 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100vh', 
          position: 'fixed', 
          left: 0, 
          top: 0, 
          zIndex: 900,
          boxShadow: '5px 0 30px rgba(0,0,0,0.3)'
        }}
      >
        
        {/* Scrollable Middle Section */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          overflowX: 'hidden',
          padding: '20px 0',
          minHeight: 0 // Important for flex overflow
        }} className="active-members-scrollbar">
          
          {/* Logo Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '0 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 20 }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              style={{ fontSize: 24, fontWeight: 900, background: 'linear-gradient(135deg, var(--primary) 0%, #fff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              ✦ SocialApp
            </motion.div>
            <div style={{ fontSize: 10, color: '#6b7280', marginTop: 5 }}>Premium Experience</div>
          </motion.div>

          {/* User Profile Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ margin: '0 16px 20px', padding: 18, borderRadius: 20, background: 'linear-gradient(135deg, rgba(18,20,28,0.95) 0%, rgba(13,14,19,0.95) 100%)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                style={{ position: 'relative' }}
              >
                <div style={{ position: 'absolute', inset: -2, background: 'linear-gradient(135deg, var(--primary), #3B82F6)', borderRadius: '50%', opacity: 0.5 }}></div>
                <img src={avatar} style={{ position: 'relative', width: 48, height: 48, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} alt="avatar" />
                <div style={{ position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, background: '#10b981', borderRadius: '50%', border: '2px solid #090a0f' }}></div>
              </motion.div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.username || 'User'}</div>
                <div style={{ fontSize: 10, color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email || ''}</div>
              </div>
            </div>
            
            {user?.bio && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginTop: 12, padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.04)' }}
              >
                <p style={{ margin: 0, fontSize: 11, color: '#cbd5e1', fontStyle: 'italic', lineHeight: '1.4' }}>"{user.bio}"</p>
              </motion.div>
            )}
            
            <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={showStats} 
                style={{ flex: 1, padding: '9px', borderRadius: 12, background: 'linear-gradient(135deg, var(--primary) 0%, #6d28d9 100%)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}
              >
                📊 Stats
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEditProfile} 
                style={{ flex: 1, padding: '9px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}
              >
                ✏️ Edit
              </motion.button>
            </div>
          </motion.div>

          {/* Search Members */}
          <div style={{ padding: '0 16px 15px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔍</div>
              <input 
                type="text" 
                placeholder="Search members..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: 12, background: '#12141c', color: '#fff', border: '1px solid rgba(255,255,255,0.08)', fontSize: 12, outline: 'none' }}
              />
            </div>
          </div>

          {/* Active Members Section */}
          <div style={{ padding: '0 16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px 10px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#6b7280', letterSpacing: 1.5 }}>👥 ACTIVE MEMBERS</div>
              <div style={{ fontSize: 10, color: '#6b7280' }}>{filteredUsers.length} online</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <AnimatePresence>
                {filteredUsers.slice(0, 20).map((u, index) => (
                  <motion.div 
                    key={u._id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.02 }}
                    whileHover={{ x: 5, background: 'rgba(139,92,246,0.1)' }}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 10, 
                      padding: '8px 12px', 
                      borderRadius: 12, 
                      background: u.email === MY_EMAIL ? 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(239,68,68,0.05) 100%)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={() => setHoveredUser(u._id)}
                    onMouseLeave={() => setHoveredUser(null)}
                  >
                    <div style={{ position: 'relative' }}>
                      <img 
                        src={u.profilePicture ? `${BASE}${u.profilePicture}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(u.username || 'User')}&background=${u.email === MY_EMAIL ? 'ef4444' : '8B5CF6'}&color=fff&size=24&rounded=true`} 
                        style={{ width: 28, height: 28, borderRadius: '50%' }} 
                        alt={u.username || 'User'} 
                      />
                      <span style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, background: '#10b981', borderRadius: '50%', border: '1px solid #090a0f' }}></span>
                    </div>
                    <span style={{ fontSize: 12, color: '#d1d5db', flex: 1, fontWeight: hoveredUser === u._id ? 700 : 400 }}>{u.username || 'Unknown User'}</span>
                    {u.email === MY_EMAIL && (
                      <span style={{ fontSize: 9, background: 'rgba(239,68,68,0.2)', color: '#ef4444', padding: '2px 6px', borderRadius: 10 }}>You</span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredUsers.length === 0 && !loadingUsers && (
                <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontSize: 12 }}>
                  No members found
                </div>
              )}
              {loadingUsers && (
                <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontSize: 12 }}>
                  Loading members...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Section - Always Visible */}
        <div style={{ 
          padding: '16px', 
          background: 'linear-gradient(180deg, rgba(9,10,15,0.95) 0%, #090a0f 100%)', 
          borderTop: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
          flexShrink: 0
        }}>
          <div style={{ padding: 12, borderRadius: 16, background: 'rgba(18,20,28,0.8)', marginBottom: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--primary)', marginBottom: 10, textAlign: 'center', letterSpacing: 1.5 }}>🎨 THEME STUDIO</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 10 }}>
              {themeColors.map(t => (
                <motion.button 
                  key={t.key} 
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setColor(t.key)} 
                  style={{ 
                    width: 28, 
                    height: 28, 
                    borderRadius: '50%', 
                    background: t.hex, 
                    border: color === t.key ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)', 
                    cursor: 'pointer',
                    boxShadow: color === t.key ? `0 0 0 2px ${t.hex}` : 'none'
                  }} 
                  title={t.name}
                />
              ))}
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleTheme} 
              style={{ width: '100%', padding: '10px', borderRadius: 12, background: 'linear-gradient(135deg, var(--primary) 0%, #6d28d9 100%)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}
            >
              {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </motion.button>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout} 
            style={{ width: '100%', padding: '12px', borderRadius: 14, background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'all 0.3s' }}
          >
            🚪 Logout Session
          </motion.button>
        </div>
      </motion.aside>

      <style>{`
        .active-members-scrollbar::-webkit-scrollbar { width: 4px; }
        .active-members-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .active-members-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(135deg, var(--primary) 0%, #6d28d9 100%); border-radius: 10px; }
        .active-members-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--primary); }
        
        .premium-studio-border { 
          border: 1px solid rgba(255,255,255,0.15) !important; 
          border-radius: 28px !important;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8) !important;
          backdrop-filter: blur(20px);
        }
        
        .premium-confirm-btn {
          background: linear-gradient(135deg, var(--primary) 0%, #6d28d9 100%) !important;
          transition: all 0.3s !important;
          font-weight: 800 !important;
          letter-spacing: 1px !important;
        }
        
        .premium-confirm-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 25px -5px rgba(139,92,246,0.4) !important;
        }
        
        .premium-cancel-btn {
          transition: all 0.3s !important;
          font-weight: 700 !important;
        }
        
        .premium-cancel-btn:hover {
          transform: translateY(-2px) !important;
          background: #374151 !important;
        }
        
        @media (max-width: 992px) {
          .mobile-top-nav { display: flex !important; }
          .main-responsive-sidebar { 
            transform: translateX(-100%); 
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .main-responsive-sidebar.mobile-open { 
            transform: translateX(0);
            box-shadow: 10px 0 40px rgba(0,0,0,0.5);
          }
        }
      `}</style>
    </>
  );
}