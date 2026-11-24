'use client';

import { GraduationCap } from 'lucide-react';
import { Education } from '@/types/portfolio';

interface EducationSectionProps {
  educations: Education[];
}

export default function EducationSection({ educations }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 sm:py-28 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#222329]/60">
      {/* Section Header */}
      <div className="scroll-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-[#222329]">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              EDUCATION
            </h2>
            <span className="text-[#71717a] font-medium text-lg">/ 03</span>
          </div>
          <p className="mt-2 text-sm text-[#71717a]">
            Academic background spanning Computer Science, Design and Engineering foundations.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181920] border border-[#272833] text-xs font-mono text-[#a1a1aa] w-fit">
          <GraduationCap className="w-3.5 h-3.5 text-[#ccff00]" />
          <span>Academic Pathway</span>
        </div>
      </div>

      {/* Education Cards Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {educations.map((edu, idx) => (
          <div
            key={edu.id}
            style={{ transitionDelay: `${idx * 100}ms` }}
            className="scroll-reveal group p-6 sm:p-7 rounded-2xl bg-[#121316] border border-[#222329] hover:border-[#ccff00]/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/60"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1e2029]">
                <div className="w-11 h-11 rounded-full bg-[#1c2214] border border-[#ccff00]/30 flex items-center justify-center shrink-0 group-hover:border-[#ccff00] transition-colors">
                  <GraduationCap className="w-5 h-5 text-[#ccff00]" />
                </div>
                {edu.score && (
                  <span className="font-bold text-[#ccff00] px-3 py-1 rounded-full bg-[#1c2214] border border-[#ccff00]/25 text-xs font-mono">
                    {edu.score}
                  </span>
                )}
              </div>

              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mt-5 group-hover:text-[#ccff00] transition-colors">
                {edu.degree}
              </h3>
              <p className="text-sm text-[#a1a1aa] mt-2 leading-relaxed">
                {edu.institution}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1e2029] flex items-center justify-between text-xs text-[#71717a] font-mono">
              <span>Duration</span>
              <span className="text-[#f4f4f5] font-semibold">{edu.period}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
