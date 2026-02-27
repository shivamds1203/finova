import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight, Plus, Download, Sparkles } from 'lucide-react';
import OverviewCards from '../components/dashboard/OverviewCards';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import InvestmentPortfolio from '../components/dashboard/InvestmentPortfolio';
import AIInsights from '../components/dashboard/AIInsights';
import AddExpenseModal from '../components/dashboard/AddExpenseModal';
import HealthGauge from '../components/dashboard/HealthGauge';
import AIChat from '../components/dashboard/AIChat';
import { useFinancialHealth } from '../hooks/useFinancialHealth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    // Mock Dynamic Data for Health Engine
    const financialData = {
        income: 12500,
        expenses: 4200,
        savings: 3800,
        debt: 1200,
        investmentGrowth: 12.5
    };

    const { score, status } = useFinancialHealth(financialData);

    return (
        <div className="space-y-10">
            <AIChat />
            <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-[var(--text-primary)] font-bold text-[10px] text-[var(--background)] uppercase tracking-widest">Premium</span>
                        <div className="flex items-center gap-1 text-text-secondary text-[11px] font-bold uppercase tracking-widest">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            Ultra V3 Activated
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">
                        Financial Overview
                    </h1>
                    <p className="text-text-secondary font-medium mt-1">Greetings, Alex. Your financial health is <span style={{ color: status.color }} className="font-bold">{status.label.toLowerCase()}</span> today.</p>
                </motion.div>

                <div className="flex items-center gap-3">
                    <button className="btn-secondary-ultra py-2.5 flex items-center gap-2 text-sm">
                        <Download size={18} />
                        Export
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="btn-primary-ultra py-2.5 flex items-center gap-2 text-sm">
                        <Plus size={18} />
                        Add Expense
                    </button>
                </div>
            </div>

            {/* Overview Section with Gauge */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <OverviewCards />
                </div>
                <div>
                    <HealthGauge score={score} status={status} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2">
                    <ExpenseChart />
                </div>

                {/* AI Insights */}
                <div>
                    <AIInsights />
                </div>
            </div>

            {/* Investments */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3">
                    <InvestmentPortfolio />
                </div>
                <div onClick={() => navigate('/dashboard/investments')} className="bg-[var(--surface-muted)] rounded-[32px] p-8 flex flex-col justify-center overflow-hidden relative group cursor-pointer border-2 border-[var(--border)] shadow-2xl hover:scale-[1.02] transition-all">
                    <div className="relative z-10">
                        <h3 className="text-[var(--text-primary)] font-black text-2xl mb-2 italic">Portfolio Active</h3>
                        <p className="text-text-secondary text-sm mb-6 font-medium leading-relaxed">View your deep portfolio analytics and real-time stock alerts.</p>
                        <button className="w-full bg-[var(--background)] text-[var(--text-primary)] border border-[var(--border)] py-4 rounded-2xl text-sm font-bold shadow-xl active:scale-95 transition-all">Go to Investments</button>
                    </div>
                    {/* Decorative background element with animation */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
