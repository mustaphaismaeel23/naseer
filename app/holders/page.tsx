"use client";

import { useEffect, useState } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { getAnalyticsSnapshot } from '@/lib/analytics-service';

export default function HoldersPage() {
  const [holders, setHolders] = useState<any[]>([]);

  useEffect(() => {
    getAnalyticsSnapshot('holders').then((snapshot) => setHolders(snapshot.holders));
  }, []);
  return (
    <main className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400">Holders</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Distribution and concentration analysis</h1>
          <p className="mt-2 text-sm text-slate-400">Inspect top holders, concentration, and whale exposure for the MAHUTA supply.</p>

          <section className="mt-6 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <div className="mb-4 flex items-center gap-2 text-white"><Users size={18} className="text-emerald-400" /> Top holders</div>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-800/80 text-slate-300">
                    <tr>
                      <th className="px-4 py-3">Wallet</th>
                      <th className="px-4 py-3">Balance</th>
                      <th className="px-4 py-3">Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holders.map((row) => (
                      <tr key={row.id} className="border-t border-white/10 bg-slate-900/70 text-slate-300">
                        <td className="px-4 py-3 text-white">{row.wallet}</td>
                        <td className="px-4 py-3">{row.balance}</td>
                        <td className="px-4 py-3">{row.share}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <div className="mb-4 flex items-center gap-2 text-white"><TrendingUp size={18} className="text-amber-400" /> Concentration insight</div>
              <div className="space-y-3 text-sm text-slate-400">
                <div className="rounded-xl border border-white/10 bg-slate-800/70 p-3">Top 10 holders control 61.8% of supply.</div>
                <div className="rounded-xl border border-white/10 bg-slate-800/70 p-3">Top 20 holders represent 81.4% of supply.</div>
                <div className="rounded-xl border border-white/10 bg-slate-800/70 p-3">Whale activity remains elevated and should be watched closely.</div>
              </div>
            </div>
          </section>
        </header>
      </div>
    </main>
  );
}
