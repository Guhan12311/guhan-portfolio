'use client';

import { useRef, useCallback } from 'react';

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMouseMagnetic({ strength = 0.3, radius = 100 }: MagneticOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = elementRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      const factor = (1 - dist / radius) * strength;
      el.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    }
  }, [strength, radius]);

  const onMouseLeave = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    el.style.transform = 'translate(0, 0)';
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 400);
  }, []);

  const onMouseEnter = useCallback(() => {
    const el = elementRef.current;
    if (el) el.style.transition = 'transform 0.15s ease';
  }, []);

  return { ref: elementRef, onMouseMove, onMouseLeave, onMouseEnter };
}

export default useMouseMagnetic;
