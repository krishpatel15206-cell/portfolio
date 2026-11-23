import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  Tag, 
  Sparkles,
  FileText,
  Download
} from 'lucide-react';
import { getProjects } from '@/lib/storage';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import CustomCursor from '@/components/public/CustomCursor';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects
    .filter((project) => project.hasCaseStudy)
    .map((project) => ({
      slug: project.slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return { title: 'Project Not Found | Krish Patel' };

  return {
    title: `${project.title} — Case Study | Krish Patel`,
    description: project.subtitle,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = await getProjects();
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];

  // ONLY cycle between projects that actually have a case study!
  const caseStudyProjects = projects.filter((p) => p.hasCaseStudy);
  const currentCaseIndex = caseStudyProjects.findIndex((p) => p.slug === slug);
  const nextCaseStudy = caseStudyProjects.length > 1
    ? caseStudyProjects[(currentCaseIndex + 1) % caseStudyProjects.length]
    : null;

  return (
    <main className="min-h-screen bg-[#08080a] text-[#f4f4f5] selection:bg-[#ccff00] selection:text-black">
      <CustomCursor />
      <Navbar />

      {/* Case Study Hero */}
      <section className="pt-32 pb-16 px-6 sm:px-8 max-w-5xl mx-auto">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#71717a] hover:text-[#ccff00] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>

        {/* Category & Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ccff00]">
            {project.category}
          </span>
          <span className="text-[#3f3f46]">•</span>
          <span className="text-xs text-[#a1a1aa] font-mono">{project.year}</span>
        </div>

        {/* Project Title */}
        <h1 className="font-['Space_Grotesk'] text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-[0.98]">
          {project.title}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#a1a1aa] leading-relaxed max-w-3xl">
          {project.subtitle}
        </p>

        {/* Action Buttons: Figma, PDF Case Study, Behance */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {project.figmaUrl && (
            <a
              href={project.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#ccff00]/20"
            >
              <span>Open in Figma</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          )}

          {project.caseStudyPdfUrl && (
            <a
              href={project.caseStudyPdfUrl}
              download={`${project.slug}-case-study.pdf`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#18191e] hover:bg-[#222329] border border-[#27272a] text-[#ccff00] font-semibold text-xs transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Download Detailed Case Study (PDF)</span>
            </a>
          )}

          {project.caseStudyExternalUrl && (
            <a
              href={project.caseStudyExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#18191e] hover:bg-[#222329] border border-[#27272a] text-white font-semibold text-xs transition-all"
            >
              <span>View In-Depth Presentation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Metadata Grid (Role, Timeline, Category, Links) */}
        <div className="mt-12 pt-8 border-t border-[#222329] grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a] block">
              Role
            </span>
            <span className="text-sm font-bold text-white mt-1 block">
              UI/UX &amp; Design
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a] block">
              Timeline
            </span>
            <span className="text-sm font-bold text-white mt-1 block">
              {project.year}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a] block">
              Category
            </span>
            <span className="text-sm font-bold text-white mt-1 block">
              {project.category}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a] block">
              Repositories / Live
            </span>
            <div className="flex items-center gap-3 mt-1">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#38bdf8] hover:underline flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              ) : (
                <span className="text-xs text-[#71717a]">Design Project</span>
              )}
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative mt-12 w-full h-[360px] sm:h-[480px] md:h-[560px] rounded-3xl overflow-hidden border border-[#222329] bg-[#121316] shadow-2xl">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Narrative Case Study Body */}
      <section className="py-12 px-6 sm:px-8 max-w-4xl mx-auto space-y-16">
        {project.fullCaseStudy && (
          <>
            {/* Overview */}
            {project.fullCaseStudy.overview && (
              <div className="space-y-4">
                <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white uppercase flex items-center gap-2">
                  <span className="w-2 h-6 bg-[#ccff00] rounded-full inline-block" />
                  <span>Project Overview</span>
                </h2>
                <p className="text-base sm:text-lg text-[#d4d4d8] leading-relaxed">
                  {project.fullCaseStudy.overview}
                </p>
              </div>
            )}

            {/* The Challenge / Problem */}
            {project.fullCaseStudy.challenge && (
              <div className="p-8 rounded-3xl bg-[#121316] border border-[#222329] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ccff00]">
                  Problem &amp; Context
                </span>
                <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-white">
                  Design Challenge &amp; Research
                </h3>
                <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
                  {project.fullCaseStudy.challenge}
                </p>
              </div>
            )}

            {/* Solution & Process */}
            {project.fullCaseStudy.solution && (
              <div className="space-y-6">
                <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white uppercase flex items-center gap-2">
                  <span className="w-2 h-6 bg-[#ccff00] rounded-full inline-block" />
                  <span>The Design Solution &amp; Wireframing</span>
                </h2>
                <p className="text-base text-[#d4d4d8] leading-relaxed">
                  {project.fullCaseStudy.solution}
                </p>
              </div>
            )}
          </>
        )}

        {/* Gallery Screenshots (if user uploaded multiple mockups) */}
        {project.images && project.images.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-[#222329]">
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white uppercase flex items-center gap-2">
              <span className="w-2 h-6 bg-[#ccff00] rounded-full inline-block" />
              <span>Project Visuals &amp; Screens</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.images.map((img, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-[#27272a] bg-[#121316] shadow-xl">
                  <img src={img} alt={`${project.title} Screen ${idx + 1}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="pt-8 border-t border-[#222329] flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#16171b] border border-[#27272a] text-[#a1a1aa]"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Next Project Footer Bar (Only links to projects with an actual case study) */}
      <section className="py-20 px-6 sm:px-8 border-t border-[#222329] bg-[#0c0d10]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          {nextCaseStudy ? (
            <>
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#71717a]">
                  Next Case Study
                </span>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white mt-1">
                  {nextCaseStudy.title}
                </h3>
                <span className="text-xs text-[#ccff00] font-medium">
                  {nextCaseStudy.category}
                </span>
              </div>

              <Link
                href={`/projects/${nextCaseStudy.slug}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>View Next Case Study</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </>
          ) : (
            <>
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#71717a]">
                  Portfolio Works
                </span>
                <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white mt-1">
                  Explore More Projects
                </h3>
                <span className="text-xs text-[#ccff00] font-medium">
                  Selected UI/UX &amp; Engineering Work
                </span>
              </div>

              <Link
                href="/#work"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>Back to All Projects</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
