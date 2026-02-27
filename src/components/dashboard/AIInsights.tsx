import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';

const INSIGHTS = [
    "You spent 15% more on dining this month. Consider setting a cap of $400 for next month.",
    "Your 'Tech Portfolio' is outperforming the S&P 500 by 4.2%. Great pick on NVDA!",
    "Found a potential $45/mo saving by switching your cloud subscription to an annual plan.",
    "Based on your savings rate, you are on track to reach your 'Home Downpayment' goal by June 2027."
];

const AIInsights = () => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let i = 0;
        const text = INSIGHTS[currentIdx];
        setDisplayText("");
        setIsTyping(true);

        const interval = setInterval(() => {
            setDisplayText(text.slice(0, i));
            i++;
            if (i > text.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [currentIdx]);

    return (
        <div className="card-premium p-8 h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-[var(--text-primary)]">AI Insights</h3>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Powered by Finova AI</p>
                    </div>
                </div>

                <div className="flex-1 min-h-[120px]">
                    <div className="flex gap-4">
                        <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                        <p className="text-[var(--text-primary)] font-medium leading-relaxed italic">
                            "{displayText}"
                            {isTyping && <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="inline-block w-2 h-5 bg-primary ml-1 align-middle" />}
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                    <div className="flex gap-1">
                        {INSIGHTS.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 rounded-full transition-all duration-300 ${i === currentIdx ? 'w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'w-2 bg-white/10'}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentIdx((currentIdx + 1) % INSIGHTS.length)}
                        className="p-2 rounded-full hover:bg-[var(--surface-muted)] shadow-sm border border-[var(--border-subtle)] text-text-secondary hover:text-primary transition-all group"
                    >
                        <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563EB 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        </div>
    );
};

export default AIInsights;
