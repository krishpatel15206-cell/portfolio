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

    // 2. Pure Soft Fade & Subtle Drift (ZERO scale, ZERO pop-up, luxury feel)
    const animatedElements = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedElements.has(entry.target)) {
            const el = entry.target as HTMLElement;
            animatedElements.add(el);
            obs.unobserve(el);

            // Project Cards: Soft vertical fade (No pop-up, no scale)
            if (el.classList.contains('anim-project-card')) {
              gsap.fromTo(
                el,
                { y: 26, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.75,
                  ease: 'power2.out',
                  clearProps: 'transform,opacity',
                }
              );
            }

            // Skills Grid: Soft ripple fade
            else if (el.classList.contains('anim-skills-grid')) {
              const items = el.querySelectorAll('.anim-skill-item');
              gsap.fromTo(
                items,
                { y: 18, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.55,
                  stagger: 0.03,
                  ease: 'power2.out',
                  clearProps: 'transform,opacity',
                }
              );
            }

            // Section Headers: Clean soft reveal
            else if (el.classList.contains('anim-section-header')) {
              gsap.fromTo(
                el,
                { y: 22, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.65,
                  ease: 'power2.out',
                  clearProps: 'transform,opacity',
                }
              );
            }

            // Timeline Items: Gentle horizontal slide
            else if (el.classList.contains('anim-timeline-item')) {
              gsap.fromTo(
                el,
                { x: -24, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.65,
                  ease: 'power2.out',
                  clearProps: 'transform,opacity',
                }
              );
            }

            // Education Cards: Soft fade up
            else if (el.classList.contains('anim-edu-card')) {
              gsap.fromTo(
                el,
                { y: 22, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.65,
                  ease: 'power2.out',
                  clearProps: 'transform,opacity',
                }
              );
            }

            // Certificate Cards: Soft fade up
            else if (el.classList.contains('anim-cert-card')) {
              gsap.fromTo(
                el,
                { y: 22, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.65,
                  ease: 'power2.out',
                  clearProps: 'transform,opacity',
                }
              );
            }

            // Contact Headline: Smooth fade
            else if (el.classList.contains('anim-contact-headline')) {
              gsap.fromTo(
                el,
                { y: 30, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: 'power2.out',
                  clearProps: 'transform,opacity',
                }
              );
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    const observeTargets = () => {
      const targets = document.querySelectorAll(
        '.anim-project-card, .anim-skills-grid, .anim-section-header, .anim-timeline-item, .anim-edu-card, .anim-cert-card, .anim-contact-headline'
      );
      targets.forEach((target) => {
        if (!animatedElements.has(target)) {
          observer.observe(target);
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
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none origin-left"
      style={{
        transform: `scaleX(${scrollProgress})`,
        background: 'linear-gradient(90deg, #ccff00, #b8e600)',
        boxShadow: '0 0 12px rgba(204, 255, 0, 0.7)',
        transition: 'transform 0.06s linear',
      }}
    />
  );
}
