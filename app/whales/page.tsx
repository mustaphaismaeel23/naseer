"use client";

import { useEffect, useState } from 'react';
import { getAnalyticsSnapshot } from '@/lib/analytics-service';

export default function WhalesPage() {
  const [whales, setWhales] = useState<any[]>([]);

  useEffect(() => {
    getAnalyticsSnapshot('whales').then((snapshot) => setWhales(snapshot.whales));
  }, []);
  return (
    <main className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400">Whales</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Large transaction monitor</h1>
          <p className="mt-2 text-sm text-slate-400">Track major buy and sell orders with impact metrics and timing insights.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {whales.map((row) => (
            <div key={row.id} className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm text-slate-400">{row.wallet}</div>
                <div className={`rounded-full px-2 py-1 text-xs ${row.direction === 'Buy' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-300'}`}>
                  {row.direction}
                </div>
              </div>
              <div className="text-2xl font-semibold text-white">{row.size}</div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                <span>{row.impact}</span>
                <span>{row.time}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
