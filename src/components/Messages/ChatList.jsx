import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSocket } from '../../context/SocketContext';

const API = import.meta.env.VITE_API_URL;
const BASE = import.meta.env.VITE_SOCKET_URL;

export default function ChatList({ onSelect, selectedId }) {
  const [users, setUsers] = useState([]);
  const { onlineUsers } = useSocket();

  useEffect(() => {
    axios.get(`${API}/messages`).then(res => setUsers(res.data)).catch(console.error);
  }, []);

  return (
    <div className="w-64 border-r dark:border-gray-700 h-full overflow-y-auto">
      <h3 className="p-4 font-bold dark:text-white border-b dark:border-gray-700">Chats</h3>
      {users.map(u => (
        <div key={u._id} onClick={() => onSelect(u)}
          className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedId === u._id ? 'bg-blue-50 dark:bg-gray-700' : ''}`}>
          <div className="relative">
            <img src={u.profilePicture ? `${BASE}${u.profilePicture}` : `https://ui-avatars.com/api/?name=${u.username}`}
              className="w-10 h-10 rounded-full object-cover" alt={u.username} />
            {onlineUsers.includes(u._id) && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            )}
          </div>
          <span className="font-medium dark:text-white">{u.username}</span>
        </div>
      ))}
    </div>
  );
}