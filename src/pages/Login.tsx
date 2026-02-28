import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSignIn, useSignUp, useAuth } from '@clerk/clerk-react';
import LampToggle from '../components/auth/LampToggle';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, User, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const Auth = ({ initialMode = 'login' }: { initialMode?: 'login' | 'signup' }) => {
    const [isOn, setIsOn] = useState(false);
    const [isFlipped, setIsFlipped] = useState(initialMode === 'signup');
    const navigate = useNavigate();
    const location = useLocation();

    // Update flip state if route changes
    useEffect(() => {
        if (location.pathname === '/signup') setIsFlipped(true);
        if (location.pathname === '/login') setIsFlipped(false);
    }, [location.pathname]);

    const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();
    const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
    const { isSignedIn } = useAuth();

    // Redirect if already signed in
    useEffect(() => {
        if (isSignedIn) {
            navigate('/dashboard');
        }
    }, [isSignedIn, navigate]);

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");

    const handleSocialAuth = (strategy: "oauth_google" | "oauth_github" | "oauth_apple") => {
        if (!isSignInLoaded) return;
        signIn.authenticateWithRedirect({
            strategy,
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/dashboard',
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignInLoaded) return;

        toast.loading("Signing you in...", { id: "auth" });
        try {
            const result = await signIn.create({
                identifier: loginData.email,
                password: loginData.password,
            });

            if (result.status === "complete") {
                await setSignInActive({ session: result.createdSessionId });
                toast.success("Welcome back!", { id: "auth" });
            } else {
                console.log(result);
                toast.error("Further action required.", { id: "auth" });
            }
        } catch (err: any) {
            toast.error(err.errors?.[0]?.message || "Failed to sign in", { id: "auth" });
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignUpLoaded) return;

        toast.loading("Creating your account...", { id: "auth" });
        try {
            await signUp.create({
                firstName: signupData.name.split(' ')[0],
                lastName: signupData.name.split(' ').slice(1).join(' ') || undefined,
                emailAddress: signupData.email,
                password: signupData.password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setPendingVerification(true);
            toast.success("Verification code sent to email!", { id: "auth" });
        } catch (err: any) {
            toast.error(err.errors?.[0]?.message || "Failed to create account", { id: "auth" });
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignUpLoaded) return;

        toast.loading("Verifying your email...", { id: "verify" });
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === "complete") {
                await setSignUpActive({ session: completeSignUp.createdSessionId });
                toast.success("Welcome aboard!", { id: "verify" });
            } else {
                toast.error("Verification failed.", { id: "verify" });
            }
        } catch (err: any) {
            toast.error(err.errors?.[0]?.message || "Invalid verification code", { id: "verify" });
        }
    };

    const toggleFlip = (e: React.MouseEvent, targetPath: string) => {
        e.preventDefault();
        if (pendingVerification) return; // Prevent flip during verification
        setIsFlipped(!isFlipped);
        setTimeout(() => navigate(targetPath), 300);
    };

    return (
        <div className={`min-h-screen flex flex-col lg:flex-row transition-all duration-1000 relative overflow-hidden ${isOn ? 'bg-[var(--surface-muted)]' : 'bg-[var(--background)]'}`}>
            {/* Ambient Background Light Spilling Across Whole Screen */}
            <AnimatePresence>
                {isOn && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="absolute inset-0 pointer-events-none z-0 mix-blend-screen"
                    >
                        <div className="absolute inset-0 bg-[#ffff00]/5 mix-blend-soft-light" />
                        <div className="absolute top-[-20%] left-[20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,0,0.15)_0%,rgba(255,255,0,0.05)_30%,transparent_60%)] blur-[100px]" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Fixed Back to Home */}
            <Link to="/" className="fixed top-4 left-4 md:top-6 md:right-6 md:left-auto z-[100] flex items-center gap-2 px-4 py-2 bg-[var(--surface)] hover:bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-full text-[var(--text-primary)] text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <ArrowLeft className="w-4 h-4" /> Home
            </Link>

            {/* Left Side: Ambient Lamp Experience */}
            <div className="hidden lg:flex flex-[1.2] items-center justify-center relative z-10">
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

                <div className="absolute top-0 w-full flex justify-center h-full">
                    <LampToggle isOn={isOn} onToggle={() => setIsOn(!isOn)} />
                </div>

                {isOn && (
                    <motion.div
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                    />
                )}
            </div>

            {/* Right Side: 3D Flip Card Area */}
            <div className="flex-1 flex items-center justify-center p-6 relative z-10 w-full perspective-container">
                {/* Mobile Lamp */}
                <div className="lg:hidden absolute top-4 left-1/2 -translate-x-1/2 z-20 scale-75 md:scale-90 pointer-events-auto">
                    <LampToggle isOn={isOn} onToggle={() => setIsOn(!isOn)} />
                </div>

                <div className="w-full max-w-md [perspective:2000px] mt-24 lg:mt-0">
                    <motion.div
                        className="relative w-full [transform-style:preserve-3d]"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 15 }}
                    >
                        {/* FRONT OF CARD (Login) */}
                        <div
                            className={`absolute inset-0 w-full p-10 z-10 rounded-[40px] border-2 transition-all duration-1000 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] ${isOn
                                ? 'bg-[var(--surface)] backdrop-blur-2xl shadow-[0_50px_100px_-20px_rgba(255,236,179,0.4)] border-[var(--border)]'
                                : 'bg-[var(--surface)] shadow-premium border-[var(--border)]'
                                } ${isFlipped ? 'pointer-events-none' : ''}`}
                        >
                            <div className="mb-8 text-center">
                                <motion.div
                                    initial={{ y: -10 }}
                                    animate={{ y: 0 }}
                                    className="mb-6 flex justify-center"
                                >
                                    <img src="/finovaa.png" alt="Finova" className="w-[180px] h-auto object-contain" />
                                </motion.div>
                                <h1 className="text-3xl font-black tracking-tight text-text-primary">Sign In</h1>
                                <p className="text-text-secondary mt-2">Access your premium financial insights.</p>
                            </div>

                            <form className="space-y-6" onSubmit={handleLogin}>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="name@example.com"
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-[20px] focus:bg-[var(--surface)] focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-[var(--text-primary)]"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Password</label>
                                        <button type="button" onClick={(e) => { e.preventDefault(); toast('Password recovery coming soon'); }} className="text-xs font-bold text-primary hover:underline">Forgot?</button>
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-[20px] focus:bg-[var(--surface)] focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-[var(--text-primary)]"
                                            required
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
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

                            <div className="mt-8 pt-6 border-t-2 border-[var(--border-subtle)]">
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleSocialAuth('oauth_google')}
                                        className="relative overflow-hidden group w-full py-4 border border-[#dadce0] rounded-full font-bold text-[#3c4043] bg-white flex items-center justify-center gap-2 shadow-sm transition-all"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-[#f8f9fa] scale-0 group-hover:scale-100 group-active:scale-110 transition-transform duration-300 ease-out origin-center rounded-full z-0" />
                                        <div className="relative z-10 flex items-center gap-2">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                            </svg>
                                            <span className="text-sm">Google</span>
                                        </div>
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleSocialAuth('oauth_apple')}
                                        className={`relative overflow-hidden group w-full py-4 border border-transparent rounded-full font-bold flex items-center justify-center gap-2 shadow-sm transition-all ${isOn
                                            ? 'bg-white text-black border-[#dadce0]'
                                            : 'bg-black text-white border-[#333]'
                                            }`}
                                    >
                                        <div className={`absolute inset-0 w-full h-full scale-0 group-hover:scale-100 group-active:scale-110 transition-transform duration-300 ease-out origin-center rounded-full z-0 ${isOn ? 'bg-gray-100' : 'bg-gray-900'
                                            }`} />
                                        <div className="relative z-10 flex items-center gap-2">
                                            <svg className={`w-5 h-5 ${isOn ? 'fill-black' : 'fill-white'}`} viewBox="0 0 384 512">
                                                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                                            </svg>
                                            <span className="text-sm">Apple</span>
                                        </div>
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleSocialAuth('oauth_github')}
                                        className="col-span-2 relative overflow-hidden group w-full py-4 border border-[var(--border)] rounded-full font-bold text-[var(--text-primary)] bg-[var(--surface-muted)] flex items-center justify-center gap-2 shadow-sm transition-all"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-[var(--border-subtle)] scale-0 group-hover:scale-100 group-active:scale-110 transition-transform duration-300 ease-out origin-center rounded-full z-0" />
                                        <div className="relative z-10 flex items-center gap-2">
                                            <Github className="w-5 h-5" />
                                            <span className="text-sm">Continue with GitHub</span>
                                        </div>
                                    </motion.button>
                                </div>
                                <p className="text-center text-sm text-text-secondary font-medium">
                                    Don't have an account? <button type="button" onClick={(e) => toggleFlip(e, '/signup')} className="text-primary font-bold hover:underline cursor-pointer">Sign up for free</button>
                                </p>
                            </div>
                        </div>

                        {/* BACK OF CARD (Signup Form) */}
                        <div
                            className={`w-full p-10 z-10 rounded-[40px] border-2 transition-all duration-1000 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] ${isOn
                                ? 'bg-[var(--surface)] backdrop-blur-2xl shadow-[0_50px_100px_-20px_rgba(255,236,179,0.4)] border-[var(--border)]'
                                : 'bg-[var(--surface)] shadow-premium border-[var(--border)]'
                                } ${!isFlipped ? 'pointer-events-none' : ''}`}
                        >
                            <div className="mb-8 text-center">
                                <div className="mb-6 flex justify-center">
                                    <img src="/finovaa.png" alt="Finova" className="w-[180px] h-auto object-contain" />
                                </div>
                                <h1 className="text-3xl font-black tracking-tight text-text-primary">Create Account</h1>
                                <p className="text-text-secondary mt-2">
                                    {pendingVerification ? "Enter the code sent to your email." : "Let's set up your premium profile."}
                                </p>
                            </div>

                            {!pendingVerification ? (
                                <form className="space-y-5" onSubmit={handleSignup}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="Alex Sterling"
                                                value={signupData.name}
                                                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-[20px] focus:bg-[var(--surface)] focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-[var(--text-primary)]"
                                                required
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
                                                value={signupData.email}
                                                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-[20px] focus:bg-[var(--surface)] focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-[var(--text-primary)]"
                                                required
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
                                                value={signupData.password}
                                                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-[20px] focus:bg-[var(--surface)] focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-[var(--text-primary)]"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className={`w-full mt-2 py-5 rounded-[22px] font-bold flex items-center justify-center gap-2 group transition-all duration-700 overflow-hidden relative ${isOn
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
                                        Create Account
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </form>
                            ) : (
                                <form className="space-y-5" onSubmit={handleVerify}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Verification Code</label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                placeholder="Enter 6-digit code"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                                className="w-full px-4 py-4 bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-[20px] focus:bg-[var(--surface)] focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-[var(--text-primary)] text-center tracking-widest"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className={`w-full mt-2 py-5 rounded-[22px] font-bold flex items-center justify-center gap-2 group transition-all duration-700 overflow-hidden relative ${isOn
                                            ? 'bg-gradient-to-r from-[#f6d365] to-[#fda085] text-black shadow-[0_15px_30px_-5px_rgba(253,160,133,0.4)]'
                                            : 'bg-[var(--text-primary)] text-[var(--background)] shadow-xl'
                                            }`}
                                    >
                                        Verify Email
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </form>
                            )}

                            <div className="mt-6 pt-6 border-t-2 border-[var(--border-subtle)] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <button
                                        type="button"
                                        onClick={() => handleSocialAuth('oauth_google')}
                                        className="w-full py-4 border border-[#dadce0] rounded-full font-bold text-[#3c4043] bg-white flex items-center justify-center gap-2 hover:bg-[#f8f9fa] shadow-sm transition-all"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span className="text-sm">Google</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSocialAuth('oauth_apple')}
                                        className={`w-full py-4 border border-transparent rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${isOn
                                            ? 'bg-white text-black hover:bg-gray-100 border-[#dadce0]'
                                            : 'bg-black text-white hover:bg-gray-900 border-[#333]'
                                            }`}
                                    >
                                        <svg className={`w-5 h-5 ${isOn ? 'fill-black' : 'fill-white'}`} viewBox="0 0 384 512">
                                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                                        </svg>
                                        <span className="text-sm">Apple</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSocialAuth('oauth_github')}
                                        className="col-span-2 relative overflow-hidden group w-full py-4 border border-[var(--border)] rounded-full font-bold text-[var(--text-primary)] bg-[var(--surface-muted)] flex items-center justify-center gap-2 hover:bg-[var(--border-subtle)] shadow-sm transition-all"
                                    >
                                        <Github className="w-5 h-5" />
                                        <span className="text-sm">Continue with GitHub</span>
                                    </button>
                                </div>
                                <p className="text-center text-sm text-text-secondary font-medium">
                                    Already have an account? <button type="button" onClick={(e) => toggleFlip(e, '/login')} className="text-primary font-bold hover:underline cursor-pointer">Log in</button>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
