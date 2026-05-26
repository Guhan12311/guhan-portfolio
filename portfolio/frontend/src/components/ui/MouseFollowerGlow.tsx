'use client';

import { useEffect, useRef } from 'react';

export default function MouseFollowerGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.06;
      current.current.y += (pos.current.y - current.current.y) * 0.06;

      if (glowRef.current) {
        glowRef.current.style.left = `${current.current.x}px`;
        glowRef.current.style.top = `${current.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-0 hidden md:block"
      style={{
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,245,255,0.025) 0%, rgba(179,0,255,0.015) 40%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}
