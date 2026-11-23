'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { Profile } from '@/types/portfolio';

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitContainerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Staggered reveal for headline
      tl.from('.hero-word', {
        yPercent: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
      })
      .from(subtextRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
      }, '-=0.7')
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, '-=0.6')
      .from(portraitContainerRef.current, {
        scale: 0.85,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
      }, '-=1.2')
      .from('.hero-floating-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      }, '-=0.6');

      // Mouse move parallax on portrait
      const handleMouseMove = (e: MouseEvent) => {
        if (!portraitContainerRef.current) return;
        const { clientX, clientY } = e;
        const xOffset = (clientX / window.innerWidth - 0.5) * 20;
        const yOffset = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(portraitContainerRef.current, {
          x: xOffset,
          y: yOffset,
          duration: 0.8,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 px-6 sm:px-8 overflow-hidden"
    >
      {/* Background subtle radial ambient gradients */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 z-10 flex flex-col justify-center">
          {/* Main Huge Headline */}
          <div className="overflow-hidden">
            <h1
              ref={headlineRef}
              className="font-['Space_Grotesk'] text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white leading-[0.92] uppercase"
            >
              <div className="overflow-hidden">
                <span className="hero-word block">KRISH</span>
              </div>
              <div className="overflow-hidden">
                <span className="hero-word block text-[#f4f4f5]">PATEL</span>
              </div>
            </h1>
          </div>

          {/* Subtitle & Tagline */}
          <div ref={subtextRef} className="mt-6 sm:mt-8 space-y-3 max-w-xl">
            <p className="text-sm sm:text-base font-semibold tracking-wide text-[#ccff00] uppercase">
              {profile.title}
            </p>
            <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed">
              {profile.tagline}
            </p>
          </div>

          {/* Action Buttons */}
          <div ref={ctaRef} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#ccff00]/20 hover:shadow-[#ccff00]/40 hover:scale-105 active:scale-95"
            >
              <span>View My Work</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#16171b] hover:bg-[#222329] border border-[#27272a] hover:border-[#3f3f46] text-[#f4f4f5] font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>About Me</span>
            </a>
          </div>

          {/* Bottom Left: Scroll to Explore Indicator */}
          <div 
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-14 sm:mt-20 flex items-center gap-3 text-xs tracking-widest text-[#71717a] hover:text-[#ccff00] uppercase cursor-pointer transition-colors select-none"
          >
            <div className="w-5 h-8 rounded-full border border-[#3f3f46] flex items-start justify-center p-1">
              <span className="w-1.5 h-2 rounded-full bg-[#ccff00] animate-bounce" />
            </div>
            <span>Scroll to explore</span>
          </div>
        </div>

        {/* Right Column: Hero Visual, Lime Aura, Orbital Rings, & Portrait */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div
            ref={portraitContainerRef}
            className="relative w-[300px] h-[340px] sm:w-[380px] sm:h-[420px] md:w-[420px] md:h-[460px] flex items-center justify-center"
          >
            {/* Pulsing Electric Lime Circular Aura */}
            <div
              ref={orbRef}
              className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-[#ccff00] filter blur-none shadow-[0_0_90px_rgba(204,255,0,0.45)] animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle at 40% 40%, #e5ff66 0%, #ccff00 55%, #88b300 100%)',
              }}
            />

            {/* Orbiting 3D Dashed Ellipse with Star */}
            <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border border-dashed border-[#ccff00]/40 animate-spin-slow pointer-events-none">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#08080a] p-1 rounded-full border border-[#ccff00]">
                <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
              </div>
            </div>

            {/* Portrait Cutout / Concept Avatar */}
            <div className="relative z-10 w-full h-full flex items-end justify-center overflow-visible">
              <div className="relative w-[280px] h-[330px] sm:w-[340px] sm:h-[400px]">
                <Image
                  src={profile.avatarUrl || '/images/krish-hero-crop.png'}
                  alt="Krish Patel - UI/UX Designer"
                  fill
                  sizes="(max-width: 768px) 300px, 420px"
                  className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
                  priority
                />
              </div>
            </div>

            {/* Floating Handwritten Style Label: UI/UX Designer */}
            <div className="hero-floating-badge absolute -top-2 right-4 sm:right-6 z-20 animate-float pointer-events-none">
              <div className="flex flex-col items-end">
                <span className="font-['Space_Grotesk'] text-[#ccff00] text-sm sm:text-base font-bold italic tracking-wide">
                  UI/UX Designer
                </span>
                {/* Curved Arrow Vector SVG */}
                <svg
                  className="w-10 h-10 text-[#ccff00] -rotate-12 translate-x-1"
                  viewBox="0 0 50 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M40 10 Q25 25 15 35" />
                  <path d="M15 25 L15 35 L25 35" />
                </svg>
              </div>
            </div>

            {/* Floating Glass Pill Badge: Location */}
            <div className="hero-floating-badge absolute bottom-4 -right-2 sm:right-0 z-20">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#121316]/90 backdrop-blur-md border border-[#27272a] shadow-xl text-xs sm:text-sm font-medium text-[#f4f4f5] hover:border-[#ccff00]/50 transition-colors">
                <span className="text-[#ccff00]"><MapPin className="w-3.5 h-3.5 fill-[#ccff00]/20" /></span>
                <span>Based in <span className="text-white font-semibold">{profile.location}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
