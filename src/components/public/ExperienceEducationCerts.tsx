'use client';

import { useState } from 'react';
import { GraduationCap, Award, Briefcase, ExternalLink, ArrowRight, Eye } from 'lucide-react';
import { Experience, Education, Certificate } from '@/types/portfolio';

interface ExperienceEducationCertsProps {
  experiences: Experience[];
  educations: Education[];
  certificates: Certificate[];
}

export default function ExperienceEducationCerts({
  experiences,
  educations,
  certificates,
}: ExperienceEducationCertsProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="experience" className="py-20 sm:py-28 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#222329]/60">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
        
        {/* COLUMN 1: EXPERIENCE / 02 */}
        <div className="flex flex-col">
          <div className="anim-section-header flex items-center gap-3 pb-6 border-b border-[#222329]">
            <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-white">
              EXPERIENCE
            </h3>
            <span className="text-[#71717a] font-medium text-xs">/ 02</span>
          </div>

          <div className="relative mt-8 pl-6 border-l-2 border-[#222329] space-y-8 anim-timeline-line origin-top">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="anim-timeline-item relative group transition-all duration-300 hover:translate-x-1.5">
                {/* Glowing Lime Node on timeline */}
                <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#121316] border-2 border-[#ccff00] group-hover:bg-[#ccff00] transition-colors duration-200 shadow-[0_0_10px_rgba(204,255,0,0.5)]" />

                <div>
                  <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider">
                    {exp.company}
                  </span>
                  <h4 className="font-['Space_Grotesk'] text-base font-bold text-white mt-0.5">
                    {exp.position}
                  </h4>
                  <p className="text-xs text-[#71717a] mt-1 font-medium">
                    {exp.period} {exp.duration ? `• ${exp.duration}` : ''}
                  </p>

                  {exp.description && (
                    <p className="mt-2 text-xs text-[#a1a1aa] leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.tasks && exp.tasks.length > 0 && (
                    <ul className="mt-2.5 space-y-1.5 text-[11px] text-[#8e909a]">
                      {exp.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-1.5">
                          <span className="text-[#ccff00] mt-0.5">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 2: EDUCATION / 03 */}
        <div className="flex flex-col">
          <div className="anim-section-header flex items-center gap-3 pb-6 border-b border-[#222329]">
            <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-white">
              EDUCATION
            </h3>
            <span className="text-[#71717a] font-medium text-xs">/ 03</span>
          </div>

          <div className="mt-8 space-y-6">
            {educations.map((edu) => (
              <div
                key={edu.id}
                className="anim-edu-card group p-5 rounded-2xl bg-[#121316] border border-[#222329] hover:border-[#ccff00]/40 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/60"
              >
                {/* Graduation Cap in Lime-tinted circle */}
                <div className="w-10 h-10 rounded-full bg-[#1c2214] border border-[#ccff00]/30 flex items-center justify-center shrink-0 group-hover:border-[#ccff00] transition-colors">
                  <GraduationCap className="w-5 h-5 text-[#ccff00]" />
                </div>

                <div className="flex-1">
                  <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-[#a1a1aa] mt-1">
                    {edu.institution}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs text-[#71717a]">
                    <span>{edu.period}</span>
                    {edu.score && (
                      <span className="font-semibold text-[#ccff00] px-2 py-0.5 rounded bg-[#1c2214] border border-[#ccff00]/20 text-[11px]">
                        {edu.score}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 3: CERTIFICATES / 04 */}
        <div id="certificates" className="flex flex-col">
          <div className="flex items-center justify-between pb-6 border-b border-[#222329]">
            <div className="flex items-center gap-3">
              <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-white">
                CERTIFICATES
              </h3>
              <span className="text-[#71717a] font-medium text-xs">/ 04</span>
            </div>
            <span className="text-[11px] text-[#71717a]">3 Verified</span>
          </div>

          {/* Interactive Stacked Cards */}
          <div className="mt-8 space-y-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="anim-cert-card group relative p-5 rounded-2xl bg-[#121316] border border-[#222329] hover:border-[#ccff00]/50 hover:bg-[#16171b] cursor-pointer shadow-lg flex items-center justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/60"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1a1c14] border border-[#ccff00]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Award className="w-4 h-4 text-[#ccff00]" />
                  </div>

                  <div>
                    <h4 className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-white group-hover:text-[#ccff00] transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] text-[#8e909a] mt-0.5">
                      {cert.issuer} {cert.grade ? `• ${cert.grade}` : ''}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#18191e] border border-[#27272a] flex items-center justify-center text-[#a1a1aa] group-hover:text-black group-hover:bg-[#ccff00] transition-all">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative max-w-xl w-full bg-[#121316] border border-[#27272a] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#222329]">
              <div>
                <h4 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                  {selectedCert.title}
                </h4>
                <p className="text-xs text-[#ccff00] font-semibold mt-0.5">
                  Issued by {selectedCert.issuer}
                </p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-8 h-8 rounded-full bg-[#1a1b20] border border-[#27272a] text-[#a1a1aa] hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Certificate Preview Image */}
            <div className="mt-6 relative w-full h-64 rounded-xl overflow-hidden border border-[#27272a] bg-[#0c0d10]">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                {selectedCert.grade && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#1c2214] border border-[#ccff00]/30 text-[#ccff00]">
                    {selectedCert.grade}
                  </span>
                )}
              </div>

              {selectedCert.credentialUrl && (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
