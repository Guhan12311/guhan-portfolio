'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { TESTIMONIALS } from '@/lib/data';

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper id="testimonials" tag="07 / TESTIMONIALS" title="What People Say">
      <div ref={ref} className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="card-cyber p-6 flex flex-col gap-4 relative"
          >
            {/* Quote icon */}
            <Quote size={24} className="text-neon-cyan/20 absolute top-4 right-4" />

            {/* Stars */}
            <div className="flex gap-1">
              {Array(t.rating).fill(0).map((_, j) => (
                <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* Content */}
            <p className="text-white/65 text-sm leading-relaxed flex-1 italic">
              &ldquo;{t.content}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm"
                style={{
                  background: 'linear-gradient(135deg,rgba(0,245,255,0.2),rgba(179,0,255,0.2))',
                  border: '1px solid rgba(0,245,255,0.2)',
                  fontFamily: 'Orbitron,monospace',
                  color: '#00f5ff',
                }}>
                {t.avatar}
              </div>
              <div>
                <p className="text-white/80 text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-white/40 font-mono" style={{ fontFamily: 'Space Mono,monospace' }}>
                  {t.role} · {t.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
