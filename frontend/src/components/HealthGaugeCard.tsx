'use client';

import React from 'react';
import { Activity, AlertTriangle, ShieldCheck, AlertOctagon } from 'lucide-react';

interface HealthGaugeCardProps {
  score: number;
  healthyPct?: number;
  warningPct?: number;
  riskPct?: number;
}

export const HealthGaugeCard: React.FC<HealthGaugeCardProps> = ({
  score = 82,
  healthyPct = 78,
  warningPct = 15,
  riskPct = 7
}) => {
  // Calculate SVG arc rotation
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let scoreColor = "text-emerald-400";
  let strokeColor = "#10b981"; // Emerald
  if (score < 60) {
    scoreColor = "text-red-400";
    strokeColor = "#ef4444";
  } else if (score < 75) {
    scoreColor = "text-amber-400";
    strokeColor = "#f59e0b";
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-slate-100 text-sm">Farm Health Index</h3>
        </div>
        <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
          AI Evaluated
        </span>
      </div>

      <div className="py-4 flex items-center justify-around">
        {/* SVG Circular Score Ring */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              className="stroke-slate-800"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={strokeColor}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className={`text-3xl font-extrabold tracking-tight ${scoreColor}`}>
              {score}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">/ 100</span>
          </div>
        </div>

        {/* Legend Breakdown */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">Healthy:</span>
            <strong className="text-emerald-400 font-bold ml-auto">{healthyPct}%</strong>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">Warning:</span>
            <strong className="text-amber-400 font-bold ml-auto">{warningPct}%</strong>
          </div>
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-red-400" />
            <span className="text-slate-300">High Risk:</span>
            <strong className="text-red-400 font-bold ml-auto">{riskPct}%</strong>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/60 p-2.5 rounded-xl text-[11px] text-slate-400 border border-slate-700/40 leading-relaxed">
        <strong className="text-emerald-300">AI Assessment:</strong> Crop condition is overall stable. Immediate action recommended for 7.4% disease zone in Field A.
      </div>
    </div>
  );
};
