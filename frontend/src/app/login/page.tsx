'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { UserRole } from '@/types';
import { Sprout, Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isDemoMode } = useAuth();
  const [emailOrMobile, setEmailOrMobile] = useState('farmer@agrivision.ai');
  const [password, setPassword] = useState('farmer123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email_or_mobile: emailOrMobile, password })
    });

    if (res?.access_token) {
      login(res.access_token, res.user);
      router.push('/dashboard');
    } else {
      // Demo Mode login fallback
      login('demo-jwt-token', {
        id: 1,
        full_name: selectedRole === 'operator' ? 'Amit Singh (Pilot)' : selectedRole === 'expert' ? 'Dr. Ananya Sharma' : selectedRole === 'admin' ? 'System Admin' : 'Rahul Kumar',
        email: emailOrMobile,
        mobile_number: '+919876543210',
        role: selectedRole,
        preferred_language: 'hi',
        state: 'Bihar',
        district: 'Patna',
        village: 'Bihta'
      });
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 mx-auto flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-950/50">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Welcome Back to AgriVision</h2>
          <p className="text-slate-400 text-xs">Login to access farm health scans, AI advisories, and drone bookings.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Role Selection Tabs */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Select Your Role:</label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['farmer', 'operator', 'expert'] as UserRole[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => {
                    setSelectedRole(r);
                    if (r === 'operator') setEmailOrMobile('operator@agrivision.ai');
                    else if (r === 'expert') setEmailOrMobile('expert@agrivision.ai');
                    else setEmailOrMobile('farmer@agrivision.ai');
                  }}
                  className={`py-1.5 rounded-lg capitalize font-bold transition ${
                    selectedRole === r ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email or Mobile Number</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            <span>{loading ? 'Authenticating...' : `Login as ${selectedRole}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          Don't have an account?{' '}
          <Link href="/register" className="text-emerald-400 font-semibold hover:underline">
            Register Here
          </Link>
        </div>

      </div>
    </div>
  );
}
