'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Briefcase, GraduationCap, Save, Check } from 'lucide-react';
import { getExperiences, saveExperiences, getEducations, saveEducations } from '@/lib/storage';
import { Experience, Education } from '@/types/portfolio';

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    async function load() {
      const [exp, edu] = await Promise.all([getExperiences(), getEducations()]);
      setExperiences(exp);
      setEducations(edu);
    }
    load();
  }, []);

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    let updated = [...experiences];
    const exists = updated.findIndex(x => x.id === editingExp.id);
    if (exists >= 0) {
      updated[exists] = editingExp;
    } else {
      updated.push(editingExp);
    }

    setExperiences(updated);
    await saveExperiences(updated);
    setSavedMsg(true);
    setTimeout(() => {
      setSavedMsg(false);
      setEditingExp(null);
    }, 1000);
  };

  const handleDeleteExp = async (id: string) => {
    if (confirm('Delete this internship entry?')) {
      const updated = experiences.filter(x => x.id !== id);
      setExperiences(updated);
      await saveExperiences(updated);
    }
  };

  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;

    let updated = [...educations];
    const exists = updated.findIndex(x => x.id === editingEdu.id);
    if (exists >= 0) {
      updated[exists] = editingEdu;
    } else {
      updated.push(editingEdu);
    }

    setEducations(updated);
    await saveEducations(updated);
    setSavedMsg(true);
    setTimeout(() => {
      setSavedMsg(false);
      setEditingEdu(null);
    }, 1000);
  };

  return (
    <div className="space-y-12 max-w-5xl">
      {/* Header */}
      <div className="pb-6 border-b border-[#1e2025]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#ccff00]">
          Career History
        </span>
        <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white tracking-tight mt-1">
          Experience & Education Manager
        </h1>
        <p className="text-xs text-[#a1a1aa] mt-1">
          Manage your internship roles, responsibilities, degrees, and academic milestones.
        </p>
      </div>

      {savedMsg && (
        <div className="p-3.5 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center gap-2 text-xs text-[#22c55e]">
          <Check className="w-4 h-4" />
          <span>Changes saved successfully!</span>
        </div>
      )}

      {/* SECTION 1: INTERNSHIPS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#ccff00]" />
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white uppercase">
              Internships & Work Experience
            </h2>
          </div>

          <button
            onClick={() => setEditingExp({
              id: `exp-${Date.now()}`,
              company: '',
              position: 'UI/UX Design Intern',
              period: '2026',
              duration: '4 weeks',
              description: '',
              tasks: [],
              order: experiences.length + 1
            })}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Role</span>
          </button>
        </div>

        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-2xl bg-[#121316] border border-[#1e2025] flex items-start justify-between gap-4"
            >
              <div>
                <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider">
                  {exp.company}
                </span>
                <h3 className="font-['Space_Grotesk'] text-base font-bold text-white mt-0.5">
                  {exp.position}
                </h3>
                <span className="text-xs text-[#71717a] font-medium block mt-1">
                  {exp.period} {exp.duration ? `• ${exp.duration}` : ''}
                </span>

                {exp.description && (
                  <p className="mt-2 text-xs text-[#a1a1aa] leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setEditingExp(exp)}
                  className="p-2 rounded-lg bg-[#18191e] border border-[#27272a] text-[#ccff00] hover:border-[#ccff00]"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteExp(exp.id)}
                  className="p-2 rounded-lg bg-[#18191e] border border-[#27272a] text-[#ef4444] hover:bg-[#ef4444]/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: EDUCATION */}
      <div className="space-y-6 pt-6 border-t border-[#1e2025]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#ccff00]" />
            <h2 className="font-['Space_Grotesk'] text-xl font-bold text-white uppercase">
              Education & Academic Degrees
            </h2>
          </div>

          <button
            onClick={() => setEditingEdu({
              id: `edu-${Date.now()}`,
              degree: '',
              institution: '',
              period: '',
              score: '',
              order: educations.length + 1
            })}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#18191e] border border-[#27272a] text-white hover:border-[#ccff00] text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Degree</span>
          </button>
        </div>

        <div className="space-y-4">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="p-5 rounded-2xl bg-[#121316] border border-[#1e2025] flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-['Space_Grotesk'] text-sm font-bold text-white">
                  {edu.degree}
                </h3>
                <p className="text-xs text-[#a1a1aa] mt-0.5">{edu.institution}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-[#71717a]">
                  <span>{edu.period}</span>
                  {edu.score && (
                    <span className="font-semibold text-[#ccff00]">{edu.score}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingEdu(edu)}
                  className="p-2 rounded-lg bg-[#18191e] border border-[#27272a] text-[#ccff00]"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Edit Experience */}
      {editingExp && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative max-w-lg w-full bg-[#121316] border border-[#222329] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#1e2025]">
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white uppercase">
                Edit Internship
              </h3>
              <button onClick={() => setEditingExp(null)} className="text-[#a1a1aa] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveExp} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">Company</label>
                <input
                  type="text"
                  required
                  value={editingExp.company}
                  onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">Position / Role</label>
                <input
                  type="text"
                  required
                  value={editingExp.position}
                  onChange={(e) => setEditingExp({ ...editingExp, position: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">Period</label>
                  <input
                    type="text"
                    required
                    value={editingExp.period}
                    onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                    placeholder="May – June 2026"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingExp.duration || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, duration: e.target.value })}
                    placeholder="4 weeks"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingExp.description || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-5 py-2 rounded-full bg-[#18191e] text-xs text-[#a1a1aa]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Education */}
      {editingEdu && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative max-w-lg w-full bg-[#121316] border border-[#222329] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#1e2025]">
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white uppercase">
                Edit Education
              </h3>
              <button onClick={() => setEditingEdu(null)} className="text-[#a1a1aa] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveEdu} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">Degree</label>
                <input
                  type="text"
                  required
                  value={editingEdu.degree}
                  onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">Institution</label>
                <input
                  type="text"
                  required
                  value={editingEdu.institution}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">Period / Status</label>
                  <input
                    type="text"
                    required
                    value={editingEdu.period}
                    onChange={(e) => setEditingEdu({ ...editingEdu, period: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">Score / CGPA</label>
                  <input
                    type="text"
                    value={editingEdu.score || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, score: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingEdu(null)}
                  className="px-5 py-2 rounded-full bg-[#18191e] text-xs text-[#a1a1aa]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
