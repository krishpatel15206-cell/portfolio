'use client';

import { useState } from 'react';
import { ArrowUpRight, Mail, Copy, Check, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Profile } from '@/types/portfolio';

interface ContactSectionProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#ccff00', '#ffffff', '#88b300'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ccff00', '#38bdf8', '#a855f7'],
    });
    setTimeout(() => {
      setModalOpen(false);
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Wave Mesh Glow Background matching mockup */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#ccff00]/10 via-[#ccff00]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between">
        {/* Giant Headline */}
        <div className="scroll-reveal will-change-transform">
          <h2 className="font-['Space_Grotesk'] text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white uppercase leading-[0.92]">
            LET&apos;S <br />
            WORK <span className="text-[#ccff00]">TOGETHER.</span>
          </h2>
        </div>

        {/* Action Row */}
        <div className="scroll-reveal mt-12 sm:mt-16 pt-8 border-t border-[#222329]/80 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-sm sm:text-base text-[#d4d4d8] font-medium max-w-md">
              Have a project, opportunity or just want to say hi? I&apos;d love to connect.
            </p>
            <p className="text-xs text-[#71717a] mt-1 font-mono">
              {profile.email}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#ccff00]/25 hover:scale-105 active:scale-95"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#16171b] border border-[#27272a] hover:border-[#ccff00] text-[#f4f4f5] hover:text-[#ccff00] flex items-center justify-center transition-all hover:scale-105"
                  title="LinkedIn Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37z" />
                  </svg>
                </a>
              )}

              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[#16171b] border border-[#27272a] hover:border-[#ccff00] text-[#f4f4f5] hover:text-[#ccff00] flex items-center justify-center transition-all hover:scale-105"
                  title="GitHub Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              )}

              <button
                onClick={handleCopyEmail}
                className="w-12 h-12 rounded-full bg-[#16171b] border border-[#27272a] hover:border-[#ccff00] text-[#f4f4f5] hover:text-[#ccff00] flex items-center justify-center transition-all hover:scale-105"
                title="Copy Email Address"
              >
                {copied ? <Check className="w-4 h-4 text-[#ccff00]" /> : <Mail className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Direct Message Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative max-w-lg w-full bg-[#121316] border border-[#27272a] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#222329]">
              <div>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white uppercase">
                  Send a Message
                </h3>
                <p className="text-xs text-[#a1a1aa] mt-0.5">
                  Direct message to Krish Patel
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#1a1b20] border border-[#27272a] text-[#a1a1aa] hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {formSent ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#1c2214] border border-[#ccff00] flex items-center justify-center">
                  <Check className="w-7 h-7 text-[#ccff00]" />
                </div>
                <h4 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                  Message Sent!
                </h4>
                <p className="text-xs text-[#a1a1aa]">
                  Thank you! Krish will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-[#16171b] border border-[#27272a] text-white placeholder-[#71717a] text-sm focus:outline-none focus:border-[#ccff00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#16171b] border border-[#27272a] text-white placeholder-[#71717a] text-sm focus:outline-none focus:border-[#ccff00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, team or idea..."
                    className="w-full px-4 py-3 rounded-xl bg-[#16171b] border border-[#27272a] text-white placeholder-[#71717a] text-sm focus:outline-none focus:border-[#ccff00] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-xs text-[#71717a] hover:text-[#ccff00] transition-colors"
                  >
                    Or copy: {profile.email}
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
