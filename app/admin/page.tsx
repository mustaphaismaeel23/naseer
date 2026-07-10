"use client";

import { useEffect, useState } from 'react';
import { Save, Settings2 } from 'lucide-react';

export default function AdminPage() {
  const [form, setForm] = useState({
    tokenMintAddress: '',
    heliusApiKey: '',
    birdeyeApiKey: '',
    solanaRpcUrl: '',
    dexscreenerApiUrl: '',
    refreshInterval: '60'
  });
  const [status, setStatus] = useState('Loading settings...');

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setForm({
          tokenMintAddress: data.tokenMintAddress || '',
          heliusApiKey: data.heliusApiKey || '',
          birdeyeApiKey: data.birdeyeApiKey || '',
          solanaRpcUrl: data.solanaRpcUrl || '',
          dexscreenerApiUrl: data.dexscreenerApiUrl || '',
          refreshInterval: String(data.refreshInterval || 60)
        });
        setStatus('Settings loaded');
      })
      .catch(() => setStatus('Unable to load settings'));
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus('Saving settings...');
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, refreshInterval: Number(form.refreshInterval) })
    });
    const data = await response.json();
    setStatus(data.success ? 'Settings saved successfully' : 'Failed to save settings');
  }

  return (
    <main className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-purple-950/30">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-purple-500/10 p-3 text-purple-300"><Settings2 size={20} /></div>
          <div>
            <h1 className="text-2xl font-semibold text-white">Admin configuration</h1>
            <p className="text-sm text-slate-400">Update the token mint address, API keys, RPC endpoint, and refresh settings without touching code.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-300">
              Token mint address
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-white" value={form.tokenMintAddress} onChange={(e) => setForm({ ...form, tokenMintAddress: e.target.value })} placeholder="TOKEN_MINT_ADDRESS" />
            </label>
            <label className="text-sm text-slate-300">
              Refresh interval (seconds)
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-white" type="number" min="15" max="3600" value={form.refreshInterval} onChange={(e) => setForm({ ...form, refreshInterval: e.target.value })} />
            </label>
            <label className="text-sm text-slate-300">
              Helius API key
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-white" value={form.heliusApiKey} onChange={(e) => setForm({ ...form, heliusApiKey: e.target.value })} placeholder="HELIUS_API_KEY" />
            </label>
            <label className="text-sm text-slate-300">
              Birdeye API key
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-white" value={form.birdeyeApiKey} onChange={(e) => setForm({ ...form, birdeyeApiKey: e.target.value })} placeholder="BIRDEYE_API_KEY" />
            </label>
            <label className="text-sm text-slate-300 md:col-span-2">
              Solana RPC URL
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-white" value={form.solanaRpcUrl} onChange={(e) => setForm({ ...form, solanaRpcUrl: e.target.value })} placeholder="https://api.mainnet-beta.solana.com" />
            </label>
            <label className="text-sm text-slate-300 md:col-span-2">
              DexScreener API URL
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-white" value={form.dexscreenerApiUrl} onChange={(e) => setForm({ ...form, dexscreenerApiUrl: e.target.value })} placeholder="https://api.dexscreener.com/latest/dex/tokens/" />
            </label>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-800/70 p-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <div>{status}</div>
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2 font-medium text-white transition hover:bg-purple-500">
              <Save size={16} /> Save configuration
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
