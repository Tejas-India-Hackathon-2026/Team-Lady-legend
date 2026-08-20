'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { FarmMap } from '@/components/FarmMap';
import { DEMO_FARM } from '@/lib/api';
import { Farm } from '@/types';
import { Map, Plus, Sprout, Layers, ArrowRight, X } from 'lucide-react';

export default function FarmsPage() {
  const [farms, setFarms] = useState<Farm[]>([DEMO_FARM]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [farmName, setFarmName] = useState('');
  const [cropName, setCropName] = useState('Wheat');
  const [areaAcres, setAreaAcres] = useState(10);
  const [district, setDistrict] = useState('Patna');

  const handleCreateFarm = (e: React.FormEvent) => {
    e.preventDefault();
    const newFarm: Farm = {
      id: Date.now(),
      name: farmName || 'New Field Plot',
      owner_id: 1,
      district,
      state: 'Bihar',
      total_area_acres: Number(areaAcres),
      crop_name: cropName,
      crop_variety: 'Standard HD',
      center_lat: 25.6015,
      center_lng: 85.1240
    };
    setFarms([...farms, newFarm]);
    setShowAddModal(false);
    setFarmName('');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Map className="w-6 h-6 text-emerald-400" />
              My Farms & Field Boundaries
            </h1>
            <p className="text-slate-400 text-xs mt-1">Manage field boundaries, crop details, and historical health maps.</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Farm</span>
          </button>
        </div>

        {/* Farm Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {farms.map((farm) => (
            <div key={farm.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl hover:border-emerald-500/50 transition">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-extrabold text-white text-lg">{farm.name}</h3>
                  <span className="text-slate-400 text-xs">{farm.location_address || `${farm.district}, ${farm.state}`}</span>
                </div>
                <span className="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                  {farm.total_area_acres} Acres
                </span>
              </div>

              {/* Farm Details Badges */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Crop Type</span>
                  <strong className="text-white">{farm.crop_name}</strong>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Variety</span>
                  <strong className="text-white">{farm.crop_variety || 'HD-2967'}</strong>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Soil Type</span>
                  <strong className="text-white">{farm.soil_type || 'Alluvial'}</strong>
                </div>
              </div>

              {/* Map Preview Canvas */}
              <div className="rounded-2xl overflow-hidden border border-slate-800">
                <FarmMap interactive={false} />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href={`/farms/${farm.id}`}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  <span>View Farm Details & 8 Tabs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/farms/${farm.id}/health-map`}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700"
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interactive Map</span>
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Add Farm Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-extrabold text-white text-lg flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-400" /> Add New Farm & Boundary
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateFarm} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Farm Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Sunrise Field Plot B"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Crop Type</label>
                    <select
                      value={cropName}
                      onChange={(e) => setCropName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="Wheat">Wheat (गेहूँ)</option>
                      <option value="Paddy / Rice">Paddy / Rice (धान)</option>
                      <option value="Maize">Maize / Corn (मक्का)</option>
                      <option value="Potato">Potato (आलू)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Area (Acres)</label>
                    <input
                      type="number"
                      required
                      value={areaAcres}
                      onChange={(e) => setAreaAcres(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">District / Location</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition"
                >
                  Save Farm & Draw Polygon
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
