import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function MessageInput({ onSend, socket, receiverId }) {
  const [text, setText] = useState('');
  const { user } = useAuth();
  const typingTimeout = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    socket?.emit('typing', { to: receiverId, from: user._id });
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => socket?.emit('stop_typing', { to: receiverId }), 1000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
    socket?.emit('stop_typing', { to: receiverId });
  };

  return (
    <form onSubmit={handleSend} className="p-4 border-t dark:border-gray-700 flex gap-2">
      <input value={text} onChange={handleChange} placeholder="Type a message..."
        className="flex-1 border rounded-full px-4 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600" />
      <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded-full text-sm hover:bg-blue-600">
        Send
      </button>
    </form>
  );
}