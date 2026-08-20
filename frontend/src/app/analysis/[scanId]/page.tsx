'use client';

import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { DEMO_SCAN } from '@/lib/api';
import { Cpu, AlertTriangle, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AnalysisPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Cpu className="w-6 h-6 text-emerald-400" />
              AI Image Analysis & Disease Detection Result
            </h1>
            <p className="text-slate-400 text-xs mt-1">Scan #101 • Evaluated by AgriVision Computer Vision Engine (YOLOv8 + Segmentation)</p>
          </div>

          <Link
            href="/farms/1/health-map"
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow transition"
          >
            <Layers className="w-4 h-4" />
            <span>View Affected Areas on Farm Map</span>
          </Link>
        </div>

        {/* AI Result Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold">AI Disease Detection</span>
            <div className="text-lg font-black text-red-400">{DEMO_SCAN.disease_name}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold">AI Confidence Score</span>
            <div className="text-2xl font-black text-emerald-400">91% Confidence</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold">Risk Level</span>
            <div className="text-2xl font-black text-amber-400 uppercase">Medium Risk</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold">Affected Area</span>
            <div className="text-2xl font-black text-white">7.4% (0.92 Acres)</div>
          </div>
        </div>

        {/* Original vs AI Bounding Box Overlay Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Original Drone Imagery */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">Raw RGB Drone Image</h3>
            <div className="h-80 rounded-2xl overflow-hidden bg-slate-950 relative">
              <img
                src={DEMO_SCAN.image_url}
                alt="Raw Drone Field Imagery"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* AI Segmentation Overlay */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
            <h3 className="font-bold text-emerald-400 text-xs uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4" /> AI YOLOv8 Disease Hotspot Detection
            </h3>
            <div className="h-80 rounded-2xl overflow-hidden bg-slate-950 relative">
              <img
                src={DEMO_SCAN.image_url}
                alt="AI Disease Hotspot Overlay"
                className="w-full h-full object-cover opacity-75"
              />
              
              {/* Bounding Box Render */}
              <div className="absolute top-1/4 left-1/3 w-44 h-36 border-2 border-red-500 bg-red-500/25 rounded-xl p-2 animate-pulse">
                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                  Yellow Rust (Puccinia) • 91% Conf
                </span>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
