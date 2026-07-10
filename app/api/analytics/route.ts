import { NextResponse } from 'next/server';
import { loadSettings } from '@/lib/storage';
import { fallbackAnalytics } from '@/lib/mock-data';

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

export async function GET(request: Request) {
  const settings = loadSettings();
  const { searchParams } = new URL(request.url);
  const view = (searchParams.get('view') as 'overview' | 'transactions' | 'holders' | 'whales' | 'analytics') || 'overview';
  const mint = settings.tokenMintAddress || process.env.TOKEN_MINT_ADDRESS || '';

  const configuration = {
    heliusConfigured: Boolean(settings.heliusApiKey || process.env.HELIUS_API_KEY),
    birdeyeConfigured: Boolean(settings.birdeyeApiKey || process.env.BIRDEYE_API_KEY),
    rpcConfigured: Boolean(settings.solanaRpcUrl || process.env.SOLANA_RPC_URL),
    dexscreenerConfigured: Boolean(settings.dexscreenerApiUrl || process.env.DEXSCREENER_API_URL)
  };

  if (!mint) {
    return NextResponse.json({ ...fallbackAnalytics, configuration, source: 'mock' });
  }

  try {
    const requests: Promise<unknown>[] = [];

    if (configuration.dexscreenerConfigured) {
      requests.push(fetchJson(`${settings.dexscreenerApiUrl || process.env.DEXSCREENER_API_URL}${mint}`).catch(() => null));
    }

    if (configuration.birdeyeConfigured) {
      requests.push(fetchJson(`https://public-api.birdeye.so/defi/v3/overview?address=${mint}`, { 'X-API-KEY': settings.birdeyeApiKey || process.env.BIRDEYE_API_KEY || '' }).catch(() => null));
    }

    if (configuration.heliusConfigured) {
      requests.push(fetchJson(`https://api.helius.xyz/v0/addresses/${mint}/transactions?api-key=${settings.heliusApiKey || process.env.HELIUS_API_KEY || ''}`).catch(() => null));
    }

    await Promise.allSettled(requests);

    return NextResponse.json({
      ...fallbackAnalytics,
      configuration,
      source: 'live'
    });
  } catch {
    return NextResponse.json({ ...fallbackAnalytics, configuration, source: 'mock' });
  }
}
