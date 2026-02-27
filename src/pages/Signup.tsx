import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Mail, Lock, ArrowRight, Github, User, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import InteractiveCat, { CatState } from '../components/auth/InteractiveCat';
import toast from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();
    const [catState, setCatState] = useState<CatState>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [typingProgress, setTypingProgress] = useState(0);
    const [verticalProgress, setVerticalProgress] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simple validation for cat reaction
        if (!formData.name || !formData.email || !formData.password) {
            setCatState('pointing');
            toast.error("Finova Cat says: Please fill all the details!");
            setTimeout(() => {
                setCatState('idle');
                setIsSubmitting(false);
            }, 2000);
            return;
        }

        setCatState('success');
        toast.success("Welcome aboard! Redirecting...");

        // Simulate a slight delay for the cat success animation
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigate('/dashboard');
    };

    const handleTyping = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
        // Calculate horizontal progress (0 to 1) based on character count
        // Assuming a max reasonable length of 25 for visual movement context
        const progress = Math.min(value.length / 25, 1);
        setTypingProgress(progress);
    };

    const handleFocus = (state: CatState, field: string, value: string) => {
        if (!isSubmitting) {
            setCatState(state);
            // set horizontal progress
            const progress = Math.min(value.length / 25, 1);
            setTypingProgress(progress);

            // set vertical progress based on field (0.2 = first box, 0.6 = second, 1.0 = third)
            if (field === 'name') setVerticalProgress(0.2);
            if (field === 'email') setVerticalProgress(0.6);
            if (field === 'password') setVerticalProgress(1);
        }
    };

    const handleBlur = () => {
        if (!isSubmitting) {
            setCatState('idle');
            setTypingProgress(0);
            setVerticalProgress(0);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col lg:flex-row">
            {/* Left Side: Brand Story (Previous Implementation) */}
            <div className="hidden lg:flex flex-[1.2] items-center justify-center relative overflow-hidden bg-primary p-20 text-white">
                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-[24px] flex items-center justify-center mb-10"
                    >
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </motion.div>
                    <h2 className="text-5xl font-bold leading-tight mb-6">Start your journey to financial freedom.</h2>
                    <p className="text-primary-subtle text-xl leading-relaxed opacity-80">
                        Join 50,000+ professionals using Finova to track, invest, and grow their wealth with AI precision.
                    </p>

                    <div className="mt-12 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">1</div>
                            <p className="font-medium text-sm">Connect your accounts securely</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">2</div>
                            <p className="font-medium text-sm">Get AI-powered saving insights</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">3</div>
                            <p className="font-medium text-sm">Optimize your investment portfolio</p>
                        </div>
                    </div>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px]" />
            </div>

            {/* Right Side: Signup Form */}
            <div className="flex-1 flex items-center justify-center p-6 relative bg-[var(--background)]">
                <div className="w-full max-w-md">
                    {/* The Interactive Cat: Static Premium Position */}
                    <div className="z-30 mb-[-64px]">
                        <InteractiveCat state={catState} progress={typingProgress} verticalProgress={verticalProgress} />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative w-full p-10 pt-16 bg-[var(--surface)] border-2 border-[var(--border)] rounded-[40px] shadow-premium z-10"
                    >
                        <div className="mb-8 text-center sm:text-left">
                            <div className="flex justify-between items-center mb-6">
                                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl">F</div>
                                <Link to="/login" className="text-sm font-bold text-primary hover:underline">Log In Instead</Link>
                            </div>
                            <h1 className="text-3xl font-black tracking-tight text-text-primary">Create Account</h1>
                            <p className="text-text-secondary mt-2">Finova Cat is watching every move! 🐾</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Alex Sterling"
                                        value={formData.name}
                                        onChange={(e) => handleTyping('name', e.target.value)}
                                        onFocus={() => handleFocus('watching', 'name', formData.name)}
                                        onBlur={handleBlur}
                                        className="w-full pl-12 pr-4 py-4 bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-[20px] focus:bg-[var(--surface)] focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-[var(--text-primary)]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={(e) => handleTyping('email', e.target.value)}
                                        onFocus={() => handleFocus('watching', 'email', formData.email)}
                                        onBlur={handleBlur}
                                        className="w-full pl-12 pr-4 py-4 bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-[20px] focus:bg-[var(--surface)] focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-[var(--text-primary)]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={(e) => handleTyping('password', e.target.value)}
                                        onFocus={() => handleFocus('hiding', 'password', formData.password)}
                                        onBlur={handleBlur}
                                        className="w-full pl-12 pr-4 py-4 bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-[20px] focus:bg-[var(--surface)] focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-[var(--text-primary)]"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full py-5 bg-primary text-white rounded-[22px] font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group transition-all"
                            >
                                {catState === 'success' ? 'Welcome to Finova!' : 'Create Account'}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </form>

                        <div className="mt-8 pt-8 border-t-2 border-[var(--border-subtle)]">
                            <button className="w-full py-4 border-2 border-[var(--border)] rounded-[20px] font-bold text-[var(--text-primary)] flex items-center justify-center gap-3 hover:bg-[var(--surface-muted)] transition-colors">
                                <Github className="w-5 h-5" />
                                Sign up with GitHub
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
