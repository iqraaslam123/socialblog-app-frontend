// // 

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import PostCard from './PostCard';
// import LoadingSpinner from '../Common/LoadingSpinner';

// const API = import.meta.env.VITE_API_URL;

// // 🟢 Added 'fetchType' and 'currentUserId' props from Dashboard
// export default function PostList({ userId, newPost, fetchType = 'all', currentUserId }) {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     let url = `${API}/posts`;

//     // 1. Agar user kisi ki profile dekh raha hai
//     if (userId) {
//       url = `${API}/users/${userId}/posts`;
//     }

//     axios.get(url)
//       .then(res => {
//         let data = res.data;

//         // 2. Dashboard ke tabs ke mutabiq frontend par securely filter lagana
//         if (fetchType === 'bookmarks' && currentUserId) {
//           // Sirf wahi posts jin ke bookmarks array me current logged-in user ki ID ho
//           data = data.filter(p => p.bookmarks && p.bookmarks.includes(currentUserId));
//         } else if (fetchType === 'starred' && currentUserId) {
//           // Sirf wahi posts jin ke stars array me current logged-in user ki ID ho
//           data = data.filter(p => p.stars && p.stars.includes(currentUserId));
//         }

//         setPosts(data);
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [userId, fetchType, currentUserId]); // 🟢 Tabs change hone par re-fetch hoga automatically

//   useEffect(() => {
//     if (newPost) setPosts(p => [newPost, ...p]);
//   }, [newPost]);

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div>
//       {posts.length === 0 && (
//         <p className="text-center text-gray-400 py-10">
//           {fetchType === 'bookmarks' && "No bookmarked posts yet."}
//           {fetchType === 'starred' && "No starred posts yet."}
//           {fetchType === 'all' && "No posts yet."}
//         </p>
//       )}
      
//       {posts.map(p => (
//         <PostCard 
//           key={p._id} 
//           post={p}
//           currentUserId={currentUserId} // 🟢 Passing logged-in user ID to PostCard
//           onDelete={id => setPosts(prev => prev.filter(x => x._id !== id))}
//           onUpdate={updated => setPosts(prev => prev.map(x => x._id === updated._id ? updated : x))} 
//         />
//       ))}
//     </div>
//   );
// }

// last
// 

import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import LoadingSpinner from '../Common/LoadingSpinner';

const API = import.meta.env.VITE_API_URL;

export default function PostList({ userId, newPost }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = userId ? `${API}/users/${userId}/posts` : `${API}/posts`;
    axios.get(url).then(res => setPosts(res.data)).catch(console.error).finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    if (newPost) setPosts(p => [newPost, ...p]);
  }, [newPost]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {posts.length === 0 && <p className="text-center text-gray-400 py-10">No posts yet.</p>}
      {posts.map(p => (
        <PostCard key={p._id} post={p}
          onDelete={id => setPosts(prev => prev.filter(x => x._id !== id))}
          onUpdate={updated => setPosts(prev => prev.map(x => x._id === updated._id ? updated : x))} />
      ))}
    </div>
  );
}