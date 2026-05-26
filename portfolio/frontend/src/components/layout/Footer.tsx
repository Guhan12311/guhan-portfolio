'use client';

import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/5 py-12 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + copy */}
          <div className="text-center md:text-left">
            <div className="font-display font-black text-xl gradient-text mb-1" style={{ fontFamily: 'Orbitron,monospace' }}>
              GUHAN.DEV
            </div>
            <p className="text-white/40 text-xs font-mono" style={{ fontFamily: 'Space Mono,monospace' }}>
              © {new Date().getFullYear()} Guhan A. All rights reserved.
            </p>
            <p className="text-white/30 text-xs mt-1 font-mono" style={{ fontFamily: 'Space Mono,monospace' }}>
              Built with Next.js · Three.js · Gemini AI
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {[
              { href: PERSONAL_INFO.github, icon: Github, label: 'GitHub' },
              { href: PERSONAL_INFO.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${PERSONAL_INFO.email}`, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-lg glass glow-border-cyan flex items-center justify-center text-white/50 hover:text-neon-cyan transition-all duration-300 hover:-translate-y-1"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Scroll top */}
          <button
            onClick={scrollTop}
            className="w-10 h-10 rounded-lg border border-neon-cyan/30 flex items-center justify-center text-neon-cyan/60 hover:text-neon-cyan hover:border-neon-cyan/60 hover:shadow-neon-cyan transition-all duration-300 hover:-translate-y-1"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Divider */}
        <div className="section-divider mt-8 mb-4" />

        <p className="text-center text-xs text-white/20 font-mono" style={{ fontFamily: 'Space Mono,monospace' }}>
          {`< FULL STACK DEVELOPER • GENERATIVE AI DEVELOPER • SOFTWARE ENGINEER />`}
        </p>
      </div>
    </footer>
  );
}
