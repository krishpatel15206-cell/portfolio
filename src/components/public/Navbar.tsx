'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';

interface NavbarProps {
  resumeUrl?: string;
}

export default function Navbar({ resumeUrl = '/resume.pdf' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // If near bottom of the page, activate contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('contact');
        return;
      }

      // Detect active section
      const sectionOrder = [
        { id: 'contact', navId: 'contact' },
        { id: 'certificates', navId: 'certificates' },
        { id: 'education', navId: 'experience' },
        { id: 'experience', navId: 'experience' },
        { id: 'about', navId: 'about' },
        { id: 'work', navId: 'work' },
        { id: 'hero', navId: 'hero' },
      ];

      for (const section of sectionOrder) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 100) {
            setActiveSection(section.navId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work', id: 'work' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Certificates', href: '#certificates', id: 'certificates' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08080a]/85 backdrop-blur-md border-b border-[#222329]/60 py-3.5 shadow-lg shadow-black/40'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo KP */}
          <Link
            href="/"
            className="group flex items-center gap-1.5 focus:outline-none"
          >
            <span className="font-['Space_Grotesk'] text-2xl font-bold tracking-tighter text-[#ccff00] group-hover:scale-105 transition-transform duration-200">
              KP
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#ccff00] opacity-80 group-hover:animate-ping" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`transition-colors duration-200 hover:text-[#ccff00] relative py-1 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#9496a1]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Resume Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#ccff00]/15 hover:shadow-[#ccff00]/30 hover:scale-105 active:scale-95"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#16171b] border border-[#222329] text-[#f4f4f5] hover:text-[#ccff00] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#08080a]/98 backdrop-blur-xl md:hidden flex flex-col justify-center px-8 py-20 transition-all duration-300">
          <div className="space-y-6 text-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <div key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`text-2xl font-bold tracking-tight block py-2 ${
                      isActive ? 'text-[#ccff00]' : 'text-[#d4d4d8]'
                    }`}
                  >
                    {link.name}
                  </a>
                </div>
              );
            })}
            <div className="pt-8">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#ccff00] text-black font-bold text-sm uppercase tracking-wider"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
