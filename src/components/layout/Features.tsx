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
                                <div className="w-full space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <motion.div
                                            key={i}
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ delay: i * 0.1 }}
                                            className="h-12 bg-[var(--surface-muted)] rounded-xl border-2 border-[var(--border)] flex items-center px-4 gap-4"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-blue-500/20" />
                                            <div className="h-2 w-1/3 bg-[var(--border-subtle)] rounded-full" />
                                            <div className="ml-auto h-2 w-12 bg-blue-500 rounded-full" />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                            {activeIndex === 1 && (
                                <div className="relative w-full h-full flex flex-col">
                                    <div className="flex-1 flex items-end gap-2 pb-12">
                                        {[40, 70, 50, 90, 60, 100].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ delay: i * 0.05 }}
                                                className="flex-1 bg-green-500 rounded-t-lg"
                                            />
                                        ))}
                                    </div>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-bold text-green-600">+12.4% Net Worth</div>
                                </div>
                            )}
                            {activeIndex === 2 && (
                                <div className="relative flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="w-48 h-48 rounded-full border-[12px] border-[var(--border-subtle)] border-t-purple-500 relative flex items-center justify-center font-bold text-2xl"
                                    >
                                        <div className="absolute inset-0 border-[12px] border-transparent border-r-purple-300 rounded-full" style={{ rotate: '45deg' }} />
                                        84%
                                    </motion.div>
                                    <div className="absolute -bottom-8 text-center text-sm font-medium">Health Score</div>
                                </div>
                            )}
                            {activeIndex === 3 && (
                                <div className="flex flex-col items-center gap-6">
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-24 h-24 rounded-3xl bg-amber-500 flex items-center justify-center text-white"
                                    >
                                        <Shield className="w-12 h-12" />
                                    </motion.div>
                                    <div className="space-y-2 text-center">
                                        <div className="h-2 w-32 bg-[var(--border-subtle)] rounded-full mx-auto" />
                                        <div className="h-2 w-24 bg-[var(--border-subtle)] rounded-full mx-auto" />
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
