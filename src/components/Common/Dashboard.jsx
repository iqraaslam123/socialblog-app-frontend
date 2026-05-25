// import React, { useState, useEffect } from 'react';
// import Sidebar from './components/Sidebar';
// import EditProfileModal from './components/EditProfileModal';
// import axios from 'axios'; // Or your custom Axios instance

// const Dashboard = () => {
//   const [user, setUser] = useState({
//     username: 'student',
//     email: 'student@gmail.com',
//     bio: 'MERN Stack Developer',
//     avatar: '', // URL string or empty
//     stats: { posts: 14, followers: '2.1K', likes: 492 }
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Fetch current logged-in user data on mount
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get('/api/users/profile');
//         if (res.data) setUser(res.data);
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//       }
//     };
//     fetchUserData();
//   }, []);

//   // Handle Backend Update
//   const handleUpdateProfile = async (updatedData) => {
//     try {
//       // Example Endpoint: Match your backend setup
//       const res = await axios.put('/api/users/profile/update', updatedData);
      
//       // Update local state instantly on success
//       setUser(prev => ({
//         ...prev,
//         username: res.data.username,
//         bio: res.data.bio,
//         avatar: res.data.avatar
//       }));
      
//       setIsModalOpen(false); // Close modal automatically
//     } catch (err) {
//       console.error("Failed to update profile on backend:", err);
//       alert("Error saving changes. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#090b11] text-gray-100 flex flex-col md:flex-row relative overflow-x-hidden">
      
//       {/* 1. Mobile Top Navbar Header */}
//       <header className="md:hidden flex items-center justify-between bg-[#0e111a] border-b border-gray-800/60 px-5 py-4 sticky top-0 z-40 w-full">
//         <div className="flex items-center gap-2">
//           <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
//           <span className="font-bold tracking-wider text-sm bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//             SocialApp
//           </span>
//         </div>
//         <button 
//           onClick={() => setIsSidebarOpen(true)}
//           className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
//         >
//           {/* Custom Sleek Menu Icon */}
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//           </svg>
//         </button>
//       </header>

//       {/* 2. Responsive Sidebar */}
//       <Sidebar 
//         user={user} 
//         isOpen={isSidebarOpen} 
//         setIsOpen={setIsSidebarOpen} 
//         onEditClick={() => setIsModalOpen(true)} 
//       />

//       {/* 3. Main Dynamic Content Stream */}
//       <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full transition-all duration-300">
//         {/* Your Feed / Blog Posts go here */}
//         <div className="border border-dashed border-gray-800 rounded-2xl h-96 flex items-center justify-center text-gray-500">
//           Main Application Feed Area
//         </div>
//       </main>

//       {/* 4. Edit Profile Modal Popup */}
//       {isModalOpen && (
//         <EditProfileModal 
//           user={user} 
//           onClose={() => setIsModalOpen(false)} 
//           onSave={handleUpdateProfile} 
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard;