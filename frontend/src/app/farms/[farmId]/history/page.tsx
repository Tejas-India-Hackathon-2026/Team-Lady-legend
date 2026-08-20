'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { History, TrendingUp, ShieldCheck, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HistoricalComparisonPage() {
  const historyData = [
    { date: 'Aug 01 (Baseline)', healthScore: 64, diseasePct: 14.2, waterStressPct: 28 },
    { date: 'Aug 08 (Post Spray)', healthScore: 74, diseasePct: 10.5, waterStressPct: 22 },
    { date: 'Aug 18 (Latest)', healthScore: 82, diseasePct: 7.4, waterStressPct: 18 },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-1">
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-400" />
            Historical Scan Comparison & Recovery Tracking
          </h1>
          <p className="text-slate-400 text-xs">Compare Scan #98 vs Scan #101 over time (+18 health score recovery).</p>
        </div>

        {/* Delta Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Health Score Change</span>
            <div className="text-3xl font-black text-emerald-400">+18 Points</div>
            <div className="text-[11px] text-slate-400">Baseline 64 → Current 82</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Disease Area Reduction</span>
            <div className="text-3xl font-black text-emerald-400">-6.8% Reduction</div>
            <div className="text-[11px] text-slate-400">14.2% → 7.4% infected area</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs text-slate-400 font-semibold">Water Stress Recovery</span>
            <div className="text-3xl font-black text-blue-400">-10% Stress Deficit</div>
            <div className="text-[11px] text-slate-400">28% → 18% moisture stress</div>
          </div>
        </div>

        {/* Recharts Comparison Chart */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-white text-sm">Long-Term Health Recovery Trajectory</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis domain={[40, 100]} stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="healthScore" stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
