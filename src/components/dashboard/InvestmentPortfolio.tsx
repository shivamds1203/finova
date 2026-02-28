import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import { useCurrency } from '../../providers/CurrencyContext';

const STOCKS = [
    { name: 'Apple Inc.', symbol: 'AAPL', price: 182.63, change: '+1.24%', trend: 'up', data: [170, 175, 172, 178, 180, 182] },
    { name: 'Nvidia', symbol: 'NVDA', price: 785.38, change: '+4.52%', trend: 'up', data: [600, 650, 700, 720, 750, 785] },
    { name: 'Tesla', symbol: 'TSLA', price: 202.64, change: '-2.11%', trend: 'down', data: [220, 215, 210, 205, 198, 202] },
    { name: 'Bitcoin', symbol: 'BTC', price: 62450, change: '+3.85%', trend: 'up', data: [55000, 58000, 57000, 60000, 61000, 62450] },
];

const InvestmentPortfolio = () => {
    const { formatCurrency } = useCurrency();
    return (
        <div className="card-premium h-full overflow-hidden flex flex-col">
            <div className="p-8 border-b border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-text-primary">Investment Portfolio</h3>
                    <p className="text-sm text-text-secondary">Your assets at a glance</p>
                </div>
                <button className="text-sm font-bold text-primary hover:underline">View All</button>
            </div>

            <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left relative z-10">
                    <thead className="bg-white/5 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold text-text-secondary border-b border-white/10">
                        <tr>
                            <th className="px-8 py-4">Asset</th>
                            <th className="px-8 py-4">Price</th>
                            <th className="px-8 py-4">Change</th>
                            <th className="px-8 py-4">Performance</th>
                            <th className="px-8 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {STOCKS.map((stock, i) => (
                            <motion.tr
                                key={stock.symbol}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group hover:bg-surface/50 transition-colors"
                            >
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[var(--surface-muted)] flex items-center justify-center font-bold text-text-primary text-xs">
                                            {stock.symbol[0]}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-text-primary">{stock.name}</div>
                                            <div className="text-[10px] text-text-secondary font-bold">{stock.symbol}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="text-sm font-bold text-text-primary">{formatCurrency(stock.price)}</div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className={`flex items-center gap-1 text-sm font-bold ${stock.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                                        {stock.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                        {stock.change}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="w-24 h-12">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={stock.data.map((d, idx) => ({ val: d }))}>
                                                <Area
                                                    type="monotone"
                                                    dataKey="val"
                                                    stroke={stock.trend === 'up' ? '#16A34A' : '#DC2626'}
                                                    fill={stock.trend === 'up' ? '#16A34A33' : '#DC262633'}
                                                    strokeWidth={2}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button className="p-2 text-text-secondary hover:text-text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvestmentPortfolio;
