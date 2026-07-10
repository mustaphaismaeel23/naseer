"use client";

import { useEffect, useState } from 'react';
import { BarChart3, LineChart as LineIcon } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getAnalyticsSnapshot } from '@/lib/analytics-service';

const hourlyVolume = [
  { hour: '00', volume: 12 },
  { hour: '04', volume: 19 },
  { hour: '08', volume: 26 },
  { hour: '12', volume: 38 },
  { hour: '16', volume: 44 },
  { hour: '20', volume: 31 }
];

export default function AnalyticsPage() {
  const [snapshot, setSnapshot] = useState<any>(null);

  useEffect(() => {
    getAnalyticsSnapshot('analytics').then(setSnapshot);
  }, []);

  if (!snapshot) {
    return <main className="min-h-screen bg-slate-950 p-8 text-white">Loading analytics…</main>;
  }

  return (
    <main className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400">Analytics</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Trend charts and market behavior</h1>
          <p className="mt-2 text-sm text-slate-400">Analyze price, market cap, volume, and hourly transaction activity over time.</p>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex items-center gap-2 text-white"><LineIcon size={18} className="text-purple-400" /> Price and market cap trend</div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={snapshot.priceSeries}>
                  <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="marketCap" stroke="#34d399" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex items-center gap-2 text-white"><BarChart3 size={18} className="text-cyan-400" /> Hourly volume bars</div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyVolume}>
                  <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                  <XAxis dataKey="hour" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="volume" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
