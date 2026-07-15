import { z } from 'zod';
import { existsSync, readFileSync } from 'fs';
import path from 'path';

export const settingsSchema = z.object({
  tokenMintAddress: z.string().default(''),
  heliusApiKey: z.string().default(''),
  birdeyeApiKey: z.string().default(''),
  solanaRpcUrl: z.string().default(''),
  dexscreenerApiUrl: z.string().default('https://api.dexscreener.com/latest/dex/tokens/'),
  refreshInterval: z.coerce.number().int().min(15).max(3600).default(60)
});

export type Settings = z.infer<typeof settingsSchema>;

export function parseSettings(input: unknown): Settings {
  return settingsSchema.parse(input);
}

export const defaultSettings: Settings = settingsSchema.parse({
  tokenMintAddress: '6w35ZYDQTrJwVPkuEBJG4QMjnBZceeW8QoerdEjRpump'
});

function readEnvFile(): Record<string, string> {
  const envPath = path.join(process.cwd(), '.env');
  if (!existsSync(envPath)) {
    return {};
  }

  const content = readFileSync(envPath, 'utf8');
  return content.split(/\r?\n/).reduce<Record<string, string>>((acc, line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      return acc;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      return acc;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (key) {
      acc[key] = value;
    }

    return acc;
  }, {});
}

export function resolveSettings(savedSettings: Partial<Settings> = {}): Settings {
  const envValues = readEnvFile();
  const merged = {
    ...defaultSettings,
    ...savedSettings,
    tokenMintAddress: envValues.TOKEN_MINT_ADDRESS?.trim() || savedSettings.tokenMintAddress || '',
    heliusApiKey: envValues.HELIUS_API_KEY?.trim() || savedSettings.heliusApiKey || '',
    birdeyeApiKey: envValues.BIRDEYE_API_KEY?.trim() || savedSettings.birdeyeApiKey || '',
    solanaRpcUrl: envValues.SOLANA_RPC_URL?.trim() || savedSettings.solanaRpcUrl || '',
    dexscreenerApiUrl: envValues.DEXSCREENER_API_URL?.trim() || savedSettings.dexscreenerApiUrl || defaultSettings.dexscreenerApiUrl,
    refreshInterval: savedSettings.refreshInterval ?? defaultSettings.refreshInterval
  };

  return parseSettings(merged);
}
