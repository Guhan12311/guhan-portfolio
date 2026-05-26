'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  'Tell me about Guhan\'s skills',
  'What projects has he built?',
  'Is Guhan available for work?',
  'What is his AI experience?',
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: '👋 Hi! I\'m Guhan\'s AI assistant, trained on his portfolio data. Ask me anything about his skills, projects, experience, or availability!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus();
  }, [open, minimized]);

  const sendMessage = async (text: string = input) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response || 'Sorry, I encountered an error.',
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Connection error. Please try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => { setOpen(true); setMinimized(false); }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, type: 'spring' }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-neon-cyan"
        style={{
          background: 'linear-gradient(135deg,#00f5ff20,#b300ff20)',
          border: '1px solid rgba(0,245,255,0.4)',
          boxShadow: '0 0 20px rgba(0,245,255,0.3)',
          display: open && !minimized ? 'none' : 'flex',
        }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Bot size={24} style={{ color: '#00f5ff' }} />
        </motion.div>
        {/* Ping */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center"
          style={{ background: '#39ff14', fontSize: '8px', color: '#020408' }}>
          AI
        </span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={minimized
              ? { opacity: 1, scale: 1, y: 0, height: 56 }
              : { opacity: 1, scale: 1, y: 0, height: 580 }
            }
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(6,13,24,0.95)',
              border: '1px solid rgba(0,245,255,0.2)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,245,255,0.1)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: 'rgba(0,245,255,0.15)', background: 'rgba(0,245,255,0.04)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,245,255,0.15)', border: '1px solid rgba(0,245,255,0.3)' }}>
                  <Bot size={16} style={{ color: '#00f5ff' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: 'Orbitron,monospace', fontSize: '0.75rem' }}>
                    GUHAN&apos;S AI
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#39ff14' }} />
                    <p className="text-xs text-white/40" style={{ fontFamily: 'Space Mono,monospace' }}>Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setMinimized(v => !v)}
                  className="w-7 h-7 rounded flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <Minimize2 size={13} />
                </button>
                <button onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <X size={13} />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="h-[420px] overflow-y-auto p-4 space-y-4 scrollbar-thin">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-neon-cyan/15 border border-neon-cyan/25'
                          : 'bg-purple-500/15 border border-purple-500/25'
                      }`}>
                        {msg.role === 'user'
                          ? <User size={12} style={{ color: '#00f5ff' }} />
                          : <Sparkles size={12} style={{ color: '#b300ff' }} />
                        }
                      </div>
                      <div className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user' ? 'chat-message-user' : 'chat-message-ai'
                      }`}>
                        <p className="text-white/85 text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        <p className="text-white/20 text-[10px] mt-1.5 font-mono"
                          style={{ fontFamily: 'Space Mono,monospace' }}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-purple-500/15 border border-purple-500/25">
                        <Sparkles size={12} style={{ color: '#b300ff' }} />
                      </div>
                      <div className="chat-message-ai px-4 py-3">
                        <div className="flex gap-1">
                          {[0, 1, 2].map(i => (
                            <motion.div key={i} className="w-1.5 h-1.5 rounded-full"
                              style={{ background: '#b300ff' }}
                              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Suggestions */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-white/25 mb-2 font-mono" style={{ fontFamily: 'Space Mono,monospace' }}>
                      Quick questions:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTIONS.map(s => (
                        <button key={s} onClick={() => sendMessage(s)}
                          className="text-xs px-2.5 py-1 rounded-full glass border border-white/10 text-white/50 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Ask anything about Guhan..."
                      disabled={loading}
                      className="flex-1 bg-white/4 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/80 placeholder-white/25 outline-none focus:border-neon-cyan/40 focus:bg-neon-cyan/5 transition-all"
                      style={{ fontFamily: 'Syne,sans-serif' }}
                    />
                    <button
                      onClick={() => sendMessage()}
                      disabled={loading || !input.trim()}
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                      style={{
                        background: input.trim() ? 'rgba(0,245,255,0.15)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${input.trim() ? 'rgba(0,245,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                        color: input.trim() ? '#00f5ff' : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      <Send size={15} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
