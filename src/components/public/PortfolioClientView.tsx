'use client';

import { useState, useEffect } from 'react';
import { 
  Project, 
  Experience, 
  Education, 
  Certificate, 
  Skill, 
  Profile 
} from '@/types/portfolio';
import { 
  getProfile, 
  getProjects, 
  getExperiences, 
  getEducations, 
  getCertificates, 
  getSkills 
} from '@/lib/storage';
import CustomCursor from '@/components/public/CustomCursor';
import ScrollAnimationManager from '@/components/public/ScrollAnimationManager';
import Navbar from '@/components/public/Navbar';
import Hero from '@/components/public/Hero';
import InfiniteMarquee from '@/components/public/InfiniteMarquee';
import SelectedWork from '@/components/public/SelectedWork';
import AboutSection from '@/components/public/AboutSection';
import ExperienceSection from '@/components/public/ExperienceSection';
import EducationSection from '@/components/public/EducationSection';
import CertificatesSection from '@/components/public/CertificatesSection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';

interface PortfolioClientViewProps {
  initialProfile: Profile;
  initialProjects: Project[];
  initialExperiences: Experience[];
  initialEducations: Education[];
  initialCertificates: Certificate[];
  initialSkills: Skill[];
}

export default function PortfolioClientView({
  initialProfile,
  initialProjects,
  initialExperiences,
  initialEducations,
  initialCertificates,
  initialSkills,
}: PortfolioClientViewProps) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [educations, setEducations] = useState<Education[]>(initialEducations);
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);

  // Sync client-side localStorage updates (e.g. newly uploaded photo or edited project)
  useEffect(() => {
    async function syncFromClient() {
      // Avoid re-renders on initial mount if no local overrides exist
      const hasLocalOverrides = 
        typeof window !== 'undefined' &&
        (localStorage.getItem('kp_portfolio_profile') ||
         localStorage.getItem('kp_portfolio_projects') ||
         localStorage.getItem('kp_portfolio_experiences') ||
         localStorage.getItem('kp_portfolio_educations') ||
         localStorage.getItem('kp_portfolio_certificates') ||
         localStorage.getItem('kp_portfolio_skills'));

      if (!hasLocalOverrides) return;

      const [p, pr, ex, ed, ce, sk] = await Promise.all([
        getProfile(),
        getProjects(),
        getExperiences(),
        getEducations(),
        getCertificates(),
        getSkills(),
      ]);
      setProfile(p);
      setProjects(pr);
      setExperiences(ex);
      setEducations(ed);
      setCertificates(ce);
      setSkills(sk);
    }

    const handleUpdate = () => {
      syncFromClient();
    };

    window.addEventListener('kp_portfolio_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('kp_portfolio_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#08080a] text-[#f4f4f5] relative selection:bg-[#ccff00] selection:text-black">
      {/* Custom magnetic interactive cursor */}
      <CustomCursor />

      {/* Creative Scroll Animation Orchestrator */}
      <ScrollAnimationManager />

      {/* Sticky Top Navbar */}
      <Navbar resumeUrl={profile.resumeUrl} />

      {/* Hero Section */}
      <Hero profile={profile} />

      {/* Infinite Animated Marquee Ribbon */}
      <InfiniteMarquee />

      {/* Selected Work (Projects) */}
      <SelectedWork projects={projects} />

      {/* About Me & Key Skills Grid */}
      <AboutSection profile={profile} skills={skills} />

      {/* Experience Section */}
      <ExperienceSection experiences={experiences} />

      {/* Education Section */}
      <EducationSection educations={educations} />

      {/* Certificates Section */}
      <CertificatesSection certificates={certificates} />

      {/* Contact Section */}
      <ContactSection profile={profile} />

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}
