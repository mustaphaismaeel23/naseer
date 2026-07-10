# NASEER Token Analytics Platform

A production-ready Solana token analytics platform for $NASEER with a responsive crypto dashboard, admin configuration, and API integration layer.

## Features

- Responsive dark UI for token analytics
- Admin panel for mint address, API keys, RPC URL, and refresh interval
- REST endpoints for dashboard and analytics data
- Ready for deployment on Vercel with PostgreSQL and Redis support

## Environment variables

Create a `.env.local` file with:

```bash
TOKEN_MINT_ADDRESS=xxxxxxxxxxxxxxxx
HELIUS_API_KEY=
BIRDEYE_API_KEY=
SOLANA_RPC_URL=
DEXSCREENER_API_URL=https://api.dexscreener.com/latest/dex/tokens/
NEXT_PUBLIC_APP_NAME=NASEER Token Analytics
```

## Local development

```bash
npm install
npm run dev
```

## Deployment

- Frontend: Vercel
- Backend: Railway, Render, or VPS
- Database: PostgreSQL
- Cache: Redis

## Notes

The architecture is prepared so that another Solana token can be tracked later by changing only the token mint address.
