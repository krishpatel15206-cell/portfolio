'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Award, ExternalLink, Save, Check } from 'lucide-react';
import { getCertificates, saveCertificates } from '@/lib/storage';
import { Certificate } from '@/types/portfolio';

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const c = await getCertificates();
      setCertificates(c);
    }
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Delete this certificate?')) {
      const updated = certificates.filter(c => c.id !== id);
      setCertificates(updated);
      await saveCertificates(updated);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    let updatedList = [...certificates];
    if (isNew) {
      updatedList.push(editingCert);
    } else {
      updatedList = updatedList.map(c => c.id === editingCert.id ? editingCert : c);
    }

    setCertificates(updatedList);
    await saveCertificates(updatedList);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setEditingCert(null);
    }, 1200);
  };

  const openNew = () => {
    setIsNew(true);
    setEditingCert({
      id: `cert-${Date.now()}`,
      title: '',
      issuer: '',
      grade: '',
      imageUrl: '/images/cert-nptel-cloud.jpg',
      credentialUrl: '',
      order: certificates.length + 1
    });
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e2025]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ccff00]">
            Credentials & Achievements
          </span>
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white tracking-tight mt-1">
            Certificates Manager
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Manage your verified credentials from NPTEL, Coursera and other institutions.
          </p>
        </div>

        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#ccff00]/20"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Certificate</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-6 rounded-2xl bg-[#121316] border border-[#1e2025] hover:border-[#2d3039] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1a1c14] border border-[#ccff00]/30 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-[#ccff00]" />
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-[#ccff00] font-semibold mt-0.5">
                    {cert.issuer}
                  </p>
                  {cert.grade && (
                    <span className="inline-block mt-2 text-[11px] px-2.5 py-0.5 rounded bg-[#1c2214] border border-[#ccff00]/30 text-[#ccff00]">
                      {cert.grade}
                    </span>
                  )}
                </div>
              </div>

              {/* Certificate Mockup Preview */}
              <div className="mt-4 relative w-full h-36 rounded-xl overflow-hidden border border-[#27272a] bg-[#0c0d10]">
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1e2025] flex items-center justify-between">
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#71717a] hover:text-[#ccff00] flex items-center gap-1"
                >
                  <span>Verification Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-xs text-[#52525b]">No link provided</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsNew(false);
                    setEditingCert(cert);
                  }}
                  className="p-2 rounded-lg bg-[#18191e] border border-[#27272a] text-[#ccff00] hover:border-[#ccff00]"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="p-2 rounded-lg bg-[#18191e] border border-[#27272a] text-[#ef4444] hover:bg-[#ef4444]/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editingCert && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative max-w-lg w-full bg-[#121316] border border-[#222329] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#1e2025]">
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white uppercase">
                {isNew ? 'Add Certificate' : 'Edit Certificate'}
              </h3>
              <button
                onClick={() => setEditingCert(null)}
                className="w-8 h-8 rounded-full bg-[#18191e] text-[#a1a1aa] hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {savedSuccess && (
              <div className="mt-4 p-3 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center gap-2 text-xs text-[#22c55e]">
                <Check className="w-4 h-4" />
                <span>Certificate saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                  Certificate Title
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.issuer}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  placeholder="e.g. NPTEL, Coursera"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                  Grade / Score / Distinction
                </label>
                <input
                  type="text"
                  value={editingCert.grade || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, grade: e.target.value })}
                  placeholder="e.g. Elite, 86%"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                  Credential / Verification URL
                </label>
                <input
                  type="url"
                  value={editingCert.credentialUrl || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                  Certificate Image URL / Path
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.imageUrl}
                  onChange={(e) => setEditingCert({ ...editingCert, imageUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none font-mono"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-5 py-2 rounded-full bg-[#18191e] text-xs text-[#a1a1aa]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
