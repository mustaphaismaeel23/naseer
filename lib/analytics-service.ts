import { fallbackAnalytics } from './mock-data';

type AnalyticsView = 'overview' | 'transactions' | 'holders' | 'whales' | 'analytics';

type AnalyticsPayload = {
  metrics: Array<{ label: string; value: string; change: string }>;
  priceSeries: Array<{ name: string; price: number; marketCap: number; volume: number }>;
  recentTransactions: Array<{ id: number; wallet: string; type: string; amount: string; time: string; impact: string; whale: boolean }>;
  transactions: Array<{ id: number; wallet: string; type: string; amount: string; time: string; impact: string; whale: boolean }>;
  holders: Array<{ id: number; wallet: string; balance: string; share: string; whale: boolean }>;
  whales: Array<{ id: number; wallet: string; direction: 'Buy' | 'Sell'; size: string; impact: string; time: string }>;
  configuration: {
    heliusConfigured: boolean;
    birdeyeConfigured: boolean;
    rpcConfigured: boolean;
    dexscreenerConfigured: boolean;
  };
  source: 'live' | 'mock';
};

function buildFallbackPayload(view: AnalyticsView): AnalyticsPayload {
  const base = fallbackAnalytics as AnalyticsPayload;

  if (view === 'transactions') {
    return { ...base, recentTransactions: base.transactions, transactions: base.transactions, source: 'mock' };
  }

  if (view === 'holders') {
    return { ...base, holders: base.holders, source: 'mock' };
  }

  if (view === 'whales') {
    return { ...base, whales: base.whales, source: 'mock' };
  }

  if (view === 'analytics') {
    return { ...base, source: 'mock' };
  }

  return { ...base, recentTransactions: base.transactions, source: 'mock' };
}

export async function getAnalyticsSnapshot(view: AnalyticsView = 'overview'): Promise<AnalyticsPayload> {
  try {
    const response = await fetch(`/api/analytics?view=${view}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Analytics API unavailable');
    }

    const payload = await response.json();
    return { ...buildFallbackPayload(view), ...payload, source: payload.source || 'live' };
  } catch {
    return buildFallbackPayload(view);
  }
}
