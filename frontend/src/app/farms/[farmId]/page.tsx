'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { FarmMap } from '@/components/FarmMap';
import { HealthGaugeCard } from '@/components/HealthGaugeCard';
import { ReportDownloadButton } from '@/components/ReportDownloadButton';
import { DEMO_FARM, DEMO_SCAN, DEMO_WEATHER } from '@/lib/api';
import {
  Map, Layers, Camera, AlertTriangle, Droplets, CloudSun, CheckCircle2,
  History, ArrowRight, PlaneTakeoff, Download
} from 'lucide-react';

export default function FarmDetailsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'scans' | 'diseases' | 'water' | 'weather' | 'recommendations' | 'history'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Map },
    { id: 'map', label: 'Health Map', icon: Layers },
    { id: 'scans', label: 'Drone Scans', icon: Camera },
    { id: 'diseases', label: 'Diseases', icon: AlertTriangle },
    { id: 'water', label: 'Water Stress', icon: Droplets },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'recommendations', label: 'Recommendations', icon: CheckCircle2 },
    { id: 'history', label: 'History & Delta', icon: History },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">{DEMO_FARM.name}</h1>
              <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
                12.5 Acres
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-1">Bihta Agricultural Block, Patna, Bihar • Wheat (HD-2967)</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/book-drone"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow transition"
            >
              <PlaneTakeoff className="w-4 h-4" />
              <span>Book Scan</span>
            </Link>
            <ReportDownloadButton farmName={DEMO_FARM.name} />
          </div>
        </div>

        {/* 8 Tabs Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl overflow-x-auto text-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <HealthGaugeCard score={82} healthyPct={78} warningPct={15} riskPct={7} />
              <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                <FarmMap />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Health Map */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base">Multi-Layer Interactive Farm Health Map</h3>
            <FarmMap />
          </div>
        )}

        {/* Tab 3: Scans */}
        {activeTab === 'scans' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Recent Farm Drone Scans</h3>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-white text-sm">August 18, 2026 • Scan #101</div>
                  <div className="text-slate-400 mt-0.5">Scanned by Pilot Amit Singh (AgriFlyer Pro X8)</div>
                  <div className="text-emerald-400 font-semibold mt-1">Health Score: 82/100 • Yellow Rust Detected (7.4%)</div>
                </div>
                <Link href="/analysis/101" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg">
                  View AI Result
                </Link>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-white text-sm">August 02, 2026 • Baseline Scan #98</div>
                  <div className="text-slate-400 mt-0.5">Scanned by Pilot Amit Singh</div>
                  <div className="text-amber-400 font-semibold mt-1">Health Score: 64/100 • Yellow Rust Detected (14.2%)</div>
                </div>
                <Link href="/analysis/101" className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-slate-700">
                  View Baseline
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Diseases */}
        {activeTab === 'diseases' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base text-red-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Detected Diseases & Symptoms
            </h3>
            <div className="bg-slate-950 p-5 rounded-2xl border border-red-900/50 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-white text-sm">Yellow Rust (Puccinia striiformis)</h4>
                <span className="bg-red-500/20 text-red-400 font-bold px-2.5 py-0.5 rounded-full border border-red-500/30">
                  91% AI Confidence
                </span>
              </div>
              <p className="text-slate-300">Affects 7.4% of total field area (North Field Block A). Characterized by linear yellow pustules on wheat leaves.</p>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <strong className="text-emerald-300 block mb-1">Recommended Treatment Protocol:</strong>
                <span>Apply Propiconazole 25% EC @ 1ml/liter water or Tebuconazole fungicide on affected patches. Avoid blanket spraying.</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Water Stress */}
        {activeTab === 'water' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base text-blue-400 flex items-center gap-2">
              <Droplets className="w-5 h-5" /> Water Stress Analysis
            </h3>
            <div className="bg-slate-950 p-5 rounded-2xl border border-blue-900/50 space-y-3 text-xs">
              <div className="font-extrabold text-white text-sm">Mild Moisture Deficit (18%)</div>
              <p className="text-slate-300">Canopy temperature variance indicates mild moisture stress in eastern quadrant (approx 2.2 acres).</p>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <strong className="text-blue-300 block mb-1">Irrigation Schedule:</strong>
                <span>Execute drip irrigation of 2,500 L/acre during evening hours (06:00 PM - 08:00 PM).</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Weather */}
        {activeTab === 'weather' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-emerald-400" /> Weather & Agricultural Advisory
            </h3>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs leading-relaxed space-y-2">
              <p className="text-emerald-300 font-semibold">{DEMO_WEATHER.advisory}</p>
              <div className="text-slate-400">Current Temp: {DEMO_WEATHER.temperature_c}°C • Humidity: {DEMO_WEATHER.humidity_pct}% • Wind: {DEMO_WEATHER.wind_speed_kmh} km/h</div>
            </div>
          </div>
        )}

        {/* Tab 7: Recommendations */}
        {activeTab === 'recommendations' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Actionable Agronomist Recommendations
            </h3>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-900/40 space-y-1">
                <strong className="text-white text-sm block">1. Targeted Fungicide Spraying</strong>
                <p className="text-slate-300">Apply Propiconazole @ 1ml/L strictly inside the 7.4% red disease polygon in Block A.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-blue-900/40 space-y-1">
                <strong className="text-white text-sm block">2. Eastern Section Irrigation</strong>
                <p className="text-slate-300">Supply 2,500 L/acre water via drip lines in the evening.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 8: History */}
        {activeTab === 'history' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Scan vs Scan Comparison (Recovery Delta)</h3>
              <span className="bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full text-xs border border-emerald-500/30">
                +18 Score Improvement
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-slate-400 font-semibold">Previous Baseline (Aug 02)</div>
                <div className="text-2xl font-black text-amber-400">64 / 100</div>
                <div className="text-slate-300">Yellow Rust: 14.2% area</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-900/60 space-y-2">
                <div className="text-emerald-400 font-semibold">Latest Post-Treatment (Aug 18)</div>
                <div className="text-2xl font-black text-emerald-400">82 / 100</div>
                <div className="text-slate-300">Yellow Rust: 7.4% area (-6.8% reduction)</div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
