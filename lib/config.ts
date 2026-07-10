import { z } from 'zod';

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

export const defaultSettings: Settings = settingsSchema.parse({});
