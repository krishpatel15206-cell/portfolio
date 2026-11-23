-- ========================================================
-- KRISH PATEL PORTFOLIO DATABASE SCHEMA & RLS POLICIES
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard)
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY DEFAULT '1',
  full_name TEXT NOT NULL DEFAULT 'Krish Patel',
  title TEXT NOT NULL DEFAULT 'UI/UX Designer • Computer Science & Design Student',
  tagline TEXT NOT NULL DEFAULT 'Designing digital experiences that are intuitive, engaging and meaningful.',
  alternative_hero TEXT NOT NULL DEFAULT 'Good design isn''t just how it looks. It''s how it works, feels and connects.',
  bio_paragraphs JSONB NOT NULL DEFAULT '[]'::jsonb,
  location TEXT NOT NULL DEFAULT 'Gujarat, India',
  email TEXT NOT NULL DEFAULT 'krishpatel.design@gmail.com',
  phone TEXT DEFAULT '+91 98765 43210',
  linkedin TEXT DEFAULT 'https://linkedin.com/in/krishpatel-design',
  github TEXT DEFAULT 'https://github.com/krishpatel',
  figma TEXT DEFAULT 'https://figma.com/@krishpatel',
  cgpa TEXT DEFAULT '8.25',
  diploma_cgpa TEXT DEFAULT '7.51/10',
  ssc_cgpa TEXT DEFAULT '75.66%',
  avatar_url TEXT DEFAULT '/images/krish-hero-crop.png',
  resume_url TEXT DEFAULT '/resume.pdf',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  full_case_study JSONB,
  cover_image TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  accent_color TEXT DEFAULT '#CCFF00',
  client TEXT,
  year TEXT NOT NULL DEFAULT '2026',
  figma_url TEXT,
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  period TEXT NOT NULL,
  duration TEXT,
  description TEXT,
  tasks JSONB DEFAULT '[]'::jsonb,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EDUCATIONS TABLE
CREATE TABLE IF NOT EXISTS public.educations (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  period TEXT NOT NULL,
  score TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT,
  grade TEXT,
  image_url TEXT NOT NULL,
  credential_url TEXT,
  pdf_url TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Public can read profile, experience, education, certificates
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public experiences are viewable by everyone" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public educations are viewable by everyone" ON public.educations FOR SELECT USING (true);
CREATE POLICY "Public certificates are viewable by everyone" ON public.certificates FOR SELECT USING (true);

-- Public can only read published projects
CREATE POLICY "Published projects are viewable by everyone" ON public.projects FOR SELECT USING (published = true);

-- Authenticated users (admin) have full CRUD access
CREATE POLICY "Admin full access on profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on educations" ON public.educations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on certificates" ON public.certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 7. STORAGE BUCKET FOR PORTFOLIO ASSETS
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can view images
CREATE POLICY "Public Access to portfolio-assets" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio-assets');

-- Storage RLS: Authenticated Admin can upload/delete
CREATE POLICY "Authenticated users can upload assets" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-assets');

CREATE POLICY "Authenticated users can update assets" ON storage.objects
FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Authenticated users can delete assets" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'portfolio-assets');

-- 8. INITIAL PROFILE SEED
INSERT INTO public.profiles (
  id, full_name, title, tagline, alternative_hero, bio_paragraphs, location, email, cgpa, diploma_cgpa, ssc_cgpa
) VALUES (
  '1',
  'Krish Patel',
  'UI/UX Designer • Computer Science & Design Student',
  'Designing digital experiences that are intuitive, engaging and meaningful.',
  'Good design isn''t just how it looks. It''s how it works, feels and connects.',
  '[
    "I''m Krish Patel, a Computer Science and Design student passionate about UI/UX design, visual storytelling and creating user-friendly digital experiences.",
    "I enjoy transforming ideas into visually engaging and intuitive interfaces. My interests include interface design, wireframing, prototyping, visual storytelling and creating user-friendly digital products.",
    "With a background in computer science, I also understand the technical side of digital products, allowing me to connect design thinking with practical implementation.",
    "I''m continuously learning, experimenting with design tools and building projects to improve my creative and technical skills."
  ]'::jsonb,
  'Gujarat, India',
  'krishpatel.design@gmail.com',
  '8.25',
  '7.51/10',
  '75.66%'
) ON CONFLICT (id) DO UPDATE SET updated_at = NOW();
