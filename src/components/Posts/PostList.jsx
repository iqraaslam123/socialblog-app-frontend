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