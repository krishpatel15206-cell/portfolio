'use client';

import { useState, useEffect } from 'react';
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
  Sparkles,
  Check
} from 'lucide-react';
import { getProjects, saveProjects } from '@/lib/storage';
import { Project } from '@/types/portfolio';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

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
      images: ['/images/project-thrift-avenue.jpg'],
      tags: ['UI/UX', 'Figma'],
      accentColor: '#CCFF00',
      year: '2026',
      featured: false,
      published: true,
      order: projects.length + 1,
      fullCaseStudy: {
        overview: '',
        challenge: '',
        research: '',
        solution: '',
        features: ['Feature 1', 'Feature 2'],
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
            Projects Manager
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Create, edit, replace placeholder mockups with your real designs, and manage case studies.
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
            className="p-6 rounded-2xl bg-[#121316] border border-[#1e2025] hover:border-[#2d3039] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#71717a]">{project.year}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleFeatured(project.id)}
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
                    onClick={() => handleTogglePublished(project.id)}
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
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#27272a] bg-[#0c0d10]">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
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

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[#18191e] text-[#8e909a]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-6 pt-4 border-t border-[#1e2025] flex items-center justify-between">
              <Link
                href={`/projects/${project.slug}`}
                target="_blank"
                className="text-xs text-[#71717a] hover:text-[#ccff00] flex items-center gap-1"
              >
                <span>View Live</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsNew(false);
                    setEditingProject(project);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#18191e] border border-[#27272a] text-xs font-semibold text-[#f4f4f5] hover:border-[#ccff00] flex items-center gap-1.5"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-1.5 rounded-lg bg-[#18191e] border border-[#27272a] text-[#ef4444] hover:bg-[#ef4444]/10"
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
                  Update project metadata, links, screenshots, and case study
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
                  Subtitle / Summary
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.subtitle}
                  onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                  Cover Image URL / Path
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.coverImage}
                  onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                    Figma Prototype Link
                  </label>
                  <input
                    type="url"
                    value={editingProject.figmaUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, figmaUrl: e.target.value })}
                    placeholder="https://figma.com/file/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] uppercase mb-1">
                    GitHub Link (optional)
                  </label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Case Study Section */}
              <div className="pt-4 border-t border-[#1e2025] space-y-4">
                <h4 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-[#ccff00]">
                  Case Study Narrative
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
                    className="w-full px-4 py-2.5 rounded-xl bg-[#18191e] border border-[#27272a] text-white text-sm focus:border-[#ccff00] focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a1a1aa] mb-1">
                    Challenge & Problem Statement
                  </label>
                  <textarea
                    rows={2}
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
