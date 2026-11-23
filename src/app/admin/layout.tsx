'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderGit2, 
  Award, 
  Briefcase, 
  User, 
  FileText, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { checkIsAdmin, logoutAdmin } from '@/lib/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // If on the login page, don't protect
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }

    const isAuthed = checkIsAdmin();
    if (!isAuthed) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-[#08080a] flex items-center justify-center text-[#71717a]">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#ccff00] animate-ping" />
          <span className="font-['Space_Grotesk'] text-sm tracking-wider uppercase">Loading Admin Portal...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
    { name: 'Certificates', href: '/admin/certificates', icon: Award },
    { name: 'Experience & Edu', href: '/admin/experience', icon: Briefcase },
    { name: 'Profile & Bio', href: '/admin/profile', icon: User },
    { name: 'Resume Manager', href: '/admin/resume', icon: FileText },
  ];

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-[#f4f4f5] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-[#121316] border-b border-[#222329] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-['Space_Grotesk'] font-bold text-[#ccff00] text-xl">KP</span>
          <span className="text-xs uppercase tracking-widest text-[#71717a]">Admin</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-[#1a1b20] text-white"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#101114] border-r border-[#1e2025] flex flex-col justify-between p-6 transition-transform duration-300 md:static md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & Status */}
          <div className="flex items-center justify-between pb-6 border-b border-[#1e2025]">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-['Space_Grotesk'] font-bold text-2xl text-[#ccff00]">KP</span>
              <span className="text-xs font-bold uppercase tracking-wider text-white">PORTFOLIO CMS</span>
            </Link>
          </div>

          <div className="mt-4 px-3 py-2 rounded-xl bg-[#16171b] border border-[#222329] flex items-center gap-2 text-xs text-[#a1a1aa]">
            <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
            <span>Authenticated Admin</span>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/20 font-bold'
                      : 'text-[#9496a1] hover:text-white hover:bg-[#16171b]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#71717a]'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-[#1e2025] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium text-[#a1a1aa] hover:text-[#ccff00] hover:bg-[#16171b] transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-[#ef4444] hover:bg-[#ef4444]/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 md:overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
