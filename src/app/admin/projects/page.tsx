'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Star, 
  Eye, 
  ExternalLink, 
  Save, 
  X, 
  UploadCloud,
  FileText,
  Image as ImageIcon,
  Check,
  Layers
} from 'lucide-react';
import { getProjects, saveProjects } from '@/lib/storage';
import { Project } from '@/types/portfolio';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const screenshotsInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const p = await getProjects();
      setProjects(p);
    }
    load();
  }, []);

  const handleToggleFeatured = async (id: string) => {
    const updated = projects.map(p => p.id === id ? { ...p, featured: !p.featured } : p);
    setProjects(updated);
    await saveProjects(updated);
  };

  const handleTogglePublished = async (id: string) => {
    const updated = projects.map(p => p.id === id ? { ...p, published: !p.published } : p);
    setProjects(updated);
    await saveProjects(updated);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      await saveProjects(updated);
    }
  };

  // Upload Cover Image handler
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProject) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.url) {
          setEditingProject({
            ...editingProject,
            coverImage: data.url,
          });
          return;
        }
      } catch (err) {
        console.warn('Upload endpoint error, using local fallback:', err);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProject({
          ...editingProject,
          coverImage: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload Additional Screenshots handler
  const handleScreenshotsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && editingProject) {
      const newImages = [...(editingProject.images || [])];
      for (const file of Array.from(files)) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          const res = await fetch('/api/upload', { method: 'POST', body: formData });
          const data = await res.json();
          if (data.url) {
            newImages.push(data.url);
            continue;
          }
        } catch {
          // fallback
        }

        await new Promise<void>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            newImages.push(reader.result as string);
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
      setEditingProject({
        ...editingProject,
        images: newImages,
      });
    }
  };

  // Upload Case Study PDF handler
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProject) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.url) {
          setEditingProject({
            ...editingProject,
            caseStudyPdfUrl: data.url,
          });
          return;
        }
      } catch (err) {
        console.warn('PDF upload error, using local fallback:', err);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProject({
          ...editingProject,
          caseStudyPdfUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeScreenshot = (index: number) => {
    if (!editingProject) return;
    const updated = editingProject.images.filter((_, i) => i !== index);
    setEditingProject({ ...editingProject, images: updated });
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updatedList = [...projects];
    if (isNew) {
      updatedList.push(editingProject);
    } else {
      updatedList = updatedList.map(p => p.id === editingProject.id ? editingProject : p);
    }

    setProjects(updatedList);
    await saveProjects(updatedList);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setEditingProject(null);
    }, 1200);
  };

  const openNewProject = () => {
    setIsNew(true);
    setEditingProject({
      id: `proj-${Date.now()}`,
      slug: `project-${Date.now()}`,
      title: '',
      category: 'UI/UX Design',
      subtitle: '',
      description: '',
      coverImage: '/images/project-thrift-avenue.jpg',
      images: [],
      tags: ['UI/UX', 'Figma'],
      accentColor: '#CCFF00',
      year: '2026',
      hasCaseStudy: false,
      featured: false,
      published: true,
      order: projects.length + 1,
      fullCaseStudy: {
        overview: '',
        challenge: '',
        research: '',
        solution: '',
        features: ['Key UI Flow', 'Interactive Prototype'],
        results: '',
        learnings: '',
      }
    });
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e2025]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ccff00]">
            Portfolio Content
          </span>
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white tracking-tight mt-1">
            Projects &amp; Case Studies Manager
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Upload your real cover images, add your detailed case studies, multiple Figma screens, and links.
          </p>
        </div>

        <button
          onClick={openNewProject}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#ccff00]/20"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              setIsNew(false);
              setEditingProject(project);
            }}
            className="group p-6 rounded-2xl bg-[#121316] border border-[#1e2025] hover:border-[#ccff00]/60 hover:bg-[#15171c] hover:shadow-xl hover:shadow-black/50 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#71717a]">{project.year}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const updated = projects.map(p => p.id === project.id ? { ...p, hasCaseStudy: !p.hasCaseStudy } : p);
                      setProjects(updated);
                      saveProjects(updated);
                    }}
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded transition-colors ${
                      project.hasCaseStudy
                        ? 'bg-[#ccff00]/15 border border-[#ccff00]/40 text-[#ccff00]'
                        : 'bg-[#27272a] text-[#71717a]'
                    }`}
                    title="Click to toggle Case Study page on/off"
                  >
                    {project.hasCaseStudy ? 'Case Study ON' : 'Showcase Only'}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFeatured(project.id);
                    }}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      project.featured
                        ? 'bg-[#1c2214] border-[#ccff00]/40 text-[#ccff00]'
                        : 'bg-[#18191e] border-[#27272a] text-[#71717a]'
                    }`}
                    title={project.featured ? 'Featured Project' : 'Mark as Featured'}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePublished(project.id);
                    }}
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors ${
                      project.published
                        ? 'bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e]'
                        : 'bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444]'
                    }`}
                  >
                    {project.published ? 'Published' : 'Draft'}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#27272a] group-hover:border-[#ccff00]/40 bg-[#0c0d10] transition-colors">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs text-[#ccff00] font-medium block mt-0.5">
                    {project.category}
                  </span>
                  <p className="text-xs text-[#a1a1aa] line-clamp-2 mt-1">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Status indicators */}
              <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-[#71717a]">
                {project.caseStudyPdfUrl && (
                  <span className="px-2 py-0.5 rounded bg-[#18191e] border border-[#27272a] text-[#ccff00] flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    <span>Case Study PDF</span>
                  </span>
                )}
                {project.images && project.images.length > 0 && (
                  <span className="px-2 py-0.5 rounded bg-[#18191e] border border-[#27272a] text-[#38bdf8] flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    <span>{project.images.length} Screenshots</span>
                  </span>
                )}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-6 pt-4 border-t border-[#1e2025] flex items-center justify-between">
              <Link
                href={`/projects/${project.slug}`}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-[#71717a] hover:text-[#ccff00] flex items-center gap-1"
              >
                <span>View Case Study</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsNew(false);
                    setEditingProject(project);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#18191e] border border-[#27272a] text-xs font-semibold text-[#f4f4f5] group-hover:border-[#ccff00] flex items-center gap-1.5 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Edit Project</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(project.id);
                  }}
                  className="p-1.5 rounded-lg bg-[#18191e] border border-[#27272a] text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto">
          <div className="relative max-w-3xl w-full bg-[#121316] border border-[#222329] rounded-3xl p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-[#1e2025]">
              <div>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white uppercase">
                  {isNew ? 'Create New Project' : `Edit: ${editingProject.title}`}
                </h3>
                <p className="text-xs text-[#a1a1aa] mt-0.5">
                  Upload cover image, case study PDF, screenshots, and live Figma links
                </p>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="w-8 h-8 rounded-full bg-[#18191e] text-[#a1a1aa] hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {savedSuccess && (
              <div className="mt-4 p-3 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center gap-2 text-xs text-[#22c55e]">
                <Check className="w-4 h-4" />
                <span>Project updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveModal} className="mt-6 space-y-6">
              {/* COVER IMAGE UPLOADER */}
              <div className="p-5 rounded-2xl bg-[#16171b] border border-[#222329] space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#ccff00]" />
                    <span>Project Cover Image</span>
                  </label>
                  <span className="text-[11px] text-[#ccff00] font-semibold">Live Preview</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative w-36 h-24 rounded-xl overflow-hidden border border-[#27272a] bg-[#0c0d10] shrink-0">
                    <img
                      src={editingProject.coverImage}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <input
                      type="file"
                      ref={coverInputRef}
                      onChange={handleCoverUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => coverInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <UploadCloud className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Upload Real Cover Image</span>
                    </button>
                    <p className="text-[11px] text-[#71717a]">
                      Select any PNG or JPG screenshot from your computer.
                    </p>
                  </div>
                </div>
              </div>

              {/* MULTIPLE GALLERY SCREENSHOTS UPLOADER */}
              <div className="p-5 rounded-2xl bg-[#16171b] border border-[#222329] space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#ccff00]" />
                    <span>Multiple Case Study Screenshots / Mockups</span>
                  </label>
                  <span className="text-[11px] text-[#a1a1aa]">
                    {editingProject.images?.length || 0} images uploaded
                  </span>
                </div>

                <input
                  type="file"
                  ref={screenshotsInputRef}
                  onChange={handleScreenshotsUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => screenshotsInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e2025] hover:bg-[#252830] border border-[#2d3039] text-[#ccff00] text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <UploadCloud className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>+ Upload Multiple Screenshots</span>
                </button>

                {/* Screenshots Thumbnails */}
                {editingProject.images && editingProject.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                    {editingProject.images.map((img, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden border border-[#27272a] h-20 bg-[#0c0d10]">
                        <img src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeScreenshot(idx)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-black/80 text-white hover:text-[#ef4444] opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove image"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CASE STUDY PDF / EXTERNAL PRESENTATION */}
              <div className="p-5 rounded-2xl bg-[#16171b] border border-[#222329] space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#ccff00]" />
                    <span>Detailed Case Study Document / Presentation</span>
                  </label>
                  <span className="text-[11px] text-[#71717a]">PDF or Link</span>
                </div>

                <div className="space-y-3">
                  <input
                    type="file"
                    ref={pdfInputRef}
                    onChange={handlePdfUpload}
                    accept=".pdf"
                    className="hidden"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => pdfInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e2025] hover:bg-[#252830] border border-[#2d3039] text-white text-xs font-semibold"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>{editingProject.caseStudyPdfUrl ? 'Replace Case Study PDF' : 'Upload Case Study PDF'}</span>
                    </button>
                    {editingProject.caseStudyPdfUrl && (
                      <span className="text-xs text-[#ccff00] font-mono">PDF Loaded</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#71717a] mb-1">
                      Or Paste Case Study Link (Behance / Medium / Notion / Google Drive):
                    </label>
                    <input
                      type="url"
                      value={editingProject.caseStudyExternalUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, caseStudyExternalUrl: e.target.value })}
                      placeholder="https://behance.net/gallery/..."
                      className="w-full px-4 py-2 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-xs focus:border-[#ccff00] focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Has Case Study Toggle */}
              <div className="p-4 rounded-xl bg-[#18191e] border border-[#27272a] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white uppercase block">Enable Dedicated Case Study Page</span>
                  <span className="text-[11px] text-[#71717a]">
                    Turn ON if you have uploaded a case study story/PDF. Turn OFF to make it a showcase card only.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProject({ ...editingProject, hasCaseStudy: !editingProject.hasCaseStudy })}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    editingProject.hasCaseStudy
                      ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/20'
                      : 'bg-[#27272a] text-[#a1a1aa]'
                  }`}
                >
                  {editingProject.hasCaseStudy ? 'Case Study: ACTIVE' : 'Case Study: DISABLED'}
                </button>
              </div>

              {/* Category & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                  Subtitle / Summary (1-2 sentences)
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.subtitle}
                  onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
                />
              </div>

              {/* External Links: Figma & GitHub & Behance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                    Figma Prototype Link
                  </label>
                  <input
                    type="url"
                    value={editingProject.figmaUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, figmaUrl: e.target.value })}
                    placeholder="https://figma.com/file/..."
                    className="w-full px-4 py-2 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-xs focus:border-[#ccff00] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-xs focus:border-[#ccff00] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                    Behance Link
                  </label>
                  <input
                    type="url"
                    value={editingProject.behanceUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, behanceUrl: e.target.value })}
                    placeholder="https://behance.net/..."
                    className="w-full px-4 py-2 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-xs focus:border-[#ccff00] focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Case Study Written Narrative */}
              <div className="pt-4 border-t border-[#1e2025] space-y-4">
                <h4 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-[#ccff00]">
                  Case Study Written Narrative (Legit Project Details)
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] mb-1">
                    Overview Narrative
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.fullCaseStudy?.overview || ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      fullCaseStudy: {
                        ...(editingProject.fullCaseStudy || {
                          overview: '', challenge: '', solution: '', features: [], results: '', learnings: ''
                        }),
                        overview: e.target.value
                      }
                    })}
                    placeholder="Explain the background and what this project was designed to achieve..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] mb-1">
                    The Problem &amp; User Research
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.fullCaseStudy?.challenge || ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      fullCaseStudy: {
                        ...(editingProject.fullCaseStudy || {
                          overview: '', challenge: '', solution: '', features: [], results: '', learnings: ''
                        }),
                        challenge: e.target.value
                      }
                    })}
                    placeholder="What problem were users facing? What were your user research insights?"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] mb-1">
                    The Design Solution &amp; Wireframing
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.fullCaseStudy?.solution || ''}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      fullCaseStudy: {
                        ...(editingProject.fullCaseStudy || {
                          overview: '', challenge: '', solution: '', features: [], results: '', learnings: ''
                        }),
                        solution: e.target.value
                      }
                    })}
                    placeholder="How did you solve it in Figma? Talk about your visual hierarchy, components, and design system..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-[#1e2025] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-5 py-2.5 rounded-full bg-[#18191e] text-xs font-semibold text-[#a1a1aa] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
