
// src/post/Write.jsx
import React, { useState } from 'react';

export default function Write() {
  // Core Form States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [hashtags, setHashtags] = useState(['react', 'webdev', 'mern']);
  const [content, setContent] = useState('');
  const [tone, setTone] = useState('💡 Informative');
  
  // UI & Live Simulation States
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reactionsCount, setReactionsCount] = useState({ like: 15, love: 9, fire: 12, insight: 4 });
  const [showReactionTray, setShowReactionTray] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  const [commentsList, setCommentsList] = useState([
    { id: 1, user: 'Hafsa Nadim', avatar: 'HN', text: 'This modular dynamic layout strategy looks extremely well engineered! Text coloring matches enterprise compliance.', time: '2 mins ago' },
    { id: 2, user: 'MERN Developer', avatar: 'MD', text: 'The paragraph delimiter regex engine resolves jammed text areas flawlessly. Great approach!', time: 'Just now' }
  ]);
  const [newCommentInput, setNewCommentInput] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // AI Content Formatter Actions
  const handleAIAction = (mode) => {
    if (!content.trim()) {
      if (mode === 'expand') setContent("[AI Expansion]: To evaluate this further, we must consider the scalability vectors, developer-experience ergonomics, and automated testing strategies that fortify production environments over time.");
      if (mode === 'professional') setContent("[Professional Perspective] MERN stack developer environment configuration setup.");
      if (mode === 'hook') setContent("🔥 CRITICAL INSIGHT: Don't scroll past this! 🚀");
      if (mode === 'tldr') setContent("💡 TL;DR:\n• Key Concept streamlined for efficiency\n• Reduces overhead latency dramatically\n• Future-proof production workflow ready");
      return;
    }

    const currentText = content.trim();
    if (mode === 'expand') {
      setContent(currentText + "\n\n[AI Expansion]: To evaluate this further, we must consider the scalability vectors, developer-experience ergonomics, and automated testing strategies that fortify production environments over time.");
      triggerToast('⚡ Content Expanded via AI!');
    } else if (mode === 'professional') {
      setContent("[Professional Perspective] \n" + currentText);
      triggerToast('🎯 Converted to Professional Tone!');
    } else if (mode === 'hook') {
      setContent("🔥 CRITICAL INSIGHT: Don't scroll past this! 🚀\n\n" + currentText + "\n\n👉 What are your thoughts on this architecture? Let me know below!");
      triggerToast('🔥 Viral Engagement Hook Added!');
    } else if (mode === 'tldr') {
      setContent(currentText + "\n\n💡 TL;DR:\n• Key Concept streamlined for efficiency\n• Reduces overhead latency dramatically\n• Future-proof production workflow ready\n\nIn conclusion, integrating these methodologies ensures maximum efficiency.");
      triggerToast('💡 TL;DR Bullets Appended!');
    }
  };

  // Multi-Reaction Click Vector
  const handleSelectReaction = (type) => {
    if (selectedReaction === type) {
      setReactionsCount(prev => ({ ...prev, [type]: prev[type] - 1 }));
      setSelectedReaction(null);
    } else {
      setReactionsCount(prev => {
        const updated = { ...prev };
        if (selectedReaction) updated[selectedReaction] = updated[selectedReaction] - 1;
        updated[type] = updated[type] + 1;
        return updated;
      });
      setSelectedReaction(type);
    }
    setShowReactionTray(false);
  };

  // Comment Injector
  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newCommentInput.trim()) return;
    const incoming = {
      id: Date.now(),
      user: 'Iqra Aslam',
      avatar: 'IA',
      text: newCommentInput.trim(),
      time: 'Just now'
    };
    setCommentsList([incoming, ...commentsList]);
    setNewCommentInput('');
    triggerToast('📝 Comment successfully added to feed!');
  };

  // Native Web Share Pipeline
  const handleExecuteShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: title || 'Dev Post', url: window.location.href });
        triggerToast('🚀 Shared successfully via system window!');
      } catch (err) { console.log(err); }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      triggerToast('🔗 Post link copied to clipboard securely!');
    }
  };

  // Advanced Visual Matrix Engine for Text Colorization
  const renderHighlightedContent = () => {
    if (!content.trim()) return <p style={{ color: '#4b5563', fontStyle: 'italic', margin: 0 }}>Content canvas is empty...</p>;

    let standardized = content
      .replace(/\[Professional Perspective\]/g, '\n[Professional Perspective]\n')
      .replace(/🔥/g, '\n🔥')
      .replace(/💡 TL;DR:/g, '\n💡 TL;DR:\n')
      .replace(/•/g, '\n• ')
      .replace(/👉/g, '\n👉')
      .replace(/\[AI Expansion\]:/g, '\n[AI Expansion]:\n')
      .replace(/In conclusion,/g, '\nIn conclusion,');

    const lines = standardized.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    return lines.map((line, idx) => {
      if (line.startsWith('🔥') || line.includes('CRITICAL INSIGHT')) {
        return <div key={idx} style={{ background: 'rgba(245,158,11,0.08)', borderLeft: '4px solid #f59e0b', padding: '12px', borderRadius: '4px 12px 12px 4px', margin: '12px 0', color: '#fbbf24', fontWeight: 'bold', fontSize: '14.5px' }}>{line}</div>;
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
      return <p key={idx} style={{ color: '#e2e8f0', fontSize: '14.5px', lineHeight: '1.6', margin: '8px 0' }}>{line}</p>;
    });
  };

  const totalSum = Object.values(reactionsCount).reduce((a, b) => a + b, 0);

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', background: '#0d0f14', minHeight: '100vh', color: '#e2e8f0', padding: '20px' }}>
      
      {/* 🚨 THE VISUAL TRACKER STRIP IS ALREADY EMBEDDED HERE 🚨 */}
      <div style={{ background: '#ef4444', padding: '14px', color: 'white', textAlign: 'center', fontWeight: 'bold', borderRadius: '8px', maxWidth: '820px', margin: '10px auto', fontSize: '14px', boxShadow: '0 4px 20px rgba(239,68,68,0.4)', zIndex: 99999 }}>
        🚨 IF YOU CAN SEE THIS RED STRIP ON YOUR BROWSER, WE ARE IN THE RIGHT FILE! 🚨
      </div>

      {/* Inputs Form Workstation */}
      <div style={{ maxWidth: '820px', margin: '20px auto', padding: '24px', background: '#11141d', border: '1px solid #1e2330', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Studio Controls Workspace</h3>
        
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Type live preview title here..." 
          style={{ width: '100%', background: '#131720', border: '1px solid #1e2330', borderRadius: '8px', padding: '12px', color: '#fff', marginBottom: '16px', outline: 'none' }}
        />

        <div style={{ background: '#131720', border: '1px solid #1e2330', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#181f2e', padding: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => handleAIAction('professional')} style={{ background: '#059669', color: '#fff', border: 'none', fontSize: '11px', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>🎯 Professional</button>
            <button type="button" onClick={() => handleAIAction('hook')} style={{ background: '#d97706', color: '#fff', border: 'none', fontSize: '11px', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>🔥 Viral Hook</button>
            <button type="button" onClick={() => handleAIAction('expand')} style={{ background: '#2563eb', color: '#fff', border: 'none', fontSize: '11px', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>⚡ Expand</button>
            <button type="button" onClick={() => handleAIAction('tldr')} style={{ background: '#7c3aed', color: '#fff', border: 'none', fontSize: '11px', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>💡 TL;DR</button>
          </div>
          <textarea 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            rows="5" 
            placeholder="Type or click headers above to see live multi-color splits in the card preview block below..." 
            style={{ width: '100%', background: 'transparent', border: 'none', padding: '12px', color: '#fff', outline: 'none', fontSize: '14px' }}
          />
        </div>
      </div>

      {/* Preview Card Section */}
      <div style={{ maxWidth: '820px', margin: '30px auto', padding: '24px', background: '#121212', borderRadius: '16px', border: '1px solid #1f2937', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
        
        {/* Meta Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', background: '#facc15', color: '#000', fontWeight: 'bold', display: 'grid', placeItems: 'center', borderRadius: '50%' }}>ST</div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '14px' }}>student <span style={{ fontSize: '11px', background: '#2e2e38', color: '#a78bfa', padding: '1px 6px', borderRadius: '4px' }}>{tone}</span></div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>Active Live Session View</div>
            </div>
          </div>
          <div style={{ background: 'rgba(37,99,235,0.15)', color: '#60a5fa', fontSize: '12px', padding: '4px 8px', borderRadius: '6px' }}>📂 {category}</div>
        </div>

        <hr style={{ border: '0', height: '1px', background: '#1f2937', margin: '12px 0' }} />

        {/* Render Title & Dynamic Colored Text Body */}
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', marginBottom: '14px', borderLeft: '4px solid #facc15', paddingLeft: '10px' }}>
          {title ? title : "Untitled Masterpiece Architecture"}
        </h2>

        <div style={{ minHeight: '40px' }}>
          {renderHighlightedContent()}
        </div>

        {/* Counter Results Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingBottom: '10px', borderBottom: '1px solid #1f2937', fontSize: '12px', color: '#9ca3af' }}>
          <div>👍❤️🔥 <span style={{ color: '#cbd5e1', fontWeight: '500' }}>{totalSum} Reactions</span></div>
          <div>{commentsList.length} Comments</div>
        </div>

        {/* Footer Actions Row */}
        <div style={{ display: 'flex', position: 'relative', borderBottom: '1px solid #1f2937', padding: '4px 0' }}>
          <div onMouseEnter={() => setShowReactionTray(true)} onMouseLeave={() => setShowReactionTray(false)} style={{ flex: 1, position: 'relative' }}>
            <button style={{ width: '100%', background: 'transparent', border: 'none', color: selectedReaction ? '#facc15' : '#9ca3af', padding: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
              {selectedReaction ? `⭐ ${selectedReaction.toUpperCase()}` : '👍 React'}
            </button>
            {showReactionTray && (
              <div style={{ position: 'absolute', bottom: '38px', left: '10px', background: '#1e1e24', border: '1px solid #374151', borderRadius: '20px', padding: '6px 12px', display: 'flex', gap: '12px', zIndex: 100 }}>
                <span onClick={() => handleSelectReaction('like')} style={{ fontSize: '18px', cursor: 'pointer' }}>👍</span>
                <span onClick={() => handleSelectReaction('love')} style={{ fontSize: '18px', cursor: 'pointer' }}>❤️</span>
                <span onClick={() => handleSelectReaction('fire')} style={{ fontSize: '18px', cursor: 'pointer' }}>🔥</span>
                <span onClick={() => handleSelectReaction('insight')} style={{ fontSize: '18px', cursor: 'pointer' }}>💡</span>
              </div>
            )}
          </div>

          <button style={{ flex: 1, background: 'transparent', border: 'none', color: '#9ca3af', padding: '10px', fontWeight: '600', fontSize: '13px' }}>💬 Comment</button>
          
          <button onClick={handleExecuteShare} style={{ flex: 1, background: 'transparent', border: 'none', color: '#38bdf8', padding: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}>
            🔗 Perfectly Share Post
          </button>
        </div>

        {/* Comment UI */}
        <div style={{ marginTop: '16px' }}>
          <form onSubmit={handlePostComment} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', background: '#2563eb', color: '#fff', fontSize: '12px', fontWeight: 'bold', display: 'grid', placeItems: 'center', borderRadius: '50%' }}>IA</div>
            <div style={{ flex: 1, position: 'relative' }}>
              <input type="text" value={newCommentInput} onChange={e => setNewCommentInput(e.target.value)} placeholder="Write an interactive public comment review..." style={{ width: '100%', background: '#16161a', border: '1px solid #2d3748', borderRadius: '20px', padding: '8px 90px 8px 12px', color: '#fff', fontSize: '12.5px', outline: 'none' }} />
              <button type="submit" style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', background: '#2563eb', color: 'white', border: 'none', borderRadius: '14px', padding: '4px 10px', fontSize: '11px', cursor: 'pointer', fontWeight: '600' }}>Comment</button>
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {commentsList.map(comment => (
              <div key={comment.id} style={{ display: 'flex', gap: '10px', background: '#16161a', padding: '10px', borderRadius: '10px', border: '1px solid #22252a' }}>
                <div style={{ width: '30px', height: '30px', background: '#2e333d', color: '#a5b4fc', fontSize: '11px', fontWeight: 'bold', display: 'grid', placeItems: 'center', borderRadius: '50%' }}>{comment.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}><span style={{ fontSize: '12px', fontWeight: '700', color: '#f3f4f6' }}>{comment.user}</span><span style={{ fontSize: '10px', color: '#6b7280' }}>{comment.time}</span></div>
                  <p style={{ fontSize: '12px', color: '#d1d5db', margin: 0, lineHeight: '1.4' }}>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* System Active Toast */}
      {showToast && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: '#11141d', border: '1px solid #2563eb', borderRadius: '6px', padding: '10px 16px', color: '#60a5fa', fontSize: '12px', zIndex: 200 }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}