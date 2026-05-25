

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useAuth } from '../../context/AuthContext';
// import CommentSection from '../Comments/CommentSection';

// const API = import.meta.env.VITE_API_URL;
// const BASE = import.meta.env.VITE_SOCKET_URL;

// export default function PostCard({ post, onDelete, onUpdate }) {
//   const { user } = useAuth();
//   const [likes, setLikes] = useState(post.likes || []);
//   const [showComments, setShowComments] = useState(false);
//   const [showReactionTray, setShowReactionTray] = useState(false);
  
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [activeReaction, setActiveReaction] = useState(likes.includes(user?._id) ? '❤️' : null);

//   const handleReactionSelect = async (emojiType) => {
//     try {
//       const { data } = await axios.post(`${API}/posts/${post._id}/like`, { reactionType: emojiType });
//       setLikes(data.likes);
//       setActiveReaction(emojiType);
//       setShowReactionTray(false);
      
//       Swal.fire({ toast: true, position: 'top-end', icon: 'success',
//         title: `${emojiType} Reaction Sync Successfully`, showConfirmButton: false, timer: 1200 });
//     } catch (err) { console.error(err); }
//   };

//   const handleDelete = async () => {
//     const r = await Swal.fire({ title: 'Delete post permanently?', icon: 'warning',
//       showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#6b7280', confirmButtonText: 'Delete' });
//     if (!r.isConfirmed) return;
//     try {
//       await axios.delete(`${API}/posts/${post._id}`);
//       onDelete(post._id);
//       Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Post Deleted!', showConfirmButton: false, timer: 1500 });
//     } catch (err) { console.error(err); }
//   };

//   const handleEdit = async () => {
//     const { value } = await Swal.fire({
//       title: 'Edit Post Studio', input: 'textarea', inputValue: post.text || '',
//       inputAttributes: { rows: 4, placeholder: 'Modify content grid...' },
//       showCancelButton: true, confirmButtonColor: '#2563eb', confirmButtonText: 'Save Changes'
//     });
//     if (value === undefined) return;
//     try {
//       const fd = new FormData();
//       fd.append('text', value);
//       const { data } = await axios.put(`${API}/posts/${post._id}`, fd);
//       onUpdate(data);
//       Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: '✅ Post Updated!', showConfirmButton: false, timer: 1500 });
//     } catch { Swal.fire({ icon: 'error', title: 'Failed' }); }
//   };

//   const handleNativeShare = async () => {
//     const shareData = {
//       title: post.text ? post.text.substring(0, 30) + '...' : 'MERN Post Ecosystem',
//       text: 'Check out this post on our platform!',
//       url: `${window.location.origin}/posts/${post._id}`
//     };

//     if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) { console.log("Native share dismiss:", err); }
//     } else {
//       try {
//         await navigator.clipboard.writeText(shareData.url);
//         Swal.fire({ toast: true, position: 'top-end', icon: 'success',
//           title: '🔗 Post Link Copied to Clipboard!', showConfirmButton: false, timer: 1800 });
//       } catch (err) { console.error("Clipboard failure:", err); }
//     }
//   };

//   const renderAdvancedTextMatrix = (textInput) => {
//     if (!textInput) return null;
//     let processedText = textInput
//       .replace(/\[Professional Perspective\]/g, '\n[Professional Perspective]\n')
//       .replace(/🔥/g, '\n🔥')
//       .replace(/💡 TL;DR:/g, '\n💡 TL;DR:\n')
//       .replace(/•/g, '\n• ')
//       .replace(/👉/g, '\n👉')
//       .replace(/\[AI Expansion\]:/g, '\n[AI Expansion]:\n');

//     const textLines = processedText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

//     return textLines.map((line, idx) => {
//       if (line.startsWith('🔥') || line.includes('CRITICAL INSIGHT')) {
//         return <div key={idx} style={{ background: 'rgba(245,158,11,0.08)', borderLeft: '4px solid #f59e0b', padding: '14px', borderRadius: '4px 12px 12px 4px', margin: '14px 0', color: '#fbbf24', fontWeight: 'bold', fontSize: '14.5px' }}>{line}</div>;
//       }
//       if (line.startsWith('[Professional Perspective]')) {
//         return <div key={idx} style={{ background: 'rgba(16,185,129,0.06)', borderLeft: '4px solid #10b981', color: '#34d399', fontWeight: '700', fontSize: '13px', padding: '10px', borderRadius: '4px', margin: '12px 0' }}>{line}</div>;
//       }
//       if (line.startsWith('[AI Expansion]:')) {
//         return <div key={idx} style={{ background: 'rgba(59,130,246,0.07)', borderLeft: '4px solid #3b82f6', color: '#60a5fa', fontWeight: '700', fontSize: '13px', padding: '10px', borderRadius: '4px', margin: '12px 0' }}>{line}</div>;
//       }
//       if (line.includes('💡 TL;DR:')) {
//         return <h4 key={idx} style={{ background: 'rgba(139,92,246,0.08)', borderLeft: '4px solid #8b5cf6', color: '#c084fc', fontSize: '14px', fontWeight: 'bold', margin: '16px 0 8px 0', padding: '10px', borderRadius: '4px' }}>{line}</h4>;
//       }
//       if (line.startsWith('•')) {
//         return <div key={idx} style={{ paddingLeft: '12px', color: '#cbd5e1', display: 'flex', gap: '8px', margin: '6px 0', fontSize: '14px' }}><span style={{ color: '#a78bfa' }}>•</span>{line.replace(/^•\s*/, '')}</div>;
//       }
//       if (line.startsWith('👉') || line.includes('thoughts')) {
//         return <div key={idx} style={{ color: '#facc15', fontWeight: '600', padding: '12px', background: 'rgba(250,204,21,0.04)', borderRadius: '8px', borderLeft: '4px solid #facc15', margin: '14px 0', fontSize: '14px' }}>{line}</div>;
//       }
//       return <p key={idx} style={{ color: 'var(--text)', fontSize: '14.5px', lineHeight: '1.6', margin: '8px 0' }}>{line}</p>;
//     });
//   };

//   const avatarUrl = post.author.profilePicture
//     ? `${BASE}${post.author.profilePicture}`
//     : `https://ui-avatars.com/api/?name=${post.author.username}&background=random&color=fff`;

//   return (
//     <div className="premium-postcard" style={{ 
//       background: 'var(--card-bg)', 
//       border: '1px solid var(--border)', 
//       borderRadius: 20, 
//       marginBottom: 20, 
//       overflow: 'hidden', 
//       color: 'var(--text)',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
//     }}>
      
//       {/* Header Pipeline */}
//       <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px' }}>
//         <Link to={`/profile/${post.author._id}`}>
//           <img src={avatarUrl} style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)', transition: 'transform 0.2s' }} onMouseEnter={e => e.target.style.transform = 'scale(1.08)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} alt="avatar" />
//         </Link>
        
//         <div style={{ flex: 1 }}>
//           <Link to={`/profile/${post.author._id}`} style={{ fontWeight: 700, fontSize: 15.5, color: 'var(--text)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'var(--text)'}>
//             {post.author.username}
//           </Link>
//           <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>
//             {new Date(post.createdAt).toLocaleString()}
//           </div>
//         </div>

//         {/* UTILITY MATRIX */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//           <button 
//             onClick={() => {
//               setIsFavourite(!isFavourite);
//               Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: !isFavourite ? '⭐ Added to Favourites' : 'Removed from Favourites', showConfirmButton: false, timer: 1500 });
//             }}
//             style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: isFavourite ? '#facc15' : '#6b7280', transition: 'transform 0.2s' }}
//             onMouseEnter={e => e.target.style.transform = 'scale(1.2)'}
//             onMouseLeave={e => e.target.style.transform = 'scale(1)'}
//           >
//             {isFavourite ? '★' : '☆'}
//           </button>

//           <button 
//             onClick={() => {
//               setIsBookmarked(!isBookmarked);
//               Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: !isBookmarked ? '🔖 Post Bookmarked Successfully' : 'Bookmark Removed', showConfirmButton: false, timer: 1500 });
//             }}
//             style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: isBookmarked ? '#3b82f6' : '#6b7280', transition: 'transform 0.2s' }}
//             onMouseEnter={e => e.target.style.transform = 'scale(1.2)'}
//             onMouseLeave={e => e.target.style.transform = 'scale(1)'}
//           >
//             {isBookmarked ? '🔖' : '📑'}
//           </button>

//           {user?._id === post.author._id && (
//             <div style={{ display: 'flex', gap: 8 }}>
//               <button onClick={handleEdit} style={{ padding: '6px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'var(--accent)', color: 'var(--secondary)', fontWeight: 600, fontSize: 12, transition: 'opacity 0.2s' }} onMouseEnter={e => e.target.style.opacity = 0.8} onMouseLeave={e => e.target.style.opacity = 1}>
//                 ✏️ Edit
//               </button>
//               <button onClick={handleDelete} style={{ padding: '6px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', background: '#fee2e2', color: '#ef4444', fontWeight: 600, fontSize: 12, transition: 'opacity 0.2s' }} onMouseEnter={e => e.target.style.opacity = 0.8} onMouseLeave={e => e.target.style.opacity = 1}>
//                 🗑️
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Advanced Visual Render Block */}
//       {post.text && (
//         <div style={{ padding: '0 20px 16px', fontSize: 15, lineHeight: 1.6, color: 'var(--text)' }}>
//           {renderAdvancedTextMatrix(post.text)}
//         </div>
//       )}

//       {/* Image Block */}
//       {post.image && (
//         <div style={{ overflow: 'hidden', background: '#000' }}>
//           <img src={`${BASE}${post.image}`} alt="post" style={{ width: '100%', maxHeight: 450, objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }} className="post-media" />
//         </div>
//       )}

//       {/* Real-time Interaction Bar Workspace */}
//       <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '14px 20px', borderTop: '1px solid var(--border)', position: 'relative', background: 'rgba(255,255,255,0.01)' }}>
        
//         <div 
//           onMouseEnter={() => setShowReactionTray(true)} 
//           onMouseLeave={() => setShowReactionTray(false)}
//           style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
//         >
//           <button 
//             onClick={() => handleReactionSelect('❤️')}
//             style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5, fontWeight: 600, color: activeReaction ? 'var(--primary)' : 'var(--text-muted)' }}
//           >
//             <span style={{ fontSize: 18, transition: 'transform 0.2s' }} className="like-icon">{activeReaction || '🤍'}</span> {likes.length}
//           </button>

//           {showReactionTray && (
//             <div style={{ position: 'absolute', bottom: '32px', left: '-10px', background: '#18181b', border: '1px solid var(--border)', borderRadius: '24px', padding: '8px 16px', display: 'flex', gap: '14px', zIndex: 999, boxShadow: '0 12px 36px rgba(0,0,0,0.5)', animation: 'popTray 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
//               {['❤️'].map((emo) => (
//                 <span 
//                   key={emo} 
//                   onClick={() => handleReactionSelect(emo)} 
//                   style={{ fontSize: '22px', cursor: 'pointer', transition: 'transform 0.15s', display: 'inline-block' }}
//                   onMouseEnter={(e) => e.target.style.transform = 'scale(1.35) translateY(-4px)'}
//                   onMouseLeave={(e) => e.target.style.transform = 'scale(1) translateY(0)'}
//                 >
//                   {emo}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>

//         <button onClick={() => setShowComments(p => !p)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5, fontWeight: 600, color: showComments ? 'var(--primary)' : 'var(--text-muted)' }}>
//           💬 Comment
//         </button>

//         <button 
//           onClick={handleNativeShare}
//           style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5, fontWeight: 700, color: '#38bdf8', transition: 'transform 0.2s' }}
//           onMouseEnter={(e) => e.target.style.transform = 'translateX(3px)'}
//           onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
//         >
//           🔗 Share
//         </button>
//       </div>

//       {showComments && <CommentSection postId={post._id} />}

//       {/* CSS Effects & Animations Injected */}
//       {/* <style>{`
//         .premium-postcard:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 12px 30px rgba(244, 63, 94, 0.15), 0 4px 20px rgba(0,0,0,0.2); 
//           border-color: rgba(244, 63, 94, 0.4) !important;
//         }
//         .premium-postcard:hover .post-media {
//           transform: scale(1.02);
//         }
//         @keyframes popTray {
//           from { opacity: 0; transform: translateY(10px) scale(0.9); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }
//       `}</style> */}
//       <style>{`
//   .premium-postcard:hover {
//     transform: translateY(-5px) scale(1.01);
//     box-shadow: 0 0 30px rgba(244, 63, 94, 0.25), 0 10px 20px rgba(0, 0, 0, 0.4); 
//     border-color: #f43f5e !important; /* Pure red/pink glowing border on hover */
//   }
//   .premium-postcard {
//     box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important; /* Dark theme card depth */
//   }
// `}</style>
//     </div>
//   );
// }

// // import { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import axios from 'axios';
// // import Swal from 'sweetalert2';
// // import { useAuth } from '../../context/AuthContext';
// // import CommentSection from '../Comments/CommentSection';

// // const API = import.meta.env.VITE_API_URL;
// // const BASE = import.meta.env.VITE_SOCKET_URL;

// // export default function PostCard({ post, onDelete, onUpdate }) {
// //   const { user } = useAuth();
// //   const [likes, setLikes] = useState(post.likes || []);
// //   const [showComments, setShowComments] = useState(false);
// //   const [showReactionTray, setShowReactionTray] = useState(false);
  
// //   // States sync with local status or arrays
// //   const [isBookmarked, setIsBookmarked] = useState(post.bookmarks?.includes(user?._id) || false);
// //   const [isFavourite, setIsFavourite] = useState(post.stars?.includes(user?._id) || false);
// //   const [activeReaction, setActiveReaction] = useState(likes.includes(user?._id) ? '❤️' : null);

// //   // 1. LIKE ENGINE WITH NOTIFICATION SYNCHRONIZER
// //   const handleReactionSelect = async (emojiType) => {
// //     try {
// //       const { data } = await axios.post(`${API}/posts/${post._id}/like`, { reactionType: emojiType });
// //       setLikes(data.likes);
// //       setActiveReaction(likes.includes(user?._id) ? null : '❤️'); // Toggle heart filled state
// //       setShowReactionTray(false);
// //     } catch (err) { 
// //       console.error(err); 
// //     }
// //   };

// //   // 2. TEXT SHARE ENGINE WITH BACKEND NOTIFICATION TRIGGER
// //   const handleNativeShare = async () => {
// //     try {
// //       if (!post.text) {
// //         Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: 'No text to copy!', showConfirmButton: false, timer: 1500 });
// //         return;
// //       }
      
// //       // Copies the actual raw post text beautifully rather than localhost URLs
// //       await navigator.clipboard.writeText(post.text);
      
// //       Swal.fire({ 
// //         toast: true, 
// //         position: 'top-end', 
// //         icon: 'success',
// //         title: '📋 Post Text Copied to Clipboard!', 
// //         showConfirmButton: false, 
// //         timer: 1800 
// //       });

// //       // Hit backend tracker to create notification for post author
// //       await axios.post(`${API}/posts/${post._id}/share-trigger`);
// //     } catch (err) { 
// //       console.error("Clipboard failure:", err); 
// //     }
// //   };

// //   // 3. BOOKMARK TOGGLE & NOTIFICATION ENGINE
// //   const handleBookmarkToggle = async () => {
// //     try {
// //       const nextState = !isBookmarked;
// //       setIsBookmarked(nextState);

// //       Swal.fire({ 
// //         toast: true, 
// //         position: 'top-end', 
// //         icon: 'success', 
// //         title: nextState ? '🔖 Post Bookmarked Successfully' : 'Bookmark Removed', 
// //         showConfirmButton: false, 
// //         timer: 1500 
// //       });

// //       // Notify Backend matrix database
// //       await axios.post(`${API}/posts/${post._id}/bookmark-trigger`);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // 4. STAR FAVOURITE TOGGLE & NOTIFICATION ENGINE
// //   const handleStarToggle = async () => {
// //     try {
// //       const nextState = !isFavourite;
// //       setIsFavourite(nextState);

// //       Swal.fire({ 
// //         toast: true, 
// //         position: 'top-end', 
// //         icon: 'success', 
// //         title: nextState ? '⭐ Added to Favourites' : 'Removed from Favourites', 
// //         showConfirmButton: false, 
// //         timer: 1500 
// //       });

// //       // Notify Backend matrix database
// //       await axios.post(`${API}/posts/${post._id}/star-trigger`);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     const r = await Swal.fire({ title: 'Delete post permanently?', icon: 'warning',
// //       showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#6b7280', confirmButtonText: 'Delete' });
// //     if (!r.isConfirmed) return;
// //     try {
// //       await axios.delete(`${API}/posts/${post._id}`);
// //       onDelete(post._id);
// //       Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Post Deleted!', showConfirmButton: false, timer: 1500 });
// //     } catch (err) { console.error(err); }
// //   };

// //   const handleEdit = async () => {
// //     const { value } = await Swal.fire({
// //       title: 'Edit Post Studio', input: 'textarea', inputValue: post.text || '',
// //       inputAttributes: { rows: 4, placeholder: 'Modify content grid...' },
// //       showCancelButton: true, confirmButtonColor: '#2563eb', confirmButtonText: 'Save Changes'
// //     });
// //     if (value === undefined) return;
// //     try {
// //       const fd = new FormData();
// //       fd.append('text', value);
// //       const { data } = await axios.put(`${API}/posts/${post._id}`, fd);
// //       onUpdate(data);
// //       Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: '✅ Post Updated!', showConfirmButton: false, timer: 1500 });
// //     } catch { Swal.fire({ icon: 'error', title: 'Failed' }); }
// //   };

// //   const renderAdvancedTextMatrix = (textInput) => {
// //     if (!textInput) return null;
// //     let processedText = textInput
// //       .replace(/\[Professional Perspective\]/g, '\n[Professional Perspective]\n')
// //       .replace(/🔥/g, '\n🔥')
// //       .replace(/💡 TL;DR:/g, '\n💡 TL;DR:\n')
// //       .replace(/•/g, '\n• ')
// //       .replace(/👉/g, '\n👉')
// //       .replace(/\[AI Expansion\]:/g, '\n[AI Expansion]:\n');

// //     const textLines = processedText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

// //     return textLines.map((line, idx) => {
// //       if (line.startsWith('🔥') || line.includes('CRITICAL INSIGHT')) {
// //         return <div key={idx} style={{ background: 'rgba(245,158,11,0.08)', borderLeft: '4px solid #f59e0b', padding: '14px', borderRadius: '4px 12px 12px 4px', margin: '12px 0', color: '#fbbf24', fontWeight: 'bold', fontSize: '14.5px' }}>{line}</div>;
// //       }
// //       if (line.startsWith('[Professional Perspective]')) {
// //         return <div key={idx} style={{ background: 'rgba(16,185,129,0.06)', borderLeft: '4px solid #10b981', color: '#34d399', fontWeight: '700', fontSize: '13px', padding: '10px', borderRadius: '4px', margin: '12px 0' }}>{line}</div>;
// //       }
// //       if (line.startsWith('[AI Expansion]:')) {
// //         return <div key={idx} style={{ background: 'rgba(59,130,246,0.07)', borderLeft: '4px solid #3b82f6', color: '#60a5fa', fontWeight: '700', fontSize: '13px', padding: '10px', borderRadius: '4px', margin: '12px 0' }}>{line}</div>;
// //       }
// //       if (line.includes('💡 TL;DR:')) {
// //         return <h4 key={idx} style={{ background: 'rgba(139,92,246,0.08)', borderLeft: '4px solid #8b5cf6', color: '#c084fc', fontSize: '14px', fontWeight: 'bold', margin: '16px 0 8px 0', padding: '10px', borderRadius: '4px' }}>{line}</h4>;
// //       }
// //       if (line.startsWith('•')) {
// //         return <div key={idx} style={{ paddingLeft: '12px', color: '#cbd5e1', display: 'flex', gap: '8px', margin: '6px 0', fontSize: '14px' }}><span style={{ color: '#a78bfa' }}>•</span>{line.replace(/^•\s*/, '')}</div>;
// //       }
// //       if (line.startsWith('👉') || line.includes('thoughts')) {
// //         return <div key={idx} style={{ color: '#facc15', fontWeight: '600', padding: '12px', background: 'rgba(250,204,21,0.04)', borderRadius: '8px', borderLeft: '4px solid #facc15', margin: '14px 0', fontSize: '14px' }}>{line}</div>;
// //       }
// //       return <p key={idx} style={{ color: 'var(--text)', fontSize: '14.5px', lineHeight: '1.6', margin: '8px 0' }}>{line}</p>;
// //     });
// //   };

// //   const avatarUrl = post.author.profilePicture
// //     ? `${BASE}${post.author.profilePicture}`
// //     : `https://ui-avatars.com/api/?name=${post.author.username}&background=random&color=fff`;

// //   return (
// //     <div className="premium-postcard" style={{ 
// //       background: 'var(--card-bg)', 
// //       border: '1px solid var(--border)', 
// //       borderRadius: 20, 
// //       marginBottom: 20, 
// //       overflow: 'hidden', 
// //       color: 'var(--text)',
// //       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
// //       boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
// //     }}>
      
// //       {/* Header Pipeline */}
// //       <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px' }}>
// //         <Link to={`/profile/${post.author._id}`}>
// //           <img src={avatarUrl} style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)', transition: 'transform 0.2s' }} onMouseEnter={e => e.target.style.transform = 'scale(1.08)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} alt="avatar" />
// //         </Link>
        
// //         <div style={{ flex: 1 }}>
// //           <Link to={`/profile/${post.author._id}`} style={{ fontWeight: 700, fontSize: 15.5, color: 'var(--text)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'var(--text)'}>
// //             {post.author.username}
// //           </Link>
// //           <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>
// //             {new Date(post.createdAt).toLocaleString()}
// //           </div>
// //         </div>

// //         {/* UTILITY MATRIX */}
// //         <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
// //           <button 
// //             onClick={handleStarToggle}
// //             style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: isFavourite ? '#facc15' : '#6b7280', transition: 'transform 0.2s' }}
// //             onMouseEnter={e => e.target.style.transform = 'scale(1.2)'}
// //             onMouseLeave={e => e.target.style.transform = 'scale(1)'}
// //           >
// //             {isFavourite ? '★' : '☆'}
// //           </button>

// //           <button 
// //             onClick={handleBookmarkToggle}
// //             style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: isBookmarked ? '#3b82f6' : '#6b7280', transition: 'transform 0.2s' }}
// //             onMouseEnter={e => e.target.style.transform = 'scale(1.2)'}
// //             onMouseLeave={e => e.target.style.transform = 'scale(1)'}
// //           >
// //             {isBookmarked ? '🔖' : '📑'}
// //           </button>

// //           {user?._id === post.author._id && (
// //             <div style={{ display: 'flex', gap: 8 }}>
// //               <button onClick={handleEdit} style={{ padding: '6px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'var(--accent)', color: 'var(--secondary)', fontWeight: 600, fontSize: 12, transition: 'opacity 0.2s' }} onMouseEnter={e => e.target.style.opacity = 0.8} onMouseLeave={e => e.target.style.opacity = 1}>
// //                 ✏️ Edit
// //               </button>
// //               <button onClick={handleDelete} style={{ padding: '6px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', background: '#fee2e2', color: '#ef4444', fontWeight: 600, fontSize: 12, transition: 'opacity 0.2s' }} onMouseEnter={e => e.target.style.opacity = 0.8} onMouseLeave={e => e.target.style.opacity = 1}>
// //                 🗑️
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Advanced Visual Render Block */}
// //       {post.text && (
// //         <div style={{ padding: '0 20px 16px', fontSize: 15, lineHeight: 1.6, color: 'var(--text)' }}>
// //           {renderAdvancedTextMatrix(post.text)}
// //         </div>
// //       )}

// //       {/* Image Block */}
// //       {post.image && (
// //         <div style={{ overflow: 'hidden', background: '#000' }}>
// //           <img src={`${BASE}${post.image}`} alt="post" style={{ width: '100%', maxHeight: 450, objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }} className="post-media" />
// //         </div>
// //       )}

// //       {/* Real-time Interaction Bar Workspace */}
// //       <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '14px 20px', borderTop: '1px solid var(--border)', position: 'relative', background: 'rgba(255,255,255,0.01)' }}>
        
// //         <div 
// //           onMouseEnter={() => setShowReactionTray(true)} 
// //           onMouseLeave={() => setShowReactionTray(false)}
// //           style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
// //         >
// //           <button 
// //             onClick={() => handleReactionSelect('❤️')}
// //             style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5, fontWeight: 600, color: activeReaction ? 'var(--primary)' : 'var(--text-muted)' }}
// //           >
// //             <span style={{ fontSize: 18, transition: 'transform 0.2s' }} className="like-icon">{activeReaction || '🤍'}</span> {likes.length}
// //           </button>

// //           {showReactionTray && (
// //             <div style={{ position: 'absolute', bottom: '32px', left: '-10px', background: '#18181b', border: '1px solid var(--border)', borderRadius: '24px', padding: '8px 16px', display: 'flex', gap: '14px', zIndex: 999, boxShadow: '0 12px 36px rgba(0,0,0,0.5)', animation: 'popTray 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
// //               {['❤️'].map((emo) => (
// //                 <span 
// //                   key={emo} 
// //                   onClick={() => handleReactionSelect(emo)} 
// //                   style={{ fontSize: '22px', cursor: 'pointer', transition: 'transform 0.15s', display: 'inline-block' }}
// //                   onMouseEnter={(e) => e.target.style.transform = 'scale(1.35) translateY(-4px)'}
// //                   onMouseLeave={(e) => e.target.style.transform = 'scale(1) translateY(0)'}
// //                 >
// //                   {emo}
// //                 </span>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         <button onClick={() => setShowComments(p => !p)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5, fontWeight: 600, color: showComments ? 'var(--primary)' : 'var(--text-muted)' }}>
// //           💬 Comment
// //         </button>

// //         <button 
// //           onClick={handleNativeShare}
// //           style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5, fontWeight: 700, color: '#38bdf8', transition: 'transform 0.2s' }}
// //           onMouseEnter={(e) => e.target.style.transform = 'translateX(3px)'}
// //           onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
// //         >
// //           🔗 Share
// //         </button>
// //       </div>

// //       {/* Comments Area */}
// //       {showComments && <CommentSection postId={post._id} />}

// //       {/* Premium Dark Theme Neon Styles */}
// //       <style>{`
// //         .premium-postcard:hover {
// //           transform: translateY(-5px) scale(1.01);
// //           box-shadow: 0 0 30px rgba(244, 63, 94, 0.25), 0 10px 20px rgba(0, 0, 0, 0.4); 
// //           border-color: #f43f5e !important;
// //         }
// //         @keyframes popTray {
// //           from { opacity: 0; transform: translateY(10px) scale(0.9); }
// //           to { opacity: 1; transform: translateY(0) scale(1); }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import CommentSection from '../Comments/CommentSection';

const API = import.meta.env.VITE_API_URL;
const BASE = import.meta.env.VITE_SOCKET_URL;

export default function PostCard({ post, onDelete, onUpdate }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes || []);
  const [showComments, setShowComments] = useState(false);
  const [showReactionTray, setShowReactionTray] = useState(false);
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [activeReaction, setActiveReaction] = useState(likes.includes(user?._id) ? '❤️' : null);

  const handleReactionSelect = async (emojiType) => {
    try {
      const { data } = await axios.post(`${API}/posts/${post._id}/like`, { reactionType: emojiType });
      setLikes(data.likes);
      setActiveReaction(emojiType);
      setShowReactionTray(false);
      
      Swal.fire({ toast: true, position: 'top-end', icon: 'success',
        title: `${emojiType} Reaction Sync Successfully`, showConfirmButton: false, timer: 1200 });
    } catch (err) { console.error(err); }
  };

  const handleDelete = async () => {
    const r = await Swal.fire({ title: 'Delete post permanently?', icon: 'warning',
      showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#6b7280', confirmButtonText: 'Delete' });
    if (!r.isConfirmed) return;
    try {
      await axios.delete(`${API}/posts/${post._id}`);
      onDelete(post._id);
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Post Deleted!', showConfirmButton: false, timer: 1500 });
    } catch (err) { console.error(err); }
  };

  const handleEdit = async () => {
    const { value } = await Swal.fire({
      title: 'Edit Post Studio', input: 'textarea', inputValue: post.text || '',
      inputAttributes: { rows: 4, placeholder: 'Modify content grid...' },
      showCancelButton: true, confirmButtonColor: '#2563eb', confirmButtonText: 'Save Changes'
    });
    if (value === undefined) return;
    try {
      const fd = new FormData();
      fd.append('text', value);
      const { data } = await axios.put(`${API}/posts/${post._id}`, fd);
      onUpdate(data);
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: '✅ Post Updated!', showConfirmButton: false, timer: 1500 });
    } catch { Swal.fire({ icon: 'error', title: 'Failed' }); }
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: post.text ? post.text.substring(0, 30) + '...' : 'MERN Post Ecosystem',
      text: 'Check out this post on our platform!',
      url: `${window.location.origin}/posts/${post._id}`
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) { console.log("Native share dismiss:", err); }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        Swal.fire({ toast: true, position: 'top-end', icon: 'success',
          title: '🔗 Post Link Copied to Clipboard!', showConfirmButton: false, timer: 1800 });
      } catch (err) { console.error("Clipboard failure:", err); }
    }
  };

  const renderAdvancedTextMatrix = (textInput) => {
    if (!textInput) return null;
    let processedText = textInput
      .replace(/\[Professional Perspective\]/g, '\n[Professional Perspective]\n')
      .replace(/🔥/g, '\n🔥')
      .replace(/💡 TL;DR:/g, '\n💡 TL;DR:\n')
      .replace(/•/g, '\n• ')
      .replace(/👉/g, '\n👉')
      .replace(/\[AI Expansion\]:/g, '\n[AI Expansion]:\n');

    const textLines = processedText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    return textLines.map((line, idx) => {
      if (line.startsWith('🔥') || line.includes('CRITICAL INSIGHT')) {
        return <div key={idx} style={{ background: 'rgba(245,158,11,0.08)', borderLeft: '4px solid #f59e0b', padding: '14px', borderRadius: '4px 12px 12px 4px', margin: '12px 0', color: '#fbbf24', fontWeight: 'bold', fontSize: '14.5px' }}>{line}</div>;
      }
      if (line.startsWith('[Professional Perspective]')) {
        return <div key={idx} style={{ background: 'rgba(16,185,129,0.06)', borderLeft: '4px solid #10b981', color: '#34d399', fontWeight: '700', fontSize: '13px', padding: '10px', borderRadius: '4px', margin: '12px 0' }}>{line}</div>;
      }
      if (line.startsWith('[AI Expansion]:')) {
        return <div key={idx} style={{ background: 'rgba(59,130,246,0.07)', borderLeft: '4px solid #3b82f6', color: '#60a5fa', fontWeight: '700', fontSize: '13px', padding: '10px', borderRadius: '4px', margin: '12px 0' }}>{line}</div>;
      }
      if (line.includes('💡 TL;DR:')) {
        return <h4 key={idx} style={{ background: 'rgba(139,92,246,0.08)', borderLeft: '4px solid #8b5cf6', color: '#c084fc', fontSize: '14px', fontWeight: 'bold', margin: '16px 0 8px 0', padding: '10px', borderRadius: '4px' }}>{line}</h4>;
      }
      if (line.startsWith('•')) {
        return <div key={idx} style={{ paddingLeft: '12px', color: '#cbd5e1', display: 'flex', gap: '8px', margin: '6px 0', fontSize: '14px' }}><span style={{ color: '#a78bfa' }}>•</span>{line.replace(/^•\s*/, '')}</div>;
      }
      if (line.startsWith('👉') || line.includes('thoughts')) {
        return <div key={idx} style={{ color: '#facc15', fontWeight: '600', padding: '12px', background: 'rgba(250,204,21,0.04)', borderRadius: '8px', borderLeft: '4px solid #facc15', margin: '14px 0', fontSize: '14px' }}>{line}</div>;
      }
      return <p key={idx} style={{ color: 'var(--text)', fontSize: '14.5px', lineHeight: '1.6', margin: '8px 0' }}>{line}</p>;
    });
  };

  const avatarUrl = post.author.profilePicture
    ? `${BASE}${post.author.profilePicture}`
    : `https://ui-avatars.com/api/?name=${post.author.username}&background=random&color=fff`;

  return (
    <div className="premium-postcard" style={{ 
      background: 'var(--card-bg)', 
      border: '1px solid var(--border)', 
      borderRadius: 20, 
      marginBottom: 20, 
      overflow: 'hidden', 
      color: 'var(--text)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
    }}>
      
      {/* Header Pipeline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px' }}>
        <Link to={`/profile/${post.author._id}`}>
          <img src={avatarUrl} style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)', transition: 'transform 0.2s' }} onMouseEnter={e => e.target.style.transform = 'scale(1.08)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} alt="avatar" />
        </Link>
        
        <div style={{ flex: 1 }}>
          <Link to={`/profile/${post.author._id}`} style={{ fontWeight: 700, fontSize: 15.5, color: 'var(--text)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--primary)'} onMouseLeave={e => e.target.style.color = 'var(--text)'}>
            {post.author.username}
          </Link>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>

        {/* UTILITY MATRIX */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button 
            onClick={() => {
              setIsFavourite(!isFavourite);
              Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: !isFavourite ? '⭐ Added to Favourites' : 'Removed from Favourites', showConfirmButton: false, timer: 1500 });
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: isFavourite ? '#facc15' : '#6b7280', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.2)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >
            {isFavourite ? '★' : '☆'}
          </button>

          <button 
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: !isBookmarked ? '🔖 Post Bookmarked Successfully' : 'Bookmark Removed', showConfirmButton: false, timer: 1500 });
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: isBookmarked ? '#3b82f6' : '#6b7280', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.2)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >
            {isBookmarked ? '🔖' : '📑'}
          </button>

          {user?._id === post.author._id && (
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleEdit} style={{ padding: '6px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', background: 'var(--accent)', color: 'var(--secondary)', fontWeight: 600, fontSize: 12, transition: 'opacity 0.2s' }} onMouseEnter={e => e.target.style.opacity = 0.8} onMouseLeave={e => e.target.style.opacity = 1}>
                ✏️ Edit
              </button>
              <button onClick={handleDelete} style={{ padding: '6px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', background: '#fee2e2', color: '#ef4444', fontWeight: 600, fontSize: 12, transition: 'opacity 0.2s' }} onMouseEnter={e => e.target.style.opacity = 0.8} onMouseLeave={e => e.target.style.opacity = 1}>
                🗑️
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Visual Render Block */}
      {post.text && (
        <div style={{ padding: '0 20px 16px', fontSize: 15, lineHeight: 1.6, color: 'var(--text)' }}>
          {renderAdvancedTextMatrix(post.text)}
        </div>
      )}

      {/* Image Block */}
      {post.image && (
        <div style={{ overflow: 'hidden', background: '#000' }}>
          <img src={`${BASE}${post.image}`} alt="post" style={{ width: '100%', maxHeight: 450, objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }} className="post-media" />
        </div>
      )}

      {/* Real-time Interaction Bar Workspace */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '14px 20px', borderTop: '1px solid var(--border)', position: 'relative', background: 'rgba(255,255,255,0.01)' }}>
        
        <div 
          onMouseEnter={() => setShowReactionTray(true)} 
          onMouseLeave={() => setShowReactionTray(false)}
          style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
        >
          <button 
            onClick={() => handleReactionSelect('❤️')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5, fontWeight: 600, color: activeReaction ? 'var(--primary)' : 'var(--text-muted)' }}
          >
            <span style={{ fontSize: 18, transition: 'transform 0.2s' }} className="like-icon">{activeReaction || '🤍'}</span> {likes.length}
          </button>

          {showReactionTray && (
            <div style={{ position: 'absolute', bottom: '32px', left: '-10px', background: '#18181b', border: '1px solid var(--border)', borderRadius: '24px', padding: '8px 16px', display: 'flex', gap: '14px', zIndex: 999, boxShadow: '0 12px 36px rgba(0,0,0,0.5)', animation: 'popTray 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
              {['❤️'].map((emo) => (
                <span 
                  key={emo} 
                  onClick={() => handleReactionSelect(emo)} 
                  style={{ fontSize: '22px', cursor: 'pointer', transition: 'transform 0.15s', display: 'inline-block' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.35) translateY(-4px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1) translateY(0)'}
                >
                  {emo}
                </span>
              ))}
            </div>
          )}
        </div>

        <button onClick={() => setShowComments(p => !p)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5, fontWeight: 600, color: showComments ? 'var(--primary)' : 'var(--text-muted)' }}>
          💬 Comment
        </button>

        <button 
          onClick={handleNativeShare}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14.5, fontWeight: 700, color: '#38bdf8', transition: 'transform 0.2s' }}
          onMouseEnter={(e) => e.target.style.transform = 'translateX(3px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
        >
          🔗 Share
        </button>
      </div>

      {showComments && <CommentSection postId={post._id} />}

      <style>{`
        .premium-postcard:hover {
          transform: translateY(-5px) scale(1.01);
          box-shadow: 0 0 30px rgba(244, 63, 94, 0.25), 0 10px 20px rgba(0, 0, 0, 0.4); 
          border-color: #f43f5e !important;
        }
        .premium-postcard {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
        }
      `}</style>
    </div>
  );
}