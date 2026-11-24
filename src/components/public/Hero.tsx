'use client';

import { useEffect, useRef } from 'react';
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

        {/* Right Column: Hero Visual, Lime Aura, Orbital Rings, & UI/UX Designer Canvas */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div
            ref={portraitContainerRef}
            className="relative w-[320px] h-[360px] sm:w-[390px] sm:h-[430px] md:w-[430px] md:h-[460px] flex items-center justify-center"
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

            {/* UI/UX Designer Interactive Canvas & Design System Frame */}
            <div className="relative z-10 w-full max-w-[320px] sm:max-w-[360px] rounded-3xl bg-[#0e0f13]/95 backdrop-blur-2xl border border-[#262833] p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:border-[#ccff00]/60 transition-all duration-500">
              {/* Top Frame Window Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#1e2029]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/80" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#181920] border border-[#272833] text-[10px] font-mono text-[#a1a1aa]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping" />
                  <span>Figma • 375×812</span>
                </div>
              </div>

              {/* Designer Canvas Body */}
              <div className="pt-3.5 space-y-3.5">
                {/* Floating Designer Cursor */}
                <div className="relative flex items-center gap-2 -ml-1 z-20">
                  <svg className="w-4 h-4 text-[#ccff00] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 2L20 10L12 13L9 21L4 2Z" />
                  </svg>
                  <span className="px-2 py-0.5 rounded-md bg-[#ccff00] text-black text-[10px] font-bold tracking-wider uppercase shadow-md shadow-[#ccff00]/30">
                    Krish (UI/UX)
                  </span>
                </div>

                {/* Simulated Wireframe & Component Stack */}
                <div className="p-3 rounded-2xl bg-[#14151a] border border-[#22242e] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white tracking-wide">
                      Design System &amp; Flow
                    </span>
                    <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30">
                      Auto-Layout
                    </span>
                  </div>

                  {/* Vector Pen Bezier Curve SVG */}
                  <div className="relative h-14 w-full rounded-xl bg-[#0c0d10] border border-[#1e2028] flex items-center justify-center overflow-hidden px-2">
                    <svg className="w-full h-10" viewBox="0 0 240 50" fill="none">
                      <path d="M0 25 H240" stroke="#1f2129" strokeDasharray="3 3" />
                      <path d="M120 0 V50" stroke="#1f2129" strokeDasharray="3 3" />
                      <path
                        d="M 20 38 C 70 8, 100 42, 150 15 C 190 -5, 210 35, 230 18"
                        stroke="#ccff00"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="20" cy="38" r="3.5" fill="#ccff00" stroke="#000" strokeWidth="1.5" />
                      <circle cx="150" cy="15" r="3.5" fill="#ccff00" stroke="#000" strokeWidth="1.5" />
                      <circle cx="230" cy="18" r="3.5" fill="#ccff00" stroke="#000" strokeWidth="1.5" />
                      <line x1="150" y1="15" x2="175" y2="30" stroke="#a1a1aa" strokeWidth="1" strokeDasharray="2 2" />
                      <circle cx="175" cy="30" r="2" fill="#fff" />
                    </svg>
                  </div>

                  {/* UI Pill Tags */}
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="px-2 py-0.5 rounded-md bg-[#1a1b22] border border-[#272833] text-[10px] text-[#d4d4d8] font-medium">
                      Prototypes
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#1a1b22] border border-[#272833] text-[10px] text-[#d4d4d8] font-medium">
                      Interactions
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#1a1b22] border border-[#272833] text-[10px] text-[#ccff00] font-mono">
                      #CCFF00
                    </span>
                  </div>
                </div>

                {/* Metrics / Status Row */}
                <div className="grid grid-cols-2 gap-2 pt-0.5 text-center">
                  <div className="p-2 rounded-xl bg-[#14151a] border border-[#22242e]">
                    <span className="block text-xs font-bold text-white font-['Space_Grotesk']">
                      User-Centered
                    </span>
                    <span className="text-[10px] text-[#71717a]">Intuitive UI</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#14151a] border border-[#22242e]">
                    <span className="block text-xs font-bold text-[#ccff00] font-['Space_Grotesk']">
                      Design + Tech
                    </span>
                    <span className="text-[10px] text-[#71717a]">GCET Undergrad</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Handwritten Style Label: UI/UX Designer */}
            <div className="hero-floating-badge absolute -top-3 -right-2 sm:right-2 z-20 animate-float pointer-events-none">
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
            <div className="hero-floating-badge absolute -bottom-3 -right-2 sm:right-0 z-20">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121316]/90 backdrop-blur-md border border-[#27272a] shadow-xl text-xs font-medium text-[#f4f4f5] hover:border-[#ccff00]/50 transition-colors">
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
