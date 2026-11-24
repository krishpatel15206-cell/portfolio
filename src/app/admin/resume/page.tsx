'use client';

import { useState, useEffect, useRef } from 'react';
import { FileText, Download, ExternalLink, Save, Check, UploadCloud, AlertCircle } from 'lucide-react';
import { getProfile, saveProfile } from '@/lib/storage';
import { Profile } from '@/types/portfolio';

export default function AdminResumePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [resumeUrl, setResumeUrl] = useState('/resume.pdf');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setResumeUrl(data.url);
        if (profile) {
          const updated = { ...profile, resumeUrl: data.url };
          setProfile(updated);
          await saveProfile(updated);
        }
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to upload resume PDF:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

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
          Upload and configure the official resume PDF downloaded by recruiters and hiring managers.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center gap-3 text-sm text-[#22c55e]">
          <Check className="w-5 h-5 shrink-0" />
          <span>Resume configuration saved! The public &quot;Resume ↗&quot; button now points to this file.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Upload & Form Box */}
        <div className="p-6 rounded-3xl bg-[#121316] border border-[#1e2025] space-y-6">
          {/* Direct File Uploader Dropzone */}
          <div className="p-6 rounded-2xl bg-[#16171b] border-2 border-dashed border-[#27272a] hover:border-[#ccff00]/60 transition-colors text-center space-y-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,application/pdf"
              className="hidden"
            />
            <div className="w-12 h-12 rounded-2xl bg-[#1c2214] border border-[#ccff00]/30 flex items-center justify-center mx-auto text-[#ccff00]">
              <UploadCloud className="w-6 h-6 stroke-[2]" />
            </div>

            <div>
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-white">
                Upload New Resume PDF
              </h3>
              <p className="text-xs text-[#71717a] mt-1">
                Select your latest PDF document directly from your computer.
              </p>
            </div>

            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              <UploadCloud className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{uploading ? 'Uploading...' : 'Choose PDF File'}</span>
            </button>
          </div>

          {/* Manual URL Input */}
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1.5">
                Or Enter Resume URL / Path
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
                Stored path or public Google Drive / cloud storage URL.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#18191e] hover:bg-[#222329] border border-[#27272a] hover:border-[#ccff00] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <Save className="w-4 h-4 text-[#ccff00]" />
              <span>Save Resume Link</span>
            </button>
          </form>
        </div>

        {/* Current Preview Card */}
        <div className="p-6 rounded-3xl bg-[#121316] border border-[#1e2025] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717a]">
              Active Public Document
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#1c2214] border border-[#ccff00]/30 text-[#ccff00]">
              Live
            </span>
          </div>

          <div className="p-8 rounded-2xl bg-[#18191e] border border-[#27272a] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1c2214] border border-[#ccff00]/40 flex items-center justify-center text-[#ccff00]">
              <FileText className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-['Space_Grotesk'] text-base font-bold text-white break-all max-w-xs">
                {resumeUrl.split('/').pop() || 'resume.pdf'}
              </h3>
              <p className="text-xs text-[#71717a] mt-1 font-mono break-all max-w-xs">
                {resumeUrl}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#ccff00]/15"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Test Download</span>
              </a>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#27272a] text-[#f4f4f5] hover:text-[#ccff00] transition-colors"
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
