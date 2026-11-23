'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollAnimationManager() {
  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. POP-UP ANIMATIONS FOR PROJECT CARDS (Trigger earlier & pop fast)
      const projectCards = document.querySelectorAll('.anim-project-card');
      projectCards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            scale: 0.88,
            y: 40,
            opacity: 0,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: card,
              start: 'top 96%', // Triggers instantly when it enters bottom of screen
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 2. BOUNCY POP-UP CASCADE FOR SKILLS SQUIRCLES (Fast & snappy)
      const skillsContainer = document.querySelector('.anim-skills-grid');
      if (skillsContainer) {
        const skillItems = skillsContainer.querySelectorAll('.anim-skill-item');
        gsap.fromTo(
          skillItems,
          {
            scale: 0.4,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            stagger: 0.03, // Rapid fire cascade
            ease: 'back.out(2.2)',
            scrollTrigger: {
              trigger: skillsContainer,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. SECTION HEADERS POP-UP (Instant trigger)
      const sectionHeaders = document.querySelectorAll('.anim-section-header');
      sectionHeaders.forEach((header) => {
        gsap.fromTo(
          header,
          {
            scale: 0.94,
            y: 25,
            opacity: 0,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 96%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 4. TIMELINE DRAW & NODES POPPING (Fast trigger)
      const timelineLine = document.querySelector('.anim-timeline-line');
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineLine,
              start: 'top 95%',
              end: 'bottom 80%',
              scrub: 0.3,
            },
          }
        );
      }

      const timelineItems = document.querySelectorAll('.anim-timeline-item');
      timelineItems.forEach((item, idx) => {
        gsap.fromTo(
          item,
          {
            x: -25,
            opacity: 0,
            scale: 0.94,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: idx * 0.05,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: item,
              start: 'top 96%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 5. EDUCATION CARDS POP-UP (Fast trigger)
      const educationCards = document.querySelectorAll('.anim-edu-card');
      educationCards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          {
            y: 30,
            opacity: 0,
            scale: 0.94,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: idx * 0.05,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top 96%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 6. CERTIFICATES STACK POP-UP (Fast trigger)
      const certCards = document.querySelectorAll('.anim-cert-card');
      certCards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          {
            y: 30,
            scale: 0.9,
            opacity: 0,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.4,
            delay: idx * 0.05,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: card,
              start: 'top 96%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 7. CONTACT GIANT HEADLINE POP-UP (Fast trigger)
      const contactHeadline = document.querySelector('.anim-contact-headline');
      if (contactHeadline) {
        gsap.fromTo(
          contactHeadline,
          {
            scale: 0.88,
            y: 40,
            opacity: 0,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: contactHeadline,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Refresh ScrollTrigger after elements render
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return null;
}
