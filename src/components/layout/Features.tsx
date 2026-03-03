import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { TrendingUp, CreditCard, PieChart, Shield } from 'lucide-react';

const FEATURE_DATA = [
    {
        title: "Track Expenses in Real-Time",
        description: "Every coffee, every subscription, every bill. Finova captures your spending instantly and categorizes it with AI precision.",
        icon: <CreditCard className="w-6 h-6" />,
        color: "bg-blue-500"
    },
    {
        title: "Portfolio Mastery",
        description: "Connect your stocks, crypto, and real estate. Watch your net worth grow with live market updates and performance heatmaps.",
        icon: <TrendingUp className="w-6 h-6" />,
        color: "bg-green-500"
    },
    {
        title: "AI-Powered Insights",
        description: "Our proprietary algorithm analyzes your habits to find hidden savings. It's like having a YC-backed CFO in your pocket.",
        icon: <PieChart className="w-6 h-6" />,
        color: "bg-purple-500"
    },
    {
        title: "Enterprise Security",
        description: "We use AES-256 bank-level encryption. Your data is your own—we never sell it and we never see it.",
        icon: <Shield className="w-6 h-6" />,
        color: "bg-amber-500"
    }
];

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="min-h-[60vh] flex flex-col justify-center py-20"
        >
            <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-${feature.color.split('-')[1]}-200`}>
                {feature.icon}
            </div>
            <h3 className="text-4xl font-bold text-text-primary mb-6">{feature.title}</h3>
            <p className="text-xl text-text-secondary leading-relaxed max-w-lg">
                {feature.description}
            </p>
        </motion.div>
    );
};

const StickyVisualization = ({ activeIndex }: { activeIndex: number }) => {
    return (
        <div className="sticky top-1/4 h-[50vh] w-full flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square">
                {/* Visualization Base */}
                <motion.div
                    animate={{ rotate: activeIndex * 90 }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    className="absolute inset-0 rounded-[40px] bg-[var(--surface)] border-2 border-[var(--border)] shadow-inner"
                />

                {/* Dynamic Content based on active index */}
                <div className="absolute inset-0 p-8 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {activeIndex === 0 && (
                                <div className="w-full relative">
                                    {/* Glassmorphic Base Card */}
                                    <div className="w-full bg-[var(--surface-muted)]/80 backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                                        <div className="px-5 py-4 border-b border-[var(--border-subtle)] bg-[var(--surface)]/50">
                                            <div className="text-xs font-bold text-text-secondary uppercase tracking-widest">Recent Transactions</div>
                                        </div>
                                        <div className="p-3 space-y-2">
                                            {[
                                                { icon: '☕', name: 'Starbucks', cat: 'Dining', amount: '-$6.50', color: 'bg-amber-500/10 text-amber-600' },
                                                { icon: '🎬', name: 'Netflix', cat: 'Entertainment', amount: '-$15.99', color: 'bg-rose-500/10 text-rose-600' },
                                                { icon: '🚗', name: 'Uber Ride', cat: 'Transport', amount: '-$24.50', color: 'bg-blue-500/10 text-blue-600' }
                                            ].map((tx, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.15, type: "spring", stiffness: 300, damping: 25 }}
                                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--surface)] transition-colors border border-transparent hover:border-[var(--border-subtle)]"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${tx.color}`}>
                                                            {tx.icon}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-text-primary">{tx.name}</div>
                                                            <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{tx.cat}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-black text-text-primary">{tx.amount}</div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Floating Pill Layer (3D effect) */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
                                        className="absolute -bottom-6 -right-6 bg-[var(--text-primary)] text-[var(--background)] px-6 py-4 rounded-2xl shadow-2xl border border-[var(--text-primary)]/20 z-10"
                                    >
                                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Today's Spend</div>
                                        <div className="text-2xl font-black">-$46.99</div>
                                    </motion.div>
                                </div>
                            )}
                            {activeIndex === 1 && (
                                <div className="w-full relative h-full flex flex-col justify-between p-4 bg-[var(--surface-muted)]/80 backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                                    {/* Portfolio Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <div className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">Total Net Worth</div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-3xl font-black text-text-primary"
                                            >
                                                $128,450.00
                                            </motion.div>
                                        </div>
                                        <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-emerald-500/20">
                                            <TrendingUp className="w-3 h-3" /> +12.4%
                                        </div>
                                    </div>

                                    {/* Animated Bar Chart Mock */}
                                    <div className="relative flex-1 flex items-end justify-between gap-3 pb-8 px-2">
                                        {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                                            <div key={i} className="relative flex-1 flex flex-col justify-end items-center group">
                                                {/* Hover Tooltip */}
                                                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--text-primary)] text-[var(--background)] text-[10px] font-bold py-1 px-2 rounded-lg whitespace-nowrap z-10 pointer-events-none">
                                                    ${(h * 1420).toLocaleString()}
                                                </div>

                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: `${h}%`, opacity: 1 }}
                                                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                                                    className={`w-full max-w-[32px] rounded-t-lg transition-all duration-300 group-hover:brightness-125 ${i === 6 ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                                                        : 'bg-[var(--border-subtle)] hover:bg-emerald-500/50'
                                                        }`}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* X-Axis Labels */}
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6 text-[9px] font-bold text-text-secondary uppercase tracking-widest">
                                        <span>Mon</span>
                                        <span>Tue</span>
                                        <span>Wed</span>
                                        <span>Thu</span>
                                        <span>Fri</span>
                                        <span>Sat</span>
                                        <span className="text-emerald-500">Sun</span>
                                    </div>
                                </div>
                            )}
                            {activeIndex === 2 && (
                                <div className="w-full relative h-full flex items-center justify-center p-4 bg-[var(--surface-muted)]/80 backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                                    {/* Financial Health Core */}
                                    <div className="relative flex flex-col items-center justify-center">
                                        <div className="relative w-48 h-48 flex items-center justify-center">
                                            {/* Background Ring */}
                                            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                                <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-[var(--border-subtle)]" />
                                                <motion.circle
                                                    cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent"
                                                    strokeDasharray="527.78"
                                                    initial={{ strokeDashoffset: 527.78 }}
                                                    animate={{ strokeDashoffset: 527.78 * (1 - 0.84) }}
                                                    transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                                                    className="text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                                                    strokeLinecap="round"
                                                />
                                            </svg>

                                            {/* Inner Content */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
                                                    className="text-4xl font-black text-text-primary"
                                                >
                                                    84<span className="text-xl">%</span>
                                                </motion.div>
                                                <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-1">Health Score</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Insight Pill 1 */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20, y: -20 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        transition={{ delay: 1.2, type: "spring" }}
                                        className="absolute top-8 -right-8 bg-[var(--surface)] border border-[var(--border)] shadow-xl rounded-2xl p-3 flex items-center gap-3 z-10"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                                            <PieChart className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">AI Found Savings</div>
                                            <div className="text-sm font-bold text-text-primary">Cancel Hulu: +$14.99/mo</div>
                                        </div>
                                    </motion.div>

                                    {/* Floating Insight Pill 2 */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20, y: 20 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        transition={{ delay: 1.5, type: "spring" }}
                                        className="absolute bottom-12 -left-8 bg-[var(--surface)] border border-[var(--border)] shadow-xl rounded-2xl p-3 flex items-center gap-3 z-10"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <TrendingUp className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Smart rebalance</div>
                                            <div className="text-sm font-bold text-text-primary">Move 5% to Bonds</div>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                            {activeIndex === 3 && (
                                <div className="w-full relative h-full flex items-center justify-center p-4 bg-[var(--surface-muted)]/80 backdrop-blur-xl rounded-2xl border border-[var(--border-subtle)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden group">
                                    {/* Encrypted Background Data Stream */}
                                    <div className="absolute inset-0 opacity-[0.03] flex flex-col justify-around py-4 pointer-events-none overflow-hidden font-mono text-[8px] break-all leading-relaxed max-w-full">
                                        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</motion.div>
                                        <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>8a92f03f572a1cd99127814b7e5623cf5368cf38c7f99ff9d6fffc</motion.div>
                                        <motion.div animate={{ opacity: [0.8, 0.4, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}>AES256-GCM-SHA384:OK:VALID_SIGNATURE:SECURE_ENCLAVE_ACTIVE</motion.div>
                                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}>b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9</motion.div>
                                    </div>

                                    {/* Central Vault Core */}
                                    <div className="relative z-10 flex flex-col items-center gap-6">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.2, type: "spring" }}
                                            className="relative w-32 h-32 rounded-[2rem] bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-[0_0_40px_rgba(245,158,11,0.3)] border border-amber-300/50"
                                        >
                                            <Shield className="w-16 h-16" />

                                            {/* Sweeping Laser Scan Line */}
                                            <motion.div
                                                animate={{ top: ['0%', '100%', '0%'] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                className="absolute left-0 right-0 h-1 bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20"
                                                style={{ filter: 'blur(1px)' }}
                                            />
                                        </motion.div>

                                        {/* Status Text */}
                                        <div className="space-y-2 text-center bg-[var(--surface)]/80 backdrop-blur px-6 py-3 rounded-xl border border-[var(--border-subtle)]">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                                <div className="text-xs font-bold text-text-primary uppercase tracking-widest">Vault Secured</div>
                                            </div>
                                            <div className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">AES-256 Active</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const Features = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const activeIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, 1, 2, 3]);
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        const unsubscribe = activeIndex.on("change", (latest) => {
            setCurrentIdx(Math.round(latest));
        });
        return () => unsubscribe();
    }, [activeIndex]);

    return (
        <section id="features" ref={containerRef} className="relative bg-[var(--background)] pt-24">
            <div className="container mx-auto px-6 flex flex-col lg:flex-row">
                {/* Left - Text Cards */}
                <div className="flex-1 lg:pr-24">
                    <div className="mb-24">
                        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Precision Tools</h2>
                        <div className="text-4xl lg:text-5xl font-bold text-text-primary">Engineered for <br />Financial Excellence.</div>
                    </div>

                    {FEATURE_DATA.map((feature, i) => (
                        <FeatureCard key={i} feature={feature} index={i} />
                    ))}

                    <div className="h-[20vh]" /> {/* Padding for scroll */}
                </div>

                {/* Right - Sticky Visuals */}
                <div className="hidden lg:block flex-1">
                    <StickyVisualization activeIndex={currentIdx} />
                </div>
            </div>
        </section>
    );
};

export default Features;
