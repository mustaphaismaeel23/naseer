import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { resolveSettings } from './config.ts';

test('resolveSettings uses .env values over saved settings and trims whitespace', () => {
  const originalCwd = process.cwd();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mahuta-config-'));

  try {
    process.chdir(tempDir);
    fs.writeFileSync(path.join(tempDir, '.env'), 'TOKEN_MINT_ADDRESS= 6w35ZYDQTrJwVPkuEBJG4QMjnBZceeW8QoerdEjRpump\nHELIUS_API_KEY= 775fd39c-51bf-443f-9e51-614078741020\n');

    const merged = resolveSettings({ tokenMintAddress: 'old-mint', heliusApiKey: 'old-key' });

    assert.equal(merged.tokenMintAddress, '6w35ZYDQTrJwVPkuEBJG4QMjnBZceeW8QoerdEjRpump');
    assert.equal(merged.heliusApiKey, '775fd39c-51bf-443f-9e51-614078741020');
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('loadSettings saves merged .env values into data/settings.json', () => {
  const originalCwd = process.cwd();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mahuta-storage-'));

  try {
    process.chdir(tempDir);
    fs.writeFileSync(path.join(tempDir, '.env'), 'TOKEN_MINT_ADDRESS= 6w35ZYDQTrJwVPkuEBJG4QMjnBZceeW8QoerdEjRpump\nHELIUS_API_KEY= 775fd39c-51bf-443f-9e51-614078741020\nSOLANA_RPC_URL=https://api.mainnet-beta.solana.com\n');

    const { loadSettings } = await import('./storage.ts');
    const settings = loadSettings();

    assert.equal(settings.tokenMintAddress, '6w35ZYDQTrJwVPkuEBJG4QMjnBZceeW8QoerdEjRpump');
    assert.equal(settings.heliusApiKey, '775fd39c-51bf-443f-9e51-614078741020');
    assert.equal(settings.solanaRpcUrl, 'https://api.mainnet-beta.solana.com');

    const saved = JSON.parse(fs.readFileSync(path.join(tempDir, 'data', 'settings.json'), 'utf8'));
    assert.equal(saved.tokenMintAddress, settings.tokenMintAddress);
    assert.equal(saved.heliusApiKey, settings.heliusApiKey);
    assert.equal(saved.solanaRpcUrl, settings.solanaRpcUrl);
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('resolveSettings uses the default MAHUTA mint when none is provided', () => {
  const merged = resolveSettings({});

  assert.equal(merged.tokenMintAddress, '6w35ZYDQTrJwVPkuEBJG4QMjnBZceeW8QoerdEjRpump');
});
