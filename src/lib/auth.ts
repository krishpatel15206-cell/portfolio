'use client';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const DEMO_EMAIL = process.env.NEXT_PUBLIC_ADMIN_DEMO_EMAIL || 'admin@krishpatel.design';
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_DEMO_PASSWORD || 'krishpatel2026';
const AUTH_KEY = 'kp_admin_authenticated';

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  // If Supabase is configured, use Supabase Auth
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.session) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(AUTH_KEY, 'true');
        }
        return { success: true };
      }
      return { success: false, error: error?.message || 'Invalid credentials' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Authentication failed' };
    }
  }

  // Fallback Demo Auth for local testing & development
  if (email.trim() === DEMO_EMAIL && password === DEMO_PASSWORD) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(AUTH_KEY, 'true');
    }
    return { success: true };
  }

  return { success: false, error: 'Invalid credentials. Default: admin@krishpatel.design / krishpatel2026' };
}

export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(AUTH_KEY);
  }
  if (isSupabaseConfigured() && supabase) {
    supabase.auth.signOut();
  }
}

export function checkIsAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}
