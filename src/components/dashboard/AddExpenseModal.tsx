import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Tag, Calendar, MessageSquare, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import ReactConfetti from 'react-confetti';
import toast from 'react-hot-toast';

interface AddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddExpenseModal = ({ isOpen, onClose }: AddExpenseModalProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showConfetti, setShowConfetti] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = (data: any) => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowConfetti(true);
            toast.success('Expense added successfully!');

            setTimeout(() => {
                setShowConfetti(false);
                reset();
                onClose();
            }, 3000);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-lg bg-[var(--background)] rounded-modal shadow-2xl overflow-hidden border-2 border-[var(--border)]"
                    >
                        {showConfetti && <ReactConfetti width={500} height={600} recycle={false} numberOfPieces={200} gravity={0.3} />}

                        <div className="p-8 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--surface-muted)]">
                            <div>
                                <h2 className="text-2xl font-bold text-text-primary">New Expense</h2>
                                <p className="text-xs text-text-secondary font-bold uppercase tracking-wider mt-1">Record a transaction</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-[var(--surface)] rounded-full transition-colors border border-transparent hover:border-[var(--border-subtle)]">
                                <X size={20} className="text-text-secondary" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-text-primary ml-1">Amount</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary font-bold">$</div>
                                    <input
                                        {...register("amount", { required: true, pattern: /^\d*\.?\d*$/ })}
                                        type="text"
                                        placeholder="0.00"
                                        className="w-full pl-10 pr-4 py-4 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-input text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                    {errors.amount && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-red-500 font-bold">Required</motion.span>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text-primary ml-1">Category</label>
                                    <div className="relative">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                                        <select {...register("category")} className="w-full pl-10 pr-4 py-3 bg-[var(--surface-muted)] border border-[var(--border-subtle)] rounded-input text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[var(--text-primary)] transition-all">
                                            <option>Dining</option>
                                            <option>Shopping</option>
                                            <option>Transport</option>
                                            <option>Entertainment</option>
                                            <option>Utilities</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text-primary ml-1">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                                        <input type="date" {...register("date")} className="w-full pl-10 pr-4 py-3 bg-[var(--surface-muted)] border border-[var(--border-subtle)] rounded-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[var(--text-primary)] transition-all" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-text-primary ml-1">Note (Optional)</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-text-secondary" />
                                    <textarea rows={3} {...register("note")} placeholder="What was this for?" className="w-full pl-10 pr-4 py-4 bg-[var(--surface-muted)] border border-[var(--border-subtle)] rounded-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[var(--text-primary)] transition-all resize-none" />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={onClose} className="flex-1 py-4 text-sm font-bold text-text-secondary hover:bg-surface rounded-button transition-colors">Cancel</button>
                                <button
                                    disabled={isSubmitting}
                                    className="flex-[2] btn-primary py-4 flex items-center justify-center gap-2 relative overflow-hidden"
                                >
                                    {isSubmitting ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                                    ) : (
                                        <>
                                            <Check size={20} />
                                            Save Expense
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddExpenseModal;
