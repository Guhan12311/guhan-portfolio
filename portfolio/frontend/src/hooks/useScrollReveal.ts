'use client';

import { useInView } from 'react-intersection-observer';
import { useAnimation, AnimationControls } from 'framer-motion';
import { useEffect } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

interface ScrollRevealReturn {
  ref: (node?: Element | null | undefined) => void;
  controls: AnimationControls;
  inView: boolean;
}

export function useScrollReveal({
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
}: ScrollRevealOptions = {}): ScrollRevealReturn {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold, triggerOnce });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        controls.start('visible');
      }, delay);
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [inView, controls, delay, triggerOnce]);

  return { ref, controls, inView };
}

export default useScrollReveal;
