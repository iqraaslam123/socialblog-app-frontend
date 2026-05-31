import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL;

export default function CommentSection({ postId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      // ✅ FIXED: /posts/ → /api/posts/
      const { data } = await axios.get(`${API}/api/posts/${postId}/comments`);
      setComments(data || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchComments(); }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      // ✅ FIXED
      const { data } = await axios.post(`${API}/api/posts/${postId}/comments`, { text: newComment });
      setComments(prev => [data, ...prev]);
      setNewComment('');
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Comment Posted!', showConfirmButton: false, timer: 1200 });
    } catch (err) { console.error(err); }
  };

  const handleEditComment = async (commentId, currentText) => {
    const { value: updatedText } = await Swal.fire({
      title: 'Modify Comment', input: 'text', inputValue: currentText,
      showCancelButton: true, confirmButtonColor: '#2563eb', confirmButtonText: 'Update'
    });
    if (!updatedText || updatedText.trim() === currentText) return;
    try {
      // ✅ FIXED
      const { data } = await axios.put(`${API}/api/posts/${postId}/comments/${commentId}`, { text: updatedText });
      setComments(prev => prev.map(c => c._id === commentId ? { ...c, text: data.text } : c));
    } catch (err) { console.error(err); }
  };

  const handleDeleteComment = async (commentId) => {
    const confirm = await Swal.fire({ title: 'Delete comment?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444' });
    if (!confirm.isConfirmed) return;
    try {
      // ✅ FIXED
      await axios.delete(`${API}/api/posts/${postId}/comments/${commentId}`);
      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ background: '#121214', padding: '16px', borderTop: '1px solid var(--border)' }}>
      
      {/* Input Comment Box Section */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, marginBottom: '16px' }}>
        <input 
          type="text" 
          value={newComment} 
          onChange={e => setNewComment(e.target.value)} 
          placeholder="Write a constructive public insight review..." 
          style={{ flex: 1, background: '#1c1c1f', border: '1px solid #2d2d30', borderRadius: '24px', padding: '10px 16px', color: '#fff', fontSize: '13.5px', outline: 'none' }}
        />
        <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '24px', padding: '0 18px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
          Post
        </button>
      </form>

      {/* Styled Render Comments List Vector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {comments.map(c => (
          <div key={c._id} style={{ display: 'flex', gap: 12, background: '#161618', padding: '12px', borderRadius: '12px', border: '1px solid #222225' }}>
            <div style={{ width: '32px', height: '32px', background: '#2e3035', color: '#a5b4fc', fontSize: '12px', fontWeight: 'bold', display: 'grid', placeItems: 'center', borderRadius: '50%' }}>
              {c.author?.username ? c.author.username.substring(0,2).toUpperCase() : 'U'}
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#f3f4f6' }}>{c.author?.username || 'Anonymous'}</span>
                
                {/* ACTION HUD: EDIT & DELETE VISIBLE ONLY TO THE OWNER */}
                {user?._id === c.author?._id && (
                  <div style={{ display: 'flex', gap: 8, fontSize: '11px' }}>
                    <span onClick={() => handleEditComment(c._id, c.text)} style={{ color: '#9ca3af', cursor: 'pointer', fontWeight: '600' }} className="hover:underline">✏️ Edit</span>
                    <span onClick={() => handleDeleteComment(c._id)} style={{ color: '#ef4444', cursor: 'pointer', fontWeight: '600' }} className="hover:underline">🗑️ Delete</span>
                  </div>
                )}
              </div>
              <p style={{ fontSize: '13px', color: '#d1d5db', margin: 0, lineHeight: '1.4' }}>{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
