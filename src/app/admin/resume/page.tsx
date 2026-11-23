'use client';

import { useState, useEffect } from 'react';
import { FileText, Download, ExternalLink, Save, Check, UploadCloud } from 'lucide-react';
import { getProfile, saveProfile } from '@/lib/storage';
import { Profile } from '@/types/portfolio';

export default function AdminResumePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [resumeUrl, setResumeUrl] = useState('/resume.pdf');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const p = await getProfile();
      setProfile(p);
      if (p?.resumeUrl) {
        setResumeUrl(p.resumeUrl);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    const updated = { ...profile, resumeUrl };
    setProfile(updated);
    await saveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-[#1e2025]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#ccff00]">
          Recruiter Assets
        </span>
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white tracking-tight mt-1">
          Resume Manager
        </h1>
        <p className="text-xs text-[#a1a1aa] mt-1">
          Configure the public resume PDF file downloaded by recruiters from the header and footer buttons.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center gap-3 text-sm text-[#22c55e]">
          <Check className="w-5 h-5 shrink-0" />
          <span>Resume configuration saved! The public &quot;Resume ↗&quot; button now points to this file.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-[#121316] border border-[#1e2025] space-y-6">
          <div>
            <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1.5">
              Public Resume File / URL
            </label>
            <input
              type="text"
              required
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              placeholder="/resume.pdf or https://..."
              className="w-full px-4 py-3 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none font-mono"
            />
            <p className="text-[11px] text-[#71717a] mt-2">
              Default is <code className="text-[#ccff00]">/resume.pdf</code> located in your portfolio&apos;s public folder, or you can paste a Google Drive / Supabase Storage public link.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#16171b] border border-[#222329] space-y-2 text-xs text-[#a1a1aa]">
            <span className="font-semibold text-white block">How to upload your PDF file:</span>
            <p>1. Copy your final resume PDF to <code className="text-[#ccff00]">public/resume.pdf</code> in this project folder, OR</p>
            <p>2. Upload to Supabase Storage (<code className="text-[#ccff00]">portfolio-assets</code> bucket) and paste the public URL above.</p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#ccff00]/20"
          >
            <Save className="w-4 h-4" />
            <span>Update Public Resume</span>
          </button>
        </form>

        {/* Current Preview Card */}
        <div className="p-6 rounded-3xl bg-[#121316] border border-[#1e2025] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717a]">
              Active Public Document
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#1c2214] border border-[#ccff00]/30 text-[#ccff00]">
              Online
            </span>
          </div>

          <div className="p-8 rounded-2xl bg-[#18191e] border border-[#27272a] flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#1c2214] border border-[#ccff00]/40 flex items-center justify-center text-[#ccff00]">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-white">
                Krish_Patel_Resume.pdf
              </h3>
              <p className="text-xs text-[#71717a] mt-0.5">
                Target: UI/UX Designer &amp; Design Intern
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ccff00] text-black text-xs font-bold uppercase hover:bg-[#b8e600]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Test Download</span>
              </a>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#27272a] text-[#f4f4f5] hover:text-[#ccff00]"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
