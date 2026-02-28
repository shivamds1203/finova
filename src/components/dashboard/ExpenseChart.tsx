import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { TrendingUp, Activity, Sparkles } from 'lucide-react';
import { useCurrency } from '../../providers/CurrencyContext';

const DATA = [
    { name: 'Jan', expense: 2100, income: 4500 },
    { name: 'Feb', expense: 2800, income: 4200 },
    { name: 'Mar', expense: 3240, income: 4800 },
    { name: 'Apr', expense: 2400, income: 5100 },
    { name: 'May', expense: 2900, income: 4900 },
    { name: 'Jun', expense: 3500, income: 5500 },
];

const CustomTooltip = ({ active, payload, label, formatCurrency }: any) => {
    if (active && payload && payload.length) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-[var(--surface-muted)] text-[var(--text-primary)] p-4 rounded-2xl shadow-2xl border border-[var(--border-subtle)] backdrop-blur-md"
            >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2">{label}</p>
                <div className="space-y-1">
                    {payload.map((item: any) => (
                        <div key={item.name} className="flex items-center justify-between gap-8">
                            <span className="text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                                {item.name}
                            </span>
                            <span className="text-sm font-black">{formatCurrency(item.value)}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }
    return null;
};

const ExpenseChart = () => {
    const [filter, setFilter] = useState('Monthly');
    const { formatCurrency } = useCurrency();

    return (
        <div className="card-premium p-8 h-[450px] flex flex-col group overflow-visible relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="flex items-center justify-between mb-8 overflow-visible relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight flex items-center gap-2">
                            Cash Flow Visualizer
                            <Sparkles className="w-3 h-3 text-amber-500" />
                        </h3>
                        <p className="text-[11px] font-black text-text-secondary uppercase tracking-widest">Income vs Spending Analytics</p>
                    </div>
                </div>

                <div className="flex bg-white/5 backdrop-blur-[10px] p-1 rounded-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                    {['Weekly', 'Monthly', 'Yearly'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all relative ${filter === t ? 'text-[var(--text-primary)]' : 'text-text-secondary hover:text-[var(--text-primary)]'
                                }`}
                        >
                            {filter === t && (
                                <motion.div
                                    layoutId="chart-filter"
                                    className="absolute inset-0 bg-white/10 shadow-sm border border-white/10 rounded-lg z-0 backdrop-blur-md"
                                />
                            )}
                            <span className="relative z-10">{t}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 w-full overflow-visible">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.08} />
                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.08} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" strokeOpacity={0.5} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 800 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 800 }}
                            tickFormatter={(value) => formatCurrency(value)}
                        />
                        <Tooltip
                            content={<CustomTooltip formatCurrency={formatCurrency} />}
                            cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="basis"
                            dataKey="income"
                            stroke="#10b981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                            animationDuration={2500}
                        />
                        <Area
                            type="basis"
                            dataKey="expense"
                            stroke="#f43f5e"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ExpenseChart;
