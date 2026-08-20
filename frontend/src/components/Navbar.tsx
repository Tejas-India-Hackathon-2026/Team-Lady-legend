'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { UserRole, Language } from '@/types';
import { Sprout, Mic, Globe, Shield, User, Bell, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenVoiceModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenVoiceModal }) => {
  const { user, role, setRole, isDemoMode, toggleDemoMode } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="bg-slate-900 border-b border-emerald-900/50 text-white sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                AgriVision
                <span className="text-[10px] uppercase font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                  Precision AI
                </span>
              </span>
              <span className="text-[10px] text-emerald-400/80 block font-mono">
                DETECT • DECIDE • TREAT • MONITOR
              </span>
            </div>
          </Link>

          {/* Quick Voice Assistant & Controls */}
          <div className="flex items-center gap-3">
            
            {/* Ask AI Voice Button */}
            {onOpenVoiceModal && (
              <button
                onClick={onOpenVoiceModal}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md transition group"
              >
                <Mic className="w-4 h-4 text-emerald-200 group-hover:animate-bounce" />
                <span>🎙️ {t('askAssistant')}</span>
              </button>
            )}

            {/* Language Dropdown */}
            <div className="relative flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
              >
                <option value="hi" className="bg-slate-900 text-white">हिंदी (Hindi)</option>
                <option value="bho" className="bg-slate-900 text-white">भोजपुरी (Bhojpuri)</option>
                <option value="en" className="bg-slate-900 text-white">English</option>
              </select>
            </div>

            {/* Role Switcher (Farmer, Operator, Expert, Admin, FPO) */}
            <div className="relative flex items-center gap-1 bg-emerald-950/80 border border-emerald-700/50 rounded-lg px-2.5 py-1 text-xs text-emerald-200">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-semibold uppercase">Role:</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="bg-transparent text-white font-bold capitalize focus:outline-none cursor-pointer"
              >
                <option value="farmer" className="bg-slate-900 text-white">Farmer (किसान)</option>
                <option value="operator" className="bg-slate-900 text-white">Drone Operator (चालक)</option>
                <option value="expert" className="bg-slate-900 text-white">Agronomist Expert (विशेषज्ञ)</option>
                <option value="admin" className="bg-slate-900 text-white">Admin (प्रशासक)</option>
                <option value="fpo" className="bg-slate-900 text-white">FPO Organization (एफपीओ)</option>
              </select>
            </div>

            {/* Notifications Bell */}
            <button className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-emerald-200 flex items-center justify-center font-bold text-xs border border-emerald-600">
                {user?.full_name ? user.full_name.charAt(0) : 'R'}
              </div>
              <div className="hidden md:block text-left text-xs">
                <div className="font-semibold text-white leading-none">{user?.full_name || 'Rahul Kumar'}</div>
                <div className="text-[10px] text-slate-400 capitalize">{role}</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </nav>
  );
};
