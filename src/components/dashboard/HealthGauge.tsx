import { motion } from 'framer-motion';
import { ShieldCheck, Info } from 'lucide-react';

interface HealthGaugeProps {
    score: number;
    status: {
        label: string;
        color: string;
    };
}

const HealthGauge = ({ score, status }: HealthGaugeProps) => {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="card-premium relative flex flex-col items-center justify-center p-6 rounded-[32px] overflow-hidden group">
            {/* Header */}
            <div className="w-full flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--text-primary)] flex items-center justify-center text-[var(--background)]">
                        <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-[var(--text-primary)]">Financial Health</span>
                </div>
                <button className="text-text-secondary hover:text-[var(--text-primary)] transition-colors">
                    <Info className="w-4 h-4" />
                </button>
            </div>

            {/* Gauge SVG */}
            <div className="relative w-48 h-48 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                    {/* Background Track */}
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        fill="none"
                        stroke="var(--border-subtle)"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                    {/* Highlight Glow (Behind) */}
                    <motion.circle
                        cx="96"
                        cy="96"
                        r={radius}
                        fill="none"
                        stroke={status.color}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="opacity-10 blur-md"
                    />
                    {/* Active Progress */}
                    <motion.circle
                        cx="96"
                        cy="96"
                        r={radius}
                        fill="none"
                        stroke={status.color}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>

                {/* Score Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl font-black text-[var(--text-primary)]"
                    >
                        {score}
                    </motion.span>
                    <span className="text-[10px] uppercase font-black text-text-secondary tracking-widest mt-[-4px]">Score</span>
                </div>
            </div>

            {/* Status Label */}
            <motion.div
                animate={{ backgroundColor: status.color + '10', color: status.color }}
                className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
            >
                {status.label}
            </motion.div>

            <p className="text-center text-xs text-text-secondary font-medium px-4">
                Your score is based on savings growth and expense management.
            </p>

            {/* Decorative Grid Backdrop */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            </div>
        </div>
    );
};

export default HealthGauge;
