'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Star, Zap } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { PROJECTS } from '@/lib/data';

const CATS = ['All', 'AI/ML', 'Web'];

function ProjectCard({ project, index, inView }: { project: typeof PROJECTS[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="card-cyber p-6 flex flex-col gap-4 group relative overflow-hidden h-full"
    >
      {/* Top glow accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,${project.color},transparent)` }} />

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
          style={{ color: project.color, background: project.color + '15', border: `1px solid ${project.color}30` }}>
          <Star size={10} fill="currentColor" /> Featured
        </div>
      )}

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{ background: project.color + '15', border: `1px solid ${project.color}25` }}>
        {project.category === 'AI/ML' ? '🤖' : '🌐'}
      </div>

      {/* Title */}
      <div>
        <h3 className="font-display font-bold text-base mb-1 group-hover:text-white transition-colors"
          style={{ color: project.color, fontFamily: 'Orbitron,monospace', fontSize: '0.875rem' }}>
          {project.title}
        </h3>
        <span className="text-xs px-2 py-0.5 rounded font-mono"
          style={{ color: project.color + 'aa', background: project.color + '10', fontFamily: 'Space Mono,monospace' }}>
          {project.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-white/55 text-sm leading-relaxed flex-1">{project.description}</p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map(t => (
          <span key={t} className="text-xs px-2 py-0.5 rounded glass border border-white/8 text-white/50 font-mono"
            style={{ fontFamily: 'Space Mono,monospace' }}>
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/6">
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors font-mono"
          style={{ fontFamily: 'Space Mono,monospace' }}>
          <Github size={13} /> Code
        </a>
        {project.live !== '#' && (
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs hover:text-white transition-colors font-mono"
            style={{ color: project.color + 'aa', fontFamily: 'Space Mono,monospace' }}>
            <ExternalLink size={13} /> Live
          </a>
        )}
        <div className="ml-auto flex items-center gap-1 text-xs"
          style={{ color: project.color + '80', fontFamily: 'Space Mono,monospace' }}>
          <Zap size={11} /> {project.status}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <SectionWrapper id="projects" tag="04 / PROJECTS" title="My Work"
      subtitle="A selection of projects where I've applied my skills to solve real problems.">
      <div ref={ref}>
        {/* Category pills */}
        <div className="flex justify-center gap-3 mb-12">
          {CATS.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono border transition-all duration-300 ${
                active === cat
                  ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10'
                  : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white/80'
              }`}
              style={{ fontFamily: 'Space Mono,monospace' }}>
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-14"
        >
          <a href="https://github.com/guhan-a" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 btn-cyber btn-cyber-filled px-8 py-3"
            style={{ fontFamily: 'Orbitron,monospace' }}>
            <Github size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
