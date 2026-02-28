import { motion } from 'framer-motion';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, History, CreditCard as CardIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCurrency } from '../providers/CurrencyContext';

const TRANSACTIONS = [
    { id: 1, title: 'Added from HDFC Bank', amount: 5000, date: '2024-03-20', type: 'in' },
    { id: 2, title: 'Paid for Coffee', amount: -250, date: '2024-03-19', type: 'out' },
    { id: 3, title: 'Received via UPI', amount: 1200, date: '2024-03-18', type: 'in' },
    { id: 4, title: 'Mobikwik Cashback', amount: 50, date: '2024-03-17', type: 'in' },
];

const Wallet = () => {
    const { formatCurrency, currency } = useCurrency();
    const [balance, setBalance] = useState(12450.75);
    const [isAddingMoney, setIsAddingMoney] = useState(false);
    const [amount, setAmount] = useState('');

    const handleAddMoney = (e: React.FormEvent) => {
        e.preventDefault();
        toast.loading("Initiating Razorpay gateway...", { id: "payment" });

        setTimeout(() => {
            toast.success("Successfully added " + formatCurrency(parseFloat(amount)), { id: "payment" });
            setBalance(prev => prev + parseFloat(amount));
            setIsAddingMoney(false);
            setAmount('');
        }, 2000);
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--text-primary)]">Digital Wallet</h1>
                    <p className="text-text-secondary mt-1">Manage your funds and instant payments.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsAddingMoney(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    Add Money
                </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Balance Card */}
                <div className="lg:col-span-5">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden p-8 rounded-[32px] bg-gradient-to-br from-primary to-primary-dark text-white shadow-2xl min-h-[240px] flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <WalletIcon size={120} />
                        </div>

                        <div className="relative z-10">
                            <span className="text-sm font-medium opacity-80 uppercase tracking-widest">Available Balance</span>
                            <div className="text-5xl font-black mt-2">{formatCurrency(balance)}</div>
                        </div>

                        <div className="relative z-10 flex gap-4 mt-8">
                            <div className="flex-1 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                                <div className="text-[10px] uppercase font-bold opacity-60">Income</div>
                                <div className="text-lg font-bold flex items-center gap-1">
                                    <ArrowDownLeft size={16} className="text-green-400" />
                                    {formatCurrency(6250).replace(/\.00$/, '')}
                                </div>
                            </div>
                            <div className="flex-1 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                                <div className="text-[10px] uppercase font-bold opacity-60">Expenses</div>
                                <div className="text-lg font-bold flex items-center gap-1">
                                    <ArrowUpRight size={16} className="text-red-400" />
                                    {formatCurrency(250).replace(/\.00$/, '')}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Recent Transactions */}
                <div className="lg:col-span-7">
                    <div className="p-8 rounded-[32px] bg-[var(--surface)] border border-[var(--border-subtle)] shadow-premium">
                        <div className="flex items-center gap-3 mb-6">
                            <History size={24} className="text-primary" />
                            <h2 className="text-xl font-black text-[var(--text-primary)]">Recent History</h2>
                        </div>

                        <div className="space-y-4">
                            {TRANSACTIONS.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--surface-muted)] transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === 'in' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                            }`}>
                                            {tx.type === 'in' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-[var(--text-primary)]">{tx.title}</div>
                                            <div className="text-xs text-text-secondary">{tx.date}</div>
                                        </div>
                                    </div>
                                    <div className={`font-black ${tx.type === 'in' ? 'text-green-500' : 'text-red-500'}`}>
                                        {tx.type === 'in' ? '+' : ''}{formatCurrency(Math.abs(tx.amount))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Simulated Add Money Modal */}
            {isAddingMoney && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsAddingMoney(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="relative w-full max-w-md bg-[var(--surface)] p-8 rounded-[32px] border border-[var(--border)] shadow-2xl"
                    >
                        <h2 className="text-2xl font-black text-[var(--text-primary)] mb-2">Add Money</h2>
                        <p className="text-text-secondary mb-6">Enter the amount to add using Razorpay UPI/Netbanking.</p>

                        <form onSubmit={handleAddMoney} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Amount ({currency})</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-text-muted">{currency === 'INR' ? '₹' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : ''}</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full pl-12 pr-4 py-6 bg-[var(--background)] border-2 border-[var(--border)] rounded-2xl text-2xl font-black focus:border-primary outline-none"
                                        autoFocus
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {['500', '1000', '2000', '5000'].map(val => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setAmount(val)}
                                        className="py-2 rounded-xl border border-[var(--border)] font-bold text-text-secondary hover:border-primary hover:text-primary transition-all"
                                    >
                                        + {formatCurrency(Number(val)).replace(/\.00$/, '')}
                                    </button>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 mt-4"
                            >
                                Secure Payment with Razorpay
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Wallet;
