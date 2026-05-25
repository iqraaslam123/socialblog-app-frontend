// import React, { useState } from 'react';
// // 🟢 FIXED: Absolute URL routing mechanisms for dynamic component layouts
// import Sidebar from '../components/Common/Sidebar';
// import PostList from '../components/Posts/PostList';

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState('feed');
  
//   // 💡 Note: LocalStorage ya Auth Context se logged-in user ki ID nikalen
//   const currentUserId = localStorage.getItem('userId') || "Aapki_User_ID"; 

//   return (
//     <div className="flex bg-[#0b0f19] min-h-screen text-slate-100">
//       {/* Sidebar Navigation */}
//       <Sidebar setActiveTab={setActiveTab} currentUserId={currentUserId} />

//       {/* Main Container Area */}
//       <main className="flex-1 pl-72 pr-8 py-8">
        
//         {/* 1. Main Home Feed */}
//         {activeTab === 'feed' && (
//           <div>
//             <h1 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
//               Trending Feed
//             </h1>
//             <PostList fetchType="all" currentUserId={currentUserId} />
//           </div>
//         )}

//         {/* 2. Bookmarks Tab */}
//         {activeTab === 'bookmarks' && (
//           <div>
//             <h1 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center gap-2">
//               <span>🔖</span> Bookmarked Blogs
//             </h1>
//             <PostList fetchType="bookmarks" currentUserId={currentUserId} />
//           </div>
//         )}

//         {/* 3. Starred Tab */}
//         {activeTab === 'starred' && (
//           <div>
//             <h1 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 flex items-center gap-2">
//               <span>⭐</span> Starred Masterpieces
//             </h1>
//             <PostList fetchType="starred" currentUserId={currentUserId} />
//           </div>
//         )}
        
//       </main>
//     </div>
//   );
// };

// export default Dashboard;