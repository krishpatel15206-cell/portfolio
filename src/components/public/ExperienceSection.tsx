'use client';

import { Briefcase } from 'lucide-react';
import { Experience } from '@/types/portfolio';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="scroll-mt-20 py-20 sm:py-28 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#222329]/60">
      {/* Section Header */}
      <div className="scroll-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-[#222329]">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              EXPERIENCE
            </h2>
            <span className="text-[#71717a] font-medium text-lg">/ 02</span>
          </div>
          <p className="mt-2 text-sm text-[#71717a]">
            Internships, practical design execution, and software development history.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181920] border border-[#272833] text-xs font-mono text-[#a1a1aa] w-fit">
          <Briefcase className="w-3.5 h-3.5 text-[#ccff00]" />
          <span>Industry Exposure</span>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="mt-12 max-w-4xl relative pl-8 border-l-2 border-[#222329] space-y-10 origin-top ml-2 sm:ml-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="scroll-reveal-slide relative group transition-all duration-300 hover:translate-x-1.5"
          >
            {/* Glowing Lime Node on timeline */}
            <span className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#121316] border-2 border-[#ccff00] group-hover:bg-[#ccff00] transition-colors duration-200 shadow-[0_0_12px_rgba(204,255,0,0.6)]" />

            <div className="p-6 rounded-2xl bg-[#121316] border border-[#222329] group-hover:border-[#383a45] transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider">
                  {exp.company}
                </span>
                <span className="text-xs text-[#71717a] font-mono">
                  {exp.period} {exp.duration ? `• ${exp.duration}` : ''}
                </span>
              </div>

              <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-white mt-1.5">
                {exp.position}
              </h3>

              {exp.description && (
                <p className="mt-3 text-sm text-[#a1a1aa] leading-relaxed">
                  {exp.description}
                </p>
              )}

              {exp.tasks && exp.tasks.length > 0 && (
                <ul className="mt-3.5 space-y-2 text-xs text-[#8e909a]">
                  {exp.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-[#ccff00] mt-0.5 font-bold">•</span>
                      <span className="leading-relaxed">{task}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
