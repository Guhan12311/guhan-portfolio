'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, ExternalLink } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { EXPERIENCE } from '@/lib/data';

export default function ExperienceSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper id="experience" tag="03 / EXPERIENCE" title="Work History"
      subtitle="Professional experience shaping my craft in real-world environments.">
      <div ref={ref} className="max-w-3xl mx-auto">

        {/* Vertical timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg,transparent,rgba(0,245,255,0.4),rgba(179,0,255,0.4),transparent)' }} />

          <div className="space-y-12">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 w-12 h-12 rounded-full border-2 flex items-center justify-center z-10"
                  style={{
                    borderColor: exp.color,
                    background: '#020408',
                    boxShadow: `0 0 20px ${exp.color}40`,
                  }}>
                  <Briefcase size={18} style={{ color: exp.color }} />
                </div>

                {/* Card */}
                <div className="card-cyber p-6 relative overflow-hidden corner-tl corner-br">
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-10 rounded-bl-full"
                    style={{ background: exp.color }} />

                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-display font-bold text-base mb-1"
                        style={{ color: exp.color, fontFamily: 'Orbitron,monospace', fontSize: '0.9rem' }}>
                        {exp.role}
                      </h3>
                      <p className="text-white/80 font-semibold text-sm">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="flex items-center gap-1.5 text-xs text-white/40 font-mono"
                        style={{ fontFamily: 'Space Mono,monospace' }}>
                        <Calendar size={11} /> {exp.period}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full border font-mono"
                        style={{ color: exp.color, borderColor: exp.color + '30', fontFamily: 'Space Mono,monospace' }}>
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{exp.description}</p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full glass border font-mono"
                        style={{ borderColor: exp.color + '25', color: exp.color + 'cc', fontFamily: 'Space Mono,monospace' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education at bottom */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="relative pl-16 mt-12"
          >
            <div className="absolute left-0 w-12 h-12 rounded-full border-2 flex items-center justify-center z-10"
              style={{ borderColor: '#39ff14', background: '#020408', boxShadow: '0 0 20px rgba(57,255,20,0.3)' }}>
              <span className="text-lg">🎓</span>
            </div>
            <div className="card-cyber p-6" style={{ borderColor: 'rgba(57,255,20,0.2)' }}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-bold text-sm mb-1"
                    style={{ color: '#39ff14', fontFamily: 'Orbitron,monospace' }}>
                    B.Tech Information Technology
                  </h3>
                  <p className="text-white/70 text-sm">Dhanalakshmi Srinivasan Engineering College</p>
                </div>
                <span className="text-xs text-white/40 font-mono" style={{ fontFamily: 'Space Mono,monospace' }}>
                  2021 – 2025
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
