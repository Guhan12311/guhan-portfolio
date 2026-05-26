'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, ExternalLink, Github, Mail, Download } from 'lucide-react';

const COMMANDS = [
  { id: 'hero', label: 'Go to Home', section: 'Navigation', icon: Hash, action: 'scroll' },
  { id: 'about', label: 'Go to About', section: 'Navigation', icon: Hash, action: 'scroll' },
  { id: 'skills', label: 'Go to Skills', section: 'Navigation', icon: Hash, action: 'scroll' },
  { id: 'experience', label: 'Go to Experience', section: 'Navigation', icon: Hash, action: 'scroll' },
  { id: 'projects', label: 'Go to Projects', section: 'Navigation', icon: Hash, action: 'scroll' },
  { id: 'services', label: 'Go to Services', section: 'Navigation', icon: Hash, action: 'scroll' },
  { id: 'contact', label: 'Go to Contact', section: 'Navigation', icon: Hash, action: 'scroll' },
  { id: 'ai-analyzer', label: 'AI Resume Analyzer', section: 'AI Tools', icon: Hash, action: 'scroll' },
  { id: 'github', label: 'View GitHub Profile', section: 'External', icon: Github, action: 'link', href: 'https://github.com/guhan-a' },
  { id: 'linkedin', label: 'View LinkedIn', section: 'External', icon: ExternalLink, action: 'link', href: 'https://linkedin.com/in/guhan-a' },
  { id: 'email', label: 'Send Email', section: 'External', icon: Mail, action: 'link', href: 'mailto:guhan.dev@gmail.com' },
  { id: 'resume', label: 'Download Resume', section: 'Actions', icon: Download, action: 'download', href: '/resume.pdf' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.section.toLowerCase().includes(query.toLowerCase())
  );

  const execute = useCallback((cmd: typeof COMMANDS[0]) => {
    setOpen(false);
    setQuery('');
    if (cmd.action === 'scroll') {
      document.getElementById(cmd.id)?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd.action === 'link' && cmd.href) {
      window.open(cmd.href, '_blank');
    } else if (cmd.action === 'download' && cmd.href) {
      const a = document.createElement('a');
      a.href = cmd.href;
      a.download = 'Guhan_A_Resume.pdf';
      a.click();
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(v => !v);
        setQuery('');
        setSelected(0);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[selected]) execute(filtered[selected]);
  };

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.section]) acc[cmd.section] = [];
    acc[cmd.section].push(cmd);
    return acc;
  }, {} as Record<string, typeof COMMANDS>);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99990]"
              onClick={() => setOpen(false)}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed top-[20vh] left-1/2 -translate-x-1/2 w-full max-w-xl z-[99991] rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(6,13,24,0.97)',
                border: '1px solid rgba(0,245,255,0.2)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.8), 0 0 60px rgba(0,245,255,0.08)',
              }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'rgba(0,245,255,0.1)' }}>
                <Search size={16} className="text-white/30 flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-white/80 placeholder-white/30 outline-none text-sm"
                  style={{ fontFamily: 'Syne,sans-serif' }}
                />
                <kbd className="hidden sm:flex text-xs text-white/25 border border-white/10 rounded px-1.5 py-0.5 font-mono">
                  ESC
                </kbd>
              </div>

              {/* Commands list */}
              <div className="max-h-72 overflow-y-auto py-2">
                {Object.keys(grouped).length === 0 ? (
                  <p className="text-center text-white/30 text-sm py-8 font-mono"
                    style={{ fontFamily: 'Space Mono,monospace' }}>
                    No commands found
                  </p>
                ) : (
                  Object.entries(grouped).map(([section, cmds]) => {
                    const globalStart = filtered.indexOf(cmds[0]);
                    return (
                      <div key={section}>
                        <p className="px-4 pt-3 pb-1 text-xs text-white/25 font-mono uppercase tracking-widest"
                          style={{ fontFamily: 'Space Mono,monospace' }}>
                          {section}
                        </p>
                        {cmds.map((cmd, i) => {
                          const idx = globalStart + i;
                          const Icon = cmd.icon;
                          return (
                            <button
                              key={cmd.id}
                              onClick={() => execute(cmd)}
                              onMouseEnter={() => setSelected(idx)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                                selected === idx
                                  ? 'bg-neon-cyan/10 text-neon-cyan'
                                  : 'text-white/60 hover:text-white/80'
                              }`}
                            >
                              <Icon size={14} className="flex-shrink-0" />
                              <span>{cmd.label}</span>
                              {selected === idx && (
                                <kbd className="ml-auto text-xs text-white/30 border border-white/10 rounded px-1.5 py-0.5 font-mono">
                                  ↵
                                </kbd>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t flex items-center gap-4 text-xs text-white/20"
                style={{ borderColor: 'rgba(255,255,255,0.05)', fontFamily: 'Space Mono,monospace' }}>
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Trigger hint — bottom left */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:flex items-center gap-2 text-xs text-white/20 font-mono"
        style={{ fontFamily: 'Space Mono,monospace' }}>
        <kbd className="border border-white/15 rounded px-1.5 py-0.5">⌘K</kbd>
        <span>Commands</span>
      </div>
    </>
  );
}
