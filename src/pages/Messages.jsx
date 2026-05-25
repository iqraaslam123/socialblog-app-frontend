import { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `You are a helpful assistant for SocialApp — a social media platform. You only answer questions related to SocialApp features. These include:
- How to create, edit, or delete posts
- How to like or comment on posts
- How to follow or unfollow users
- How to update profile (bio, picture)
- How to use the messaging/chat feature
- How to search for users in Explore
- How to switch themes and colors
- How to use notifications
- Account registration and login

If asked anything unrelated, politely say: "I can only help with SocialApp related questions!"`;

export default function Messages() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Hi! I\'m your SocialApp assistant. Ask me anything about using SocialApp!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(p => [...p, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = [...messages, userMsg]
        .filter(m => m.role !== 'assistant' || messages.indexOf(m) > 0)
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, I could not respond.';
      setMessages(p => [...p, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(p => [...p, { role: 'assistant', content: '⚠️ Connection error. Please try again.' }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-32px)] max-w-2xl mx-auto">
      {/* Header */}
      <div className="p-4 rounded-2xl mb-4 text-white font-bold flex items-center gap-3"
        style={{ background: 'var(--primary)' }}>
        <span className="text-2xl">🤖</span>
        <div>
          <p className="font-bold">SocialApp AI Assistant</p>
          <p className="text-xs opacity-80">Ask anything about SocialApp</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm shrink-0"
                style={{ background: 'var(--primary)', color: '#fff' }}>🤖</div>
            )}
            <div className={`max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
              ${m.role === 'user' ? 'text-white' : 'dark:text-gray-800'}`}
              style={m.role === 'user'
                ? { background: 'var(--primary)' }
                : { background: 'var(--accent)' }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
              style={{ background: 'var(--primary)', color: '#fff' }}>🤖</div>
            <div className="px-4 py-3 rounded-2xl text-sm" style={{ background: 'var(--accent)' }}>
              <span className="inline-flex gap-1">
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--primary)', animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--primary)', animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--primary)', animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="flex gap-3 mt-4">
        <input value={input} onChange={e => setInput(e.target.value)}
          placeholder="Ask about SocialApp features..."
          className="flex-1 border-2 rounded-xl px-4 py-3 text-sm outline-none dark:bg-gray-900 dark:text-white transition-all"
          style={{ borderColor: 'var(--accent)' }}
          onFocus={e => e.target.style.borderColor = 'var(--primary)'}
          onBlur={e => e.target.style.borderColor = 'var(--accent)'} />
        <button type="submit" disabled={loading}
          className="px-5 py-3 rounded-xl text-white font-bold text-sm disabled:opacity-50 transition-all hover:opacity-90"
          style={{ background: 'var(--primary)' }}>
          Send 🚀
        </button>
      </form>
    </div>
  );
}