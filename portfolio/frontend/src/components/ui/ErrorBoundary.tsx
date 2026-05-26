'use client';

import { Component, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props { children: ReactNode; fallback?: ReactNode; name?: string; }
interface State { hasError: boolean; error?: Error; }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[ErrorBoundary:${this.props.name || 'unknown'}]`, error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-sm font-mono text-white/50 mb-2"
            style={{ fontFamily: 'Space Mono,monospace' }}>
            Something went wrong
          </h3>
          <p className="text-xs text-white/30 mb-4">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="text-xs text-neon-cyan border border-neon-cyan/30 px-4 py-2 rounded hover:bg-neon-cyan/10 transition-colors font-mono"
            style={{ fontFamily: 'Space Mono,monospace' }}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Lightweight 3D error fallback
export function ThreeDFallback() {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-3">
      <div className="cyber-spinner" />
      <p className="text-xs text-white/30 font-mono" style={{ fontFamily: 'Space Mono,monospace' }}>
        Loading 3D scene...
      </p>
    </div>
  );
}
