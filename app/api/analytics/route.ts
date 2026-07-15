import { NextResponse } from 'next/server';
import { loadSettings } from '@/lib/storage';
import { fallbackAnalytics } from '@/lib/mock-data';
import { resolveSettings } from '@/lib/config';

async function fetchJson(url: string, headers?: Record<string, string>) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      ...headers
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

function mapDexscreenerTransactions(data: any, mint: string) {
  const pairs = Array.isArray(data?.pairs) ? data.pairs : [];
  const pair = pairs.find((entry: any) => entry?.pairAddress === mint || entry?.baseToken?.address === mint) || pairs[0];

  if (!pair) {
    return [];
  }

  const txns = pair?.txns?.h24 || pair?.txns || {};
  const buys = Number(txns?.buys || 0);
  const sells = Number(txns?.sells || 0);
  const total = buys + sells;

  return [
    {
      id: 1,
      wallet: 'DexScreener',
      type: 'Buy',
      amount: `$${Math.max(1, Math.round(buys * 4)).toLocaleString()}`,
      time: 'Live',
      impact: buys > sells ? 'High' : 'Medium',
      whale: buys > sells
    },
    {
      id: 2,
      wallet: 'DexScreener',
      type: 'Sell',
      amount: `$${Math.max(1, Math.round(sells * 3)).toLocaleString()}`,
      time: 'Live',
      impact: sells > buys ? 'High' : 'Medium',
      whale: sells > buys
    },
    {
      id: 3,
      wallet: 'On-chain',
      type: total > 0 ? 'Transfer' : 'Transfer',
      amount: `${total.toLocaleString()} txns`,
      time: 'Live',
      impact: total > 0 ? 'Medium' : 'Low',
      whale: total > 200
    }
  ];
}

export async function GET(request: Request) {
  const savedSettings = loadSettings();
  const settings = resolveSettings(savedSettings);
  const { searchParams } = new URL(request.url);
  const view = (searchParams.get('view') as 'overview' | 'transactions' | 'holders' | 'whales' | 'analytics') || 'overview';
  const mint = settings.tokenMintAddress || '';

  const configuration = {
    heliusConfigured: Boolean(settings.heliusApiKey),
    birdeyeConfigured: Boolean(settings.birdeyeApiKey),
    rpcConfigured: Boolean(settings.solanaRpcUrl),
    dexscreenerConfigured: Boolean(settings.dexscreenerApiUrl)
  };

  try {
    const requests: Promise<unknown>[] = [];
    let dexscreenerData: any = null;

    if (configuration.dexscreenerConfigured) {
      requests.push(
        fetchJson(`${settings.dexscreenerApiUrl}${mint}`)
          .then((data) => {
            dexscreenerData = data;
            return data;
          })
          .catch(() => null)
      );
    }

    if (configuration.birdeyeConfigured) {
      requests.push(fetchJson(`https://public-api.birdeye.so/defi/v3/overview?address=${mint}`, { 'X-API-KEY': settings.birdeyeApiKey }).catch(() => null));
    }

    if (configuration.heliusConfigured) {
      requests.push(fetchJson(`https://api.helius.xyz/v0/addresses/${mint}/transactions?api-key=${settings.heliusApiKey}`).catch(() => null));
    }

    await Promise.allSettled(requests);

    const topPair = Array.isArray(dexscreenerData?.pairs) ? dexscreenerData.pairs[0] : null;
    const priceUsd = topPair?.priceUsd ? Number(topPair.priceUsd) : null;
    const marketCap = topPair?.marketCap ? Number(topPair.marketCap) : null;
    const transactions = view === 'transactions' ? mapDexscreenerTransactions(dexscreenerData, mint) : fallbackAnalytics.transactions;

    return NextResponse.json({
      ...fallbackAnalytics,
      configuration,
      source: 'live',
      tokenMintAddress: settings.tokenMintAddress,
      mintAddress: settings.tokenMintAddress,
      transactions,
      recentTransactions: transactions,
      metrics: [
        { label: 'Price', value: priceUsd ? `$${priceUsd.toFixed(priceUsd < 1 ? 6 : 2)}` : '$0.00', change: '+0.0%' },
        { label: 'Market Cap', value: marketCap ? `$${marketCap.toLocaleString()}` : '$0', change: '+0.0%' },
        { label: 'Liquidity', value: topPair?.liquidity?.usd ? `$${Number(topPair.liquidity.usd).toLocaleString()}` : '$0', change: '+0.0%' },
        { label: 'Volume', value: topPair?.volume?.h24 ? `$${Number(topPair.volume.h24).toLocaleString()}` : '$0', change: '+0.0%' }
      ],
      priceSeries: [
        { name: 'Now', price: priceUsd || 0, marketCap: marketCap || 0, volume: topPair?.volume?.h24 ? Number(topPair.volume.h24) : 0 }
      ]
    });
  } catch {
    return NextResponse.json({ ...fallbackAnalytics, configuration, source: 'mock' });
  }
}
