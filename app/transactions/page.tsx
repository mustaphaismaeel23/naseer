"use client";

import { useEffect, useMemo, useState } from 'react';
import { Search, ArrowRightLeft } from 'lucide-react';
import { getAnalyticsSnapshot } from '@/lib/analytics-service';

export default function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [whaleOnly, setWhaleOnly] = useState(false);
  const [txRows, setTxRows] = useState<any[]>([]);

  useEffect(() => {
    getAnalyticsSnapshot('transactions').then((snapshot) => setTxRows(snapshot.transactions));
  }, []);

  const filtered = useMemo(() => {
    return txRows.filter((row) => {
      const matchesSearch = [row.wallet, row.type, row.amount, row.time].join(' ').toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'All' || row.type === typeFilter;
      const matchesWhale = !whaleOnly || row.whale;
      return matchesSearch && matchesType && matchesWhale;
    });
  }, [search, typeFilter, whaleOnly]);

  return (
    <main className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl border border-white/10 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-400">Transactions</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Live transaction explorer</h1>
          <p className="mt-2 text-sm text-slate-400">Search, filter, and isolate whale-driven activity across the NASEER token.</p>
        </header>

        <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <label className="flex-1 text-sm text-slate-300">
              Search wallet or amount
              <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-slate-800 px-3 py-2">
                <Search size={16} className="mr-2 text-slate-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-transparent text-white outline-none" placeholder="Search" />
              </div>
            </label>
            <label className="text-sm text-slate-300">
              Type
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="mt-2 rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-white">
                <option>All</option>
                <option>Buy</option>
                <option>Sell</option>
                <option>Transfer</option>
              </select>
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" checked={whaleOnly} onChange={() => setWhaleOnly((value) => !value)} />
              Whale-only
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
          <div className="mb-4 flex items-center gap-2 text-white"><ArrowRightLeft size={18} className="text-cyan-400" /> Recent transactions</div>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-800/80 text-slate-300">
                <tr>
                  <th className="px-4 py-3">Wallet</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Impact</th>
                  <th className="px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-t border-white/10 bg-slate-900/70 text-slate-300">
                    <td className="px-4 py-3 text-white">{row.wallet}</td>
                    <td className="px-4 py-3">{row.type}</td>
                    <td className="px-4 py-3">{row.amount}</td>
                    <td className="px-4 py-3">{row.impact}</td>
                    <td className="px-4 py-3">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
