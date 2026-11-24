'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, ExternalLink } from 'lucide-react';
import { Project } from '@/types/portfolio';

interface SelectedWorkProps {
  projects: Project[];
}

export default function SelectedWork({ projects }: SelectedWorkProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = projects.filter((p) => {
    if (!p.published) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'uiux') return p.category.toLowerCase().includes('ui/ux') || p.tags.includes('UI/UX');
    if (activeFilter === 'web') return p.category.toLowerCase().includes('web') || p.tags.includes('Full-Stack');
    return true;
  });

  return (
    <section id="work" className="py-20 sm:py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="scroll-driven-header flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-[#222329]/60">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
              SELECTED WORK
            </h2>
            <span className="text-[#a1a1aa] font-medium text-lg">/ Projects</span>
          </div>
          <p className="mt-2 text-sm text-[#71717a]">
            Curated concepts and functional applications demonstrating interaction design and technical execution.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'uiux', label: 'UI/UX & Branding' },
            { id: 'web', label: 'Web Applications' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeFilter === tab.id
                  ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/20'
                  : 'bg-[#16171b] text-[#a1a1aa] hover:text-white border border-[#27272a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid matching mockup styling */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
        {filteredProjects.map((project, index) => {
          const isLime = project.accentColor === '#CCFF00';
          const isPurple = project.accentColor === '#A855F7';
          const isBlue = project.accentColor === '#38BDF8';
          const isOrange = project.accentColor === '#F97316' || project.accentColor === '#D97706';

          return (
            <div
              key={project.id}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
              className="scroll-driven-card group relative rounded-3xl bg-[#121316] border border-[#222329] hover:border-[#383a45] overflow-hidden flex flex-col justify-between p-6 sm:p-8 hover:shadow-2xl hover:shadow-black/60 transition-all duration-300"
            >
              {/* Dynamic Interactive Cursor Spotlight */}
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(550px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${project.accentColor}25, transparent 70%)`,
                }}
              />

              {/* Inner ambient glow background matching the card's accent */}
              <div
                className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[90px] opacity-25 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: project.accentColor }}
              />

              {/* Top Card Info */}
              <div className="relative z-10 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#71717a] tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-[#1e2025] border border-[#2d3039] text-[#a1a1aa]">
                      {project.hasCaseStudy ? 'Case Study' : 'Design Showcase'}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-[#ccff00] transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#9496a1] line-clamp-2 leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                {/* Tag Pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#1a1b20] border border-[#27272a] text-[#d4d4d8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual Mockup Area */}
              <div className="relative mt-6 sm:mt-8 w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#222329]/80 bg-[#0e0f12]">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-80" />
              </div>

              {/* Bottom Card Footer with Actions */}
              <div className="relative z-10 mt-6 pt-4 border-t border-[#1e2025] flex items-center justify-between">
                <span className="text-xs font-medium text-[#71717a] uppercase tracking-wider">
                  {project.year} • {project.category}
                </span>

                <div className="flex items-center gap-3">
                  {project.figmaUrl && project.figmaUrl.trim() !== '' && project.figmaUrl !== 'https://figma.com' && (
                    <a
                      href={project.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#1a1b20] hover:bg-[#27272a] text-[#a1a1aa] hover:text-white transition-colors"
                      title="View in Figma"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {project.hasCaseStudy ? (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black group-hover:bg-[#ccff00] transition-all duration-300 font-bold text-xs uppercase shadow-lg"
                      aria-label={`View ${project.title}`}
                    >
                      <span>View Design</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </Link>
                  ) : project.figmaUrl && project.figmaUrl.trim() !== '' && project.figmaUrl !== 'https://figma.com' ? (
                    <a
                      href={project.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1b20] hover:bg-[#27272a] text-[#ccff00] border border-[#27272a] hover:border-[#ccff00] transition-all text-xs font-semibold uppercase"
                    >
                      <span>Figma Prototype</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : project.githubUrl && project.githubUrl.trim() !== '' && project.githubUrl !== 'https://github.com' ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1b20] hover:bg-[#27272a] text-[#38bdf8] border border-[#27272a] hover:border-[#38bdf8] transition-all text-xs font-semibold uppercase"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="px-3 py-1.5 rounded-full bg-[#16171a] border border-[#27272a] text-[#71717a] text-[11px] font-medium uppercase tracking-wider">
                      Showcase
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
