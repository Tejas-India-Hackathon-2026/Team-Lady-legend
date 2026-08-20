'use client';

import React from 'react';
import { Activity, AlertTriangle, ShieldCheck, AlertOctagon } from 'lucide-react';

interface FarmMetrics {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  soilPh: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  cropHealth: number;
}

interface HealthGaugeCardProps {
  score: number;
  healthyPct?: number;
  warningPct?: number;
  riskPct?: number;
  metrics: FarmMetrics;
  onMetricChange: (key: keyof FarmMetrics, value: number) => void;
}

const metricConfigs = [
  { key: 'soilMoisture', label: 'Soil Moisture', min: 0, max: 100, unit: '%' },
  { key: 'temperature', label: 'Temperature', min: 0, max: 45, unit: '°C' },
  { key: 'humidity', label: 'Humidity', min: 0, max: 100, unit: '%' },
  { key: 'soilPh', label: 'Soil pH', min: 4, max: 9, unit: '' },
  { key: 'nitrogen', label: 'Nitrogen', min: 0, max: 100, unit: '%' },
  { key: 'phosphorus', label: 'Phosphorus', min: 0, max: 100, unit: '%' },
  { key: 'potassium', label: 'Potassium', min: 0, max: 100, unit: '%' },
  { key: 'cropHealth', label: 'Crop Health', min: 0, max: 100, unit: '%' },
] as const;

export const HealthGaugeCard: React.FC<HealthGaugeCardProps> = ({
  score = 82,
  healthyPct = 78,
  warningPct = 15,
  riskPct = 7,
  metrics,
  onMetricChange,
}) => {
  const safeScore = Math.max(0, Math.min(100, score));
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  const getHealthStatus = (value: number) => {
    if (value >= 80) {
      return {
        label: 'Healthy',
        scoreColor: 'text-emerald-400',
        strokeColor: '#10b981',
        badge: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30',
        detail: 'Crop condition is stable and production-ready.'
      };
    }
    if (value >= 60) {
      return {
        label: 'Needs Attention',
        scoreColor: 'text-amber-400',
        strokeColor: '#f59e0b',
        badge: 'bg-amber-500/10 text-amber-300 border border-amber-500/30',
        detail: 'Field monitoring is recommended before crop stress worsens.'
      };
    }
    return {
      label: 'Critical',
      scoreColor: 'text-red-400',
      strokeColor: '#ef4444',
      badge: 'bg-red-500/10 text-red-300 border border-red-500/30',
      detail: 'Critical intervention is recommended to prevent major yield loss.'
    };
  };

  const status = getHealthStatus(safeScore);
  const isLowSoilMoisture = metrics.soilMoisture < 70;

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

      <div className="py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-around">
        <div 
          className="relative w-32 h-32 flex items-center justify-center mx-auto md:mx-0"
          role="progressbar"
          aria-valuenow={safeScore}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Farm Health Index: ${safeScore} out of 100`}
        >
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
              stroke={status.strokeColor}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className={`text-3xl font-extrabold tracking-tight ${status.scoreColor}`}>
              {safeScore}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">/ 100</span>
          </div>
        </div>

        <div className="space-y-2 text-xs min-w-[160px]">
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

      <div className="space-y-3 mt-2">
        <div className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${status.badge}`}>
          {status.label}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {metricConfigs.map(({ key, label, min, max, unit }) => (
            <label key={key} className="block rounded-xl border border-slate-800 bg-slate-950/60 p-2.5">
              <div className="mb-1 flex items-center justify-between text-[10px] text-slate-300">
                <span>{label}</span>
                <span className="font-semibold text-slate-100">
                  {metrics[key]}{unit}
                </span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={key === 'soilPh' ? 0.1 : 1}
                value={metrics[key]}
                aria-label={`${label} level`}
                onChange={(event) => onMetricChange(key, Number(event.target.value))}
                className="w-full accent-emerald-400"
              />
            </label>
          ))}
        </div>

        <div className="bg-slate-800/60 p-2.5 rounded-xl text-[11px] text-slate-400 border border-slate-700/40 leading-relaxed">
          <strong className={`${status.scoreColor}`}>AI Assessment:</strong> {status.detail}
        </div>

        {isLowSoilMoisture && (
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-2.5 text-[11px] text-blue-200 leading-relaxed">
            <div className="font-semibold text-blue-300">Soil moisture is below the optimal range.</div>
            <div className="mt-0.5">💧 Recommended action: Start irrigation within 2 hours.</div>
          </div>
        )}
      </div>
    </div>
  );
};
