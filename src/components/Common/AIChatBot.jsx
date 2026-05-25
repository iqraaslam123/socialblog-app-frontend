import { useState, useRef, useEffect } from 'react';
import robot from '../../assets/roboy.png'; // Robot icon for the button
// index.css
import '../../index.css'; // Global styles (if needed)
export default function AIChatBot() {
  const [open, setOpen] = useState(false);
  // Humne text change kar diya taake pata chale browser me update hua ya nahi
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '🌟 Welcome to SocialApp V2! Ask me anything about our features.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(p => [...p, userMsg]);
    setInput('');
    setLoading(true);

    // AI Response Simulate karne ke liye dummy logic (Presentation ke liye best hai)
    setTimeout(() => {
      let reply = "I can only help with SocialApp related questions like posts, likes, or user profiles!";
      const query = input.toLowerCase();

      if (query.includes('hello') || query.includes('hi')) {
        reply = "Hello! How can I help you navigate SocialApp today?";
      } else if (query.includes('post')) {
        reply = "To create a post, click on the '+' icon on your home feed, upload an image or write text, and press Share!";
      } else if (query.includes('theme') || query.includes('color')) {
        reply = "You can switch between Dark and Light mode from your Profile settings page.";
      } else if (query.includes('profile')) {
        reply = "You can update your bio, profile picture, and cover image directly from your Profile Dashboard.";
      }

      setMessages(p => [...p, { role: 'assistant', content: reply }]);
      setLoading(false);
    }, 800); // 0.8 seconds ka delay taake lage real AI soch raha hai
  };

  return (
    <>
      {/* Floating Button */}
      <button onClick={() => setOpen(p => !p)}
        style={{
          position: 'fixed', bottom: 28, right: 28, width: 58, height: 58,
          borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: '#4F46E5', color: '#fff', // Pure indigo color for testing
          fontSize: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        title="AI Assistant">
        {open ? '✕' : <img src={robot} className='robot'/>} {/* Open hone par cross, nahi toh image icon */}
      </button>

      {/* Chat Window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 98, right: 28, width: 340, height: 480,
          borderRadius: 20, overflow: 'hidden', zIndex: 999,
          boxShadow: '0 8px 40px rgba(0,0,0,0.22)',
          display: 'flex', flexDirection: 'column',
          background: '#fff', border: '1px solid #e5e7eb', // Fallback borders
        }}>
          {/* Header */}
          <div style={{ padding: '14px 16px', background: '#4F46E5', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✨</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>SocialApp Smart Bot</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>● Active Support</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: 8 }}>
                {m.role === 'assistant' && (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#4F46E5', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>✨</div>
                )}
                <div style={{
                  maxWidth: '78%', padding: '9px 13px', borderRadius: m.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                  fontSize: 13, lineHeight: 1.5,
                  background: m.role === 'user' ? '#4F46E5' : '#F3F4F6',
                  color: m.role === 'user' ? '#fff' : '#1F2937',
                  wordBreak: 'break-word',
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#4F46E5', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✨</div>
                <div style={{ background: '#F3F4F6', padding: '9px 14px', borderRadius: '4px 16px 16px 16px' }}>
                  <span style={{ display: 'inline-flex', gap: 4 }}>
                    {[0,1,2].map(i => (
                      <span key={i} style={{
                        width: 7, height: 7, borderRadius: '50%', background: '#4F46E5',
                        display: 'inline-block', animation: 'bounce 1s infinite',
                        animationDelay: `${i * 0.15}s`,
                      }} />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} style={{ padding: '10px 12px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask about SocialApp..."
              style={{
                flex: 1, padding: '9px 13px', borderRadius: 12, fontSize: 13,
                border: '1.5px solid #d1d5db', outline: 'none',
                background: '#fff', color: '#000',
              }} />
            <button type="submit" disabled={loading}
              style={{
                padding: '9px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
                background: '#4F46E5', color: '#fff', fontWeight: 700, fontSize: 13,
                opacity: loading ? 0.6 : 1,
              }}>
              →
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}