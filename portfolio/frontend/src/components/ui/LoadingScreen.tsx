'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'done'>('loading');
  const loadingTexts = [
    'INITIALIZING SYSTEMS...',
    'LOADING NEURAL NETWORKS...',
    'COMPILING PORTFOLIO DATA...',
    'RENDERING 3D ENVIRONMENT...',
    'LAUNCHING INTERFACE...',
  ];
  const [textIdx, setTextIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 18 + 4;
        if (next >= 100) {
          clearInterval(interval);
          setPhase('done');
          return 100;
        }
        return next;
      });
    }, 120);

    const textInterval = setInterval(() => {
      setTextIdx(i => (i + 1) % loadingTexts.length);
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-dark-950 overflow-hidden"
        >
          {/* Scan line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg,transparent,#00f5ff,transparent)' }}
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Grid bg */}
          <div className="absolute inset-0 cyber-grid opacity-30" />

          {/* Corner decorations */}
          {[
            'top-8 left-8 border-t border-l',
            'top-8 right-8 border-t border-r',
            'bottom-8 left-8 border-b border-l',
            'bottom-8 right-8 border-b border-r',
          ].map((cls, i) => (
            <div
              key={i}
              className={`absolute w-16 h-16 border-neon-cyan opacity-40 ${cls}`}
              style={{ borderColor: '#00f5ff' }}
            />
          ))}

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative mb-12"
          >
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-400/30"
              style={{ width: 120, height: 120, margin: '-20px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-purple-500/20"
              style={{ width: 160, height: 160, margin: '-40px' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />

            <div className="w-20 h-20 rounded-full border-2 flex items-center justify-center relative"
              style={{ borderColor: '#00f5ff', boxShadow: '0 0 30px rgba(0,245,255,0.4)' }}>
              <span className="font-display text-2xl font-black text-neon-cyan" style={{ fontFamily: 'Orbitron,monospace' }}>
                GA
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-black tracking-[0.3em] mb-2"
            style={{ fontFamily: 'Orbitron,monospace', color: '#e8eaf0' }}
          >
            GUHAN A
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            className="text-xs tracking-[0.4em] mb-12 font-mono"
            style={{ color: '#00f5ff', fontFamily: 'Space Mono,monospace' }}
          >
            PORTFOLIO OS v2.0
          </motion.p>

          {/* Loading bar */}
          <div className="w-64 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-mono text-white/40" style={{ fontFamily: 'Space Mono,monospace' }}>
                LOADING
              </span>
              <span className="text-xs font-mono" style={{ color: '#00f5ff', fontFamily: 'Space Mono,monospace' }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-px bg-white/10 rounded overflow-hidden">
              <motion.div
                className="h-full loading-bar rounded"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Loading text */}
          <motion.p
            key={textIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 0.5, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs tracking-[0.25em] font-mono"
            style={{ color: '#00f5ff', fontFamily: 'Space Mono,monospace' }}
          >
            {loadingTexts[textIdx]}
          </motion.p>

          {/* Bottom dots */}
          <div className="absolute bottom-12 flex gap-2">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#00f5ff' }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
