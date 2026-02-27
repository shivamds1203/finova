import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X, ArrowRight, Zap, Target, PieChart, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const actions = [
        { icon: <Zap className="w-4 h-4" />, label: 'Add Expense', shortcut: 'E', action: () => navigate('/dashboard/expenses') },
        { icon: <Target className="w-4 h-4" />, label: 'Add Investment', shortcut: 'I', action: () => navigate('/dashboard/investments') },
        { icon: <PieChart className="w-4 h-4" />, label: 'View Analytics', shortcut: 'A', action: () => navigate('/dashboard/analytics') },
        { icon: <Settings className="w-4 h-4" />, label: 'Settings', shortcut: 'S', action: () => navigate('/dashboard/settings') },
    ];

    const filteredActions = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') setIsOpen(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery('');
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-md"
                    />

                    {/* Palette Container */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-xl bg-[var(--background)] rounded-[32px] shadow-2xl overflow-hidden border-2 border-[var(--border)]"
                    >
                        {/* Search Bar */}
                        <div className="flex items-center px-6 py-5 border-b border-[var(--border-subtle)]">
                            <Search className="w-5 h-5 text-text-secondary mr-3" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Type a command or search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] text-lg font-medium placeholder:text-text-secondary"
                            />
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-[var(--surface-muted)] rounded-lg text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                                <span>Esc</span>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="max-h-[400px] overflow-y-auto p-3 overscroll-contain scrollbar-hide">
                            <div className="px-3 py-2 text-[11px] font-bold text-text-secondary uppercase tracking-widest">
                                Quick Actions
                            </div>

                            <div className="grid gap-1">
                                {filteredActions.map((action, i) => (
                                    <motion.button
                                        key={action.label}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => { action.action(); setIsOpen(false); }}
                                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--surface-muted)] transition-all group active:scale-[0.98]"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-[var(--surface-muted)] flex items-center justify-center text-text-secondary group-hover:bg-[var(--text-primary)] group-hover:text-[var(--background)] transition-all duration-300">
                                                {action.icon}
                                            </div>
                                            <span className="font-semibold text-text-secondary group-hover:text-[var(--text-primary)]">{action.label}</span>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[10px] uppercase font-bold text-text-secondary">Jump to</span>
                                            <ArrowRight className="w-4 h-4 text-text-secondary translate-x-[-4px] group-hover:translate-x-0 transition-transform" />
                                        </div>
                                    </motion.button>
                                ))}
                                {filteredActions.length === 0 && (
                                    <div className="p-8 text-center">
                                        <div className="inline-flex w-12 h-12 rounded-2xl bg-[var(--surface-muted)] items-center justify-center text-text-secondary mb-3">
                                            <Search className="w-6 h-6" />
                                        </div>
                                        <p className="text-text-secondary font-medium">No commands found for "{query}"</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-[var(--surface-muted)] flex items-center justify-between border-t border-[var(--border-subtle)]">
                            <div className="flex items-center gap-4 text-text-secondary">
                                <div className="flex items-center gap-1">
                                    <div className="w-5 h-5 flex items-center justify-center bg-[var(--background)] border border-[var(--border-subtle)] rounded text-[10px] font-bold">↑</div>
                                    <div className="w-5 h-5 flex items-center justify-center bg-[var(--background)] border border-[var(--border-subtle)] rounded text-[10px] font-bold">↓</div>
                                    <span className="text-[10px] font-semibold text-text-secondary">Navigate</span>
                                </div>
                                <div className="flex items-center gap-1 ml-2">
                                    <div className="w-12 h-5 flex items-center justify-center bg-[var(--background)] border border-[var(--border-subtle)] rounded text-[10px] font-bold">Enter</div>
                                    <span className="text-[10px] font-semibold text-text-secondary">Select</span>
                                </div>
                            </div>
                            <Command className="w-4 h-4 text-text-secondary" />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
