'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Award, 
  ExternalLink, 
  Save, 
  Check, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Loader2, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { getCertificates, saveCertificates } from '@/lib/storage';
import { Certificate } from '@/types/portfolio';

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);

  const headerFileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const c = await getCertificates();
      setCertificates(c);
    }
    load();
  }, []);

  const uploadFileToServer = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      setUploadError(null);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Upload failed');
      }

      return data.url;
    } catch (err: any) {
      console.error('Upload error:', err);
      setUploadError(err.message || 'File upload failed');
      return null;
    } finally {
      setUploading(false);
    }
  };

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
    }, 1000);
  };

  const openNew = () => {
    setIsNew(true);
    setShowManualUrl(false);
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

  // Quick upload from header button
  const handleHeaderFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadFileToServer(file);
    if (url) {
      const suggestedTitle = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

      setIsNew(true);
      setShowManualUrl(false);
      setEditingCert({
        id: `cert-${Date.now()}`,
        title: suggestedTitle,
        issuer: '',
        grade: '',
        imageUrl: url,
        credentialUrl: '',
        order: certificates.length + 1
      });
    }
    e.target.value = '';
  };

  // Upload inside the edit modal
  const handleModalFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingCert) return;

    const url = await uploadFileToServer(file);
    if (url) {
      setEditingCert(prev => {
        if (!prev) return null;
        const suggestedTitle = prev.title || file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
        return {
          ...prev,
          imageUrl: url,
          title: suggestedTitle,
        };
      });
    }
    e.target.value = '';
  };

  // Direct card image upload without opening full modal
  const handleCardImageUpload = async (certId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadFileToServer(file);
    if (url) {
      const updated = certificates.map(c => c.id === certId ? { ...c, imageUrl: url } : c);
      setCertificates(updated);
      await saveCertificates(updated);
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Hidden file input for header direct upload */}
      <input
        ref={headerFileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleHeaderFileUpload}
      />

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
            Upload and manage your verified credentials from NPTEL, Coursera, universities, and technical bodies.
          </p>
        </div>

        {/* Action Buttons: Add + Direct Upload */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => headerFileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#181920] hover:bg-[#22232b] text-white border border-[#272833] hover:border-[#ccff00]/60 text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#ccff00]" />
            ) : (
              <Upload className="w-4 h-4 text-[#ccff00]" />
            )}
            <span>Upload Certificate</span>
          </button>

          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#ccff00]/20 active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Certificate</span>
          </button>
        </div>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            onClick={() => {
              setIsNew(false);
              setShowManualUrl(false);
              setEditingCert(cert);
            }}
            className="p-6 rounded-2xl bg-[#121316] border border-[#1e2025] hover:border-[#ccff00]/60 hover:bg-[#15171c] hover:shadow-xl hover:shadow-black/50 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1a1c14] border border-[#ccff00]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6 text-[#ccff00]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-[#ccff00] font-semibold mt-1">
                    {cert.issuer}
                  </p>
                  {cert.grade && (
                    <span className="inline-block mt-2 text-[11px] px-2.5 py-0.5 rounded bg-[#1c2214] border border-[#ccff00]/30 text-[#ccff00] font-mono">
                      {cert.grade}
                    </span>
                  )}
                </div>
              </div>

              {/* Certificate Image Preview with Quick Upload Overlay */}
              <div className="mt-4 relative w-full h-40 rounded-xl overflow-hidden border border-[#27272a] group-hover:border-[#ccff00]/40 bg-[#0c0d10] transition-colors">
                {cert.imageUrl ? (
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#71717a] gap-2">
                    <ImageIcon className="w-8 h-8 opacity-40" />
                    <span className="text-xs">No image attached</span>
                  </div>
                )}

                {/* Quick Upload Hover Overlay */}
                <label
                  onClick={(e) => e.stopPropagation()}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 cursor-pointer backdrop-blur-[2px]"
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => handleCardImageUpload(cert.id, e)}
                  />
                  <Upload className="w-5 h-5 text-[#ccff00]" />
                  <span className="text-xs font-bold text-white tracking-wide">
                    Click to Change / Upload Image
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1e2025] flex items-center justify-between">
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-[#71717a] hover:text-[#ccff00] flex items-center gap-1"
                >
                  <span>Verification Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-xs text-[#52525b]">No link provided</span>
              )}

              <div className="flex items-center gap-2">
                {/* Direct Upload button on card */}
                <label
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg bg-[#18191e] border border-[#27272a] text-[#a1a1aa] hover:text-[#ccff00] hover:border-[#ccff00]/60 cursor-pointer transition-colors"
                  title="Upload New Certificate Image/PDF"
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => handleCardImageUpload(cert.id, e)}
                  />
                  <Upload className="w-3.5 h-3.5" />
                </label>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsNew(false);
                    setShowManualUrl(false);
                    setEditingCert(cert);
                  }}
                  className="p-2 rounded-lg bg-[#18191e] border border-[#27272a] text-[#ccff00] group-hover:border-[#ccff00] transition-colors"
                  title="Edit Certificate Details"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(cert.id);
                  }}
                  className="p-2 rounded-lg bg-[#18191e] border border-[#27272a] text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
                  title="Delete Certificate"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Certificate Modal with Built-in Uploader */}
      {editingCert && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto">
          <div className="relative max-w-xl w-full bg-[#121316] border border-[#222329] rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#1e2025]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#1c2214] border border-[#ccff00]/30 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#ccff00]" />
                </div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white uppercase">
                  {isNew ? 'Add New Certificate' : 'Edit Certificate'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className="w-8 h-8 rounded-full bg-[#18191e] text-[#a1a1aa] hover:text-white flex items-center justify-center transition-colors"
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

            {uploadError && (
              <div className="mt-4 p-3 rounded-xl bg-[#ef4444]/15 border border-[#ef4444]/30 flex items-center gap-2 text-xs text-[#ef4444]">
                <AlertCircle className="w-4 h-4" />
                <span>{uploadError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="mt-6 space-y-5">
              {/* 1. PRIMARY: UPLOAD CERTIFICATE FILE DROPZONE */}
              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-2 flex items-center justify-between">
                  <span>Certificate Image / File</span>
                  <span className="text-[11px] text-[#ccff00] font-normal">PNG, JPG, WEBP, PDF</span>
                </label>

                {/* Hidden input */}
                <input
                  ref={modalFileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={handleModalFileUpload}
                />

                {/* Dropzone container */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={async (e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      const url = await uploadFileToServer(file);
                      if (url) {
                        setEditingCert(prev => prev ? { ...prev, imageUrl: url } : null);
                      }
                    }
                  }}
                  className={`relative p-5 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 ${
                    isDragging
                      ? 'border-[#ccff00] bg-[#ccff00]/5'
                      : 'border-[#27272a] hover:border-[#ccff00]/50 bg-[#16171b]/60'
                  }`}
                >
                  {/* Preview if uploaded */}
                  {editingCert.imageUrl ? (
                    <div className="w-full flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-28 h-24 rounded-xl overflow-hidden border border-[#27272a] bg-[#0c0d10] shrink-0">
                        <img
                          src={editingCert.imageUrl}
                          alt="Certificate Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#22c55e]">
                          <FileCheck className="w-4 h-4" />
                          <span>File Attached</span>
                        </div>
                        <p className="text-[11px] font-mono text-[#71717a] mt-1 break-all line-clamp-1">
                          {editingCert.imageUrl}
                        </p>
                        <button
                          type="button"
                          onClick={() => modalFileInputRef.current?.click()}
                          disabled={uploading}
                          className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1f2026] hover:bg-[#272832] text-xs font-semibold text-white border border-[#2c2d38] transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#ccff00]" />
                          <span>Replace File</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#1c2214] border border-[#ccff00]/30 flex items-center justify-center mb-2">
                        {uploading ? (
                          <Loader2 className="w-5 h-5 animate-spin text-[#ccff00]" />
                        ) : (
                          <Upload className="w-5 h-5 text-[#ccff00]" />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-white">
                        {uploading ? 'Uploading to server...' : 'Click to select or drop certificate file'}
                      </p>
                      <p className="text-[11px] text-[#71717a] mt-0.5">
                        Saved securely into public uploads
                      </p>
                      <button
                        type="button"
                        onClick={() => modalFileInputRef.current?.click()}
                        disabled={uploading}
                        className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-all shadow-md shadow-[#ccff00]/15"
                      >
                        <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Choose File</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Option to toggle manual URL */}
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={() => setShowManualUrl(!showManualUrl)}
                    className="text-[#71717a] hover:text-[#ccff00] transition-colors underline"
                  >
                    {showManualUrl ? 'Hide manual image URL' : 'Or enter custom image URL / path'}
                  </button>
                  {editingCert.imageUrl && (
                    <span className="text-[#22c55e] font-mono text-[10px]">Ready to save</span>
                  )}
                </div>

                {showManualUrl && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={editingCert.imageUrl}
                      onChange={(e) => setEditingCert({ ...editingCert, imageUrl: e.target.value })}
                      placeholder="/uploads/... or https://..."
                      className="w-full px-4 py-2 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-xs focus:border-[#ccff00] focus:outline-none font-mono"
                    />
                  </div>
                )}
              </div>

              {/* 2. Certificate Title */}
              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                  Certificate Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  placeholder="e.g. Cloud Computing, Interaction Design"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
                />
              </div>

              {/* 3. Issuing Organization */}
              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.issuer}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  placeholder="e.g. NPTEL, Coursera, Google"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
                />
              </div>

              {/* 4. Grade / Score */}
              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                  Grade / Score / Distinction
                </label>
                <input
                  type="text"
                  value={editingCert.grade || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, grade: e.target.value })}
                  placeholder="e.g. Elite, 86%, Completed"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
                />
              </div>

              {/* 5. Credential / Verification URL */}
              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                  Credential / Verification Link
                </label>
                <input
                  type="url"
                  value={editingCert.credentialUrl || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                  placeholder="https://nptel.ac.in/... or https://coursera.org/verify/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none font-mono"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex justify-end gap-3 border-t border-[#1e2025]">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-5 py-2.5 rounded-full bg-[#18191e] hover:bg-[#22232a] text-xs text-[#a1a1aa] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] flex items-center gap-2 transition-all shadow-md shadow-[#ccff00]/20 active:scale-95"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Certificate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
