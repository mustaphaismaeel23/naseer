import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { defaultSettings, parseSettings, resolveSettings, type Settings } from './config';

const storageDir = path.join(process.cwd(), 'data');
const storageFile = path.join(storageDir, 'settings.json');

function ensureStorage() {
  if (!existsSync(storageDir)) {
    mkdirSync(storageDir, { recursive: true });
  }
}

export function loadSettings(): Settings {
  ensureStorage();

  let savedSettings: Settings;
  if (!existsSync(storageFile)) {
    saveSettings(defaultSettings);
    savedSettings = defaultSettings;
  } else {
    const raw = readFileSync(storageFile, 'utf8');
    savedSettings = resolveSettings(parseSettings(JSON.parse(raw)));
  }

  const mergedSettings = resolveSettings(savedSettings);
  if (JSON.stringify(mergedSettings) !== JSON.stringify(savedSettings)) {
    saveSettings(mergedSettings);
  }

  return mergedSettings;
}

export function saveSettings(settings: Settings) {
  ensureStorage();
  writeFileSync(storageFile, JSON.stringify(settings, null, 2));
}
