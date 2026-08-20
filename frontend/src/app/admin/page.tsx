'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { LayoutDashboard, Users, Map, PlaneTakeoff, ShieldAlert, DollarSign, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboardPage() {
  const diseaseData = [
    { name: 'Yellow Rust', count: 184 },
    { name: 'Bacterial Blight', count: 92 },
    { name: 'Late Blight', count: 46 },
    { name: 'Leaf Curl', count: 35 },
  ];

  const healthDistData = [
    { range: '90-100 (Optimal)', count: 320 },
    { range: '75-89 (Good)', count: 210 },
    { range: '60-74 (Warning)', count: 64 },
    { range: '<60 (High Risk)', count: 18 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-1">
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-emerald-400" />
            Platform Admin Analytics & System Control
          </h1>
          <p className="text-slate-400 text-xs">Real-time metrics across farmers, drone pilots, AI disease detections, and revenue.</p>
        </div>

        {/* Platform Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1">
            <span className="text-slate-400 block text-[10px]">Total Farmers</span>
            <strong className="text-white text-lg font-black">482</strong>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1">
            <span className="text-slate-400 block text-[10px]">Total Farms</span>
            <strong className="text-white text-lg font-black">612</strong>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1">
            <span className="text-slate-400 block text-[10px]">Acres Monitored</span>
            <strong className="text-emerald-400 text-lg font-black">14,580</strong>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1">
            <span className="text-slate-400 block text-[10px]">Drone Scans</span>
            <strong className="text-teal-400 text-lg font-black">1,240</strong>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1">
            <span className="text-slate-400 block text-[10px]">Active Bookings</span>
            <strong className="text-blue-400 text-lg font-black">42</strong>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1">
            <span className="text-slate-400 block text-[10px]">High-Risk Farms</span>
            <strong className="text-red-400 text-lg font-black">18</strong>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-1">
            <span className="text-slate-400 block text-[10px]">Total Revenue</span>
            <strong className="text-emerald-400 text-lg font-black">₹4.85L</strong>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-white text-sm">Platform Disease Distribution</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diseaseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-white text-sm">Farm Health Index Breakdown</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={healthDistData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis type="number" stroke="#64748b" fontSize={11} />
                  <YAxis dataKey="range" type="category" stroke="#64748b" fontSize={10} width={120} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
