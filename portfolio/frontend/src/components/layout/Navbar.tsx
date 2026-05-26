'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'AI Tools', href: '#ai-analyzer' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive('#' + id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => scrollTo('#hero')} className="relative group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg border flex items-center justify-center font-display font-black text-sm transition-all duration-300 group-hover:shadow-neon-cyan"
                style={{ borderColor: 'rgba(0,245,255,0.4)', color: '#00f5ff', fontFamily: 'Orbitron,monospace' }}>
                GA
              </div>
              <span className="hidden sm:block font-display font-bold text-sm tracking-widest text-white/80 group-hover:text-white transition-colors"
                style={{ fontFamily: 'Orbitron,monospace', letterSpacing: '0.2em' }}>
                GUHAN.DEV
              </span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 text-xs font-mono tracking-widest transition-all duration-300 rounded ${
                  active === link.href
                    ? 'text-neon-cyan'
                    : 'text-white/50 hover:text-white/90'
                }`}
                style={{ fontFamily: 'Space Mono,monospace', letterSpacing: '0.1em' }}
              >
                {active === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded"
                    style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-cyber text-xs px-5 py-2"
              style={{ fontFamily: 'Orbitron,monospace' }}
            >
              Hire Me
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 glass-strong border-b border-white/8 lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left px-4 py-3 rounded text-sm font-mono tracking-widest transition-colors ${
                    active === link.href
                      ? 'text-neon-cyan bg-neon-cyan/5'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ fontFamily: 'Space Mono,monospace' }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#contact')}
                className="mt-2 btn-cyber text-xs w-full justify-center"
                style={{ fontFamily: 'Orbitron,monospace' }}
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
