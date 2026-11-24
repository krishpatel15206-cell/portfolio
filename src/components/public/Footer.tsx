'use client';

import Link from 'next/link';
import { ArrowUp, Lock, Mail } from 'lucide-react';

interface FooterProps {
  email?: string;
}

export default function Footer({ email = 'krishpatel15206@gmail.com' }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#222329]/50 bg-[#08080a] py-12 px-6 sm:px-8 text-xs text-[#71717a]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-['Space_Grotesk'] font-bold text-white tracking-wider">
            KRISH PATEL
          </span>
          <span>•</span>
          <span>UI/UX Designer</span>
          <span>•</span>
          <span>Gujarat, India</span>
          <span>•</span>
          <a
            href={`mailto:${email}`}
            className="text-[#a1a1aa] hover:text-[#ccff00] transition-colors flex items-center gap-1.5 font-mono"
            title={`Email ${email}`}
          >
            <Mail className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>{email}</span>
          </a>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-[#52525b] hover:text-[#ccff00] transition-colors"
          >
            <Lock className="w-3 h-3" />
            <span>Admin Portal</span>
          </Link>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
