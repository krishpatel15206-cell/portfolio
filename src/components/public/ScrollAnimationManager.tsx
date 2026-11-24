'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function ScrollAnimationManager() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Observer configured to trigger precisely as element enters the viewport
    // (50px inside viewport from the bottom), ensuring animations are seen in motion!
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    };

    const animatedElements = new Set<Element>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedElements.has(entry.target)) {
          animatedElements.add(entry.target);
          const el = entry.target as HTMLElement;

          // 1. PROJECT CARDS - Smooth luxury upward glide & scale
          if (el.classList.contains('anim-project-card')) {
            gsap.fromTo(
              el,
              { y: 50, scale: 0.95, opacity: 0 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.75,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }
            );
          }

          // 2. SKILLS SQUIRCLES - Fluid cascading stagger
          else if (el.classList.contains('anim-skills-grid')) {
            const items = el.querySelectorAll('.anim-skill-item');
            gsap.fromTo(
              items,
              { y: 25, scale: 0.88, opacity: 0 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.6,
                stagger: 0.04,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }
            );
          }

          // 3. SECTION HEADERS - Elegant fade-slide
          else if (el.classList.contains('anim-section-header')) {
            gsap.fromTo(
              el,
              { y: 35, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }
            );
          }

          // 4. TIMELINE ITEMS - Slide in from left with smooth settle
          else if (el.classList.contains('anim-timeline-item')) {
            gsap.fromTo(
              el,
              { x: -35, opacity: 0, scale: 0.96 },
              {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.75,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }
            );
          }

          // 5. EDUCATION CARDS - Smooth rise & pop
          else if (el.classList.contains('anim-edu-card')) {
            gsap.fromTo(
              el,
              { y: 35, opacity: 0, scale: 0.96 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }
            );
          }

          // 6. CERTIFICATES - Subtle float-up
          else if (el.classList.contains('anim-cert-card')) {
            gsap.fromTo(
              el,
              { y: 35, scale: 0.95, opacity: 0 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }
            );
          }

          // 7. CONTACT HEADLINE - Impactful smooth reveal
          else if (el.classList.contains('anim-contact-headline')) {
            gsap.fromTo(
              el,
              { y: 55, scale: 0.96, opacity: 0 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.85,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }
            );
          }

          observer.unobserve(el);
        }
      });
    }, observerOptions);

    // Observe all targets
    const targets = document.querySelectorAll(
      '.anim-project-card, .anim-skills-grid, .anim-section-header, .anim-timeline-item, .anim-edu-card, .anim-cert-card, .anim-contact-headline'
    );
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return null;
}
