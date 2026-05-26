'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { PERSONAL_INFO } from '@/lib/data';

interface FormData { name: string; email: string; subject: string; message: string; }

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all required fields'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setSent(true);
      toast.success('Message sent! I\'ll get back to you soon.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send. Try emailing directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="contact" tag="11 / CONTACT" title="Let's Connect"
      subtitle="Have a project in mind? Let's build something amazing together.">
      <div ref={ref} className="grid lg:grid-cols-5 gap-12">

        {/* Left info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2 flex flex-col gap-8"
        >
          <div>
            <h3 className="font-display font-bold text-base mb-3"
              style={{ color: '#00f5ff', fontFamily: 'Orbitron,monospace' }}>
              GET IN TOUCH
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              I&apos;m currently available for freelance work, full-time roles, and interesting collaborations.
              If you have a project that needs a Full Stack or AI developer, let&apos;s talk!
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}`, color: '#00f5ff' },
              { icon: MapPin, label: 'Location', value: PERSONAL_INFO.location, href: null, color: '#b300ff' },
              { icon: Github, label: 'GitHub', value: 'github.com/guhan-a', href: PERSONAL_INFO.github, color: '#ff006e' },
              { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/guhan-a', href: PERSONAL_INFO.linkedin, color: '#39ff14' },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: color + '15', border: `1px solid ${color}25` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs text-white/30 font-mono mb-0.5" style={{ fontFamily: 'Space Mono,monospace' }}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-white/70 hover:text-white transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-white/70">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Availability badge */}
          <div className="card-cyber p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#39ff14' }} />
            <div>
              <p className="text-sm font-semibold text-white/80">Available for Work</p>
              <p className="text-xs text-white/40 font-mono" style={{ fontFamily: 'Space Mono,monospace' }}>
                Open to full-time & freelance
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-3"
        >
          {sent ? (
            <div className="card-cyber p-12 text-center">
              <CheckCircle size={48} className="text-neon-cyan mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg mb-2 text-neon-cyan"
                style={{ fontFamily: 'Orbitron,monospace' }}>
                MESSAGE SENT!
              </h3>
              <p className="text-white/60 text-sm">Thanks for reaching out. I&apos;ll reply within 24 hours.</p>
              <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                className="mt-6 text-xs text-white/40 hover:text-white/70 transition-colors font-mono"
                style={{ fontFamily: 'Space Mono,monospace' }}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-cyber p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-white/40 font-mono mb-2"
                    style={{ fontFamily: 'Space Mono,monospace' }}>
                    NAME *
                  </label>
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    placeholder="Your name"
                    className="input-cyber"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 font-mono mb-2"
                    style={{ fontFamily: 'Space Mono,monospace' }}>
                    EMAIL *
                  </label>
                  <input
                    name="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com" type="email"
                    className="input-cyber"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/40 font-mono mb-2"
                  style={{ fontFamily: 'Space Mono,monospace' }}>
                  SUBJECT
                </label>
                <input
                  name="subject" value={form.subject} onChange={handleChange}
                  placeholder="Project inquiry / Collaboration / Job opportunity"
                  className="input-cyber"
                />
              </div>

              <div>
                <label className="block text-xs text-white/40 font-mono mb-2"
                  style={{ fontFamily: 'Space Mono,monospace' }}>
                  MESSAGE *
                </label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  rows={6}
                  className="input-cyber resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-cyber btn-cyber-filled py-3.5 flex items-center justify-center gap-2"
                style={{ fontFamily: 'Orbitron,monospace' }}
              >
                {loading ? (
                  <><div className="cyber-spinner w-4 h-4" /> Sending...</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
