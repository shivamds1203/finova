import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import LampToggle from '../components/auth/LampToggle';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [isOn, setIsOn] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={`min-h-screen flex flex-col lg:flex-row transition-all duration-1000 ${isOn ? 'bg-[var(--background)]' : 'bg-[var(--background)]'}`}>
            {/* Left Side: Ambient Lamp Experience */}
            <div className="hidden lg:flex flex-[1.2] items-center justify-center relative overflow-hidden bg-[var(--surface-muted)]">
                {/* Background Glow */}
                <AnimatePresence>
                    {isOn && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2 }}
                                className="absolute inset-0 bg-[#ffff00]/10 mix-blend-soft-light"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 1 }}
                                className="absolute inset-x-0 top-0 h-[1000px] bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,0,0.6)_0%,rgba(255,255,0,0.2)_45%,transparent_75%)] blur-[110px]"
                            />
                        </>
                    )}
                </AnimatePresence>

                {/* Lamp Mount */}
                <div className="absolute top-0 w-full flex justify-center h-full">
                    <LampToggle isOn={isOn} onToggle={() => setIsOn(!isOn)} />
                </div>

                {/* Particle Dust */}
                {isOn && (
                    <motion.div
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                    />
                )}
            </div>

            {/* Right Side: Login Card */}
            <div className="flex-1 flex items-center justify-center p-6 relative bg-[var(--background)]">
                {/* Mobile Lamp */}
                <div className="lg:hidden absolute top-10 left-1/2 -translate-x-1/2 z-0 scale-75 opacity-20">
                    <LampToggle isOn={isOn} onToggle={() => setIsOn(!isOn)} />
                </div>

                <div className="w-full max-w-md">
                    <motion.div
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: isOn ? 1.02 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className={`w-full p-10 z-10 transition-all duration-1000 border-2 rounded-[40px] ${isOn
                            ? 'bg-[var(--surface)] backdrop-blur-2xl shadow-[0_50px_100px_-20px_rgba(255,236,179,0.4)] border-[var(--border)]'
                            : 'bg-[var(--surface)] shadow-premium border-[var(--border)]'
                            }`}
                    >
                        <div className="mb-10 text-center">
                            <motion.div
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                                className="inline-block p-4 rounded-3xl bg-primary/5 mb-6"
                            >
                                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl">F</div>
                            </motion.div>
                            <h1 className="text-3xl font-black tracking-tight text-text-primary">Sign In</h1>
                            <p className="text-text-secondary mt-2">Access your premium financial insights.</p>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full pl-12 pr-4 py-4 bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-[20px] focus:bg-[var(--surface)] focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-[var(--text-primary)]"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Password</label>
                                    <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</a>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-4 bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-[20px] focus:bg-[var(--surface)] focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-[var(--text-primary)]"
                                        required
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full py-5 rounded-[22px] font-bold flex items-center justify-center gap-2 group transition-all duration-700 overflow-hidden relative ${isOn
                                    ? 'bg-gradient-to-r from-[#f6d365] to-[#fda085] text-black shadow-[0_15px_30px_-5px_rgba(253,160,133,0.4)]'
                                    : 'bg-[var(--text-primary)] text-[var(--background)] shadow-xl'
                                    }`}
                            >
                                {isOn && (
                                    <motion.div
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 0.5 }}
                                        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-30deg]"
                                    />
                                )}
                                Sign In to Finova
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </form>

                        <div className="mt-8 pt-8 border-t-2 border-[var(--border-subtle)]">
                            <button className="w-full py-4 border-2 border-[var(--border)] rounded-[20px] font-bold text-[var(--text-primary)] flex items-center justify-center gap-3 hover:bg-[var(--surface-muted)] transition-colors">
                                <Github className="w-5 h-5" />
                                Continue with GitHub
                            </button>
                            <p className="text-center text-sm text-text-secondary mt-8 font-medium">
                                Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up for free</Link>
                            </p>
                        </div>
                    </motion.div>
                </div>

                {isOn && <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)]" />}
            </div>
        </div>
    );
};

export default Login;
