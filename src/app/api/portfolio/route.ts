import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { 
  initialProfile, 
  initialProjects, 
  initialExperiences, 
  initialEducations, 
  initialCertificates, 
  initialSkills, 
  initialSiteSettings 
} from '@/lib/data/initialData';

const DATA_FILE = path.join(process.cwd(), 'src', 'lib', 'data', 'portfolio-data.json');

function readPortfolioData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading portfolio-data.json:', err);
  }

  return {
    profile: initialProfile,
    projects: initialProjects,
    experiences: initialExperiences,
    educations: initialEducations,
    certificates: initialCertificates,
    skills: initialSkills,
    settings: initialSiteSettings,
  };
}

function writePortfolioData(data: any) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const data = readPortfolioData();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = readPortfolioData();

    if (body.type && body.data) {
      current[body.type] = body.data;
    } else {
      Object.assign(current, body);
    }

    writePortfolioData(current);
    return NextResponse.json({ success: true, data: current });
  } catch (err: any) {
    console.error('Error saving portfolio data:', err);
    return NextResponse.json({ error: err.message || 'Failed to save' }, { status: 500 });
  }
}
