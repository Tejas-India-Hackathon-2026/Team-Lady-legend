'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { fetchApi, DEMO_FARM } from '@/lib/api';
import { PlaneTakeoff, Calendar, Clock, Map, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function BookDronePage() {
  const [farmId, setFarmId] = useState(1);
  const [areaAcres, setAreaAcres] = useState(12.5);
  const [preferredDate, setPreferredDate] = useState('2026-08-25');
  const [preferredTime, setPreferredTime] = useState('09:30 AM');
  const [scanType, setScanType] = useState('Full Farm Health Scan');
  const [notes, setNotes] = useState('Post-treatment recovery scan for Yellow Rust verification.');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const pricePerAcre = 200; // INR
  const totalPrice = areaAcres * pricePerAcre;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetchApi('/bookings', {
      method: 'POST',
      body: JSON.stringify({
        farm_id: farmId,
        area_acres: areaAcres,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        scan_type: scanType,
        notes
      })
    });

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-4xl mx-auto">
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-1">
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <PlaneTakeoff className="w-6 h-6 text-emerald-400" />
            Book a Drone Farm Scan
          </h1>
          <p className="text-slate-400 text-xs">Schedule certified local drone pilots equipped with RGB & multispectral cameras.</p>
        </div>

        {submitted ? (
          <div className="bg-slate-900 border border-emerald-600/60 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Drone Scan Booking Confirmed!</h2>
            <p className="text-slate-300 text-xs max-w-md mx-auto leading-relaxed">
              Your booking request for <strong>{DEMO_FARM.name} ({areaAcres} Acres)</strong> has been submitted. Pilot Amit Singh has been assigned for <strong>{preferredDate} at {preferredTime}</strong>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition"
            >
              Book Another Scan
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl text-xs">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Select Farm</label>
                <select
                  value={farmId}
                  onChange={(e) => setFarmId(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                >
                  <option value={1}>{DEMO_FARM.name} (12.5 Acres - Patna)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Scan Type</label>
                <select
                  value={scanType}
                  onChange={(e) => setScanType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                >
                  <option value="Full Farm Health Scan">Full Farm Health Scan (Comprehensive)</option>
                  <option value="Disease Detection">Disease & Pest Detection</option>
                  <option value="Water Stress">Water Stress & Irrigation Map</option>
                  <option value="General Crop Health">General Canopy Greenness</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Area to Scan (Acres)</label>
                <input
                  type="number"
                  value={areaAcres}
                  onChange={(e) => setAreaAcres(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Preferred Time</label>
                <input
                  type="text"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Pilot Instructions & Notes</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Pricing Summary Card */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[11px]">Pay-Per-Scan Calculation</span>
                <span className="text-white font-semibold">{areaAcres} acres × ₹{pricePerAcre}/acre</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[11px]">Estimated Price</span>
                <strong className="text-2xl font-black text-emerald-400">₹{totalPrice}</strong>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-extrabold py-3.5 rounded-xl shadow-xl transition text-xs uppercase tracking-wider"
            >
              {loading ? 'Submitting Booking...' : 'Confirm Drone Booking (₹' + totalPrice + ')'}
            </button>

          </form>
        )}

      </main>
    </div>
  );
}
