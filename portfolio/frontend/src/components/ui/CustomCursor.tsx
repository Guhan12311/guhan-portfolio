'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(0,245,255,0.8)';
      ring.style.background = 'rgba(0,245,255,0.08)';
      dot.style.transform = 'translate(-50%,-50%) scale(0)';
    };

    const onLeaveLink = () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'rgba(0,245,255,0.5)';
      ring.style.background = 'transparent';
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animate);

    const links = document.querySelectorAll('a, button, [data-cursor]');
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    const observer = new MutationObserver(() => {
      const newLinks = document.querySelectorAll('a, button, [data-cursor]');
      newLinks.forEach(el => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot fixed pointer-events-none z-[99999]"
        style={{ transform: 'translate(-50%, -50%)', transition: 'transform 0.1s ease' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed pointer-events-none z-[99998]"
        style={{ transform: 'translate(-50%, -50%)', transition: 'width 0.3s ease, height 0.3s ease, background 0.3s ease' }}
      />
    </>
  );
}
