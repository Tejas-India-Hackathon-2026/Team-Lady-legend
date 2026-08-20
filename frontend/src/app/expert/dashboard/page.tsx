'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Stethoscope, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ExpertDashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-1">
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-emerald-400" />
            Agronomist Expert Validation Center
          </h1>
          <p className="text-slate-400 text-xs">Review AI disease predictions, validate high-risk farms, and attach official agronomic recommendations.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
          <h3 className="font-bold text-white text-base">Pending AI Disease Verification Queue</h3>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Scan #101 — Green Valley Farm (Rahul Kumar)</span>
              <span className="bg-amber-500/20 text-amber-400 font-bold px-2.5 py-0.5 rounded border border-amber-500/30">
                Needs Agronomist Validation
              </span>
            </div>
            <div className="text-slate-300">
              AI Prediction: <strong>Yellow Rust (91% Confidence)</strong> on 7.4% field area.
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg">
                ✓ Validate AI Diagnosis
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-slate-700">
                Edit Recommendation
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
