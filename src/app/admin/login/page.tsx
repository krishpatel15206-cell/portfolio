'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { loginAdmin } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await loginAdmin(email, password);
    setLoading(false);

    if (res.success) {
      router.push('/admin');
    } else {
      setError(res.error || 'Login failed. Please verify credentials.');
    }
  };

  const handleUseDemo = () => {
    setEmail('admin@krishpatel.design');
    setPassword('krishpatel2026');
  };

  return (
    <div className="min-h-screen bg-[#08080a] flex items-center justify-center p-6 selection:bg-[#ccff00] selection:text-black">
      {/* Background glow */}
      <div className="absolute w-[450px] h-[450px] bg-[#ccff00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-md w-full bg-[#121316] border border-[#222329] rounded-3xl p-8 sm:p-10 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2 pb-6 border-b border-[#1e2025]">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#1c2214] border border-[#ccff00]/40 flex items-center justify-center text-[#ccff00] shadow-lg shadow-[#ccff00]/10">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">
            Admin Access Portal
          </h1>
          <p className="text-xs text-[#71717a]">
            Restricted CMS for Krish Patel to manage content, projects & assets.
          </p>
        </div>

        {error && (
          <div className="mt-6 p-3.5 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/30 flex items-center gap-2.5 text-xs text-[#ef4444]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@krishpatel.design"
              className="w-full px-4 py-3 rounded-xl bg-[#16171b] border border-[#27272a] text-white text-sm placeholder-[#52525b] focus:outline-none focus:border-[#ccff00] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#16171b] border border-[#27272a] text-white text-sm placeholder-[#52525b] focus:outline-none focus:border-[#ccff00] transition-colors"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#ccff00]/20 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </form>

        {/* Quick Demo Credentials Fill Button */}
        <div className="mt-8 pt-6 border-t border-[#1e2025] flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleUseDemo}
            className="inline-flex items-center gap-1.5 text-xs text-[#ccff00] hover:underline"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Click to fill local testing credentials</span>
          </button>

          <Link
            href="/"
            className="text-xs text-[#71717a] hover:text-white transition-colors"
          >
            ← Return to Public Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
