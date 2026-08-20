'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard, Map, PlaneTakeoff, Stethoscope, Droplets, History,
  Bot, Users, FileText, Settings, ShieldAlert, Layers, Building2
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { role } = useAuth();

  // Links per role
  const farmerNav = [
    { href: '/dashboard', label: 'Farmer Dashboard', icon: LayoutDashboard },
    { href: '/farms', label: 'My Farms & Fields', icon: Map },
    { href: '/book-drone', label: 'Book Drone Scan', icon: PlaneTakeoff },
    { href: '/farms/1/health-map', label: 'Farm Health Map', icon: Layers },
    { href: '/assistant', label: 'AI Voice Assistant', icon: Bot },
    { href: '/farms/1/history', label: 'Scan History & Trend', icon: History },
  ];

  const operatorNav = [
    { href: '/operator/dashboard', label: 'Operator Hub', icon: PlaneTakeoff },
    { href: '/book-drone', label: 'All Booking Queue', icon: FileText },
    { href: '/dashboard', label: 'Farm Overview', icon: LayoutDashboard },
  ];

  const expertNav = [
    { href: '/expert/dashboard', label: 'Agronomist Review', icon: Stethoscope },
    { href: '/farms/1/health-map', label: 'Risk Map Inspector', icon: Layers },
    { href: '/dashboard', label: 'Analytics View', icon: LayoutDashboard },
  ];

  const adminNav = [
    { href: '/admin', label: 'Admin Analytics', icon: LayoutDashboard },
    { href: '/farms', label: 'Platform Farms', icon: Map },
    { href: '/operator/dashboard', label: 'Drone Fleet & Scans', icon: PlaneTakeoff },
    { href: '/expert/dashboard', label: 'Disease Controls', icon: ShieldAlert },
  ];

  const fpoNav = [
    { href: '/fpo/dashboard', label: 'FPO Command Center', icon: Building2 },
    { href: '/farms', label: 'Member Farms List', icon: Users },
    { href: '/book-drone', label: 'Bulk Drone Booking', icon: PlaneTakeoff },
  ];

  let currentNav = farmerNav;
  if (role === 'operator') currentNav = operatorNav;
  if (role === 'expert') currentNav = expertNav;
  if (role === 'admin') currentNav = adminNav;
  if (role === 'fpo') currentNav = fpoNav;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div className="px-2 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
          {role} Workspace
        </div>
        <nav className="space-y-1">
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-950/50'
                    : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs space-y-2">
        <div className="flex items-center gap-2 font-semibold text-white">
          <Droplets className="w-4 h-4 text-emerald-400" />
          <span>Irrigation Status</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Mild water stress in Field A. Next schedule: 06:00 PM.
        </p>
      </div>
    </aside>
  );
};
