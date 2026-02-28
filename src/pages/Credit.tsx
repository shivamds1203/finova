import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, AlertCircle, RefreshCcw, ShieldCheck, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCurrency } from '../providers/CurrencyContext';

const CARDS = [
    { id: 1, bank: 'HDFC Bank', last4: '4589', amount: 12500, due: '2024-03-25', status: 'pending' },
    { id: 2, bank: 'ICICI Bank', last4: '1022', amount: 4200, due: '2024-04-02', status: 'paid' },
    { id: 3, bank: 'SBI Card', last4: '8871', amount: 890, due: '2024-03-28', status: 'pending' },
];

const Credit = () => {
    const { formatCurrency } = useCurrency();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [score, setScore] = useState(748);

    const handleRefresh = () => {
        setIsRefreshing(true);
        toast.loading("Fetching data from Experian & Equifax...", { id: "cibil" });

        setTimeout(() => {
            const newScore = Math.floor(Math.random() * (850 - 700) + 700);
            setScore(newScore);
            setIsRefreshing(false);
            toast.success("CIBIL Score updated!", { id: "cibil" });
        }, 2500);
    };

    const getScoreColor = (val: number) => {
        if (val >= 750) return 'text-green-500';
        if (val >= 700) return 'text-primary';
        return 'text-red-500';
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--text-primary)]">Credit Health</h1>
                    <p className="text-text-secondary mt-1">Track your CIBIL score and card repayments.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl font-bold shadow-sm hover:bg-[var(--surface-muted)] transition-all disabled:opacity-50"
                >
                    <RefreshCcw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                    Refresh Scores
                </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* CIBIL Score Gauge */}
                <div className="lg:col-span-4">
                    <div className="p-10 rounded-[40px] bg-[var(--surface)] border border-[var(--border)] shadow-premium flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                            <ShieldCheck size={200} />
                        </div>

                        <div className="relative">
                            <svg className="w-48 h-48 transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    className="text-[var(--border-subtle)]"
                                />
                                <motion.circle
                                    initial={{ strokeDasharray: "0 553" }}
                                    animate={{ strokeDasharray: `${(score / 900) * 553} 553` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                    className="text-primary"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">CIBIL</span>
                                <span className={`text-6xl font-black ${getScoreColor(score)}`}>{score}</span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-2">
                            <div className="flex items-center gap-2 text-green-500 font-bold bg-green-500/10 px-4 py-2 rounded-full text-sm">
                                <ShieldCheck size={16} />
                                Excellent Credit Health
                            </div>
                            <p className="text-xs text-text-secondary px-4">Your score is in the top 10% of users in India. Keep it up!</p>
                        </div>
                    </div>
                </div>

                {/* Credit Cards and Bills */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="p-8 rounded-[32px] bg-[var(--surface)] border border-[var(--border-subtle)] shadow-premium">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-3">
                                <CreditCard size={24} className="text-primary" />
                                Credit Card Bills
                            </h2>
                            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">via Setu BBPS</span>
                        </div>

                        <div className="space-y-4">
                            {CARDS.map((card) => (
                                <motion.div
                                    key={card.id}
                                    whileHover={{ x: 5 }}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-3xl border border-[var(--border-subtle)] bg-[var(--background)] hover:border-primary/30 transition-all gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg relative overflow-hidden flex items-center justify-center text-white/40">
                                            <div className="absolute top-2 left-2 w-4 h-3 bg-yellow-500/20 rounded-sm" />
                                            <div className="text-[10px] font-black tracking-widest mt-4">•••• {card.last4}</div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-[var(--text-primary)]">{card.bank}</div>
                                            <div className="text-xs text-text-secondary">Due: {card.due}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-6">
                                        <div className="text-right">
                                            <div className="text-lg font-black text-[var(--text-primary)]">{formatCurrency(card.amount)}</div>
                                            <div className={`text-[10px] font-bold uppercase tracking-widest ${card.status === 'paid' ? 'text-green-500' : 'text-primary'
                                                }`}>
                                                {card.status === 'paid' ? 'Repayment Successful' : 'Repayment Due'}
                                            </div>
                                        </div>
                                        {card.status === 'pending' ? (
                                            <button
                                                onClick={() => toast.success(`Payment initiated for ${card.bank}`)}
                                                className="px-6 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                                            >
                                                Pay Now
                                            </button>
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                                                <CheckCircle2 size={24} />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Insights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 rounded-[28px] border-2 border-dashed border-[var(--border)] flex items-start gap-4">
                            <AlertCircle className="text-primary mt-1" />
                            <div>
                                <div className="font-bold text-[var(--text-primary)]">Avoid Inquiries</div>
                                <p className="text-xs text-text-secondary mt-1">Applying for multiple cards in 30 days can drop your score by 20 pts.</p>
                            </div>
                        </div>
                        <div className="p-6 rounded-[28px] bg-primary/5 border border-primary/20 flex items-start gap-4">
                            <ShieldCheck className="text-primary mt-1" />
                            <div>
                                <div className="font-bold text-[var(--text-primary)]">Limit Utilization</div>
                                <p className="text-xs text-text-secondary mt-1">Keep your credit usage below 30% for a better CIBIL score.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-8 rounded-[40px] bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center">
                        <ShieldCheck size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight">Financial Health Protection</h3>
                        <p className="text-sm text-text-secondary mt-1 max-w-md">Enable 24/7 credit monitoring to get instant alerts on any new loan or card applications in your name.</p>
                    </div>
                </div>
                <button className="px-8 py-4 bg-[var(--text-primary)] text-[var(--background)] rounded-2xl font-black text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                    Enable Monitoring
                </button>
            </motion.div>
        </div>
    );
};

export default Credit;
