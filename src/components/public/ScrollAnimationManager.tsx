'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function ScrollAnimationManager() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Use IntersectionObserver with 200px anticipatory buffer
    // so animations trigger BEFORE the user reaches the section!
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '200px 0px 0px 0px', // Triggers 200px early!
      threshold: 0.01,
    };

    const animatedElements = new Set<Element>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedElements.has(entry.target)) {
          animatedElements.add(entry.target);
          const el = entry.target as HTMLElement;

          // 1. PROJECT CARDS POP
          if (el.classList.contains('anim-project-card')) {
            gsap.fromTo(
              el,
              { scale: 0.85, y: 35, opacity: 0 },
              {
                scale: 1,
                y: 0,
                opacity: 1,
                duration: 0.38,
                ease: 'back.out(1.8)',
                clearProps: 'transform,opacity',
              }
            );
          }

          // 2. SKILLS SQUIRCLES RAPID POP
          else if (el.classList.contains('anim-skills-grid')) {
            const items = el.querySelectorAll('.anim-skill-item');
            gsap.fromTo(
              items,
              { scale: 0.3, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.32,
                stagger: 0.025,
                ease: 'back.out(2.2)',
                clearProps: 'transform,opacity',
              }
            );
          }

          // 3. SECTION HEADERS
          else if (el.classList.contains('anim-section-header')) {
            gsap.fromTo(
              el,
              { scale: 0.94, y: 20, opacity: 0 },
              {
                scale: 1,
                y: 0,
                opacity: 1,
                duration: 0.35,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              }
            );
          }

          // 4. TIMELINE ITEMS
          else if (el.classList.contains('anim-timeline-item')) {
            gsap.fromTo(
              el,
              { x: -25, opacity: 0, scale: 0.92 },
              {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.35,
                ease: 'back.out(1.6)',
                clearProps: 'transform,opacity',
              }
            );
          }

          // 5. EDUCATION CARDS
          else if (el.classList.contains('anim-edu-card')) {
            gsap.fromTo(
              el,
              { y: 25, opacity: 0, scale: 0.92 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.35,
                ease: 'back.out(1.5)',
                clearProps: 'transform,opacity',
              }
            );
          }

          // 6. CERTIFICATES
          else if (el.classList.contains('anim-cert-card')) {
            gsap.fromTo(
              el,
              { y: 25, scale: 0.9, opacity: 0 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.35,
                ease: 'back.out(1.6)',
                clearProps: 'transform,opacity',
              }
            );
          }

          // 7. CONTACT HEADLINE
          else if (el.classList.contains('anim-contact-headline')) {
            gsap.fromTo(
              el,
              { scale: 0.85, y: 35, opacity: 0 },
              {
                scale: 1,
                y: 0,
                opacity: 1,
                duration: 0.45,
                ease: 'back.out(1.6)',
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
