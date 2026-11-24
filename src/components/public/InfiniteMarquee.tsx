'use client';

export default function InfiniteMarquee() {
  const marqueeItems = [
    'UI/UX DESIGN',
    'FIGMA PROTOTYPING',
    'WIRE FRAMING',
    'DESIGN RESEARCH',
    'USER PERSONAS',
    'DESIGN SYSTEMS',
    'INTERACTION DESIGN',
    'BRAND IDENTITY',
    'VISUAL STORYTELLING',
    'MOBILE APP DESIGN',
    'DESIGN THINKING',
    'HIGH FIDELITY MOCKUPS',
  ];

  return (
    <div className="relative w-full py-6 sm:py-8 border-y border-[#222329] bg-[#0c0d10] overflow-hidden select-none">
      {/* Subtle edge blur overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#08080a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#08080a] to-transparent z-10 pointer-events-none" />

      {/* Track 1: Moving left */}
      <div className="flex w-max animate-marquee">
        {/* Double copy for seamless infinite loop */}
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={index} className="flex items-center gap-6 px-6 shrink-0">
            <span className="font-['Space_Grotesk'] text-sm sm:text-base font-bold tracking-widest text-[#71717a] hover:text-[#ccff00] transition-colors uppercase">
              {item}
            </span>
            <span className="text-[#ccff00] text-xs font-bold">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
