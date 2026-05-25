import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import MessageInput from './MessageInput';

const API = import.meta.env.VITE_API_URL;
const BASE = import.meta.env.VITE_SOCKET_URL;

export default function ChatWindow({ selectedUser }) {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    if (!selectedUser) return;
    axios.get(`${API}/messages/${selectedUser._id}`).then(res => setMessages(res.data));
  }, [selectedUser]);

  useEffect(() => {
    if (!socket) return;
    socket.on('receive_message', msg => setMessages(p => [...p, msg]));
    socket.on('typing', () => setTyping(true));
    socket.on('stop_typing', () => setTyping(false));
    return () => { socket.off('receive_message'); socket.off('typing'); socket.off('stop_typing'); };
  }, [socket]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (text) => {
    try {
      const { data } = await axios.post(`${API}/messages`, { receiverId: selectedUser._id, text });
      setMessages(p => [...p, data]);
      socket?.emit('send_message', data);
    } catch (err) { console.error(err); }
  };

  if (!selectedUser) return (
    <div className="flex-1 flex items-center justify-center dark:text-gray-400">Select a chat</div>
  );

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b dark:border-gray-700 font-semibold dark:text-white flex items-center gap-2">
        <img src={selectedUser.profilePicture ? `${BASE}${selectedUser.profilePicture}` : `https://ui-avatars.com/api/?name=${selectedUser.username}`}
          className="w-8 h-8 rounded-full" alt={selectedUser.username} />
        {selectedUser.username}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map(m => (
          <div key={m._id} className={`flex ${m.sender._id === user._id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${m.sender._id === user._id ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && <p className="text-xs text-gray-400">typing...</p>}
        <div ref={bottomRef} />
      </div>
      <MessageInput onSend={sendMessage} socket={socket} receiverId={selectedUser._id} />
    </div>
  );
}