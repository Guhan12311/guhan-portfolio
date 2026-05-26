'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Github, GitBranch, Star, Code2, Activity } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { PERSONAL_INFO } from '@/lib/data';

const GH = PERSONAL_INFO.github.split('/').pop() || 'Guhan12311';

export default function GitHubSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <SectionWrapper id="github" tag="06 / OPEN_SOURCE" title="GitHub Activity"
      subtitle="My open-source contributions and coding activity.">
      <div ref={ref} className="space-y-8">

        {/* Stats row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Code2, label: 'Repositories', value: '15+', color: '#00f5ff' },
            { icon: Star, label: 'Stars Earned', value: '50+', color: '#b300ff' },
            { icon: GitBranch, label: 'Contributions', value: '300+', color: '#ff006e' },
            { icon: Activity, label: 'Streak Days', value: '30+', color: '#39ff14' },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="card-cyber p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: color + '15', border: `1px solid ${color}30` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <div className="font-display font-black text-xl" style={{ color, fontFamily: 'Orbitron,monospace' }}>
                  {value}
                </div>
                <div className="text-xs text-white/40 font-mono" style={{ fontFamily: 'Space Mono,monospace' }}>
                  {label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub stat images */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="card-cyber p-4 overflow-hidden"
          >
            <p className="text-xs text-white/40 font-mono mb-3" style={{ fontFamily: 'Space Mono,monospace' }}>
              // GITHUB STATS
            </p>
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GH}&show_icons=true&theme=transparent&bg_color=00000000&title_color=00f5ff&text_color=e8eaf0&icon_color=b300ff&border_color=ffffff15&hide_border=false`}
              alt="GitHub stats"
              className="w-full rounded"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="card-cyber p-4 overflow-hidden"
          >
            <p className="text-xs text-white/40 font-mono mb-3" style={{ fontFamily: 'Space Mono,monospace' }}>
              // TOP LANGUAGES
            </p>
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GH}&layout=compact&theme=transparent&bg_color=00000000&title_color=00f5ff&text_color=e8eaf0&border_color=ffffff15`}
              alt="Top languages"
              className="w-full rounded"
            />
          </motion.div>
        </div>

        {/* Contribution streak */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="card-cyber p-4 overflow-hidden"
        >
          <p className="text-xs text-white/40 font-mono mb-3" style={{ fontFamily: 'Space Mono,monospace' }}>
            // CONTRIBUTION STREAK
          </p>
          <img
            src={`https://github-readme-streak-stats.herokuapp.com?user=${GH}&theme=dark&background=00000000&border=ffffff15&ring=00f5ff&fire=b300ff&currStreakLabel=00f5ff&sideLabels=e8eaf0&dates=e8eaf040`}
            alt="GitHub streak"
            className="w-full rounded"
          />
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-cyber px-8 py-3"
            style={{ fontFamily: 'Orbitron,monospace' }}
          >
            <Github size={16} />
            View GitHub Profile
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
