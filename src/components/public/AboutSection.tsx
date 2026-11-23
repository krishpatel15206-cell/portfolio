'use client';

import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles, Layers, Layout, Palette, Users, Code, Database, Atom, Server, HardDrive, Terminal } from 'lucide-react';
import { Profile, Skill } from '@/types/portfolio';

interface AboutSectionProps {
  profile: Profile;
  skills: Skill[];
}

export default function AboutSection({ profile, skills }: AboutSectionProps) {
  const [showFullBioModal, setShowFullBioModal] = useState(false);

  // Group skills: Design skills first & prominent!
  const designSkills = skills.filter((s) => s.category === 'design');
  const technicalSkills = skills.filter((s) => s.category === 'technical' || s.category === 'tool');

  // Custom icon resolver
  const renderSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Figma':
        return <span className="font-bold text-sm tracking-tighter">Fi</span>;
      case 'Layout':
      case 'UI/UX':
        return <Layout className="w-5 h-5 text-[#ccff00]" />;
      case 'Grid':
      case 'Wireframing':
        return <Layers className="w-5 h-5 text-[#ccff00]" />;
      case 'Layers':
      case 'Prototyping':
        return <Sparkles className="w-5 h-5 text-[#ccff00]" />;
      case 'Palette':
      case 'Visual Design':
        return <Palette className="w-5 h-5 text-[#ccff00]" />;
      case 'Users':
      case 'User Research':
        return <Users className="w-5 h-5 text-[#ccff00]" />;
      case 'Code':
      case 'HTML5 / CSS3':
        return <Code className="w-5 h-5 text-[#38bdf8]" />;
      case 'Atom':
      case 'React.js':
        return <Atom className="w-5 h-5 text-[#61dafb]" />;
      case 'Server':
      case 'Node.js & Express':
        return <Server className="w-5 h-5 text-[#22c55e]" />;
      case 'HardDrive':
      case 'MongoDB':
        return <HardDrive className="w-5 h-5 text-[#10b981]" />;
      case 'Database':
      case 'SQL & CRUD':
        return <Database className="w-5 h-5 text-[#f59e0b]" />;
      case 'Terminal':
      case 'Python':
        return <Terminal className="w-5 h-5 text-[#eab308]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#a1a1aa]" />;
    }
  };

  return (
    <section id="about" className="py-20 sm:py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: About Me Bio & Headline */}
        <div className="anim-section-header lg:col-span-6 flex flex-col justify-start">
          <div className="flex items-center gap-3 pb-4">
            <h2 className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-widest text-[#a1a1aa]">
              ABOUT ME
            </h2>
            <span className="text-[#71717a] font-medium text-xs">/ 03</span>
          </div>

          <h3 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[1.05]">
            DESIGNER <br />
            WITH A <span className="text-[#ccff00]">TECH</span> <br />
            MINDSET.
          </h3>

          <div className="mt-8 space-y-4 text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
            <p>
              I&apos;m <span className="text-white font-medium">Krish Patel</span>, a Computer Science and Design student passionate about UI/UX design, visual storytelling and creating user-friendly digital experiences.
            </p>
            <p>
              With a background in computer science, I understand the technical side of digital products, allowing me to connect design thinking with practical implementation.
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setShowFullBioModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#ccff00]/20 hover:scale-105 active:scale-95"
            >
              <span>More About Me</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Right Column: Key Skills Squircle Grid */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-3">
              <h3 className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-widest text-[#a1a1aa]">
                KEY SKILLS
              </h3>
              <span className="text-[#71717a] font-medium text-xs">/ 04</span>
            </div>
            <span className="text-[11px] text-[#ccff00] font-semibold uppercase tracking-wider">
              Design Strength Focus
            </span>
          </div>

          {/* Squircles Matrix matching mockup */}
          <div className="anim-skills-grid grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 pt-2">
            {skills.map((skill) => {
              const isDesign = skill.category === 'design';
              return (
                <div
                  key={skill.id}
                  className={`anim-skill-item group relative p-4 rounded-2xl flex flex-col items-center justify-center text-center border will-change-transform ${
                    isDesign
                      ? 'bg-[#14151a] border-[#262832] hover:border-[#ccff00]/60 hover:bg-[#181a22]'
                      : 'bg-[#101114] border-[#1d1f26] hover:border-[#38bdf8]/50 hover:bg-[#14151a]'
                  } hover:scale-105 hover:shadow-xl`}
                >
                  {/* Icon Frame */}
                  <div className="w-10 h-10 rounded-xl bg-[#08080a] border border-[#27272a] flex items-center justify-center group-hover:border-[#ccff00]/40 transition-colors">
                    {renderSkillIcon(skill.name)}
                  </div>

                  <span className="mt-2.5 text-xs font-semibold text-white tracking-tight">
                    {skill.name}
                  </span>

                  <span className="mt-1 text-[10px] text-[#71717a] group-hover:text-[#a1a1aa] transition-colors">
                    {skill.level}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal: More About Me & Full Bio */}
      {showFullBioModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 sm:p-8">
          <div className="relative max-w-2xl w-full bg-[#121316] border border-[#27272a] rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[85vh]">
            <div className="flex items-center justify-between pb-6 border-b border-[#222329]">
              <div>
                <h4 className="font-['Space_Grotesk'] text-2xl font-bold text-white uppercase">
                  About Krish Patel
                </h4>
                <p className="text-xs text-[#ccff00] font-semibold tracking-wider uppercase mt-1">
                  {profile.title}
                </p>
              </div>
              <button
                onClick={() => setShowFullBioModal(false)}
                className="w-9 h-9 rounded-full bg-[#1a1b20] border border-[#27272a] text-[#a1a1aa] hover:text-white flex items-center justify-center hover:scale-105"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm text-[#d4d4d8] leading-relaxed">
              {profile.bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <div className="mt-8 pt-6 border-t border-[#222329]">
                <h5 className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-3">
                  Philosophy & Core Interests
                </h5>
                <ul className="space-y-2 text-xs text-[#a1a1aa]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                    <span>Emphasizing intuitive simplicity and visual storytelling in every digital touchpoint.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                    <span>Leveraging a CS background to create realistic, buildable design systems and developer-ready specs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                    <span>Currently targeting UI/UX Design and Design Internship opportunities.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowFullBioModal(false)}
                className="px-6 py-2.5 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
