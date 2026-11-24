'use client';

import { useState, useEffect } from 'react';
import { Save, Check, User, MapPin, Mail, Phone, Sparkles } from 'lucide-react';
import { getProfile, saveProfile } from '@/lib/storage';
import { Profile } from '@/types/portfolio';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const p = await getProfile();
      setProfile(p);
    }
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    await saveProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  if (!profile) {
    return <div className="text-sm text-[#71717a]">Loading profile settings...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-[#1e2025]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#ccff00]">
          Personal Brand & Settings
        </span>
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white tracking-tight mt-1">
          Profile & Bio Settings
        </h1>
        <p className="text-xs text-[#a1a1aa] mt-1">
          Edit your headline, bio paragraphs, contact channels, and academic CGPA metrics.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center gap-3 text-sm text-[#22c55e]">
          <Check className="w-5 h-5 shrink-0" />
          <span>Profile updated successfully! Your info is immediately live on the website.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* HERO VISUAL MODE NOTICE */}
        <div className="p-5 rounded-2xl bg-[#14151a] border border-[#22242e] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] shrink-0" />
            <div>
              <span className="text-xs font-bold text-white uppercase block">Hero Visual: Pure UI/UX Designer Canvas</span>
              <span className="text-[11px] text-[#71717a]">Your homepage displays the interactive Figma vector canvas instead of personal photos for a clean, agency-grade look.</span>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30 shrink-0">
            Active
          </span>
        </div>

        {/* Basic Identity */}
        <div className="p-6 rounded-3xl bg-[#121316] border border-[#1e2025] space-y-4">
          <h2 className="font-['Space_Grotesk'] text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-[#ccff00]" />
            <span>Professional Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                Professional Title
              </label>
              <input
                type="text"
                required
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
              Primary Hero Tagline
            </label>
            <input
              type="text"
              required
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
              Alternative Hero Statement
            </label>
            <input
              type="text"
              value={profile.alternativeHero}
              onChange={(e) => setProfile({ ...profile, alternativeHero: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
            />
          </div>
        </div>

        {/* CGPA & Academic Metrics Field */}
        <div className="p-6 rounded-3xl bg-[#121316] border border-[#1e2025] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-['Space_Grotesk'] text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ccff00]" />
              <span>Academic Metrics (Editable Profile Field)</span>
            </h2>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#1c2214] text-[#ccff00] border border-[#ccff00]/30 font-semibold">
              Configurable
            </span>
          </div>
          <p className="text-xs text-[#71717a]">
            Your previous shared figures are 8.17 and 8.25. You can update this anytime when your newest semester grades are published.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                B.Tech CGPA
              </label>
              <input
                type="text"
                value={profile.cgpa}
                onChange={(e) => setProfile({ ...profile, cgpa: e.target.value })}
                placeholder="8.25"
                className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none font-semibold text-[#ccff00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                Diploma CGPA
              </label>
              <input
                type="text"
                value={profile.diplomaCgpa}
                onChange={(e) => setProfile({ ...profile, diplomaCgpa: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                SSC Percentage
              </label>
              <input
                type="text"
                value={profile.sscCgpa}
                onChange={(e) => setProfile({ ...profile, sscCgpa: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact & Social Links */}
        <div className="p-6 rounded-3xl bg-[#121316] border border-[#1e2025] space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-['Space_Grotesk'] text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#ccff00]" />
              <span>Contact &amp; Social Links (Directly Live on Portfolio)</span>
            </h2>
            <span className="text-[11px] text-[#ccff00] font-semibold">100% Editable</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1.5">
                Your Email Address
              </label>
              <input
                type="email"
                required
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="your.email@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
              />
              <p className="text-[11px] text-[#71717a] mt-1">Used in contact footer and copy buttons.</p>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                placeholder="Gujarat, India"
                className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
              />
              <p className="text-[11px] text-[#71717a] mt-1">Displays on the hero location pill.</p>
            </div>

            {/* LinkedIn */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#a1a1aa] uppercase">
                  LinkedIn Profile URL
                </label>
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[#ccff00] hover:underline"
                  >
                    Test Link ↗
                  </a>
                )}
              </div>
              <input
                type="url"
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/your-profile"
                className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none font-mono"
              />
            </div>

            {/* GitHub */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#a1a1aa] uppercase">
                  GitHub Profile URL
                </label>
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[#ccff00] hover:underline"
                  >
                    Test Link ↗
                  </a>
                )}
              </div>
              <input
                type="url"
                value={profile.github}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                placeholder="https://github.com/your-username"
                className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none font-mono"
              />
            </div>

            {/* Figma Profile */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#a1a1aa] uppercase">
                  Figma Community / Profile URL
                </label>
                {profile.figma && (
                  <a
                    href={profile.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[#ccff00] hover:underline"
                  >
                    Test Link ↗
                  </a>
                )}
              </div>
              <input
                type="url"
                value={profile.figma || ''}
                onChange={(e) => setProfile({ ...profile, figma: e.target.value })}
                placeholder="https://figma.com/@your-handle"
                className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Bio Paragraphs */}
        <div className="p-6 rounded-3xl bg-[#121316] border border-[#1e2025] space-y-4">
          <h2 className="font-['Space_Grotesk'] text-base font-bold text-white uppercase tracking-wider">
            About Me Paragraphs
          </h2>

          {profile.bioParagraphs.map((para, idx) => (
            <div key={idx}>
              <label className="block text-xs font-semibold text-[#71717a] mb-1">
                Paragraph {idx + 1}
              </label>
              <textarea
                rows={3}
                value={para}
                onChange={(e) => {
                  const updated = [...profile.bioParagraphs];
                  updated[idx] = e.target.value;
                  setProfile({ ...profile, bioParagraphs: updated });
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none resize-none leading-relaxed"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#ccff00]/20 transition-all hover:scale-105 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
}
