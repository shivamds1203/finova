import { motion } from 'framer-motion';
import { ArrowLeft, BarChart2, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CASH_FLOW_DATA = [
    { name: 'Jan', in: 12500, out: 8200 },
    { name: 'Feb', in: 13200, out: 9100 },
    { name: 'Mar', in: 14800, out: '8400' },
    { name: 'Apr', in: 12100, out: 7200 },
    { name: 'May', in: 15400, out: 10500 },
    { name: 'Jun', in: 16800, out: 9200 },
];

const Analytics = () => {
    const navigate = useNavigate();
    const [activeRange, setActiveRange] = useState('6M');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-text-secondary hover:text-[var(--text-primary)] transition-colors mb-4 text-sm font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </button>
                    <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">Intelligence & Analytics</h1>
                    <p className="text-text-secondary font-medium mt-1">Deep institutional-grade insights into your capital flow.</p>
                </div>

                <div className="flex gap-2">
                    {['1M', '3M', '6M', 'YTD', 'ALL'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setActiveRange(range)}
                            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${activeRange === range ? 'bg-[var(--text-primary)] text-[var(--background)] shadow-premium' : 'bg-[var(--surface-muted)] text-text-secondary hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border)]'}`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cash Flow Analysis */}
                <div className="card-premium p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-1">Net Cash Flow</div>
                            <div className="text-3xl font-black text-[var(--text-primary)]">+$34,500.00</div>
                        </div>
                        <div className="p-3 rounded-xl bg-[var(--surface-muted)] border-2 border-[var(--border)]">
                            <BarChart2 className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={CASH_FLOW_DATA} barGap={8}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: 'var(--text-secondary)' }} />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '16px', border: '2px solid var(--border)', backgroundColor: 'var(--surface)', fontWeight: 'bold', color: 'var(--text-primary)' }}
                                />
                                <Bar dataKey="in" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                <Bar dataKey="out" fill="#F43F5E" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <span className="text-sm font-bold text-text-secondary">Money In</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <span className="text-sm font-bold text-text-secondary">Money Out</span>
                        </div>
                    </div>
                </div>

                {/* Growth Velocity */}
                <div className="card-premium p-8 bg-[var(--text-primary)] border-[var(--text-primary)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/30 transition-all duration-700" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-2 text-[var(--background)]/80 font-bold uppercase tracking-widest text-xs">
                            <TrendingUp className="w-4 h-4" /> AI Trajectory Forecast
                        </div>
                        <h3 className="text-3xl font-black text-[var(--background)] mb-4">You are pacing to save<br />$45,000 this year.</h3>
                        <p className="text-[var(--background)]/70 text-sm font-medium mb-auto">Based on your rolling 90-day expenditure run rate and median income velocity, our engine projects a strong surplus.</p>

                        <div className="mt-8 bg-[var(--background)]/10 backdrop-blur-md rounded-2xl p-6 border border-[var(--background)]/20">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[var(--background)] text-sm font-bold">Goal Completion: $100k</span>
                                <span className="text-[var(--background)] text-sm font-black text-primary group-hover:text-primary transition-colors">45%</span>
                            </div>
                            <div className="w-full bg-[var(--background)]/20 rounded-full h-2 mb-4 overflow-hidden">
                                <motion.div
                                    className="bg-primary h-full rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: '45%' }}
                                    transition={{ duration: 1.5, delay: 0.2 }}
                                />
                            </div>
                            <button onClick={() => toast('Target parameters are locked for this session')} className="w-full py-3 bg-[var(--background)] text-[var(--text-primary)] rounded-xl text-sm font-bold shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                                Adjust Target Parameters <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Analytics;
