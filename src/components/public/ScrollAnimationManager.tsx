'use client';

import { useState, useEffect } from 'react';

export default function ScrollAnimationManager() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Live Scroll Progress Tracker
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.scroll-reveal, .scroll-reveal-slide').forEach((el) => {
        el.classList.add('is-visible');
      });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // 2. High-performance IntersectionObserver for smooth scroll reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -20px 0px', // Triggers as soon as element enters bottom of viewport
        threshold: 0.05,
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(
        '.scroll-reveal:not(.is-visible), .scroll-reveal-slide:not(.is-visible)'
      );
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();
    const interval = setInterval(observeElements, 400);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none origin-left"
      style={{
        transform: `scaleX(${scrollProgress})`,
        background: 'linear-gradient(90deg, #ccff00, #b8e600)',
        boxShadow: '0 0 12px rgba(204, 255, 0, 0.7)',
        transition: 'transform 0.05s linear',
      }}
    />
  );
}
