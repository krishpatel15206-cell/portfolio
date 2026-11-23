'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Save, Check, User, MapPin, Mail, Phone, Sparkles, UploadCloud, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { getProfile, saveProfile } from '@/lib/storage';
import { Profile } from '@/types/portfolio';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const p = await getProfile();
      setProfile(p);
      if (p?.avatarUrl) {
        setPhotoPreview(p.avatarUrl);
      }
    }
    load();
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhotoPreview(base64String);
        if (profile) {
          setProfile({ ...profile, avatarUrl: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseSilhouette = () => {
    // Clean SVG designer avatar
    const silhouette = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 450" fill="%230c0d10"><circle cx="200" cy="150" r="90" fill="%231a1b20" stroke="%23ccff00" stroke-width="4"/><path d="M70 420 C70 280 130 250 200 250 C270 250 330 280 330 420 Z" fill="%231a1b20" stroke="%23ccff00" stroke-width="4"/></svg>';
    setPhotoPreview(silhouette);
    if (profile) {
      setProfile({ ...profile, avatarUrl: silhouette });
    }
  };

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
          Upload your real photograph, edit your headline, bio paragraphs, contact channels, and academic CGPA metrics.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center gap-3 text-sm text-[#22c55e]">
          <Check className="w-5 h-5 shrink-0" />
          <span>Profile updated successfully! Your new photo and info are immediately live on the website.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* PHOTO UPLOADER SECTION */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121316] border border-[#1e2025] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-['Space_Grotesk'] text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#ccff00]" />
              <span>Your Profile Photograph</span>
            </h2>
            <span className="text-xs text-[#ccff00] font-semibold">Immediate Live Update</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Live Photo Preview with Lime Aura */}
            <div className="relative w-36 h-36 rounded-2xl bg-[#18191e] border-2 border-[#ccff00]/60 overflow-hidden flex items-center justify-center shrink-0 shadow-lg shadow-[#ccff00]/10">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Krish Patel Avatar"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <User className="w-16 h-16 text-[#71717a]" />
              )}
            </div>

            {/* Controls */}
            <div className="space-y-3 text-center sm:text-left">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
              />

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#ccff00]/20"
                >
                  <UploadCloud className="w-4 h-4 stroke-[2.5]" />
                  <span>Upload Your Photo (PNG/JPG)</span>
                </button>

                <button
                  type="button"
                  onClick={handleUseSilhouette}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#18191e] border border-[#27272a] hover:border-[#ccff00] text-[#f4f4f5] text-xs font-semibold transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Use Clean Silhouette</span>
                </button>
              </div>

              <p className="text-xs text-[#71717a]">
                Recommended: A cutout or headshot photo with clear background. JPG, PNG or WebP up to 10MB.
              </p>
            </div>
          </div>
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
