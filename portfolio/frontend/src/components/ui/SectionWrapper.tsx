'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tag?: string;
  title?: string;
  subtitle?: string;
}

export default function SectionWrapper({ id, children, className, tag, title, subtitle }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id={id} ref={ref} className={cn('relative py-24 overflow-hidden', className)}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {(tag || title) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            {tag && (
              <p className="section-tag mb-4">// {tag}</p>
            )}
            {title && (
              <h2 className="section-title gradient-text mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-white/50 max-w-2xl mx-auto text-lg font-body">
                {subtitle}
              </p>
            )}
            <div className="section-divider mt-8" />
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
