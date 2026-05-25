import React, { useState } from 'react';

const EditProfileModal = ({ user, onClose, onSave }) => {
  // Local form state pre-filled with existing application profile state data
  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar || '');
  const [bio, setBio] = useState(user.bio || '');

  const MAX_BIO_CHARS = 200;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return alert("Username can't be blank!");
    
    // Pass raw custom data values up to the API pipeline handler
    onSave({ username, avatar, bio });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      
      {/* Modal Container Card */}
      <div className="w-full max-w-lg bg-[#0e111a] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800/80">
          <h2 className="text-lg font-bold text-gray-100 flex items-center gap-2">
            Edit Profile <span className="text-sm">✨</span>
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* 1. Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Username</label>
            <div className="relative">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#131723] border border-gray-800 focus:border-orange-500/50 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none transition-colors"
                placeholder="jhon"
              />
            </div>
          </div>

          {/* 2. Email Display (Disabled according to your spec image) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500">Email <span className="text-[10px] text-gray-600 font-normal">(cannot change)</span></label>
            <input 
              type="email" 
              value={user.email} 
              disabled 
              className="w-full bg-[#0b0d14] border border-gray-800/40 rounded-xl px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed outline-none"
            />
          </div>

          {/* 3. Avatar URL Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Avatar URL <span className="text-[10px] text-gray-500 font-normal">(optional)</span></label>
            <input 
              type="url" 
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full bg-[#131723] border border-gray-800 focus:border-orange-500/50 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none transition-colors"
              placeholder="https://example.com/your-photo.jpg"
            />
          </div>

          {/* 4. Bio Input Area with Real-Time Counter */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-400">Bio <span className="text-[10px] text-gray-500 font-normal">(max 200 chars)</span></label>
              <span className={`text-[10px] font-mono ${bio.length >= MAX_BIO_CHARS ? 'text-red-500' : 'text-gray-500'}`}>
                {bio.length}/{MAX_BIO_CHARS}
              </span>
            </div>
            <textarea 
              maxLength={MAX_BIO_CHARS}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="4"
              className="w-full bg-[#131723] border border-gray-800 focus:border-orange-500/50 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none transition-colors resize-none"
              placeholder="Tell the world about yourself..."
            />
          </div>

          {/* Form Action Controls */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-800 text-xs font-semibold text-gray-400 hover:text-white hover:bg-[#131723] transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white shadow-lg shadow-orange-600/10 transition-all active:scale-[0.97]"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;

import React, { useState, useRef } from 'react';

const EditProfileModal = ({ user, onClose, onSave }) => {
  // Local form states
  const [username, setUsername] = useState(user.username || 'iqra');
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || 'https://api.dicebear.com/7.x/adventurer/svg?seed=96geie');
  const [bio, setBio] = useState(user.bio || '');
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);
  const MAX_BIO_CHARS = 200;

  // AI Avatar Generate karne ka function
  const handleGenerateAI = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    const newUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${randomSeed}`;
    setAvatarUrl(newUrl);
    setSelectedFile(null); // Agar URL generate ho toh local file null krdo
  };

  // Local File Select Handler
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setAvatarUrl(URL.createObjectURL(file)); // Preview ke liye temporary blob URL
    }
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return alert("Username can't be blank!");
    
    // Custom object pass kar rahe hain pipeline ko handle karne ke liye
    // file upload ho toh raw file jaye, warna string URL jaye
    onSave({ 
      username, 
      bio, 
      profilePicFile: selectedFile, 
      profilePicUrl: selectedFile ? null : avatarUrl 
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      
      {/* Modal Container Card */}
      <div className="w-full max-w-md bg-[#13151a] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          {/* Header & Avatar Preview Section */}
          <div className="flex flex-col items-center space-y-3 pt-2">
            <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
              ✏️ Edit Profile
            </h2>
            
            {/* Round Circle Preview with Glowing Border */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-4 border-purple-500 overflow-hidden bg-[#1a1d24] flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <img 
                  src={avatarUrl} 
                  alt="Avatar Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 1. Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#1a1d24] border border-zinc-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-gray-100 placeholder-gray-600 focus:outline-none transition-colors"
              placeholder="Username"
            />
          </div>

          {/* 2. Profile Picture Setup Box */}
          <div className="border border-zinc-800/60 bg-[#161920] rounded-xl p-4 space-y-4">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
              📷 Profile Picture Setup
            </span>

            {/* Option 1: File Upload */}
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 block">Option 1: Upload from this device</label>
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
              />
            </div>

            <div className="text-center text-[10px] text-zinc-600 font-bold tracking-widest">— OR —</div>

            {/* Option 2: AI Avatar / Paste URL */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs text-gray-400">Option 2: Paste Image Link / AI Character URL</label>
                <button
                  type="button"
                  onClick={handleGenerateAI}
                  className="bg-purple-600 hover:bg-purple-500 text-[11px] text-white px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-all shadow-md shadow-purple-600/10 active:scale-95"
                >
                  🎨 Generate AI
                </button>
              </div>
              <input
                type="text"
                value={selectedFile ? "Local File Selected..." : avatarUrl}
                disabled={!!selectedFile}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full bg-[#1a1d24] text-xs text-zinc-300 border border-zinc-800 rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-500 disabled:opacity-40 transition-colors"
                placeholder="https://api.dicebear.com/..."
              />
            </div>
          </div>

          {/* 3. Bio Input Area (Fixed Dark Theme Issue) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-gray-400">Bio</label>
              <div className="flex items-center gap-3">
                <button 
                  type="button"
                  className="bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-[11px] font-medium text-white px-2.5 py-1 rounded-lg transition-all active:scale-95 shadow-md shadow-pink-600/10"
                >
                  ✨ AI Bio
                </button>
                <span className={`text-[10px] font-mono ${bio.length >= MAX_BIO_CHARS ? 'text-red-500' : 'text-zinc-500'}`}>
                  {bio.length}/{MAX_BIO_CHARS}
                </span>
              </div>
            </div>
            {/* Deep background, crisp white text, and clear border for visibility */}
            <textarea 
              maxLength={MAX_BIO_CHARS}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="3"
              className="w-full bg-[#1a1d24] border border-zinc-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
              placeholder="Tell the world about yourself..."
            />
          </div>

          {/* Form Action Controls */}
          <div className="pt-2 flex items-center gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-700 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-600/10 transition-all active:scale-[0.97]"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
second
import React, { useState, useEffect } from 'react';
import EditProfileModal from './EditProfileModal'; // Path apne mutabiq check kar lein

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Backend se user data load karne ka sample useEffect
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/users/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUserData();
  }, []);

  // 🔥 YEH HAI WOH REQUIRED PIPELINE FUNCTION (handleSave / onSave)
  const handleSaveProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('token');
      
      // Kyun k image file select ho sakti hai, isliye FormData use karna lazmi hai
      const formData = new FormData();
      formData.append('username', profileData.username);
      formData.append('bio', profileData.bio);

      // Condition checking according to new Modal structure
      if (profileData.profilePicFile) {
        // Option 1: Device se image select ki gayi hai
        formData.append('profilePicture', profileData.profilePicFile);
      } else if (profileData.profilePicUrl) {
        // Option 2: DiceBear ya dynamic URL text hai
        formData.append('profilePicUrl', profileData.profilePicUrl);
      }

      const response = await fetch('http://localhost:5000/api/users/me', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
          // Note: Jab FormData bhejte hain toh Content-Type header khud set hota hai, yahan mat likhna.
        },
        body: formData
      });

      const updatedUser = await response.json();

      if (response.ok) {
        setUser(updatedUser); // State update taake display immediate change ho
        setIsModalOpen(false); // Modal close karein
        alert('Profile updated successfully! 🎉');
      } else {
        alert(updatedUser.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error in handleSaveProfile:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-[#0e111a] text-white p-6 flex flex-col items-center justify-center">
      {user && (
        <div className="bg-[#13151a] border border-zinc-800 p-6 rounded-2xl text-center space-y-4 w-full max-w-sm">
          <img 
            src={user.profilePicture || 'https://api.dicebear.com/7.x/adventurer/svg?seed=96geie'} 
            alt="Avatar" 
            className="w-20 h-20 rounded-full mx-auto border-2 border-purple-500 object-cover"
          />
          <h2 className="text-xl font-bold">@{user.username}</h2>
          <p className="text-zinc-400 text-sm">{user.bio || 'No bio yet...'}</p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-xs font-bold rounded-xl transition-all"
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* Modal Render with Pipeline Connection */}
      {isModalOpen && user && (
        <EditProfileModal 
          user={user} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveProfile} // Function pass ho raha hai yahan
        />
      )}
    </div>
  );
};

export default Profile;

third
console.log("Modal Rendered! ✅")
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const EditProfileModal = ({ user, onClose, onSave }) => {
  // States linked with user data
  const [username, setUsername] = useState(user.username || '');
  const [bio, setBio] = useState(user.bio || '');
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePicture || '');
  const [profilePicFile, setProfilePicFile] = useState(null);

  const cardRef = useRef(null);

  // File Upload Handler (Device se image select karne ke liye)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicUrl(URL.createObjectURL(file)); // Real-time preview ke liye
    }
  };

  // 🔥 PREMIUM IMAGE DOWNLOAD HANDLER
  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 3, // High-res ultra crisp quality export
        backgroundColor: null,
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${username}-profile-card.png`;
      link.click();
    } catch (error) {
      console.error("Card download failed:", error);
    }
  };

  // Main Submit Handler for Pipeline
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ username, bio, profilePicFile, profilePicUrl });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#111319] border border-white/10 rounded-3xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in-95 duration-200">
        
        {/* ─── LEFT SIDE: LIVE PREMIUM CARD PREVIEW & DOWNLOAD ─── */}
        <div className="w-full md:w-1/2 bg-[#0a0b0e] p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-4">Live Card Preview</p>
          
          {/* THE CARD TO BE DOWNLOADED */}
          <div
            ref={cardRef}
            className="relative w-full max-w-xs p-6 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] bg-gradient-to-br from-[#1a1c24] via-[#13141a] to-[#0a0a0d] border border-white/10 text-center"
          >
            {/* Ambient Lights */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />

            {/* Profile Avatar Wrapper */}
            <div className="relative inline-block p-0.5 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 shadow-md mb-4">
              <img
                src={profilePicUrl || 'https://api.dicebear.com/7.x/adventurer/svg?seed=96geie'}
                alt="Preview Avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#13141a]"
              />
            </div>

            {/* Username */}
            <h3 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              @{username || 'username'}
            </h3>

            {/* 🌟 UNIVERSAL HIGH-VISIBILITY BIO TEXT 🌟 */}
            {/* Is configuration se bio har tarah ki image theme pr bilkul saaf read hoga */}
            <p className="mt-4 text-xs leading-relaxed text-zinc-200/95 font-medium px-3 py-2.5 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] break-words">
              {bio || 'No bio written yet... Update it on the right side! ✨'}
            </p>
          </div>

          {/* SIMPLIFIED DOWNLOAD BUTTON */}
          <button
            type="button"
            onClick={handleDownloadCard}
            className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium text-xs rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_4px_20px_rgba(147,51,234,0.25)] hover:shadow-[0_4px_25px_rgba(147,51,234,0.4)]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Download Card Image
          </button>
        </div>

        {/* ─── RIGHT SIDE: CLEAN EDIT FORM ─── */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Edit Profile</h2>
              <button 
                type="button" 
                onClick={onClose} 
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Profile Image Input */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Change Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-600/10 file:text-purple-400 hover:file:bg-purple-600/20 file:cursor-pointer bg-[#161822] p-2 rounded-xl border border-white/5"
                />
              </div>

              {/* Username Input */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#161822] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 transition-all shadow-inner"
                  required
                />
              </div>

              {/* Bio Input */}
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="3"
                  maxLength="150"
                  placeholder="Tell the world about yourself..."
                  className="w-full px-4 py-2.5 bg-[#161822] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 transition-all shadow-inner resize-none"
                />
                <p className="text-[10px] text-zinc-500 text-right mt-1">{bio.length}/150 characters</p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 text-zinc-300 rounded-xl text-xs font-bold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-600/20"
            >
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
        
export default EditProfileModal;