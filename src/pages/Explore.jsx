import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;
const BASE = import.meta.env.VITE_SOCKET_URL;

export default function Explore() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const { data } = await axios.get(`${API}/users/search?q=${query}`);
      setResults(data);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search users..."
          className="flex-1 border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600" />
        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">Search</button>
      </form>
      <div className="space-y-3">
        {results.map(u => (
          <Link key={u._id} to={`/profile/${u._id}`}
            className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-xl shadow hover:shadow-md">
            <img src={u.profilePicture ? `${BASE}${u.profilePicture}` : `https://ui-avatars.com/api/?name=${u.username}`}
              className="w-10 h-10 rounded-full object-cover" alt={u.username} />
            <div>
              <p className="font-semibold dark:text-white">{u.username}</p>
              <p className="text-sm text-gray-400">{u.bio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}