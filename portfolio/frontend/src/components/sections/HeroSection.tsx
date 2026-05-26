'use client';

import { useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import dynamic from 'next/dynamic';
import { PERSONAL_INFO } from '@/lib/data';

const HeroGlobe = dynamic(() => import('@/components/3d/HeroGlobe'), { ssr: false });

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on mouse move
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      container.style.setProperty('--mx', `${x}px`);
      container.style.setProperty('--my', `${y}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stagger = {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } },
    item: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } } },
  };

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,245,255,0.06) 0%, transparent 60%)' }} />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 70% 30%, rgba(179,0,255,0.05) 0%, transparent 60%)' }} />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,245,255,0.4),transparent)' }}
        animate={{ top: ['5%', '95%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">

          {/* Left — Text Content */}
          <motion.div
            variants={stagger.container}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Tag */}
            <motion.div variants={stagger.item} className="flex items-center gap-3">
              <div className="h-px w-12" style={{ background: '#00f5ff' }} />
              <span className="section-tag text-neon-cyan">
                &lt; FULL STACK + GENERATIVE AI /&gt;
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={stagger.item}>
              <h1 className="font-display font-black leading-none"
                style={{ fontFamily: 'Orbitron,monospace', fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
                <span className="block text-white">GUHAN A</span>
                <span className="block gradient-text"></span>
              </h1>
            </motion.div>

            {/* Typing title */}
            <motion.div variants={stagger.item} className="flex items-center gap-3 h-8">
              <span className="text-white/40 font-mono text-sm" style={{ fontFamily: 'Space Mono,monospace' }}>&gt;_</span>
              <TypeAnimation
                sequence={[
                  'Full Stack Developer', 2000,
                  'Generative AI Developer', 2000,
                  'LLM Engineer', 2000,
                  'React Specialist', 2000,
                  'Software Engineer', 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-lg font-mono font-semibold"
                style={{ color: '#00f5ff', fontFamily: 'Space Mono,monospace' }}
              />
            </motion.div>

            {/* Summary */}
            <motion.p
              variants={stagger.item}
              className="text-white/60 text-base leading-relaxed max-w-xl"
              style={{ fontFamily: 'Syne,sans-serif' }}
            >
              {PERSONAL_INFO.summary}
            </motion.p>

            {/* Stats */}
            <motion.div variants={stagger.item} className="flex flex-wrap gap-6">
              {[
                { label: 'Projects', value: '10+' },
                { label: 'Internships', value: '2' },
                { label: 'AI Apps', value: '5+' },
                { label: 'Skills', value: '20+' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black font-display gradient-text"
                    style={{ fontFamily: 'Orbitron,monospace' }}>{value}</div>
                  <div className="text-xs text-white/40 font-mono mt-1"
                    style={{ fontFamily: 'Space Mono,monospace' }}>{label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={stagger.item} className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-cyber btn-cyber-filled px-8 py-3 text-sm"
                style={{ fontFamily: 'Orbitron,monospace' }}
              >
                View Projects
              </button>
              <a
                href="/GUHAN_RESUME.pdf"
                download
                className="flex items-center gap-2 px-8 py-3 rounded text-sm font-mono text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-300"
                style={{ fontFamily: 'Space Mono,monospace' }}
              >
                <Download size={14} />
                Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={stagger.item} className="flex items-center gap-4">
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
                  className="w-11 h-11 rounded-lg glass border border-white/10 flex items-center justify-center text-white/50 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
              <div className="h-px flex-1 max-w-[80px]" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <span className="text-xs text-white/30 font-mono" style={{ fontFamily: 'Space Mono,monospace' }}>
                {PERSONAL_INFO.availability}
              </span>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#39ff14' }} />
            </motion.div>
          </motion.div>

          {/* Right — 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
            className="relative h-[500px] lg:h-[600px] hidden md:block"
          >
            {/* Glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)' }} />
            </div>

            <Suspense fallback={
              <div className="h-full flex items-center justify-center">
                <div className="cyber-spinner" />
              </div>
            }>
              <HeroGlobe />
            </Suspense>

            {/* Floating label cards */}
            {[
              { label: 'LangChain', top: '15%', left: '5%', color: '#00f5ff', delay: 0.8 },
              { label: 'FastAPI', top: '70%', left: '0%', color: '#b300ff', delay: 1.0 },
              { label: 'React.js', top: '20%', right: '5%', color: '#ff006e', delay: 1.2 },
              { label: 'Gemini AI', top: '65%', right: '0%', color: '#39ff14', delay: 1.4 },
            ].map(({ label, top, left, right, color, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay, duration: 0.5 }}
                className="absolute glass border text-xs font-mono px-3 py-1.5 rounded-full animate-float"
                style={{
                  top, left, right,
                  color, borderColor: color + '40',
                  fontFamily: 'Space Mono,monospace',
                  animationDelay: `${delay}s`,
                }}
              >
                {label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.button
          onClick={scrollDown}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
        >
          <span className="text-xs font-mono tracking-widest" style={{ fontFamily: 'Space Mono,monospace' }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
