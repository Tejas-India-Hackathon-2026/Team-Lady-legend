'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Sprout, PlaneTakeoff, Cpu, Layers, Mic, ShieldAlert, CheckCircle2,
  ArrowRight, Activity, CloudSun, TrendingUp, Users, Building2, Eye, LineChart
} from 'lucide-react';

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80">
        
        {/* Background Glowing Field Overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span>Next-Gen Precision Agriculture for Rural India</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                See Your Farm. <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
                  Detect Problems Early.
                </span> <br />
                Grow Smarter.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                AgriVision combines drone intelligence, AI-powered computer vision crop analysis, multi-layer farm health mapping, and voice assistance in <strong>Hindi, Bhojpuri, and English</strong> to help farmers protect yields and reduce input costs.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/book-drone"
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-xl shadow-emerald-950/60 hover:scale-105 transition-all text-sm"
                >
                  <PlaneTakeoff className="w-5 h-5" />
                  <span>Book a Drone Scan</span>
                </Link>

                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all text-sm"
                >
                  <span>Explore AgriVision</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800 text-xs">
                <div>
                  <div className="font-extrabold text-xl text-emerald-400">91%</div>
                  <div className="text-slate-400">AI Accuracy</div>
                </div>
                <div>
                  <div className="font-extrabold text-xl text-emerald-400">&lt; 15 min</div>
                  <div className="text-slate-400">Scan to Analysis</div>
                </div>
                <div>
                  <div className="font-extrabold text-xl text-emerald-400">3 Langs</div>
                  <div className="text-slate-400">Hindi, Bhojpuri, EN</div>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Card */}
            <div className="relative">
              <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-4 shadow-2xl backdrop-blur-xl relative group">
                
                {/* Simulated Drone Image Banner */}
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80"
                    alt="Drone Farm Scan"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* AI Scanning Grid Animation */}
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-slate-950/80" />
                  
                  {/* AI Bounding Box Marker overlay */}
                  <div className="absolute top-1/3 left-1/4 w-36 h-28 border-2 border-red-500 bg-red-500/20 rounded-lg p-1 animate-pulse">
                    <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                      Yellow Rust 91%
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-300 backdrop-blur-md flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400 animate-spin" />
                    <span>Farm Health Score: 82 / 100</span>
                  </div>
                </div>

                {/* Micro Live Bar */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 block text-[10px]">Detected Issue:</span>
                    <strong className="text-red-400 font-semibold">Yellow Rust (Puccinia)</strong>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 block text-[10px]">Water Stress:</span>
                    <strong className="text-blue-400 font-semibold">18% Mild Deficit</strong>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE PHILOSOPHY */}
      <section className="py-12 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Core Product Philosophy</div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-lg sm:text-xl font-extrabold text-white">
            <span className="bg-slate-800 border border-emerald-500/40 px-4 py-2 rounded-xl text-emerald-300">DETECT</span>
            <span className="text-emerald-500 font-bold">→</span>
            <span className="bg-slate-800 border border-emerald-500/40 px-4 py-2 rounded-xl text-teal-300">DECIDE</span>
            <span className="text-emerald-500 font-bold">→</span>
            <span className="bg-slate-800 border border-emerald-500/40 px-4 py-2 rounded-xl text-green-300">TREAT</span>
            <span className="text-emerald-500 font-bold">→</span>
            <span className="bg-slate-800 border border-emerald-500/40 px-4 py-2 rounded-xl text-emerald-400">MONITOR</span>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM & SOLUTION */}
      <section className="py-20 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">The Precision Agriculture Challenge</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Traditional farming inspects crops manually, catching disease only after symptoms destroy 30%+ of the field.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Problem Card */}
            <div className="bg-slate-900/60 border border-red-900/40 p-8 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">The Old Problem</h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span> Farmers spot diseases too late when leaves turn yellow across acres.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span> Inspecting large 10+ acre farms manually takes days and misses early hotspots.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span> Blanket spraying sprays expensive chemicals across 100% of the field needlessly.
                </li>
              </ul>
            </div>

            {/* Solution Card */}
            <div className="bg-slate-900/60 border border-emerald-900/40 p-8 rounded-3xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">The AgriVision Solution</h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> High-resolution drone scanning captures crop health down to individual plant leaves.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> AI computer vision locates exact disease hotspots with 91%+ confidence.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> Targeted micro-spraying treats only affected 7.4% area, saving up to 70% in chemical costs.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS (6 STEPS) */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">Step-by-Step Workflow</div>
            <h2 className="text-3xl font-extrabold text-white">How AgriVision Operates</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Book Drone", desc: "Farmer books local drone pilot scan via mobile app or Hindi voice command.", icon: PlaneTakeoff },
              { num: "02", title: "Scan Farm", desc: "Drone completes automated multispectral flight over field boundaries.", icon: Eye },
              { num: "03", title: "AI Analyzes Image", desc: "Computer vision engine detects early disease, crop stress & weed patches.", icon: Cpu },
              { num: "04", title: "Detect Risk Areas", desc: "Farm Health Map renders exact 7.4% disease zone and water stress layers.", icon: Layers },
              { num: "05", title: "Recommend Treatment", desc: "AgriVision AI generates precision dosage and spraying safety instructions.", icon: CheckCircle2 },
              { num: "06", title: "Track Results", desc: "Follow-up scan compares health score improvement (+18 points recovery).", icon: LineChart }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition group space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-emerald-500 font-mono">{step.num}</span>
                    <Icon className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition" />
                  </div>
                  <h4 className="font-bold text-white text-base">{step.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-12 bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 font-bold text-white text-base">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <span>AgriVision — AI-Powered Precision Agriculture Platform</span>
          </div>
          <p className="text-slate-500 max-w-xl mx-auto">
            Empowering rural farmers in Bihar and across India with accessible drone technology, AI computer vision, and multilingual voice support.
          </p>
          <div className="text-[11px] text-slate-600">
            © 2026 AgriVision Inc. All rights reserved. DETECT • DECIDE • TREAT • MONITOR.
          </div>
        </div>
      </footer>

    </div>
  );
}
