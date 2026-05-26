'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { SKILLS } from '@/lib/data';

const CATEGORIES = ['All', 'Languages', 'Frontend', 'Backend', 'AI/ML', 'Database', 'DevOps'];

function SkillBar({ name, level, icon, color, inView, delay }: {
  name: string; level: number; icon: string; color: string; inView: boolean; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="card-cyber p-4 group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors"
            style={{ fontFamily: 'Syne,sans-serif' }}>
            {name}
          </span>
        </div>
        <span className="text-xs font-mono" style={{ color, fontFamily: 'Space Mono,monospace' }}>
          {level}%
        </span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay: delay + 0.2, duration: 1, ease: 'easeOut' }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)`, boxShadow: `0 0 8px ${color}80` }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [active, setActive] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const filtered = active === 'All' ? SKILLS : SKILLS.filter(s => s.category === active);

  const catColors: Record<string, string> = {
    Languages: '#00f5ff', Frontend: '#b300ff', Backend: '#ff006e',
    'AI/ML': '#39ff14', Database: '#0057ff', DevOps: '#ffaa00',
  };

  return (
    <SectionWrapper id="skills" tag="02 / SKILLS" title="Tech Arsenal"
      subtitle="A curated set of tools I wield to build scalable, intelligent applications.">
      <div ref={ref}>

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-all duration-300 ${
                active === cat
                  ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10 shadow-neon-cyan'
                  : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white/80'
              }`}
              style={{ fontFamily: 'Space Mono,monospace' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((skill, i) => (
              <SkillBar
                key={skill.name}
                {...skill}
                color={catColors[skill.category] || '#00f5ff'}
                inView={inView}
                delay={i * 0.05}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Tech marquee */}
        <div className="mt-16 overflow-hidden">
          <p className="text-center text-xs text-white/30 font-mono mb-4" style={{ fontFamily: 'Space Mono,monospace' }}>
            // TECHNOLOGIES I WORK WITH
          </p>
          <div className="relative">
            <div className="marquee-track gap-6 items-center" style={{ display: 'flex' }}>
              {[...SKILLS, ...SKILLS].map((skill, i) => (
                <div key={i} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/8">
                  <span>{skill.icon}</span>
                  <span className="text-xs text-white/60 font-mono whitespace-nowrap"
                    style={{ fontFamily: 'Space Mono,monospace' }}>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
