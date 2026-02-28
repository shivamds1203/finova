import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useCurrency, CurrencyCode } from '../../providers/CurrencyContext';

const CURRENCIES: { code: CurrencyCode; label: string; flag: string }[] = [
    { code: 'USD', label: 'US Dollar', flag: '🇺🇸' },
    { code: 'INR', label: 'Indian Rupee', flag: '🇮🇳' },
    { code: 'EUR', label: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', label: 'British Pound', flag: '🇬🇧' },
    { code: 'JPY', label: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'CAD', label: 'Canadian Dollar', flag: '🇨🇦' },
];

export const CurrencySelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currency, setCurrency } = useCurrency();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedCurrency = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--surface-muted-active)] transition-all border border-[var(--border)] shadow-sm hover:shadow group"
            >
                <span className="text-base leading-none">{selectedCurrency.flag}</span>
                <span className="text-xs font-extrabold uppercase tracking-wider hidden sm:inline">{selectedCurrency.code}</span>
                <ChevronDown size={13} className={`transition-transform duration-300 opacity-70 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0 mt-2 w-56 bg-[var(--surface)] backdrop-blur-xl border border-[var(--border)] rounded-2xl shadow-premium z-50 overflow-hidden"
                    >
                        <div className="p-2 space-y-1">
                            {CURRENCIES.map((c) => (
                                <button
                                    key={c.code}
                                    onClick={() => {
                                        setCurrency(c.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${currency === c.code
                                        ? 'bg-primary/15 text-primary'
                                        : 'hover:bg-[var(--surface-muted)] text-[var(--text-primary)]'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg leading-none">{c.flag}</span>
                                        <div className="text-left">
                                            <div className="text-xs font-black uppercase tracking-wider">{c.code}</div>
                                            <div className="text-[10px] font-semibold opacity-40 leading-none mt-0.5">{c.label}</div>
                                        </div>
                                    </div>
                                    {currency === c.code && <Check size={14} className="shrink-0" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
