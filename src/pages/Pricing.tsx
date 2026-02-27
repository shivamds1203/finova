import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Crown, Shield, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const navigate = useNavigate();

    const tiers = [
        {
            name: "Free",
            price: billingCycle === 'monthly' ? "0" : "0",
            description: "Perfect for students managing their first budget.",
            features: ["Up to 100 expenses/mo", "Basic analytics", "Mobile app access", "Community support"],
            icon: <Shield className="w-6 h-6" />,
            cta: "Get Started",
            popular: false
        },
        {
            name: "Pro",
            price: billingCycle === 'monthly' ? "12" : "96",
            description: "Advanced insights for active investors and trackers.",
            features: ["Unlimited expenses", "Health engine dashboard", "PDF exports", "Priority email support", "AI Insights (5/mo)"],
            icon: <Zap className="w-6 h-6" />,
            cta: "Go Pro",
            popular: true
        },
        {
            name: "Premium",
            price: billingCycle === 'monthly' ? "29" : "240",
            description: "The ultimate power tool for serious wealth builders.",
            features: ["Everything in Pro", "Real-time stock alerts", "Unlimited AI Assistant", "Personal finance coach", "Exclusive webinars"],
            icon: <Crown className="w-6 h-6" />,
            cta: "Join Elite",
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Navbar />

            <div className="container mx-auto px-6 py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto mb-16"
                >
                    <h1 className="text-5xl font-black text-[var(--text-primary)] tracking-tight mb-6">
                        Scale your <span className="text-text-secondary">Financial Clarity</span>
                    </h1>
                    <p className="text-xl text-text-secondary font-medium">
                        Choose a plan that fits your ambition. Precise tools for production-grade wealth management.
                    </p>
                </motion.div>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 mb-16">
                    <span className={`text-sm font-bold uppercase tracking-widest ${billingCycle === 'monthly' ? 'text-[var(--text-primary)]' : 'text-text-secondary'}`}>Monthly</span>
                    <button
                        onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                        className="w-16 h-8 bg-[var(--text-primary)] rounded-full p-1 relative flex items-center transition-colors"
                    >
                        <motion.div
                            animate={{ x: billingCycle === 'monthly' ? 0 : 32 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="w-6 h-6 bg-[var(--background)] rounded-full shadow-lg"
                        />
                    </button>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold uppercase tracking-widest ${billingCycle === 'yearly' ? 'text-[var(--text-primary)]' : 'text-text-secondary'}`}>Yearly</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase rounded-md">Save 20%</span>
                    </div>
                </div>

                {/* Tiers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                            whileHover={{ y: -12 }}
                            className={`
                                relative p-10 rounded-[40px] border text-left flex flex-col transition-all duration-500
                                ${tier.popular ? 'border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--background)] shadow-2xl scale-105 z-10' : 'border-[var(--border-subtle)] bg-[var(--surface-muted)] text-[var(--text-primary)]'}
                            `}
                        >
                            {tier.popular && (
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-[var(--background)] text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl"
                                >
                                    Most Popular
                                </motion.div>
                            )}

                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${tier.popular ? 'bg-white/10 text-[var(--background)]' : 'bg-[var(--surface)] text-[var(--text-primary)]'}`}>
                                {tier.icon}
                            </div>

                            <h3 className="text-2xl font-black mb-2 tracking-tight">{tier.name}</h3>
                            <p className={`text-sm font-medium mb-8 leading-relaxed ${tier.popular ? 'text-[var(--background)] opacity-80' : 'text-text-secondary'}`}>
                                {tier.description}
                            </p>

                            <div className="flex items-baseline gap-1 mb-10">
                                <span className="text-4xl font-black tracking-tight">${tier.price}</span>
                                <span className={`text-sm font-bold opacity-60`}>/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {tier.features.map(f => (
                                    <li key={f} className="flex items-center gap-3 text-sm font-semibold">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.popular ? 'bg-emerald-500/20 text-emerald-600' : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)]'}`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => navigate('/signup')}
                                className={`
                                w-full py-5 rounded-3xl text-sm font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group
                                border
                                ${tier.popular ? 'bg-[var(--background)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)]' : 'bg-[var(--text-primary)] text-[var(--background)] hover:opacity-90 shadow-xl'}
                            `}>
                                {tier.cta}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
