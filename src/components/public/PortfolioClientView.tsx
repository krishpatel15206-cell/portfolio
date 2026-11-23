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
import SelectedWork from '@/components/public/SelectedWork';
import AboutSection from '@/components/public/AboutSection';
import ExperienceEducationCerts from '@/components/public/ExperienceEducationCerts';
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

    syncFromClient();

    const handleUpdate = () => {
      syncFromClient();
    };

    window.addEventListener('kp_portfolio_updated', handleUpdate);
    return () => window.removeEventListener('kp_portfolio_updated', handleUpdate);
  }, []);

  return (
    <main className="min-h-screen bg-[#08080a] text-[#f4f4f5] relative selection:bg-[#ccff00] selection:text-black">
      {/* Custom magnetic interactive cursor */}
      <CustomCursor />

      {/* GSAP Scroll-Triggered Pop-Up & Stagger Orchestrator */}
      <ScrollAnimationManager />

      {/* Sticky Top Navbar */}
      <Navbar resumeUrl={profile.resumeUrl} />

      {/* Hero Section */}
      <Hero profile={profile} />

      {/* Selected Work (Projects) */}
      <SelectedWork projects={projects} />

      {/* About Me & Key Skills Grid */}
      <AboutSection profile={profile} skills={skills} />

      {/* 3-Column Experience, Education & Certificates */}
      <ExperienceEducationCerts
        experiences={experiences}
        educations={educations}
        certificates={certificates}
      />

      {/* Contact Section */}
      <ContactSection profile={profile} />

      {/* Minimal Footer */}
      <Footer />
    </main>
  );
}
