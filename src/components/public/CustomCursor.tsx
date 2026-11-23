'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    const ticker = gsap.ticker.add(() => {
      posX += (mouseX - posX) / 6;
      posY += (mouseY - posY) / 6;
      gsap.set(follower, {
        x: posX - 16,
        y: posY - 16
      });
    });

    // Hover effect on links and buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .interactive-hover')) {
        gsap.to(follower, {
          scale: 2.2,
          backgroundColor: 'rgba(204, 255, 0, 0.15)',
          borderColor: '#ccff00',
          duration: 0.25
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .interactive-hover')) {
        gsap.to(follower, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(204, 255, 0, 0.4)',
          duration: 0.25
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 -translate-x-1 -translate-y-1 rounded-full bg-[#ccff00] mix-blend-difference hidden md:block"
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-50 h-8 w-8 rounded-full border border-[#ccff00]/40 transition-colors duration-150 hidden md:block"
      />
    </>
  );
}
