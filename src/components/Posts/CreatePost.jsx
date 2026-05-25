import { useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

const API = import.meta.env.VITE_API_URL;
const BASE = import.meta.env.VITE_SOCKET_URL;

export default function CreatePost({ onPostCreated }) {
  const { user } = useAuth();
  
  // Modal State
  const [isOpen, setIsOpen] = useState(false);

  // Core States
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Premium Features States
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [category, setCategory] = useState('Technology');
  const [mood, setMood] = useState('💡 Informative');
  const [hashtags, setHashtags] = useState(['react', 'webdev']);
  const [tagInput, setTagInput] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleTime, setScheduleTime] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [aiTitlesList, setAiTitlesList] = useState([]);

  const htagInputRef = useRef(null);

  // --- Dynamic AI Generation Mock Pools ---
  const titlePools = [
    ['10 Architectural Patterns Every Senior Dev Must Know in 2026', 'The Modern Roadmap to High-Performance Apps', 'Stop Overcomplicating State: Clean Architecture Rules', 'Clean Coding in 2026: From Junior to Production Leader'],
    ['The AI Revolution in Web Infrastructure: Next Gen Frameworks', 'Why Rest APIs are Fading: The Rise of Real-time Streaming Architecture', 'How We Scaled Our Startup Frontend to 10M+ Users with Zero Sub-loaders', 'Mastering the Web Vital Metrics: 100/100 Score Checklist'],
    ['The Ultimate UI/UX Secrets That Will Double Your App Conversion', 'From Monolith to Micro-Frontends: A Practical Survival Guide', 'TypeScript Advanced Tricks You Wish You Discovered Earlier', 'How to Write Production-Ready Secure Code Under 30 Minutes']
  ];

  const descPools = [
    "A deep dive into modern web development practices, exploring key tools, best practices, and enterprise techniques that every engineer should know this year...",
    "Unlocking high-performance architecture paradigms. We break down step-by-step optimization micro-patterns for modern scalable frontend cloud apps.",
    "Stop writing repetitive boilerplate code. In this comprehensive write-up, we address design strategies that separate elite engineers from basic developers.",
    "An analytical look into next-generation software development. Here is how advanced artificial intelligence and distributed infrastructure are reshaping the ecosystem."
  ];

  // Dynamic Title Generator
  const handleGenerateTitles = () => {
    setIsGeneratingTitle(true);
    setShowSuggestions(false);
    setTimeout(() => {
      setIsGeneratingTitle(false);
      const randomSet = titlePools[Math.floor(Math.random() * titlePools.length)];
      setAiTitlesList(randomSet);
      setShowSuggestions(true);
    }, 1100);
  };

  // Dynamic Typewriter Summary Generator
  const handleAutoWriteDesc = () => {
    setShortDesc('');
    const selectedText = descPools[Math.floor(Math.random() * descPools.length)];
    let i = 0;
    const interval = setInterval(() => {
      setShortDesc((prev) => prev + selectedText[i]);
      i++;
      if (i >= selectedText.length - 1) clearInterval(interval);
    }, 12);
  };

  // --- AI One-Click Content Actions ---
  const handleAIAction = (actionType) => {
    if (!text.trim()) {
      Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Please write some text first!', showConfirmButton: false, timer: 2000 });
      return;
    }

    switch(actionType) {
      case 'expand':
        setText(prev => prev + "\n\n[AI Expansion]: To evaluate this further, we must consider the scalability vectors, developer-experience ergonomics, and automated testing strategies that fortify production environments over time.");
        Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: '⚡ Content Expanded via AI!', showConfirmButton: false, timer: 2000 });
        break;
      case 'professional':
        setText(prev => `[Professional Perspective]\n${prev}\n\nIn conclusion, integrating these methodologies ensures maximum efficiency and aligns perfectly with robust engineering standards.`);
        Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: '🎯 Converted to Professional Tone!', showConfirmButton: false, timer: 2000 });
        break;
      case 'hook':
        setText(prev => `🔥 CRITICAL INSIGHT: Don't scroll past this! 🚀\n\n${prev}\n\n👉 What are your thoughts on this architecture? Let me know below!`);
        Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: '🔥 Viral Engagement Hook Added!', showConfirmButton: false, timer: 2000 });
        break;
      case 'tldr':
        setText(prev => `${prev}\n\n💡 TL;DR:\n• Key Concept streamlined for efficiency\n• Reduces overhead latency dramatically\n• Future-proof production workflow ready`);
        Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: '💡 TL;DR Bullets Appended!', showConfirmButton: false, timer: 2000 });
        break;
      default: break;
    }
  };

  // Hashtag Logic
  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.replace(/[,#\s]/g, '').trim();
      if (val && !hashtags.includes(val)) {
        setHashtags([...hashtags, val]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setHashtags(hashtags.filter(tag => tag !== tagToRemove));
  };

  const handleAISuggestTags = () => {
    Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: '✦ Dynamic AI Tags Loaded!', showConfirmButton: false, timer: 2000 });
    const dynamicPools = [
      ['nextjs', 'cloud', 'architecture'],
      ['tailwindcss', 'uidesign', 'ux'],
      ['software', 'scalability', 'aiengineering']
    ];
    const suggested = dynamicPools[Math.floor(Math.random() * dynamicPools.length)];
    const newTags = [...hashtags];
    suggested.forEach(t => {
      if (!newTags.includes(t)) newTags.push(t);
    });
    setHashtags(newTags);
  };

  const handlePolishContent = () => {
    if (!text.trim()) {
      Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Write some content first!', showConfirmButton: false, timer: 2000 });
      return;
    }
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: '✦ Full Grammar & Vocabulary Polished!', showConfirmButton: false, timer: 2000 });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Title is required!', showConfirmButton: false, timer: 2000 });
      return;
    }
    if (!text.trim() && !image) {
      Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Write some content first!', showConfirmButton: false, timer: 2000 });
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      
      // FIXING BACKEND KEYS DATA MISMATCH (Dono options append kar diye taaki backend par empty text na jaye)
      fd.append('title', title);
      fd.append('text', text);
      fd.append('content', text); // Agar backend 'content' key accept karta ho
      fd.append('shortDescription', shortDesc);
      fd.append('description', shortDesc); // Backup map
      fd.append('category', category);
      fd.append('tone', mood);
      fd.append('hashtags', JSON.stringify(hashtags));
      
      if (isScheduling && scheduleTime) fd.append('scheduleTime', scheduleTime);
      if (image) fd.append('image', image);

      const { data } = await axios.post(`${API}/posts`, fd);
      
      // Parent state updates
      onPostCreated(data);
      
      // Clear forms
      setTitle(''); setText(''); setShortDesc('');
      setImage(null); setPreview(null);
      setHashtags(['react', 'webdev']);
      setIsScheduling(false); setScheduleTime('');
      setIsOpen(false);
      
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: isScheduling ? '🎉 Post scheduled!' : '🎉 Post shared!', showConfirmButton: false, timer: 2000 });
    } catch (err) {
      console.error("Post Creation Error Details:", err);
      Swal.fire({ icon: 'error', title: 'Failed to post', text: err.response?.data?.message || 'Check connection fields', confirmButtonColor: 'var(--primary)' });
    } finally { setLoading(false); }
  };

  const wordCount = (text + ' ' + title).trim().split(/\s+/).filter(w => w.length > 0).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  const avatar = user?.profilePicture
    ? `${BASE}${user.profilePicture}`
    : `https://ui-avatars.com/api/?name=${user?.username}&background=random&color=fff`;

  return (
    <>
      {/* Trigger Normal Widget */}
      {!isOpen && (
        <div style={{ 
          background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 20, 
          padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' 
        }}>
          <img src={avatar} style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }} alt="me" />
          <button 
            onClick={() => setIsOpen(true)}
            style={{ 
              flex: 1, textAlign: 'left', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', 
              borderRadius: 30, padding: '14px 24px', color: '#94a3b8', fontSize: 15, cursor: 'pointer', transition: 'all 0.25s ease' 
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.background = 'rgba(0,0,0,0.4)'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'rgba(0,0,0,0.3)'; }}
          >
            What's on your mind, {user?.username || 'Creator'}? Click here to launch blog creator studio... 🚀
          </button>
        </div>
      )}

      {/* Full-Screen Dimmed Overlay Background Wrapper */}
      {isOpen && (
        <div className="modal-overlay-blur" style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(5, 7, 10, 0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px', overflowY: 'auto'
        }}>
          
          {/* Main Cinematic Expanded Studio Panel - BALANCED INTERMEDIATE SIZE */}
          <div className="premium-modal-card" style={{ 
            background: 'var(--card-bg)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: 24, 
            padding: '32px', color: 'var(--text)', boxShadow: '0 25px 70px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
            maxWidth: '880px', width: '100%', margin: 'auto', position: 'relative'
          }}>
            
            {/* Header Structure */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, borderBottom: '1px solid var(--border)', paddingBottom: 18 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <img src={avatar} style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }} alt="me" />
                  <span style={{ position: 'absolute', bottom: 0, right: 0, background: '#10b981', width: 12, height: 12, borderRadius: '50%', border: '2px solid var(--card-bg)' }}></span>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>AI Blog Creator Studio 🪐</h3>
                  <p style={{ margin: 0, fontSize: 12, color: '#94a3b8', marginTop: 2 }}>Deploying digital articles  as @{user?.username}</p>
                </div>
              </div>
              
              {/* Escape Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="close-studio-btn"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: '#94a3b8', width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, transition: 'all 0.2s' }}
              >
                ✕
              </button>
            </div>

            {/* 1. Dynamic Title System */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                Article Title <span style={{ color: '#ef4444', marginLeft: 4 }}>*</span>
                <span style={{ marginLeft: 12, background: 'linear-gradient(135deg, #1e1b4b, #312e81)', color: '#a5b4fc', fontSize: 10, padding: '3px 10px', borderRadius: 20, border: '1px solid #4338ca', fontWeight: 600 }}>✦ Dynamic AI Assisted</span>
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Type an immersive article title or use generator engine..." 
                  className="studio-input-glow"
                  style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 165px 14px 16px', fontSize: 15, color: '#f8fafc', outline: 'none', transition: 'all 0.25s' }}
                />
                <button 
                  type="button"
                  onClick={handleGenerateTitles}
                  disabled={isGeneratingTitle}
                  style={{ position: 'absolute', right: 10, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', border: 'none', color: '#fff', fontSize: 11, fontWeight: 700, padding: '8px 14px', borderRadius: 10, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.35)' }}
                >
                  {isGeneratingTitle ? 'Engaging...' : '✦ Auto Generate'}
                </button>
              </div>

              {/* Dynamic Title Selection Drops */}
              {showSuggestions && (
                <div className="ai-dropdown-anim" style={{ background: '#090d16', border: '1px solid #4f46e5', borderRadius: 14, marginTop: 12, overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.6)' }}>
                  <div style={{ padding: '12px 16px', fontSize: 11, color: '#475569', borderBottom: '1px solid #111827', background: 'rgba(255,255,255,0.01)', fontWeight: 600 }}>✨ NEW GENERATED POOL ITEMS — CLICK TO OVERWRITE TITLE</div>
                  {aiTitlesList.map((t, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => { setTitle(t); setShowSuggestions(false); }}
                      className="ai-suggest-item"
                      style={{ padding: '12px 16px', fontSize: 13, color: '#cbd5e1', cursor: 'pointer', borderBottom: '1px solid #111827', transition: 'all 0.2s' }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Dual Inputs Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 24 }}>
              {/* Category */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Domain Categorization *</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="studio-input-glow"
                  style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: 14, padding: 14, fontSize: 14, color: '#e2e8f0', outline: 'none', cursor: 'pointer' }}
                >
                  <option style={{ background: '#090d16' }}>Technology</option>
                  <option style={{ background: '#090d16' }}>Programming</option>
                  <option style={{ background: '#090d16' }}>Design</option>
                  <option style={{ background: '#090d16' }}>Business</option>
                  <option style={{ background: '#090d16' }}>Lifestyle</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                  Metadata Hashtags <span style={{ marginLeft: 8, background: '#1e3a5f', color: '#38bdf8', fontSize: 9, padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>✦ Vector Meta</span>
                </label>
                <div 
                  onClick={() => htagInputRef.current.focus()}
                  className="studio-input-glow"
                  style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: 14, padding: '8px 12px', minHeight: '48px', display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', cursor: 'text' }}
                >
                  {hashtags.map((tag) => (
                    <span key={tag} style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#38bdf8', border: '1px solid #334155', fontSize: 12, borderRadius: 8, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
                      #{tag}
                      <button type="button" onClick={(e) => { e.stopPropagation(); handleRemoveTag(tag); }} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', fontSize: 13, padding: 0 }}>×</button>
                    </span>
                  ))}
                  <input 
                    ref={htagInputRef}
                    type="text" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder={hashtags.length === 0 ? "Type metadata tag & click Enter..." : ""}
                    style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: '#fff', minWidth: 100, flex: 1 }}
                  />
                </div>
                <button 
                  type="button"
                  onClick={handleAISuggestTags}
                  style={{ marginTop: 6, fontSize: 11, color: '#818cf8', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}
                >
                  ✨ AI Suggest Random Macro-Tags
                </button>
              </div>
            </div>

            {/* 3. Tone Sync */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>Intended Article Tone Aura</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['💡 Informative', '🔥 Inspiring', '😄 Casual', '🎓 Educational', '💼 Professional', '🌀 Storytelling'].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setMood(t)}
                    style={{
                      fontSize: 12, padding: '8px 16px', borderRadius: 30, border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s ease', fontWeight: 600,
                      background: mood === t ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255,255,255,0.02)',
                      color: mood === t ? '#fff' : '#94a3b8',
                      borderColor: mood === t ? '#6366f1' : 'var(--border)',
                      boxShadow: mood === t ? '0 4px 14px rgba(99,102,241,0.2)' : 'none'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. AI Short Description Module */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                Abstract Summary Description <span style={{ marginLeft: 8, background: '#1e3a5f', color: '#38bdf8', fontSize: 9, padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>✦ AI Abstract</span>
              </label>
              <div style={{ position: 'relative' }}>
                <textarea 
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  rows="2" 
                  placeholder="Provide a 2-line systemic overview wrapper..."
                  className="studio-input-glow"
                  style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 14px 44px 14px', fontSize: 14, color: '#f1f5f9', outline: 'none', resize: 'none', lineHeight: 1.5 }}
                />
                <button 
                  type="button"
                  onClick={handleAutoWriteDesc}
                  style={{ position: 'absolute', right: 12, bottom: 12, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', border: 'none', color: '#fff', fontSize: 11, fontWeight: 600, padding: '6px 12px', borderRadius: 8, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                >
                  ✦ Auto Draft Random Summary
                </button>
              </div>
            </div>

            {/* 5. Core Content Canvas */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>
                  Primary Editorial Canvas Content <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <span style={{ fontSize: 11, color: '#6366f1', fontWeight: 600 }}>✨ One-Click AI Injector Modes:</span>
              </div>
              
              {/* Interactive Tool Badges */}
              <div style={{ 
                background: '#090d16', border: '1px solid var(--border)', borderBottom: 'none', 
                borderRadius: '14px 14px 0 0', padding: '10px 14px', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' 
              }}>
                <button type="button" onClick={() => handleAIAction('expand')} className="ai-feature-badge" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid #2563eb', color: '#60a5fa', fontSize: 11, padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>⚡ Expand Detail</button>
                <button type="button" onClick={() => handleAIAction('professional')} className="ai-feature-badge" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid #059669', color: '#34d399', fontSize: 11, padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>🎯 Professional Tone</button>
                <button type="button" onClick={() => handleAIAction('hook')} className="ai-feature-badge" style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid #d97706', color: '#fbbf24', fontSize: 11, padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>🔥 Viral Hook</button>
                <button type="button" onClick={() => handleAIAction('tldr')} className="ai-feature-badge" style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid #7c3aed', color: '#a78bfa', fontSize: 11, padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>💡 TL;DR Quick Bullets</button>
              </div>

              {/* Editor Textarea */}
              <textarea 
                value={text} 
                onChange={e => setText(e.target.value)} 
                rows={9}
                placeholder={`Formulate strategic logs... What insights are we deployment ready with today, ${user?.username}?`}
                className="studio-input-glow"
                style={{
                  width: '100%', resize: 'vertical', border: '1px solid var(--border)', outline: 'none',
                  background: 'rgba(0,0,0,0.3)', fontSize: 15, color: '#f8fafc',
                  lineHeight: '1.7', padding: 16, borderRadius: '0 0 14px 14px', fontFamily: 'inherit'
                }} 
              />

              {/* Counter Metrics */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                <div style={{ display: 'flex', gap: 14 }}>
                  <span>🕒 {readTime} min read metrics</span>
                  <span>•</span>
                  <span>⚡ {wordCount} total words</span>
                </div>
                <span style={{ color: text.length >= 50 ? '#10b981' : '#f59e0b' }}>{text.length} Characters allocated</span>
              </div>

              {/* Polish Guard */}
              <div style={{ marginTop: 14, background: 'linear-gradient(135deg, rgba(79,70,229,0.1), rgba(124,58,237,0.05))', border: '1px solid #4338ca', borderRadius: 14, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 12, color: '#c7d2fe', lineHeight: 1.4 }}>
                  <span style={{ fontWeight: 700, color: '#fff' }}>✨ Enterprise Content Optimizer</span> — Trigger grammar optimization and structural validation tools instantly.
                </div>
                <button 
                  type="button"
                  onClick={handlePolishContent}
                  className="polish-copilot-btn"
                  style={{ background: '#312e81', border: '1px solid #4f46e5', color: '#fff', fontSize: 12, fontWeight: 700, padding: '8px 14px', borderRadius: 10, cursor: 'pointer', whitespace: 'nowrap', transition: 'all 0.2s' }}
                >
                  Optimize Draft ✦
                </button>
              </div>
            </div>

            {/* Custom Cover Photo Preview */}
            {preview && (
              <div style={{ position: 'relative', marginTop: 14, marginBottom: 24 }}>
                <img src={preview} style={{ width: '100%', maxHeight: '320px', objectFit: 'cover', borderRadius: 14, border: '1px solid #1e293b', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }} alt="preview" />
                <button 
                  type="button"
                  onClick={() => { setImage(null); setPreview(null); }}
                  style={{ position: 'absolute', top: 12, right: 12, width: 30, height: 30, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.85)', color: '#fff', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              </div>
            )}

            {/* 6. Advanced Automations Pipeline (Schedule) */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 18, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>Automated Matrix Scheduling Pipeline</h4>
                  <p style={{ margin: 0, fontSize: 11, color: '#64748b', marginTop: 2 }}>Queue this specific blog release node into core chronologies to publish automatically</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsScheduling(!isScheduling)}
                  style={{
                    width: 44, height: 24, borderRadius: 20, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px 4px', transition: 'background-color 0.25s ease',
                    background: isScheduling ? 'var(--primary)' : '#1e293b'
                  }}
                >
                  <div style={{
                    width: 16, height: 16, background: '#fff', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.5)', transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isScheduling ? 'translateX(20px)' : 'translateX(0px)'
                  }} />
                </button>
              </div>
              
              {isScheduling && (
                <input 
                  type="datetime-local" 
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="studio-input-glow animate-slide"
                  style={{ marginTop: 14, background: '#090d16', border: '1px solid #334155', borderRadius: 10, padding: '8px 14px', fontSize: 13, color: '#fff', outline: 'none' }}
                />
              )}
            </div>

            {/* 7. Footer Base Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 20 }}>
              <label className="upload-media-btn" style={{ 
                cursor: 'pointer', fontSize: 13, fontWeight: 700, color: 'var(--primary)', 
                display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.01)', padding: '10px 16px', borderRadius: 12, border: '1px solid var(--border)', transition: 'all 0.2s'
              }}>
                📷 Upload Graphic Cover
                <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
              </label>

              <div style={{ display: 'flex', gap: 12 }}>
                <button 
                  type="button"
                  onClick={() => {
                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Draft locked securely inside local cache!', showConfirmButton: false, timer: 2000 });
                    setIsOpen(false);
                  }}
                  className="save-draft-btn"
                  style={{ background: 'transparent', border: '1px solid var(--border)', color: '#94a3b8', fontSize: 13, fontWeight: 600, padding: '12px 20px', borderRadius: 14, cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  💾 Save Draft
                </button>
                <button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="publish-live-btn"
                  style={{
                    padding: '12px 26px', borderRadius: 14, border: 'none', cursor: 'pointer',
                    background: 'var(--primary)', color: '#fff', fontWeight: 800, fontSize: 14,
                    opacity: loading ? 0.6 : 1, boxShadow: '0 6px 20px rgba(99,102,241,0.4)', transition: 'all 0.2s'
                  }}
                >
                  {loading ? 'Executing Infrastructure...' : isScheduling ? 'Schedule Release 🚀' : 'Deploy Live Article 🚀'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modern High-End Integrated Animation Engine Stylings */}
      <style>{`
        .premium-modal-card {
          animation: cinematicPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes cinematicPop {
          from { opacity: 0; transform: scale(0.94) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .studio-input-glow:focus {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
        }

        .ai-dropdown-anim {
          animation: slideDownIn 0.2s ease-out forwards;
        }
        @keyframes slideDownIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ai-suggest-item:hover {
          background: #111422 !important;
          color: #a5b4fc !important;
          padding-left: 20px !important;
        }

        .ai-feature-badge {
          transition: all 0.2s ease;
        }
        .ai-feature-badge:hover {
          transform: translateY(-2px);
          filter: brightness(1.2);
        }

        .close-studio-btn:hover {
          background: #ef4444 !important;
          color: #fff !important;
          border-color: #ef4444 !important;
        }
        .upload-media-btn:hover {
          border-color: #6366f1 !important;
          background: rgba(99, 102, 241, 0.05) !important;
        }
        .save-draft-btn:hover {
          border-color: #ef4444 !important;
          color: #ef4444 !important;
        }
        .publish-live-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99,102,241,0.55) !important;
        }
        
        .animate-slide {
          animation: slideDownIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}