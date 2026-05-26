'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Upload, Sparkles, CheckCircle, AlertCircle, TrendingUp, Star, X } from 'lucide-react';
import toast from 'react-hot-toast';
import SectionWrapper from '@/components/ui/SectionWrapper';

interface AnalysisResult {
  score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  keywords: string[];
  careerSuggestions: string[];
  atsScore: number;
}

export default function AIAnalyzerSection() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [mode, setMode] = useState<'file' | 'text'>('text');
  const fileRef = useRef<HTMLInputElement>(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const handleAnalyze = async () => {
    const content = mode === 'text' ? text : file ? await file.text() : '';
    if (!content.trim()) { toast.error('Please provide resume content'); return; }

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: content }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      toast.error(err.message || 'Analysis failed. Check your API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="ai-analyzer" tag="10 / AI_TOOLS" title="AI Resume Analyzer"
      subtitle="Powered by Gemini AI — get instant feedback on your resume.">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Mode toggle */}
          <div className="flex gap-2 mb-6">
            {(['text', 'file'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-5 py-2 rounded-lg text-xs font-mono border transition-all ${
                  mode === m
                    ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10'
                    : 'border-white/15 text-white/50 hover:border-white/30'
                }`}
                style={{ fontFamily: 'Space Mono,monospace' }}>
                {m === 'text' ? '📝 Paste Text' : '📎 Upload File'}
              </button>
            ))}
          </div>

          {/* Input area */}
          <div className="card-cyber p-6 mb-6">
            {mode === 'text' ? (
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Paste your resume text here..."
                rows={8}
                className="input-cyber resize-none"
                style={{ fontFamily: 'Syne,sans-serif' }}
              />
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all"
                style={{
                  borderColor: file ? 'rgba(0,245,255,0.4)' : 'rgba(255,255,255,0.1)',
                  background: file ? 'rgba(0,245,255,0.03)' : 'transparent',
                }}
              >
                <input ref={fileRef} type="file" className="hidden" accept=".txt,.pdf,.doc,.docx"
                  onChange={e => setFile(e.target.files?.[0] || null)} />
                {file ? (
                  <div>
                    <div className="text-neon-cyan text-3xl mb-2">📄</div>
                    <p className="text-neon-cyan font-mono text-sm" style={{ fontFamily: 'Space Mono,monospace' }}>
                      {file.name}
                    </p>
                    <button onClick={e => { e.stopPropagation(); setFile(null); }}
                      className="mt-2 text-white/40 hover:text-white/80 text-xs">Remove</button>
                  </div>
                ) : (
                  <>
                    <Upload size={32} className="mx-auto mb-3 text-white/30" />
                    <p className="text-white/50 text-sm">Click or drag your resume here</p>
                    <p className="text-white/25 text-xs mt-1">TXT, PDF, DOCX supported</p>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full btn-cyber btn-cyber-filled py-4 flex items-center justify-center gap-3 text-base"
            style={{ fontFamily: 'Orbitron,monospace' }}
          >
            {loading ? (
              <>
                <div className="cyber-spinner w-5 h-5" />
                Analyzing with Gemini AI...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Analyze Resume
              </>
            )}
          </button>

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8 space-y-5"
              >
                {/* Score cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="card-cyber p-5 text-center glow-border-cyan">
                    <div className="font-display font-black text-4xl mb-1"
                      style={{ color: '#00f5ff', fontFamily: 'Orbitron,monospace' }}>
                      {result.score}/10
                    </div>
                    <p className="text-white/50 text-xs font-mono" style={{ fontFamily: 'Space Mono,monospace' }}>
                      OVERALL SCORE
                    </p>
                  </div>
                  <div className="card-cyber p-5 text-center glow-border-purple">
                    <div className="font-display font-black text-4xl mb-1"
                      style={{ color: '#b300ff', fontFamily: 'Orbitron,monospace' }}>
                      {result.atsScore}%
                    </div>
                    <p className="text-white/50 text-xs font-mono" style={{ fontFamily: 'Space Mono,monospace' }}>
                      ATS SCORE
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div className="card-cyber p-5">
                  <h4 className="text-neon-cyan font-mono text-xs mb-3 flex items-center gap-2"
                    style={{ fontFamily: 'Space Mono,monospace' }}>
                    <Sparkles size={12} /> AI SUMMARY
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">{result.summary}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="card-cyber p-5">
                    <h4 className="text-green-400 font-mono text-xs mb-3 flex items-center gap-2"
                      style={{ fontFamily: 'Space Mono,monospace' }}>
                      <CheckCircle size={12} /> STRENGTHS
                    </h4>
                    <ul className="space-y-2">
                      {result.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                          <Star size={10} className="text-green-400 mt-1 flex-shrink-0" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="card-cyber p-5">
                    <h4 className="text-yellow-400 font-mono text-xs mb-3 flex items-center gap-2"
                      style={{ fontFamily: 'Space Mono,monospace' }}>
                      <AlertCircle size={12} /> IMPROVEMENTS
                    </h4>
                    <ul className="space-y-2">
                      {result.improvements.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                          <TrendingUp size={10} className="text-yellow-400 mt-1 flex-shrink-0" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Keywords */}
                <div className="card-cyber p-5">
                  <h4 className="text-neon-purple font-mono text-xs mb-3" style={{ fontFamily: 'Space Mono,monospace' }}>
                    🔑 DETECTED KEYWORDS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map(k => (
                      <span key={k} className="text-xs px-2.5 py-1 rounded-full font-mono"
                        style={{ color: '#b300ff', background: 'rgba(179,0,255,0.1)', border: '1px solid rgba(179,0,255,0.2)', fontFamily: 'Space Mono,monospace' }}>
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career suggestions */}
                <div className="card-cyber p-5">
                  <h4 className="text-neon-cyan font-mono text-xs mb-3" style={{ fontFamily: 'Space Mono,monospace' }}>
                    🚀 CAREER SUGGESTIONS
                  </h4>
                  <ul className="space-y-2">
                    {result.careerSuggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                        <span className="text-neon-cyan font-mono text-xs mt-0.5 flex-shrink-0"
                          style={{ fontFamily: 'Space Mono,monospace' }}>
                          {String(i + 1).padStart(2, '0')}.
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
