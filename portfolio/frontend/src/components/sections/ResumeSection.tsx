'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, FileText, Eye } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function ResumeSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <SectionWrapper id="resume" tag="09 / RESUME">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,245,255,0.06), rgba(179,0,255,0.06))',
            border: '1px solid rgba(0,245,255,0.15)',
            boxShadow: '0 0 60px rgba(0,245,255,0.08)',
          }}
        >
          {/* Decorative background */}
          <div className="absolute inset-0 cyber-grid opacity-20" />
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle,#00f5ff,transparent)' }} />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle,#b300ff,transparent)' }} />

          <div className="relative z-10">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              📄
            </motion.div>

            <h2 className="section-title gradient-text mb-4">Download My Resume</h2>
            <p className="text-white/50 max-w-lg mx-auto mb-8">
              Get my full resume with detailed experience, projects, skills, and education in a clean, ATS-friendly format.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/GUHAN_RESUME.pdf"
                download
                className="inline-flex items-center gap-2 btn-cyber btn-cyber-filled px-8 py-3"
                style={{ fontFamily: 'Orbitron,monospace' }}
              >
                <Download size={16} />
                Download PDF
              </a>
              <a
                href="/GUHAN_RESUME.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all text-sm font-mono"
                style={{ fontFamily: 'Space Mono,monospace' }}
              >
                <Eye size={14} />
                Preview
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-10 text-xs text-white/30 font-mono"
              style={{ fontFamily: 'Space Mono,monospace' }}>
              <span className="flex items-center gap-1.5"><FileText size={11} /> Updated 2025</span>
              <span className="flex items-center gap-1.5">📍 Tamil Nadu, India</span>
              <span className="flex items-center gap-1.5">🟢 Open to opportunities</span>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
