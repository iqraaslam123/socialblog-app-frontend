

// second last
// import { useState } from 'react';
// import CreatePost from '../components/Posts/CreatePost';
// import PostList from '../components/Posts/PostList';

// export default function Home() {
//   const [newPost, setNewPost] = useState(null);

//   return (
//     <div className="home-super-wrapper" style={{
//       display: 'flex',
//       width: '100% !important',  // Overrides any parent restriction
//       maxWidth: '1400px',
//       margin: '0 auto',
//       gap: '30px',
//       padding: '20px',
//       boxSizing: 'border-box',
//     }}>
      
//       {/* 1. MIDDLE BLOG/POST FEED (Maximized Width Engine) */}
//       <div className="main-blog-feed-stream" style={{
//         flex: '1 1 70%',         // Takes 70% of available space to make blogs look massive
//         width: '100%',
//         minWidth: '320px',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '24px'
//       }}>
//         <CreatePost onPostCreated={post => setNewPost(post)} />
//         <div className="blog-scroll-aos">
//           <PostList newPost={newPost} />
//         </div>
//       </div>

//       {/* 2. RIGHT SIDEBAR (100% BlogApp Related Features) */}
//       <div className="blogapp-right-sidebar" style={{
//         flex: '0 0 350px',       // Perfect fixed desktop sidebar width
//         width: '350px',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '24px',
//         height: 'fit-content',
//         position: 'sticky',
//         top: '20px'
//       }}>
        
//         {/* CARD 1: BLOG CREATOR PERFORMANCE ANALYTICS */}
//         <div className="blog-premium-card red-glow" style={{
//           background: '#121214',
//           border: '1px solid rgba(244, 63, 94, 0.25)',
//           borderRadius: '20px',
//           padding: '22px',
//           boxShadow: '0 0 25px rgba(244, 63, 94, 0.08)',
//         }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//             <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#fff', letterSpacing: '0.3px' }}>📊 Blog Studio Analytics</h3>
//             <span style={{ color: '#f43f5e', fontSize: '11px', background: 'rgba(244,63,94,0.12)', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>This Week</span>
//           </div>
          
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
//             <div style={{ background: '#18181b', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
//               <div style={{ fontSize: '11px', color: '#858599' }}>Total Reads</div>
//               <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginTop: '4px' }}>48.2k</div>
//             </div>
//             <div style={{ background: '#18181b', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
//               <div style={{ fontSize: '11px', color: '#858599' }}>Avg. Read Time</div>
//               <div style={{ fontSize: '18px', fontWeight: 700, color: '#38bdf8', marginTop: '4px' }}>4.5 min</div>
//             </div>
//           </div>
//         </div>

//         {/* CARD 2: TRENDING BLOG TOPICS & KEYWORDS */}
//         <div className="blog-premium-card purple-glow" style={{
//           background: '#121214',
//           border: '1px solid rgba(139, 92, 246, 0.25)',
//           borderRadius: '20px',
//           padding: '22px',
//           boxShadow: '0 0 25px rgba(139, 92, 246, 0.08)',
//         }}>
//           <h4 style={{ margin: '0 0 16px 0', fontSize: '14.5px', color: '#fff', fontWeight: 700 }}>🔥 Trending Articles</h4>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//             <div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#cbd5e1', marginBottom: '6px' }}>
//                 <span>🚀 Architecture Scalability</span>
//                 <span style={{ color: '#a78bfa', fontWeight: 600 }}>Hot</span>
//               </div>
//               <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
//                 <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #ec4899)', borderRadius: '3px' }} />
//               </div>
//             </div>
//             <div>
//               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#cbd5e1', marginBottom: '6px' }}>
//                 <span>⚡ Node.js Cluster Optimization</span>
//                 <span style={{ color: '#6b7280' }}>7.1k views</span>
//               </div>
//               <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
//                 <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', borderRadius: '3px' }} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CARD 3: TOP BLOG WRITERS / AUTHORS */}
//         <div className="blog-premium-card blue-glow" style={{
//           background: '#121214',
//           border: '1px solid rgba(56, 189, 248, 0.25)',
//           borderRadius: '20px',
//           padding: '22px',
//           boxShadow: '0 0 25px rgba(56, 189, 248, 0.08)',
//         }}>
//           <h4 style={{ margin: '0 0 14px 0', fontSize: '14.5px', color: '#fff', fontWeight: 700 }}>✍️ Verified Pro Authors</h4>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(45deg, #f43f5e, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>ME</div>
//               <div>
//                 <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>MERN Expert</div>
//                 <div style={{ fontSize: '11px', color: '#6b7280' }}>24 Articles published</div>
//               </div>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(45deg, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>TS</div>
//               <div>
//                 <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Tech Savvy</div>
//                 <div style={{ fontSize: '11px', color: '#6b7280' }}>18 Articles published</div>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* CORE FORCEFUL RESPONSIVE CSS INJECTION */}
//       <style>{`
//         /* Desktop layout overrides if parent layout has limits */
//         .home-super-wrapper {
//           flex: 1 !important;
//         }

//         /* Responsive Mechanics to Fix Mobile/Small Screen View */
//         @media (max-width: 1200px) {
//           .blogapp-right-sidebar {
//             display: none !important; /* Hide sidebar on small laptops to save space */
//           }
//         }

//         @media (max-width: 768px) {
//           .home-super-wrapper {
//             flex-direction: column !important;
//             padding: 10px !important;
//           }
//           .main-blog-feed-stream {
//             flex: 1 1 100% !important;
//             width: 100% !important;
//             display: flex !important; /* Force displays the feed on mobile */
//             visibility: visible !important;
//             opacity: 1 !important;
//           }
//         }

//         /* Smooth Micro-animations */
//         .blog-premium-card {
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }
//         .blog-premium-card:hover {
//           transform: translateY(-4px);
//           background: #151518 !important;
//         }
//         .red-glow:hover { box-shadow: 0 12px 30px rgba(244, 63, 94, 0.18) !important; border-color: #f43f5e !important; }
//         .purple-glow:hover { box-shadow: 0 12px 30px rgba(139, 92, 246, 0.18) !important; border-color: #8b5cf6 !important; }
//         .blue-glow:hover { box-shadow: 0 12px 30px rgba(56, 189, 248, 0.18) !important; border-color: #38bdf8 !important; }

//         .blog-scroll-aos {
//           animation: fadeUpBlog 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//         }
//         @keyframes fadeUpBlog {
//           from { opacity: 0; transform: translateY(25px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// }

// new
import { useState } from 'react';
import CreatePost from '../components/Posts/CreatePost';
import PostList from '../components/Posts/PostList';

export default function Home() {
  const [newPost, setNewPost] = useState(null);

  return (
    <div className="home-super-wrapper" style={{
      display: 'flex',
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      gap: '30px',
      padding: '10px 20px 20px 20px',
      boxSizing: 'border-box',
    }}>
      
      {/* 1. MIDDLE BLOG/POST FEED (Maximized Width & No Layout Glitch) */}
      <div className="main-blog-feed-stream" style={{
        flex: '1 1 0%',          // Ensures it dynamically consumes remaining layout context gracefully
        width: '100%',
        minWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <CreatePost onPostCreated={post => setNewPost(post)} />
        <div className="blog-scroll-aos">
          <PostList newPost={newPost} />
        </div>
      </div>

      {/* 2. RIGHT SIDEBAR (With Premium Sequential Ad-Like Sequential Animations) */}
      <div className="blogapp-right-sidebar" style={{
        flex: '0 0 350px',       
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        height: 'fit-content',
        position: 'sticky',
        top: '24px'
      }}>
        
        {/* CARD 1: BLOG CREATOR PERFORMANCE ANALYTICS */}
        <div className="blog-premium-card red-glow ad-card-seq-1" style={{
          background: '#121214',
          border: '1px solid rgba(244, 63, 94, 0.25)',
          borderRadius: '20px',
          padding: '22px',
          boxShadow: '0 0 25px rgba(244, 63, 94, 0.08)',
        }}>
          <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#fff', letterSpacing: '0.3px' }}>📊 Blog Studio Analytics</h3>
            <span style={{ color: '#f43f5e', fontSize: '11px', background: 'rgba(244,63,94,0.12)', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>This Week</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
            <div style={{ background: '#18181b', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <div style={{ fontSize: '11px', color: '#858599' }}>Total Reads</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginTop: '4px' }}>48.2k</div>
            </div>
            <div style={{ background: '#18181b', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <div style={{ fontSize: '11px', color: '#858599' }}>Avg. Read Time</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#38bdf8', marginTop: '4px' }}>4.5 min</div>
            </div>
          </div>
        </div>

        {/* CARD 2: TRENDING BLOG TOPICS & KEYWORDS */}
        <div className="blog-premium-card purple-glow ad-card-seq-2" style={{
          background: '#121214',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          borderRadius: '20px',
          padding: '22px',
          boxShadow: '0 0 25px rgba(139, 92, 246, 0.08)',
        }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '14.5px', color: '#fff', fontWeight: 700 }}>🔥 Trending Articles</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#cbd5e1', marginBottom: '6px' }}>
                <span>🚀 Architecture Scalability</span>
                <span style={{ color: '#a78bfa', fontWeight: 600 }}>Hot</span>
              </div>
              <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #ec4899)', borderRadius: '3px' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#cbd5e1', marginBottom: '6px' }}>
                <span>⚡ Node.js Cluster Optimization</span>
                <span style={{ color: '#6b7280' }}>7.1k views</span>
              </div>
              <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', borderRadius: '3px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: TOP BLOG WRITERS / AUTHORS */}
        <div className="blog-premium-card blue-glow ad-card-seq-3" style={{
          background: '#121214',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '20px',
          padding: '22px',
          boxShadow: '0 0 25px rgba(56, 189, 248, 0.08)',
        }}>
          <h4 style={{ margin: '0 0 14px 0', fontSize: '14.5px', color: '#fff', fontWeight: 700 }}>✍️ Verified Pro Authors</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(45deg, #f43f5e, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>ME</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>MERN Expert</div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>24 Articles published</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(45deg, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>TS</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Tech Savvy</div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>18 Articles published</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* CORE FORCEFUL RESPONSIVE & AD-STAGE SEQUENTIAL CSS */}
      <style>{`
   
      
        .home-super-wrapper {
          flex: 1 !important;
        }

        /* 🎬 Advanced Ad-Style Staggered Sequential Entrance Animations */
        .ad-card-seq-1 {
          opacity: 0;
          animation: premiumAdEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }
        .ad-card-seq-2 {
          opacity: 0;
          animation: premiumAdEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards; /* Shows shortly after */
        }
        .ad-card-seq-3 {
          opacity: 0;
          animation: premiumAdEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.3s forwards; /* Shows last */
        }

        @keyframes premiumAdEntrance {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        /* Responsive Layout Balancing */
        @media (max-width: 1200px) {
          .blogapp-right-sidebar {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .home-super-wrapper {
            flex-direction: column !important;
            padding: 10px !important;
          }
          .main-blog-feed-stream {
            width: 100% !important;
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
        }

        .blog-premium-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .blog-premium-card:hover {
          transform: translateY(-4px) !important;
          background: #151518 !important;
        }
        .red-glow:hover { box-shadow: 0 12px 30px rgba(244, 63, 94, 0.18) !important; border-color: #f43f5e !important; }
        .purple-glow:hover { box-shadow: 0 12px 30px rgba(139, 92, 246, 0.18) !important; border-color: #8b5cf6 !important; }
        .blue-glow:hover { box-shadow: 0 12px 30px rgba(56, 189, 248, 0.18) !important; border-color: #38bdf8 !important; }

        .blog-scroll-aos {
          animation: fadeUpBlog 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeUpBlog {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}