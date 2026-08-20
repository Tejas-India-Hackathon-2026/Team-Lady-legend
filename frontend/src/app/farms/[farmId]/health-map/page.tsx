'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { FarmMap } from '@/components/FarmMap';
import { ReportDownloadButton } from '@/components/ReportDownloadButton';
import { Layers } from 'lucide-react';

export default function DedicatedHealthMapPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              Green Valley Farm — Multi-Layer Health Map
            </h1>
            <p className="text-slate-400 text-xs mt-1">Interactive layers: Healthy Crop (78%), Yellow Rust Disease (7.4%), Water Stress (18%).</p>
          </div>
          <ReportDownloadButton farmName="Green Valley Farm" />
        </div>

        <FarmMap />
      </main>
    </div>
  );
}
