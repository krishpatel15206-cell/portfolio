'use client';

import { useState } from 'react';
import { Award, Eye, ExternalLink } from 'lucide-react';
import { Certificate } from '@/types/portfolio';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-20 sm:py-28 px-6 sm:px-8 max-w-7xl mx-auto border-t border-[#222329]/60">
      {/* Section Header */}
      <div className="scroll-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-[#222329]">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              CERTIFICATES
            </h2>
            <span className="text-[#71717a] font-medium text-lg">/ 04</span>
          </div>
          <p className="mt-2 text-sm text-[#71717a]">
            Verified coursework, elite academic exams, and technical competencies.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181920] border border-[#272833] text-xs font-mono text-[#a1a1aa] w-fit">
          <Award className="w-3.5 h-3.5 text-[#ccff00]" />
          <span>3 Verified Credentials</span>
        </div>
      </div>

      {/* Certificates Cards Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {certificates.map((cert, idx) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            style={{ transitionDelay: `${idx * 100}ms` }}
            className="scroll-reveal group relative p-6 sm:p-7 rounded-2xl bg-[#121316] border border-[#222329] hover:border-[#ccff00]/50 hover:bg-[#16171b] cursor-pointer shadow-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/60"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1e2029]">
                <div className="w-11 h-11 rounded-xl bg-[#1a1c14] border border-[#ccff00]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5 text-[#ccff00]" />
                </div>
                <div className="w-9 h-9 rounded-full bg-[#18191e] border border-[#27272a] flex items-center justify-center text-[#a1a1aa] group-hover:text-black group-hover:bg-[#ccff00] transition-all">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mt-5 group-hover:text-[#ccff00] transition-colors leading-snug">
                {cert.title}
              </h3>
              <p className="text-sm text-[#8e909a] mt-2">
                {cert.issuer} {cert.grade ? `• ${cert.grade}` : ''}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1e2029] flex items-center justify-between">
              <span className="text-xs text-[#ccff00] font-semibold flex items-center gap-1 group-hover:underline">
                View Certificate Preview →
              </span>
              {cert.grade && (
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#1c2214] border border-[#ccff00]/30 text-[#ccff00]">
                  {cert.grade}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div 
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 sm:p-8"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full bg-[#121316] border border-[#27272a] rounded-3xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#222329]">
              <div>
                <h4 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                  {selectedCert.title}
                </h4>
                <p className="text-xs text-[#ccff00] font-semibold mt-1">
                  Issued by {selectedCert.issuer}
                </p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-9 h-9 rounded-full bg-[#1a1b20] border border-[#27272a] text-[#a1a1aa] hover:text-white flex items-center justify-center transition-colors text-base"
              >
                ✕
              </button>
            </div>

            {/* Certificate Preview Image */}
            <div className="mt-6 relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-[#27272a] bg-[#0c0d10]">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                {selectedCert.grade && (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#1c2214] border border-[#ccff00]/30 text-[#ccff00] font-mono">
                    {selectedCert.grade}
                  </span>
                )}
              </div>

              {selectedCert.credentialUrl && (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#ccff00]/20 hover:scale-105 active:scale-95"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
