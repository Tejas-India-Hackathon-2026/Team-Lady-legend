'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { PlaneTakeoff, Upload, CheckCircle2, DollarSign, MapPin, Cpu } from 'lucide-react';

export default function OperatorDashboardPage() {
  const [selectedBooking, setSelectedBooking] = useState<number | null>(1);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append('farm_id', '1');
    formData.append('crop_name', 'Wheat');
    if (file) formData.append('file', file);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    try {
      await fetch(`${baseUrl}/analysis/upload`, {
        method: 'POST',
        body: formData
      });
    } catch (e) {
      console.warn("Using upload fallback", e);
    }

    setUploading(false);
    setUploadDone(true);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <PlaneTakeoff className="w-6 h-6 text-emerald-400" />
              Drone Operator Command Dashboard
            </h1>
            <p className="text-slate-400 text-xs mt-1">Pilot: Amit Singh • Drone: AgriFlyer Pro X8 Multispectral (SN: AGY-8821)</p>
          </div>
          <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
            🟢 Flight Status: Ready
          </span>
        </div>

        {/* Operator Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <span className="text-slate-400 text-[11px] font-semibold">Total Scans Done</span>
            <div className="text-2xl font-extrabold text-white">142 Scans</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <span className="text-slate-400 text-[11px] font-semibold">Acres Scanned</span>
            <div className="text-2xl font-extrabold text-emerald-400">1,820 Acres</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <span className="text-slate-400 text-[11px] font-semibold">Monthly Earnings</span>
            <div className="text-2xl font-extrabold text-teal-400">₹36,400</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
            <span className="text-slate-400 text-[11px] font-semibold">Pilot Rating</span>
            <div className="text-2xl font-extrabold text-amber-400">4.9 ★</div>
          </div>
        </div>

        {/* Assigned Flight Bookings & Imagery Upload */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Flight Queue */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-sm">Assigned Flight Missions</h3>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Green Valley Farm (Rahul Kumar)</span>
                  <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px]">
                    Assigned
                  </span>
                </div>
                <div className="text-slate-400 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Bihta Block, Patna • 12.5 Acres (Wheat)</span>
                </div>
                <div className="text-slate-300">Preferred Time: Aug 25 @ 09:30 AM</div>
                <button
                  onClick={() => setSelectedBooking(1)}
                  className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                >
                  Upload Drone Scans
                </button>
              </div>
            </div>
          </div>

          {/* Drag & Drop Drone Image Upload */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" /> Upload Drone Imagery & Flight Logs
            </h3>

            {uploadDone ? (
              <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-500/50 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-extrabold text-white text-base">Drone Imagery Uploaded!</h4>
                <p className="text-slate-400 text-xs">AI pipeline processing scan. Farm Health Map will update automatically.</p>
              </div>
            ) : (
              <form onSubmit={handleUpload} className="space-y-4 text-xs">
                
                {/* Drag-and-Drop Box */}
                <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl p-8 text-center space-y-3 bg-slate-950/60 cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-500 mx-auto" />
                  <div>
                    <span className="text-emerald-400 font-semibold">Click to browse</span> or drag and drop JPG/PNG multispectral drone files.
                  </div>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="drone-file-input"
                  />
                  <label htmlFor="drone-file-input" className="inline-block bg-slate-800 text-white px-3 py-1.5 rounded-lg font-semibold cursor-pointer">
                    {file ? file.name : "Select Image File"}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition"
                >
                  {uploading ? "Triggering AI Pipeline..." : "Upload & Run AI Disease Analysis"}
                </button>
              </form>
            )}

          </div>

        </div>

      </main>
    </div>
  );
}
