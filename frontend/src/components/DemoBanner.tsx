'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, RefreshCw } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { isDemoMode, toggleDemoMode } = useAuth();

  if (!isDemoMode) return null;

  return (
    <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 flex items-center justify-between border-b border-emerald-800">
      <div className="flex items-center gap-2 font-medium">
        <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span>
          <strong className="text-white">DEMO MODE ACTIVE:</strong> Pre-populated with Wheat Farm (Green Valley Farm, 12.5 acres, Patna).
        </span>
      </div>
      <button
        onClick={toggleDemoMode}
        className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded font-semibold transition"
      >
        <RefreshCw className="w-3 h-3" />
        Switch to Live API
      </button>
    </div>
  );
};
