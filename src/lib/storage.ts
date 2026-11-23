import { 
  Project, 
  Experience, 
  Education, 
  Certificate, 
  Skill, 
  Profile, 
  SiteSettings 
} from '@/types/portfolio';
import { 
  initialProfile, 
  initialProjects, 
  initialExperiences, 
  initialEducations, 
  initialCertificates, 
  initialSkills, 
  initialSiteSettings 
} from '@/lib/data/initialData';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const STORAGE_KEYS = {
  PROFILE: 'kp_portfolio_profile',
  PROJECTS: 'kp_portfolio_projects',
  EXPERIENCES: 'kp_portfolio_experiences',
  EDUCATIONS: 'kp_portfolio_educations',
  CERTIFICATES: 'kp_portfolio_certificates',
  SKILLS: 'kp_portfolio_skills',
  SETTINGS: 'kp_portfolio_settings'
};

// Helper for client-side local storage safely
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('kp_portfolio_updated'));
  } catch (e) {
    console.warn(`Error writing ${key} to localStorage`, e);
  }
}

// ---------------- PROFILE ----------------
export async function getProfile(): Promise<Profile> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('profiles').select('*').single();
      if (!error && data) {
        return {
          fullName: data.full_name || initialProfile.fullName,
          title: data.title || initialProfile.title,
          tagline: data.tagline || initialProfile.tagline,
          alternativeHero: data.alternative_hero || initialProfile.alternativeHero,
          bioParagraphs: data.bio_paragraphs || initialProfile.bioParagraphs,
          location: data.location || initialProfile.location,
          email: data.email || initialProfile.email,
          phone: data.phone || initialProfile.phone,
          linkedin: data.linkedin || initialProfile.linkedin,
          github: data.github || initialProfile.github,
          figma: data.figma || initialProfile.figma,
          cgpa: data.cgpa || initialProfile.cgpa,
          diplomaCgpa: data.diploma_cgpa || initialProfile.diplomaCgpa,
          sscCgpa: data.ssc_cgpa || initialProfile.sscCgpa,
          avatarUrl: data.avatar_url || initialProfile.avatarUrl,
          resumeUrl: data.resume_url || initialProfile.resumeUrl,
          lastUpdated: data.updated_at || new Date().toISOString()
        };
      }
    } catch (err) {
      console.warn('Supabase fetch profile failed, using local/default:', err);
    }
  }
  return getLocalItem<Profile>(STORAGE_KEYS.PROFILE, initialProfile);
}

export async function saveProfile(profile: Profile): Promise<boolean> {
  setLocalItem(STORAGE_KEYS.PROFILE, profile);
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: '1',
        full_name: profile.fullName,
        title: profile.title,
        tagline: profile.tagline,
        alternative_hero: profile.alternativeHero,
        bio_paragraphs: profile.bioParagraphs,
        location: profile.location,
        email: profile.email,
        phone: profile.phone,
        linkedin: profile.linkedin,
        github: profile.github,
        figma: profile.figma,
        cgpa: profile.cgpa,
        diploma_cgpa: profile.diplomaCgpa,
        ssc_cgpa: profile.sscCgpa,
        avatar_url: profile.avatarUrl,
        resume_url: profile.resumeUrl,
        updated_at: new Date().toISOString()
      });
      return !error;
    } catch (err) {
      console.error('Supabase save profile failed:', err);
    }
  }
  return true;
}

// ---------------- PROJECTS ----------------
export async function getProjects(): Promise<Project[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          category: item.category,
          subtitle: item.subtitle,
          description: item.description,
          fullCaseStudy: item.full_case_study,
          coverImage: item.cover_image,
          images: item.images || [],
          tags: item.tags || [],
          accentColor: item.accent_color || '#CCFF00',
          client: item.client,
          year: item.year,
          figmaUrl: item.figma_url,
          liveUrl: item.live_url,
          githubUrl: item.github_url,
          featured: item.featured ?? false,
          published: item.published ?? true,
          order: item.order || 0
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch projects failed, using local/default:', err);
    }
  }
  return getLocalItem<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
}

export async function saveProjects(projects: Project[]): Promise<boolean> {
  setLocalItem(STORAGE_KEYS.PROJECTS, projects);
  if (isSupabaseConfigured() && supabase) {
    try {
      for (const p of projects) {
        await supabase.from('projects').upsert({
          id: p.id,
          slug: p.slug,
          title: p.title,
          category: p.category,
          subtitle: p.subtitle,
          description: p.description,
          full_case_study: p.fullCaseStudy,
          cover_image: p.coverImage,
          images: p.images,
          tags: p.tags,
          accent_color: p.accentColor,
          client: p.client,
          year: p.year,
          figma_url: p.figmaUrl,
          live_url: p.liveUrl,
          github_url: p.githubUrl,
          featured: p.featured,
          published: p.published,
          order: p.order,
          updated_at: new Date().toISOString()
        });
      }
      return true;
    } catch (err) {
      console.error('Supabase save projects failed:', err);
    }
  }
  return true;
}

export async function saveProject(project: Project): Promise<boolean> {
  const all = await getProjects();
  const index = all.findIndex(p => p.id === project.id);
  if (index >= 0) {
    all[index] = project;
  } else {
    all.push(project);
  }
  return saveProjects(all);
}

export async function deleteProject(id: string): Promise<boolean> {
  const all = await getProjects();
  const filtered = all.filter(p => p.id !== id);
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch (err) {
      console.error('Supabase delete project failed:', err);
    }
  }
  return saveProjects(filtered);
}

// ---------------- EXPERIENCES ----------------
export async function getExperiences(): Promise<Experience[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('experiences').select('*').order('order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          company: d.company,
          position: d.position,
          period: d.period,
          duration: d.duration,
          description: d.description,
          tasks: d.tasks || [],
          order: d.order
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch experience failed', e);
    }
  }
  return getLocalItem<Experience[]>(STORAGE_KEYS.EXPERIENCES, initialExperiences);
}

export async function saveExperiences(experiences: Experience[]): Promise<boolean> {
  setLocalItem(STORAGE_KEYS.EXPERIENCES, experiences);
  return true;
}

// ---------------- EDUCATIONS ----------------
export async function getEducations(): Promise<Education[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('educations').select('*').order('order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          degree: d.degree,
          institution: d.institution,
          period: d.period,
          score: d.score,
          order: d.order
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch education failed', e);
    }
  }
  return getLocalItem<Education[]>(STORAGE_KEYS.EDUCATIONS, initialEducations);
}

export async function saveEducations(educations: Education[]): Promise<boolean> {
  setLocalItem(STORAGE_KEYS.EDUCATIONS, educations);
  return true;
}

// ---------------- CERTIFICATES ----------------
export async function getCertificates(): Promise<Certificate[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('certificates').select('*').order('order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((c: any) => ({
          id: c.id,
          title: c.title,
          issuer: c.issuer,
          issueDate: c.issue_date,
          grade: c.grade,
          imageUrl: c.image_url,
          credentialUrl: c.credential_url,
          pdfUrl: c.pdf_url,
          order: c.order
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch certificates failed', e);
    }
  }
  return getLocalItem<Certificate[]>(STORAGE_KEYS.CERTIFICATES, initialCertificates);
}

export async function saveCertificates(certificates: Certificate[]): Promise<boolean> {
  setLocalItem(STORAGE_KEYS.CERTIFICATES, certificates);
  return true;
}

// ---------------- SKILLS ----------------
export async function getSkills(): Promise<Skill[]> {
  return getLocalItem<Skill[]>(STORAGE_KEYS.SKILLS, initialSkills);
}

export async function saveSkills(skills: Skill[]): Promise<boolean> {
  setLocalItem(STORAGE_KEYS.SKILLS, skills);
  return true;
}

// ---------------- SITE SETTINGS ----------------
export async function getSiteSettings(): Promise<SiteSettings> {
  return getLocalItem<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings);
}

export async function saveSiteSettings(settings: SiteSettings): Promise<boolean> {
  setLocalItem(STORAGE_KEYS.SETTINGS, settings);
  return true;
}
