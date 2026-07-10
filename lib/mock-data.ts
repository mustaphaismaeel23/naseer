export type TransactionRow = {
  id: number;
  wallet: string;
  type: 'Buy' | 'Sell' | 'Transfer';
  amount: string;
  time: string;
  impact: string;
  whale: boolean;
};

export type HolderRow = {
  id: number;
  wallet: string;
  balance: string;
  share: string;
  whale: boolean;
};

export type WhaleRow = {
  id: number;
  wallet: string;
  direction: 'Buy' | 'Sell';
  size: string;
  impact: string;
  time: string;
};

export const overviewMetrics = [
  { label: 'Price', value: '$0.36', change: '+12.4%' },
  { label: 'Market Cap', value: '$8.2M', change: '+8.1%' },
  { label: 'Liquidity', value: '$142K', change: '+3.5%' },
  { label: 'Volume', value: '$94K', change: '+17.0%' }
];

export const priceSeries = [
  { name: 'Jan', price: 0.12, marketCap: 4.1, volume: 42 },
  { name: 'Feb', price: 0.19, marketCap: 5.2, volume: 58 },
  { name: 'Mar', price: 0.18, marketCap: 5.9, volume: 64 },
  { name: 'Apr', price: 0.24, marketCap: 6.7, volume: 71 },
  { name: 'May', price: 0.31, marketCap: 7.3, volume: 80 },
  { name: 'Jun', price: 0.36, marketCap: 8.2, volume: 94 }
];

export const transactions: TransactionRow[] = [
  { id: 1, wallet: '7x4...6k2', type: 'Buy', amount: '$18.4K', time: '2m ago', impact: 'High', whale: true },
  { id: 2, wallet: 'Aq2...v8p', type: 'Sell', amount: '$9.8K', time: '6m ago', impact: 'Medium', whale: false },
  { id: 3, wallet: 'J8q...r1s', type: 'Transfer', amount: '1.2M NASEER', time: '12m ago', impact: 'Low', whale: false },
  { id: 4, wallet: 'M9p...t7x', type: 'Buy', amount: '$27.1K', time: '18m ago', impact: 'High', whale: true },
  { id: 5, wallet: 'F3n...w1b', type: 'Sell', amount: '$4.2K', time: '27m ago', impact: 'Medium', whale: false }
];

export const holders: HolderRow[] = [
  { id: 1, wallet: '5Aq...92L', balance: '12.4M', share: '18.2%', whale: true },
  { id: 2, wallet: '9Pz...1cX', balance: '8.8M', share: '12.9%', whale: true },
  { id: 3, wallet: 'Bv7...k8Q', balance: '6.1M', share: '8.9%', whale: false },
  { id: 4, wallet: 'L2m...r4Y', balance: '4.6M', share: '6.7%', whale: false },
  { id: 5, wallet: 'Q8s...p0H', balance: '3.8M', share: '5.6%', whale: false }
];

export const whales: WhaleRow[] = [
  { id: 1, wallet: '5Aq...92L', direction: 'Buy', size: '$86K', impact: 'Very High', time: '3m ago' },
  { id: 2, wallet: '9Pz...1cX', direction: 'Sell', size: '$42K', impact: 'High', time: '10m ago' },
  { id: 3, wallet: 'Wn4...f8b', direction: 'Buy', size: '$31K', impact: 'Medium', time: '21m ago' }
];

export const fallbackAnalytics = {
  metrics: overviewMetrics,
  priceSeries,
  recentTransactions: transactions,
  transactions,
  holders,
  whales,
  configuration: {
    heliusConfigured: false,
    birdeyeConfigured: false,
    rpcConfigured: false,
    dexscreenerConfigured: false
  }
};
