import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, BarChart3, PieChart, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
                            V1.0 — The Future of Fintech
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-text-primary mb-6">
                            Smart Expense & <br />
                            <span className="text-primary italic">Investment</span> Tracker
                        </h1>
                        <p className="text-lg lg:text-xl text-text-secondary mb-10 max-w-2xl mx-auto lg:mx-0">
                            Take complete control of your financial future with Finova's premium dashboard. Track every cent, monitor investments, and gain AI-powered insights.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <SignedOut>
                                <button onClick={() => navigate('/signup')} className="btn-primary flex items-center gap-2 group">
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </SignedOut>
                            <SignedIn>
                                <button onClick={() => navigate('/dashboard')} className="btn-primary flex items-center gap-2 group">
                                    Go to Dashboard
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </SignedIn>
                            <button className="btn-outline flex items-center gap-2">
                                Watch Demo
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Right - Dashboard Mockup */}
                <div className="flex-1 w-full max-w-[600px]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                        className="relative"
                    >
                        <div className="card-premium p-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50" />
                            <div className="rounded-[18px] overflow-hidden border border-white/10 bg-[var(--surface)] shadow-2xl relative z-10 backdrop-blur-md">
                                {/* Mockup Header */}
                                <div className="h-10 bg-[var(--surface-muted)] border-b border-[var(--border-subtle)] flex items-center px-4 gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-400" />
                                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                </div>
                                {/* Mockup Content */}
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-24 rounded-xl bg-primary/5 border border-primary/10 p-4">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                                                <BarChart3 className="w-4 h-4 text-primary" />
                                            </div>
                                            <div className="h-2 w-12 bg-primary/20 rounded-full" />
                                        </div>
                                        <div className="h-24 rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-4">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-2">
                                                <PieChart className="w-4 h-4 text-emerald-500" />
                                            </div>
                                            <div className="h-2 w-16 bg-emerald-500/20 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="h-32 w-full bg-[var(--surface-muted)] rounded-xl border border-[var(--border-subtle)] overflow-hidden relative">
                                        {/* Animated Line Graph Mockup */}
                                        <div className="absolute inset-0 flex items-end p-0">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: "60%" }}
                                                transition={{ duration: 1, delay: 1 }}
                                                className="flex-1 bg-primary/10 border-t-2 border-primary"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Element */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-2 md:-top-6 md:-right-6 glass-card p-3 md:p-4 flex items-center gap-2 md:gap-3 shadow-2xl scale-75 md:scale-100 origin-top-right"
                        >
                            <div className="p-2 rounded-full bg-green-500">
                                <ShieldCheck className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <div className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Secure</div>
                                <div className="text-sm font-semibold">Bank Level Encryption</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
