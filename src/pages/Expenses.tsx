import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Search, Download, Plus, Receipt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import AddExpenseModal from '../components/dashboard/AddExpenseModal';
import { useCurrency } from '../providers/CurrencyContext';
import toast from 'react-hot-toast';

const EXPENSES_DATA = [
    { id: 1, merchant: "Apple Store", category: "Technology", date: "Oct 24, 2026", amount: 1299.00, status: "Completed" },
    { id: 2, merchant: "Whole Foods Market", category: "Groceries", date: "Oct 23, 2026", amount: 142.50, status: "Completed" },
    { id: 3, merchant: "Uber", category: "Transport", date: "Oct 22, 2026", amount: 24.15, status: "Completed" },
    { id: 4, merchant: "AWS Services", category: "Software", date: "Oct 20, 2026", amount: 450.00, status: "Completed" },
    { id: 5, merchant: "Starbucks", category: "Food & Drink", date: "Oct 19, 2026", amount: 6.45, status: "Pending" },
    { id: 6, merchant: "Equinox Fitness", category: "Health", date: "Oct 15, 2026", amount: 250.00, status: "Completed" },
];

const Expenses = () => {
    const navigate = useNavigate();
    const { formatCurrency } = useCurrency();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredExpenses = useMemo(() => {
        if (!searchQuery) return EXPENSES_DATA;
        const query = searchQuery.toLowerCase();
        return EXPENSES_DATA.filter(exp =>
            exp.merchant.toLowerCase().includes(query) ||
            exp.category.toLowerCase().includes(query) ||
            exp.status.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const handleExportCSV = () => {
        const headers = ['ID', 'Merchant', 'Category', 'Date', 'Amount', 'Status'];
        const rows = EXPENSES_DATA.map(exp => [
            exp.id,
            `"${exp.merchant}"`,
            `"${exp.category}"`,
            `"${exp.date}"`,
            exp.amount,
            `"${exp.status}"`
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(',') + '\n'
            + rows.map(e => e.join(',')).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "finova_expenses.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
        >
            <AddExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-text-secondary hover:text-[var(--text-primary)] transition-colors mb-4 text-sm font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </button>
                    <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">Active Expenses</h1>
                    <p className="text-text-secondary font-medium mt-1">Track, categorize, and report your spending history.</p>
                </div>

                <div className="flex gap-3 h-[48px]">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-full bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-xl pl-10 pr-4 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:border-primary transition-colors placeholder:text-text-secondary"
                        />
                    </div>
                    <button onClick={() => toast('Advanced filters coming soon')} className="h-full px-4 border-2 border-[var(--border)] rounded-xl bg-[var(--surface-muted)] text-[var(--text-primary)] hover:border-[var(--text-primary)] flex items-center justify-center transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="h-full px-6 bg-[var(--text-primary)] text-[var(--background)] rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <Plus className="w-4 h-4" /> Add Manual
                    </button>
                </div>
            </div>

            <div className="card-premium overflow-hidden">
                <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[var(--surface-muted)] rounded-xl border-2 border-[var(--border)] shadow-sm">
                            <Receipt className="w-5 h-5 text-[var(--text-primary)]" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)]">Recent Transactions</h3>
                    </div>
                    <button onClick={handleExportCSV} className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[var(--surface-muted)] text-[10px] uppercase tracking-widest font-black text-text-secondary border-b border-[var(--border-subtle)]">
                            <tr>
                                <th className="px-8 py-4">Transaction Details</th>
                                <th className="px-8 py-4">Category</th>
                                <th className="px-8 py-4">Date</th>
                                <th className="px-8 py-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-subtle)]">
                            {filteredExpenses.map((expense, i) => (
                                <motion.tr
                                    key={expense.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * i }}
                                    className="group hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
                                >
                                    <td className="px-8 py-5">
                                        <div className="text-sm font-bold text-[var(--text-primary)]">{expense.merchant}</div>
                                        <div className="text-[10px] font-bold text-text-secondary mt-0.5">{expense.status}</div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[var(--surface)] border border-[var(--border)] text-text-secondary">
                                            {expense.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="text-sm font-bold text-[var(--text-primary)]">{expense.date}</div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="text-sm font-black text-[var(--text-primary)]">
                                            -{formatCurrency(expense.amount)}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                            {filteredExpenses.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-8 text-center text-text-secondary font-bold">
                                        No transactions found matching "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default Expenses;
