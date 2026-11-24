'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function ScrollAnimationManager() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Track elements that have animated so they NEVER re-animate on scroll up/down
    const animatedElements = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedElements.has(entry.target)) {
            const el = entry.target as HTMLElement;
            animatedElements.add(el);
            obs.unobserve(el);

            // 1. PROJECT CARDS: Smooth luxury upward float & settle
            if (el.classList.contains('anim-project-card')) {
              gsap.fromTo(
                el,
                { y: 40, opacity: 0, scale: 0.96 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.85,
                  ease: 'power3.out',
                  clearProps: 'transform,opacity',
                }
              );
            }

            // 2. SKILLS SQUIRCLES: Fluid ripple wave
            else if (el.classList.contains('anim-skills-grid')) {
              const items = el.querySelectorAll('.anim-skill-item');
              gsap.fromTo(
                items,
                { y: 22, opacity: 0, scale: 0.92 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.65,
                  stagger: 0.035,
                  ease: 'power3.out',
                  clearProps: 'transform,opacity',
                }
              );
            }

            // 3. SECTION HEADERS: Elegant slide & reveal
            else if (el.classList.contains('anim-section-header')) {
              gsap.fromTo(
                el,
                { y: 28, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.75,
                  ease: 'power3.out',
                  clearProps: 'transform,opacity',
                }
              );
            }

            // 4. TIMELINE ITEMS: Smooth slide from left
            else if (el.classList.contains('anim-timeline-item')) {
              gsap.fromTo(
                el,
                { x: -30, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.75,
                  ease: 'power3.out',
                  clearProps: 'transform,opacity',
                }
              );
            }

            // 5. EDUCATION CARDS: Smooth rise
            else if (el.classList.contains('anim-edu-card')) {
              gsap.fromTo(
                el,
                { y: 30, opacity: 0, scale: 0.97 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.75,
                  ease: 'power3.out',
                  clearProps: 'transform,opacity',
                }
              );
            }

            // 6. CERTIFICATES: Floating card entrance
            else if (el.classList.contains('anim-cert-card')) {
              gsap.fromTo(
                el,
                { y: 30, opacity: 0, scale: 0.97 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.75,
                  ease: 'power3.out',
                  clearProps: 'transform,opacity',
                }
              );
            }

            // 7. CONTACT HEADLINE: Powerful cinematic reveal
            else if (el.classList.contains('anim-contact-headline')) {
              gsap.fromTo(
                el,
                { y: 45, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.9,
                  ease: 'power3.out',
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

    // Re-check after client storage hydration
    const timer = setTimeout(observeTargets, 250);
    window.addEventListener('kp_portfolio_updated', observeTargets);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('kp_portfolio_updated', observeTargets);
      observer.disconnect();
    };
  }, []);

  return null;
}
