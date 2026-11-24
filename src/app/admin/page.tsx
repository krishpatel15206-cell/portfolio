'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FolderGit2, 
  Award, 
  Briefcase, 
  FileText, 
  Plus, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Database,
  Eye,
  Settings
} from 'lucide-react';
import { getProjects, getCertificates, getExperiences, getProfile } from '@/lib/storage';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Project, Certificate, Experience, Profile } from '@/types/portfolio';

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [supabaseReady, setSupabaseReady] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      const [proj, cert, exp, prof] = await Promise.all([
        getProjects(),
        getCertificates(),
        getExperiences(),
        getProfile(),
      ]);
      setProjects(proj);
      setCertificates(cert);
      setExperiences(exp);
      setProfile(prof);
      setSupabaseReady(isSupabaseConfigured());
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e2025]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#ccff00]">
            Admin Control Center
          </span>
          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Welcome back, Krish
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Manage your personal brand, projects, certificates, and portfolio content.
          </p>
        </div>

        {/* Database Status Pill */}
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-full bg-[#16171b] border border-[#27272a] flex items-center gap-2 text-xs">
            <span className={`w-2 h-2 rounded-full ${supabaseReady ? 'bg-[#22c55e]' : 'bg-[#eab308]'}`} />
            <span className="text-[#d4d4d8]">
              {supabaseReady ? 'Connected to Supabase' : 'Local Storage Mode (Ready to link)'}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Projects */}
        <Link
          href="/admin/projects"
          className="group p-6 rounded-2xl bg-[#121316] border border-[#1e2025] hover:border-[#ccff00]/60 hover:bg-[#15171c] transition-all cursor-pointer block hover:shadow-lg hover:shadow-black/40"
        >
          <div className="flex items-center justify-between text-[#71717a] group-hover:text-white transition-colors">
            <span className="text-xs font-semibold uppercase tracking-wider">Projects</span>
            <FolderGit2 className="w-4 h-4 text-[#ccff00]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-['Space_Grotesk'] text-3xl font-bold text-white group-hover:text-[#ccff00] transition-colors">
              {projects.length}
            </span>
            <span className="text-xs text-[#a1a1aa]">
              ({projects.filter(p => p.featured).length} featured)
            </span>
          </div>
          <div className="mt-4 text-xs font-semibold text-[#ccff00] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Manage projects</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </Link>

        {/* Certificates */}
        <Link
          href="/admin/certificates"
          className="group p-6 rounded-2xl bg-[#121316] border border-[#1e2025] hover:border-[#ccff00]/60 hover:bg-[#15171c] transition-all cursor-pointer block hover:shadow-lg hover:shadow-black/40"
        >
          <div className="flex items-center justify-between text-[#71717a] group-hover:text-white transition-colors">
            <span className="text-xs font-semibold uppercase tracking-wider">Certificates</span>
            <Award className="w-4 h-4 text-[#ccff00]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-['Space_Grotesk'] text-3xl font-bold text-white group-hover:text-[#ccff00] transition-colors">
              {certificates.length}
            </span>
            <span className="text-xs text-[#a1a1aa]">verified credentials</span>
          </div>
          <div className="mt-4 text-xs font-semibold text-[#ccff00] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Manage certificates</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </Link>

        {/* Experience Entries */}
        <Link
          href="/admin/experience"
          className="group p-6 rounded-2xl bg-[#121316] border border-[#1e2025] hover:border-[#ccff00]/60 hover:bg-[#15171c] transition-all cursor-pointer block hover:shadow-lg hover:shadow-black/40"
        >
          <div className="flex items-center justify-between text-[#71717a] group-hover:text-white transition-colors">
            <span className="text-xs font-semibold uppercase tracking-wider">Internships</span>
            <Briefcase className="w-4 h-4 text-[#ccff00]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-['Space_Grotesk'] text-3xl font-bold text-white group-hover:text-[#ccff00] transition-colors">
              {experiences.length}
            </span>
            <span className="text-xs text-[#a1a1aa]">roles listed</span>
          </div>
          <div className="mt-4 text-xs font-semibold text-[#ccff00] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Manage experience</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </Link>

        {/* CGPA Profile Field */}
        <Link
          href="/admin/profile"
          className="group p-6 rounded-2xl bg-[#121316] border border-[#1e2025] hover:border-[#ccff00]/60 hover:bg-[#15171c] transition-all cursor-pointer block hover:shadow-lg hover:shadow-black/40"
        >
          <div className="flex items-center justify-between text-[#71717a] group-hover:text-white transition-colors">
            <span className="text-xs font-semibold uppercase tracking-wider">B.Tech CGPA</span>
            <Sparkles className="w-4 h-4 text-[#ccff00]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-['Space_Grotesk'] text-3xl font-bold text-white group-hover:text-[#ccff00] transition-colors">
              {profile?.cgpa || '8.25'}
            </span>
            <span className="text-xs text-[#eab308]">Editable field</span>
          </div>
          <div className="mt-4 text-xs font-semibold text-[#ccff00] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Update profile & bio</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </Link>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="p-6 rounded-3xl bg-[#121316] border border-[#1e2025] space-y-4">
        <h3 className="font-['Space_Grotesk'] text-base font-bold text-white uppercase tracking-wider">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add New Project</span>
          </Link>

          <Link
            href="/admin/resume"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18191e] hover:bg-[#222329] border border-[#27272a] text-white text-xs font-semibold transition-all"
          >
            <FileText className="w-4 h-4 text-[#ccff00]" />
            <span>Upload New Resume</span>
          </Link>

          <Link
            href="/admin/certificates"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18191e] hover:bg-[#222329] border border-[#27272a] text-white text-xs font-semibold transition-all"
          >
            <Award className="w-4 h-4 text-[#ccff00]" />
            <span>Add Certificate</span>
          </Link>

          <Link
            href="/admin/profile"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18191e] hover:bg-[#222329] border border-[#27272a] text-white text-xs font-semibold transition-all"
          >
            <Settings className="w-4 h-4 text-[#ccff00]" />
            <span>Edit Profile & Taglines</span>
          </Link>
        </div>
      </div>

      {/* Recent Projects Table */}
      <div className="p-6 rounded-3xl bg-[#121316] border border-[#1e2025] space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#1e2025]">
          <h3 className="font-['Space_Grotesk'] text-base font-bold text-white uppercase tracking-wider">
            Current Projects
          </h3>
          <Link
            href="/admin/projects"
            className="text-xs font-semibold text-[#ccff00] hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="divide-y divide-[#1e2025]">
          {projects.slice(0, 5).map((project) => (
            <Link
              key={project.id}
              href="/admin/projects"
              className="py-3.5 px-3 -mx-3 rounded-xl flex items-center justify-between gap-4 hover:bg-[#16181f] transition-colors cursor-pointer group"
            >
              <div>
                <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white group-hover:text-[#ccff00] transition-colors">
                  {project.title}
                </h4>
                <p className="text-xs text-[#71717a]">{project.category} • {project.year}</p>
              </div>

              <div className="flex items-center gap-3">
                {project.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1c2214] text-[#ccff00] border border-[#ccff00]/30">
                    Featured
                  </span>
                )}
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  project.published ? 'bg-[#22c55e]/10 text-[#22c55e]' : 'bg-[#ef4444]/10 text-[#ef4444]'
                }`}>
                  {project.published ? 'Published' : 'Draft'}
                </span>
                <span className="text-xs text-[#71717a] group-hover:text-[#ccff00] transition-colors flex items-center gap-1 font-medium">
                  <span>Edit</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
