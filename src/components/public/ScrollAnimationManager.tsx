'use client';

import { useEffect } from 'react';

export default function ScrollAnimationManager() {
  useEffect(() => {
    const selector =
      '.anim-project-card, .anim-section-header, .anim-timeline-item, .anim-edu-card, .anim-cert-card, .anim-contact-headline, .anim-skill-item';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve immediately so it only animates ONCE and never pops up again!
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        // If element is already revealed, skip
        if (el.classList.contains('is-revealed')) return;

        // If element is already in the visible viewport, reveal immediately without pop
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    observeAll();

    // Re-check after client-side hydration or storage update
    const timer = setTimeout(observeAll, 200);
    window.addEventListener('kp_portfolio_updated', observeAll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('kp_portfolio_updated', observeAll);
      observer.disconnect();
    };
  }, []);

  return null;
}
