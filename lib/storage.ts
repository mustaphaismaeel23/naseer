import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { defaultSettings, parseSettings, type Settings } from './config';

const storageDir = path.join(process.cwd(), 'data');
const storageFile = path.join(storageDir, 'settings.json');

function ensureStorage() {
  if (!existsSync(storageDir)) {
    mkdirSync(storageDir, { recursive: true });
  }
}

export function loadSettings(): Settings {
  ensureStorage();
  if (!existsSync(storageFile)) {
    saveSettings(defaultSettings);
    return defaultSettings;
  }

  const raw = readFileSync(storageFile, 'utf8');
  return parseSettings(JSON.parse(raw));
}

export function saveSettings(settings: Settings) {
  ensureStorage();
  writeFileSync(storageFile, JSON.stringify(settings, null, 2));
}
