'use client';

import React, { useState, useEffect } from 'react';
import { Layers, ShieldCheck, AlertTriangle, Droplets, Info } from 'lucide-react';

interface FarmMapProps {
  centerLat?: number;
  centerLng?: number;
  interactive?: boolean;
}

export const FarmMap: React.FC<FarmMapProps> = ({
  centerLat = 25.6015,
  centerLng = 85.1240,
  interactive = true
}) => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'health' | 'disease' | 'water'>('all');
  const [selectedRegion, setSelectedRegion] = useState<any | null>(null);
  const [isClient, setIsClient] = useState(false);

  const layerMeta = {
    all: { label: 'Overall Farm Health', status: 'Healthy', value: '82/100' },
    health: { label: 'Crop Health', status: 'Healthy', value: '86%' },
    disease: { label: 'Disease Risk', status: 'Low Risk', value: '12%' },
    water: { label: 'Water Stress', status: 'Low', value: '28%' }
  } as const;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-96 bg-slate-950 rounded-2xl flex items-center justify-center text-slate-500 text-sm">
        Loading Interactive Farm Health Map...
      </div>
    );
  }

  // Sample GeoJSON Zones for Green Valley Farm
  const regions = [
    {
      id: 1,
      name: "North Block A - Healthy Wheat Zone",
      type: "healthy",
      color: "rgba(16, 185, 129, 0.4)",
      borderColor: "#10b981",
      area: "7.8 acres",
      status: "Optimal",
      details: "High canopy coverage (88%), chlorophyll index 0.74. No disease detected."
    },
    {
      id: 2,
      name: "North Block A - Yellow Rust Disease Zone",
      type: "disease",
      color: "rgba(239, 68, 68, 0.55)",
      borderColor: "#ef4444",
      area: "0.92 acres (7.4%)",
      status: "High Risk",
      details: "Yellow Rust (Puccinia striiformis) detected with 91% confidence. Immediate fungicide application needed."
    },
    {
      id: 3,
      name: "Eastern Quad - Mild Water Stress",
      type: "water",
      color: "rgba(59, 130, 246, 0.45)",
      borderColor: "#3b82f6",
      area: "2.2 acres (18%)",
      status: "Mild Deficit",
      details: "Moisture deficit detected in leaf canopy. Drip irrigation (2,500 L/acre) recommended."
    }
  ];

  return (
    <div className="relative w-full h-[450px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Map Control Header Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 p-3 px-4 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Farm Health Map Layers</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-lg text-xs">
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-2.5 py-1 rounded font-semibold transition ${
              activeLayer === 'all' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Layers
          </button>
          <button
            onClick={() => setActiveLayer('health')}
            className={`px-2.5 py-1 rounded font-semibold transition ${
              activeLayer === 'health' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🟢 Crop Health
          </button>
          <button
            onClick={() => setActiveLayer('disease')}
            className={`px-2.5 py-1 rounded font-semibold transition ${
              activeLayer === 'disease' ? 'bg-red-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔴 Disease (7.4%)
          </button>
          <button
            onClick={() => setActiveLayer('water')}
            className={`px-2.5 py-1 rounded font-semibold transition ${
              activeLayer === 'water' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔵 Water Stress (18%)
          </button>
        </div>
      </div>

      <div className="px-4 pt-3 pb-0 text-[11px] text-slate-300">
        <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-slate-700 bg-slate-950/80 px-2.5 py-1">
          <span className="text-slate-400">Current Layer:</span>
          <span className="font-bold text-white">{layerMeta[activeLayer].label}</span>
          <span className="text-emerald-300 font-semibold">{layerMeta[activeLayer].status}</span>
          <span className="text-slate-400">•</span>
          <span className="text-emerald-300 font-semibold">{layerMeta[activeLayer].value}</span>
        </div>
      </div>

      {/* SVG Interactive Farm Canvas */}
      <div className="relative flex-1 bg-slate-950 overflow-hidden flex items-center justify-center group">
        {/* Background Grid Pattern simulating satellite field imagery */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Farm Field Polygon Simulation Canvas */}
        <svg className="w-full h-full p-6" viewBox="0 0 800 500">
          {/* Main Field Outer Boundary */}
          <polygon
            points="100,60 700,60 720,440 80,420"
            fill="rgba(15, 23, 42, 0.8)"
            stroke="#059669"
            strokeWidth="3"
            strokeDasharray="6 4"
          />

          {/* Healthy Zone */}
          {(activeLayer === 'all' || activeLayer === 'health') && (
            <polygon
              points="120,80 500,80 480,280 110,270"
              fill="rgba(16, 185, 129, 0.35)"
              stroke="#10b981"
              strokeWidth="2"
              className="cursor-pointer hover:fill-emerald-500/50 transition-all"
              onClick={() => setSelectedRegion(regions[0])}
            />
          )}

          {/* Disease Zone (Red) */}
          {(activeLayer === 'all' || activeLayer === 'disease') && (
            <polygon
              points="510,80 680,80 670,200 490,190"
              fill="rgba(239, 68, 68, 0.6)"
              stroke="#ef4444"
              strokeWidth="3"
              className="cursor-pointer hover:fill-red-500/70 transition-all animate-pulse"
              onClick={() => setSelectedRegion(regions[1])}
            />
          )}

          {/* Water Stress Zone (Blue) */}
          {(activeLayer === 'all' || activeLayer === 'water') && (
            <polygon
              points="110,290 690,290 680,410 100,400"
              fill="rgba(59, 130, 246, 0.45)"
              stroke="#3b82f6"
              strokeWidth="2"
              className="cursor-pointer hover:fill-blue-500/60 transition-all"
              onClick={() => setSelectedRegion(regions[2])}
            />
          )}

          {/* Markers & Pin Labels */}
          <g transform="translate(580, 140)" className="cursor-pointer" onClick={() => setSelectedRegion(regions[1])}>
            <circle r="16" fill="#ef4444" opacity="0.4" className="animate-ping" />
            <circle r="10" fill="#ef4444" />
            <text x="16" y="4" fill="#ffffff" fontSize="12" fontWeight="bold">Yellow Rust (91%)</text>
          </g>

          <g transform="translate(300, 340)" className="cursor-pointer" onClick={() => setSelectedRegion(regions[2])}>
            <circle r="10" fill="#3b82f6" />
            <text x="16" y="4" fill="#ffffff" fontSize="12" fontWeight="bold">Water Deficit (18%)</text>
          </g>
        </svg>

        {/* Legend Panel */}
        <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-800 p-3 rounded-xl backdrop-blur-md text-xs space-y-1.5 shadow-lg">
          <div className="font-bold text-slate-200 text-[11px] mb-1 uppercase tracking-wider">Map Legend</div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="text-slate-300">Healthy Crop (78%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block animate-pulse" />
            <span className="text-slate-300">Disease Detection (7.4%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
            <span className="text-slate-300">Water Stress (18%)</span>
          </div>
        </div>

        {/* Region Click Modal / Drawer Overlay */}
        {selectedRegion && (
          <div className="absolute top-4 right-4 max-w-sm bg-slate-900/95 border border-emerald-700/60 p-4 rounded-xl shadow-2xl backdrop-blur-md text-xs text-slate-200 space-y-2 z-20 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Info className="w-4 h-4" /> {selectedRegion.name}
              </span>
              <button
                onClick={() => setSelectedRegion(null)}
                className="text-slate-400 hover:text-white font-bold px-1"
              >
                ✕
              </button>
            </div>
            <div>
              <div className="text-slate-400">Affected Area: <strong className="text-white">{selectedRegion.area}</strong></div>
              <div className="text-slate-400">Current Status: <strong className="text-emerald-300">{selectedRegion.status}</strong></div>
            </div>
            <p className="text-slate-300 bg-slate-950/60 p-2 rounded border border-slate-800 leading-relaxed">
              {selectedRegion.details}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
