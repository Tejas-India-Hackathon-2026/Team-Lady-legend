'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { HealthGaugeCard } from '@/components/HealthGaugeCard';
import { ReportDownloadButton } from '@/components/ReportDownloadButton';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sprout, PlaneTakeoff, Map, Layers, Bot, AlertTriangle, ShieldCheck,
  TrendingUp, Calendar, ArrowUpRight, CloudSun, CheckCircle2
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function DashboardPage() {
  const { user, role } = useAuth();
  const { t } = useLanguage();

  // Recharts Health Trend Data
  const healthData = [
    { date: 'Aug 01', health: 64, diseaseRisk: 28, waterStress: 30 },
    { date: 'Aug 05', health: 70, diseaseRisk: 22, waterStress: 25 },
    { date: 'Aug 10', health: 75, diseaseRisk: 18, waterStress: 20 },
    { date: 'Aug 15', health: 79, diseaseRisk: 12, waterStress: 18 },
    { date: 'Aug 18', health: 82, diseaseRisk: 7,  waterStress: 18 },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        
        {/* Top Header & Greeting */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              Welcome, {user?.full_name || 'Rammohan kumar'} 👋
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Your farm condition is overall stable. <strong>82/100 Health Score</strong> across 12.5 acres in Patna.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/farms/1/health-map"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/40 px-4 py-2.5 rounded-xl font-bold text-xs shadow transition"
            >
              <Layers className="w-4 h-4" />
              <span>View Farm Health Map</span>
            </Link>

            <Link
              href="/book-drone"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg transition hover:scale-105"
            >
              <PlaneTakeoff className="w-4 h-4" />
              <span>Book Drone Scan</span>
            </Link>

            <ReportDownloadButton farmName="Green Valley Farm" />
          </div>
        </div>

        {/* 10-Second Executive Overview Banner (Requirement 47) */}
        <div className="bg-emerald-950/60 border border-emerald-600/40 rounded-2xl p-5 text-xs text-emerald-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-center px-4 py-2 bg-emerald-900/80 rounded-xl border border-emerald-500/50">
              <span className="text-[10px] text-emerald-300 block uppercase font-mono">Overall Score</span>
              <strong className="text-3xl font-black text-emerald-400">82 / 100</strong>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white text-sm">Farm Status Summary</div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-emerald-400 font-semibold">🟢 Healthy: 78%</span>
                <span className="text-amber-400 font-semibold">🟡 Warning: 15%</span>
                <span className="text-red-400 font-semibold">🔴 High Risk: 7%</span>
              </div>
            </div>
          </div>

          <div className="text-right text-[11px] text-emerald-300">
            <div>Last Scan: <strong>Aug 18, 2026</strong></div>
            <div>Next Follow-up: <strong>Aug 25, 2026</strong></div>
          </div>
        </div>

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: 'Total Farms', value: '1 Farm', label: '12.5 Total Acres', icon: Map, color: 'text-emerald-400' },
            { title: 'Healthy Area', value: '9.75 Acres', label: '78% Optimal Yield', icon: ShieldCheck, color: 'text-emerald-400' },
            { title: 'Risk Area', value: '0.92 Acres', label: '7.4% Yellow Rust Zone', icon: AlertTriangle, color: 'text-red-400' },
            { title: 'Water Stress', value: '2.2 Acres', label: '18% Mild Moisture Deficit', icon: Sprout, color: 'text-blue-400' },
            { title: 'Active Bookings', value: '1 Scan', label: 'Aug 25 Scheduled', icon: PlaneTakeoff, color: 'text-teal-400' },
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">{card.title}</span>
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </div>
                <div className="text-xl font-extrabold text-white">{card.value}</div>
                <div className="text-[10px] text-slate-400">{card.label}</div>
              </div>
            );
          })}
        </div>

        {/* Middle Row: Health Gauge & Interactive Recharts Health Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Health Gauge Card */}
          <HealthGaugeCard score={82} healthyPct={78} warningPct={15} riskPct={7} />

          {/* Recharts Long-Term Crop Health Trend */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Crop Health Score Trend (+18 Improvement)
                </h3>
                <p className="text-[11px] text-slate-400">Tracking field recovery after targeted fungicide application.</p>
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                +18 pts since Aug 01
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={healthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                  <YAxis domain={[40, 100]} stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="health" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#healthGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Bottom Row: Recent Field Alerts & Scans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Recent Field Alerts */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Active Field Alerts & Advisories
              </h3>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-red-900/40 flex items-start gap-3">
                <span className="p-2 rounded-lg bg-red-500/10 text-red-400 font-bold shrink-0">🔴 AI Alert</span>
                <div>
                  <div className="font-bold text-white">Yellow Rust (Puccinia striiformis)</div>
                  <p className="text-slate-400 mt-0.5">Detected on 7.4% area of North Field Block A (Confidence 91%).</p>
                  <Link href="/analysis/101" className="text-emerald-400 font-semibold hover:underline mt-1 inline-block">
                    Inspect Scan Result →
                  </Link>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-blue-900/40 flex items-start gap-3">
                <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 font-bold shrink-0">🔵 Water</span>
                <div>
                  <div className="font-bold text-white">Mild Water Stress (18%)</div>
                  <p className="text-slate-400 mt-0.5">Moisture deficit in eastern quadrant. Recommended: 2,500 L/acre drip irrigation.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather & Spray Conditions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-emerald-400" />
                Weather Intelligence & Spraying Advisory
              </h3>
              <span className="text-xs text-slate-400">Patna, Bihar</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Temp</span>
                <strong className="text-white text-base">28.5°C</strong>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Humidity</span>
                <strong className="text-white text-base">72%</strong>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Rain</span>
                <strong className="text-white text-base">15%</strong>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Wind</span>
                <strong className="text-white text-base">8.5 km/h</strong>
              </div>
            </div>

            <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-600/30 text-xs text-emerald-200 flex items-start gap-2 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Spraying Window Open:</strong> Wind speed (8.5 km/h) and rain probability (15%) are optimal for fungicide application today.
              </span>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
