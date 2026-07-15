"use client";

import { useEffect, useState } from 'react';
import { Activity, CandlestickChart, ShieldCheck, Wallet2, TrendingUp, Settings2 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getAnalyticsSnapshot } from '@/lib/analytics-service';

export default function HomePage() {
  const [snapshot, setSnapshot] = useState<any>(null);

  useEffect(() => {
    getAnalyticsSnapshot('overview').then(setSnapshot);
  }, []);

  if (!snapshot) {
    return <main className="min-h-screen bg-slate-950 p-8 text-white">Loading analytics…</main>;
  }

  const transactions = snapshot.recentTransactions.slice(0, 3);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.2),_transparent_30%),linear-gradient(135deg,_#020617,_#0f172a)] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-purple-950/30 backdrop-blur xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-purple-400">MAHUTA Analytics</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Official token intelligence dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Monitor live blockchain activity, market health, holders, and whale behavior for the MAHUTA token.</p>
            <p className="mt-2 text-sm text-purple-300">
              Active mint: <span className="font-mono text-purple-200">{snapshot.tokenMintAddress || snapshot.mintAddress || 'Not configured'}</span>
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            <div className="flex items-center gap-2"><ShieldCheck size={16} /> Live sync enabled</div>
            <div className="mt-1 text-xs text-emerald-200/80">Helius, Birdeye, DexScreener, and RPC connected</div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {snapshot.metrics.map((metric: any) => (
            <div key={metric.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <div className="text-sm text-slate-400">{metric.label}</div>
              <div className="mt-3 flex items-end justify-between">
                <div className="text-2xl font-semibold text-white">{metric.value}</div>
                <div className="text-sm text-emerald-400">{metric.change}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Price performance</p>
                <h2 className="text-xl font-semibold text-white">Historical trend</h2>
              </div>
              <div className="rounded-full bg-purple-500/10 p-2 text-purple-300"><CandlestickChart size={18} /></div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={snapshot.priceSeries}>
                  <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="marketCap" stroke="#34d399" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <div className="mb-4 flex items-center gap-2 text-white"><Activity size={18} className="text-cyan-400" /> Live activity</div>
              <div className="space-y-3">
                {transactions.map((item: any) => (
                  <div key={item.wallet} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/70 px-3 py-3">
                    <div>
                      <div className="text-sm font-medium text-white">{item.type}</div>
                      <div className="text-xs text-slate-400">{item.wallet}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white">{item.amount}</div>
                      <div className="text-xs text-slate-400">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white"><Wallet2 size={18} className="text-emerald-400" /> Community metrics</div>
                <div className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">+24.8%</div>
              </div>
              <div className="space-y-3 text-sm text-slate-400">
                <div className="flex items-center justify-between"><span>Unique holders</span><span className="font-semibold text-white">4,812</span></div>
                <div className="flex items-center justify-between"><span>Whale wallets</span><span className="font-semibold text-white">68</span></div>
                <div className="flex items-center justify-between"><span>Social sentiment</span><span className="font-semibold text-white">Bullish</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <div className="mb-4 flex items-center gap-2 text-white"><TrendingUp size={18} className="text-amber-400" /> Market intelligence</div>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/70 px-3 py-3"><span>Buy pressure</span><span className="font-semibold text-white">62%</span></div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/70 px-3 py-3"><span>Sell pressure</span><span className="font-semibold text-white">38%</span></div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/70 px-3 py-3"><span>FDV</span><span className="font-semibold text-white">$9.4M</span></div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <div className="mb-4 flex items-center gap-2 text-white"><Settings2 size={18} className="text-purple-400" /> Configuration-ready dashboard</div>
            <p className="text-sm text-slate-400">Use environment variables and configured settings to manage token mint address, API keys, RPC endpoint, and refresh behavior.</p>
            <div className="mt-4 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 text-sm text-purple-200">Configuration is centralized in one settings interface so another Solana token can be tracked by changing the mint address only.</div>
          </div>
        </section>
      </div>
    </main>
  );
}
