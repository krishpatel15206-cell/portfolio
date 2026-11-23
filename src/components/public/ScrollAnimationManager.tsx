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
      // 1. POP-UP ANIMATIONS FOR PROJECT CARDS
      const projectCards = document.querySelectorAll('.anim-project-card');
      projectCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            scale: 0.82,
            y: 80,
            opacity: 0,
            rotateX: 10,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 2. BOUNCY POP-UP CASCADE FOR SKILLS SQUIRCLES
      const skillsContainer = document.querySelector('.anim-skills-grid');
      if (skillsContainer) {
        const skillItems = skillsContainer.querySelectorAll('.anim-skill-item');
        gsap.fromTo(
          skillItems,
          {
            scale: 0,
            y: 35,
            opacity: 0,
            rotate: () => (Math.random() - 0.5) * 15,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.65,
            stagger: 0.05,
            ease: 'back.out(2.2)',
            scrollTrigger: {
              trigger: skillsContainer,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. SECTION HEADERS POP-UP
      const sectionHeaders = document.querySelectorAll('.anim-section-header');
      sectionHeaders.forEach((header) => {
        gsap.fromTo(
          header,
          {
            scale: 0.9,
            y: 40,
            opacity: 0,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: header,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 4. TIMELINE DRAW & NODES POPPING
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
              start: 'top 85%',
              end: 'bottom 70%',
              scrub: 0.8,
            },
          }
        );
      }

      const timelineItems = document.querySelectorAll('.anim-timeline-item');
      timelineItems.forEach((item, idx) => {
        gsap.fromTo(
          item,
          {
            x: -40,
            opacity: 0,
            scale: 0.9,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: idx * 0.1,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 5. EDUCATION CARDS POP-UP
      const educationCards = document.querySelectorAll('.anim-edu-card');
      educationCards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            delay: idx * 0.12,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 6. CERTIFICATES STACK POP-UP
      const certCards = document.querySelectorAll('.anim-cert-card');
      certCards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          {
            y: 60,
            scale: 0.85,
            opacity: 0,
            rotateZ: (idx - 1) * 3,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            rotateZ: 0,
            duration: 0.8,
            delay: idx * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 7. CONTACT GIANT HEADLINE POP-UP
      const contactHeadline = document.querySelector('.anim-contact-headline');
      if (contactHeadline) {
        gsap.fromTo(
          contactHeadline,
          {
            scale: 0.8,
            y: 80,
            opacity: 0,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: contactHeadline,
              start: 'top 85%',
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
