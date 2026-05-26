'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { SERVICES } from '@/lib/data';

export default function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper id="services" tag="05 / SERVICES" title="What I Offer"
      subtitle="End-to-end development services tailored to your needs.">
      <div ref={ref} className="grid md:grid-cols-2 gap-6">
        {SERVICES.map((svc, i) => (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="card-cyber p-8 group relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
              style={{ background: `radial-gradient(ellipse at top left, ${svc.color}08, transparent 60%)` }} />

            {/* Icon */}
            <div className="text-4xl mb-5">{svc.icon}</div>

            {/* Number */}
            <div className="absolute top-6 right-6 font-display font-black text-5xl opacity-5"
              style={{ color: svc.color, fontFamily: 'Orbitron,monospace' }}>
              0{svc.id}
            </div>

            <h3 className="font-display font-bold text-lg mb-3"
              style={{ color: svc.color, fontFamily: 'Orbitron,monospace', fontSize: '1rem' }}>
              {svc.title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-5">{svc.description}</p>

            <div className="flex flex-wrap gap-2">
              {svc.skills.map(s => (
                <span key={s} className="text-xs px-2.5 py-1 rounded font-mono"
                  style={{
                    color: svc.color,
                    background: svc.color + '12',
                    border: `1px solid ${svc.color}25`,
                    fontFamily: 'Space Mono,monospace',
                  }}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
