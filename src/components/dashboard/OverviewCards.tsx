import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Activity, Wallet, CreditCard } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useCurrency } from '../../providers/CurrencyContext';

const AnimatedNumber = ({ value }: { value: number }) => {
    const { formatCurrency } = useCurrency();
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (latest) => setDisplayValue(latest)
        });
        return () => controls.stop();
    }, [value]);

    return (
        <span>{formatCurrency(displayValue)}</span>
    );
};

const CARDS = [
    {
        title: "Total Balance",
        value: 54230.15,
        change: "+12.5%",
        trend: "up",
        icon: <DollarSign className="w-5 h-5" />,
        color: "text-[var(--text-primary)]",
        accent: "bg-[var(--text-primary)]/5"
    },
    {
        title: "Monthly Expense",
        value: 3240.50,
        change: "-4.2%",
        trend: "down",
        icon: <Activity className="w-5 h-5" />,
        color: "text-rose-600",
        accent: "bg-rose-50"
    },
    {
        title: "Investments",
        value: 128400.00,
        change: "+8.3%",
        trend: "up",
        icon: <Wallet className="w-5 h-5" />,
        color: "text-emerald-600",
        accent: "bg-emerald-50"
    },
    {
        title: "Active Credit",
        value: 1240.00,
        change: "+0.5%",
        trend: "up",
        icon: <CreditCard className="w-5 h-5" />,
        color: "text-blue-600",
        accent: "bg-blue-50"
    }
];

const OverviewCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARDS.map((card, i) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 100 }}
                    className="card-premium p-6 group cursor-default"
                >
                    <div className="flex items-start justify-between mb-6">
                        <div className={`w-12 h-12 rounded-2xl ${card.accent} ${card.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                            {card.icon}
                        </div>
                        <div className={`px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${card.trend === 'up' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'}`}>
                            {card.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {card.change}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-[11px] font-black text-text-secondary uppercase tracking-[0.1em]">
                            {card.title}
                        </p>
                        <h3 className="text-3xl font-black text-text-primary tracking-tight">
                            <AnimatedNumber value={card.value} />
                        </h3>
                    </div>

                    {/* Decorative bottom line */}
                    <div className="mt-6 h-1 w-full bg-[var(--surface-muted)] rounded-full overflow-hidden">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 1, delay: 0.6 + (i * 0.1) }}
                            className={`h-full w-1/3 rounded-full ${card.color.replace('text-', 'bg-')}`}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default OverviewCards;
