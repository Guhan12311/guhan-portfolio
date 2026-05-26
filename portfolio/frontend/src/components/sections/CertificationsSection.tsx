'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Calendar } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { CERTIFICATIONS } from '@/lib/data';

export default function CertificationsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper id="certifications" tag="08 / CERTIFICATIONS" title="Credentials">
      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="card-cyber p-6 text-center flex flex-col items-center gap-4 group"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: cert.color + '15',
                border: `2px solid ${cert.color}30`,
                boxShadow: `0 0 20px ${cert.color}20`,
              }}>
              <Award size={24} style={{ color: cert.color }} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-white/80 mb-1 leading-tight">{cert.title}</h3>
              <p className="text-xs text-white/40">{cert.issuer}</p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono"
              style={{ color: cert.color + '80', fontFamily: 'Space Mono,monospace' }}>
              <Calendar size={10} /> {cert.date}
            </div>

            <div className="w-full h-px"
              style={{ background: `linear-gradient(90deg,transparent,${cert.color}40,transparent)` }} />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
