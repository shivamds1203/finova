import { motion } from 'framer-motion';
import { Download, Filter, Search, ArrowUpRight, ArrowDownRight, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCurrency } from '../providers/CurrencyContext';

const TRANSACTIONS = [
    { id: '1', date: '2026-02-27', description: 'Apple Store Purchase', category: 'Shopping', amount: -1299.00, status: 'Completed' },
    { id: '2', date: '2026-02-26', description: 'Monthly Salary', category: 'Income', amount: 8500.00, status: 'Completed' },
    { id: '3', date: '2026-02-25', description: 'Starbucks Coffee', category: 'Dining', amount: -6.50, status: 'Completed' },
    { id: '4', date: '2026-02-24', description: 'Rent Payment', category: 'Utilities', amount: -2400.00, status: 'Pending' },
    { id: '5', date: '2026-02-23', description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, status: 'Completed' },
    { id: '6', date: '2026-02-22', description: 'Uber Ride', category: 'Transport', amount: -24.50, status: 'Completed' },
];

const Reports = () => {
    const navigate = useNavigate();
    const { formatCurrency } = useCurrency();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-text-secondary hover:text-[var(--text-primary)] transition-colors mb-4 text-sm font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-text-primary">Financial Reports</h1>
                    <p className="text-text-secondary mt-1">Analyze and export your transaction history.</p>
                </div>
                <button onClick={() => toast.success('Downloading report...')} className="btn-primary py-2.5 flex items-center gap-2 text-sm">
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            <div className="card-premium overflow-hidden">
                <div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--surface-muted)] flex flex-col md:flex-row md:items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Filter transactions..."
                            className="w-full pl-10 pr-4 py-2 bg-[var(--background)] border border-[var(--border-subtle)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-[var(--text-primary)]"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => toast('Category filter coming soon')} className="btn-outline py-2 px-4 flex items-center gap-2 text-xs">
                            <Filter size={14} />
                            Category
                        </button>
                        <button onClick={() => toast('Status filter coming soon')} className="btn-outline py-2 px-4 flex items-center gap-2 text-xs">
                            Status
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[var(--surface-muted)] text-[10px] uppercase tracking-widest font-bold text-text-secondary border-b border-[var(--border-subtle)]">
                            <tr>
                                <th className="px-8 py-4">Transaction</th>
                                <th className="px-8 py-4">Date</th>
                                <th className="px-8 py-4">Category</th>
                                <th className="px-8 py-4">Amount</th>
                                <th className="px-8 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-subtle)]">
                            {TRANSACTIONS.map((tx, i) => (
                                <motion.tr
                                    key={tx.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-[var(--surface-muted)] transition-colors group"
                                >
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.amount > 0 ? 'bg-green-500/20 text-green-600' : 'bg-[var(--surface-muted)] border border-[var(--border-subtle)] text-text-secondary'}`}>
                                                <FileText size={16} />
                                            </div>
                                            <span className="text-sm font-bold text-[var(--text-primary)]">{tx.description}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm text-text-secondary">{tx.date}</td>
                                    <td className="px-8 py-5">
                                        <span className="px-2.5 py-1 bg-[var(--surface-muted)] border border-[var(--border-subtle)] rounded-full text-[10px] font-bold text-text-secondary uppercase">
                                            {tx.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-text-primary'}`}>
                                            {tx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount))}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Completed' ? 'bg-green-500' : 'bg-amber-500'}`} />
                                            <span className="text-xs font-medium text-text-secondary">{tx.status}</span>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--surface-muted)] flex items-center justify-between">
                    <span className="text-xs text-text-secondary font-medium">Showing 6 of 124 transactions</span>
                    <div className="flex items-center gap-2">
                        <button onClick={() => toast('No previous records')} className="btn-outline py-1.5 px-3 text-xs opacity-50 cursor-not-allowed">Previous</button>
                        <button onClick={() => toast('End of records')} className="btn-outline py-1.5 px-3 text-xs">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
