import { 
  getProfile, 
  getProjects, 
  getExperiences, 
  getEducations, 
  getCertificates, 
  getSkills 
} from '@/lib/storage';
import PortfolioClientView from '@/components/public/PortfolioClientView';

export default async function HomePage() {
  const [profile, projects, experiences, educations, certificates, skills] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperiences(),
    getEducations(),
    getCertificates(),
    getSkills(),
  ]);

  return (
    <PortfolioClientView
      initialProfile={profile}
      initialProjects={projects}
      initialExperiences={experiences}
      initialEducations={educations}
      initialCertificates={certificates}
      initialSkills={skills}
    />
  );
}
