'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

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
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // 2. Check for native CSS Scroll-Driven Animation support
    const supportsScrollTimeline =
      typeof window !== 'undefined' &&
      typeof window.CSS !== 'undefined' &&
      typeof window.CSS.supports === 'function' &&
      window.CSS.supports('animation-timeline', 'view()');

    // If native CSS scroll-driven animations are supported, the browser GPU compositor
    // handles all scroll reveals smoothly without any JavaScript observer overhead or blinking.
    if (supportsScrollTimeline) {
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // 3. Blink-Free Fallback for browsers without CSS animation-timeline support
    const animatedElements = new WeakSet<Element>();

    const isElementInView = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedElements.has(entry.target)) {
            const el = entry.target as HTMLElement;
            animatedElements.add(el);
            obs.unobserve(el);

            // Smooth fade up reveal (never abruptly snaps opacity to 0)
            gsap.to(el, {
              y: 0,
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
            });
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05,
      }
    );

    const observeTargets = () => {
      const targets = document.querySelectorAll(
        '.scroll-driven-card, .scroll-driven-header, .scroll-driven-timeline, .scroll-driven-item'
      );
      targets.forEach((target) => {
        if (!animatedElements.has(target)) {
          if (isElementInView(target)) {
            // Already visible on screen: do not hide or blink!
            animatedElements.add(target);
          } else {
            // Below fold: initialize hidden before entering view
            const isTimeline = target.classList.contains('scroll-driven-timeline');
            gsap.set(target, {
              opacity: 0,
              y: isTimeline ? 0 : 24,
              x: isTimeline ? -20 : 0,
            });
            observer.observe(target);
          }
        }
      });
    };

    observeTargets();
    const timer = setTimeout(observeTargets, 200);
    window.addEventListener('kp_portfolio_updated', observeTargets);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('kp_portfolio_updated', observeTargets);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="scroll-driven-progress fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none origin-left"
      style={{
        transform: `scaleX(${scrollProgress})`,
        background: 'linear-gradient(90deg, #ccff00, #b8e600)',
        boxShadow: '0 0 12px rgba(204, 255, 0, 0.7)',
        transition: 'transform 0.05s linear',
      }}
    />
  );
}
