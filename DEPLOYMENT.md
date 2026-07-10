# Deployment Guide

## Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Set the environment variables from [.env.example](.env.example).
4. Deploy.

## Backend services

- Use PostgreSQL for persistent configuration and analytics history.
- Use Redis for caching and refresh coordination.
- Add a worker or cron job for periodic sync from Helius, Birdeye, and DexScreener.

## Production flow

1. Create the token on Solana.
2. Add the mint address and API credentials in the admin panel.
3. The dashboard will begin reading the configured token data automatically.
