'use client';

import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { FarmMap } from '@/components/FarmMap';
import { Building2, Users, Map, PlaneTakeoff, Download, ShieldAlert } from 'lucide-react';

export default function FPODashboardPage() {
  const memberFarms = [
    { id: 1, name: 'Green Valley Farm', owner: 'Rahul Kumar', area: '12.5 Acres', crop: 'Wheat', score: 82, status: 'Yellow Rust (7.4%)' },
    { id: 2, name: 'Sunrise Paddy Fields', owner: 'Sunil Singh', area: '18.0 Acres', crop: 'Paddy / Rice', score: 91, status: 'Optimal Health' },
    { id: 3, name: 'Kisan Cooperative Plot C', owner: 'Ramesh Prasad', area: '25.0 Acres', crop: 'Maize', score: 58, status: 'High Water Stress' },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-emerald-400" />
              Bihar Farmers Producer Organization (FPO) Hub
            </h1>
            <p className="text-slate-400 text-xs mt-1">Bihta Agricultural Cooperative • 42 Member Farmers • 520 Total Monitored Acres</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/book-drone"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow transition"
            >
              <PlaneTakeoff className="w-4 h-4" />
              <span>Book Bulk Drone Scan</span>
            </Link>
          </div>
        </div>

        {/* FPO Member Farms Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
          <h3 className="font-bold text-white text-base">FPO Member Farms Overview</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="pb-3">Farm Name</th>
                  <th className="pb-3">Farmer Owner</th>
                  <th className="pb-3">Area & Crop</th>
                  <th className="pb-3">Health Score</th>
                  <th className="pb-3">Current Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {memberFarms.map((farm) => (
                  <tr key={farm.id} className="hover:bg-slate-800/50 transition">
                    <td className="py-3 font-bold text-white">{farm.name}</td>
                    <td className="py-3 text-slate-300">{farm.owner}</td>
                    <td className="py-3">{farm.area} • {farm.crop}</td>
                    <td className="py-3">
                      <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        farm.score >= 80 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : farm.score >= 60 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {farm.score} / 100
                      </span>
                    </td>
                    <td className="py-3 text-slate-300">{farm.status}</td>
                    <td className="py-3 text-right">
                      <Link href={`/farms/${farm.id}`} className="text-emerald-400 hover:underline font-bold">
                        Inspect →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Aggregated FPO Regional Risk Map */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h3 className="font-bold text-white text-base">Aggregated Regional Field Risk Map</h3>
          <FarmMap />
        </div>

      </main>
    </div>
  );
}
