import { NextResponse } from 'next/server';
import { loadSettings, saveSettings } from '@/lib/storage';
import { parseSettings } from '@/lib/config';

export async function GET() {
  return NextResponse.json(loadSettings());
}

export async function POST(request: Request) {
  const body = await request.json();
  const settings = parseSettings(body);
  saveSettings(settings);
  return NextResponse.json({ success: true, settings });
}
