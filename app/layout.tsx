import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MAHUTA Token Analytics',
  description: 'Production-ready analytics dashboard for the MAHUTA token on Solana.'
};

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/holders', label: 'Holders' },
  { href: '/whales', label: 'Whales' },
  { href: '/analytics', label: 'Analytics' }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-950">
          <nav className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
              <div className="text-lg font-semibold text-white">MAHUTA Analytics</div>
              <div className="flex flex-wrap gap-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-full border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-purple-500/40 hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
