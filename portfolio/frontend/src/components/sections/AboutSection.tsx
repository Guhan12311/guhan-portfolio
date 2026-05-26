'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, MapPin, Calendar, Zap, Code2, Brain } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { PERSONAL_INFO, EDUCATION } from '@/lib/data';

const highlights = [
  { icon: Code2, title: 'Full Stack', desc: 'React · Next.js · FastAPI · Django · Node.js', color: '#00f5ff' },
  { icon: Brain, title: 'Generative AI', desc: 'LangChain · OpenAI · Gemini · RAG Pipelines', color: '#b300ff' },
  { icon: Zap, title: 'Performance', desc: 'Scalable, optimised, production-ready code', color: '#ff006e' },
];

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <SectionWrapper id="about" tag="01 / ABOUT_ME" title="Who I Am">
      <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — Image / Avatar placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            {/* Outer rotating rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed"
              style={{ borderColor: 'rgba(0,245,255,0.2)' }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4 rounded-full border border-dashed"
              style={{ borderColor: 'rgba(179,0,255,0.2)' }}
            />

            {/* Avatar core */}
            <div className="absolute inset-8 rounded-full glass-strong border-2 flex flex-col items-center justify-center overflow-hidden"
              style={{ borderColor: 'rgba(0,245,255,0.3)', boxShadow: '0 0 40px rgba(0,245,255,0.15)' }}>
              <span className="font-display font-black text-5xl gradient-text" style={{ fontFamily: 'Orbitron,monospace' }}>
                GA
              </span>
              <span className="text-xs text-white/40 font-mono mt-2" style={{ fontFamily: 'Space Mono,monospace' }}>
                GUHAN A
              </span>
            </div>

            {/* Floating badges */}
            {[
              { label: 'React', top: '-10px', left: '10px', color: '#61dafb' },
              { label: 'Python', top: '10px', right: '-10px', color: '#3776ab' },
              { label: 'AI', bottom: '0px', left: '-10px', color: '#b300ff' },
              { label: 'Next.js', bottom: '20px', right: '-15px', color: '#ffffff' },
            ].map(({ label, color, ...pos }) => (
              <motion.div
                key={label}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
                className="absolute glass border text-xs font-mono px-2 py-1 rounded"
                style={{ ...pos, color, borderColor: color + '30', fontFamily: 'Space Mono,monospace' }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — Text content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-col gap-8"
        >
          <div>
            <p className="text-white/70 text-base leading-relaxed" style={{ fontFamily: 'Syne,sans-serif' }}>
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Highlight cards */}
          <div className="grid gap-4">
            {highlights.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                className="card-cyber p-4 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: color + '15', border: `1px solid ${color}30` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm mb-1" style={{ color, fontFamily: 'Orbitron,monospace' }}>
                    {title}
                  </h4>
                  <p className="text-xs text-white/50">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="card-cyber p-5 glow-border-cyan"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.2)' }}>
                <GraduationCap size={18} style={{ color: '#00f5ff' }} />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-neon-cyan mb-1" style={{ fontFamily: 'Orbitron,monospace' }}>
                  {EDUCATION.degree}
                </h4>
                <p className="text-white/70 text-sm mb-2">{EDUCATION.college}</p>
                <div className="flex flex-wrap gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={11} /> {EDUCATION.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={11} /> {EDUCATION.location}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
