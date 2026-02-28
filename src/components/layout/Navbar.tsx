import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Menu, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { CurrencySelector } from '../common/CurrencySelector';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 h-[72px] flex items-center ${isScrolled ? 'bg-[var(--surface)]/80 backdrop-blur-lg border-b border-[var(--border-subtle)] shadow-sm' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}>
                    <img src="/finovaa.png" alt="Finova" className="w-[120px] md:w-[180px] h-auto object-contain" />
                </div>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    <button onClick={() => {
                        const el = document.getElementById('features');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                        Features
                    </button>
                    <button onClick={() => navigate('/dashboard/investments')} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                        Investments
                    </button>
                    <button onClick={() => navigate('/pricing')} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                        Pricing
                    </button>
                    <button onClick={() => navigate('/dashboard/documents')} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                        Documents
                    </button>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-4">
                    <CurrencySelector />
                    <ThemeToggle />
                    <SignedOut>
                        <button onClick={() => navigate('/login')} className="text-sm font-semibold text-text-primary hover:text-primary transition-colors hidden sm:block">Log In</button>
                        <button onClick={() => navigate('/signup')} className="btn-primary py-2 px-5 text-sm">Join Finova</button>
                    </SignedOut>
                    <SignedIn>
                        <button onClick={() => navigate('/dashboard')} className="btn-primary py-2 px-5 text-sm">Dashboard</button>
                        <div className="flex items-center">
                            <UserButton />
                        </div>
                    </SignedIn>
                    <button
                        className="md:hidden p-2 text-text-primary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-[72px] left-0 right-0 bg-[var(--surface)] border-b border-[var(--border)] shadow-xl p-4 flex flex-col gap-4 md:hidden"
                    >
                        <button onClick={() => { setIsMobileMenuOpen(false); const el = document.getElementById('features'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="text-left font-medium text-text-primary py-2 border-b border-[var(--border-subtle)]">
                            Features
                        </button>
                        <button onClick={() => { setIsMobileMenuOpen(false); navigate('/dashboard/investments'); }} className="text-left font-medium text-text-primary py-2 border-b border-[var(--border-subtle)]">
                            Investments
                        </button>
                        <button onClick={() => { setIsMobileMenuOpen(false); navigate('/pricing'); }} className="text-left font-medium text-text-primary py-2 border-b border-[var(--border-subtle)]">
                            Pricing
                        </button>
                        <button onClick={() => { setIsMobileMenuOpen(false); navigate('/dashboard/documents'); }} className="text-left font-medium text-text-primary py-2">
                            Documents
                        </button>
                        <SignedOut>
                            <div className="flex flex-col gap-2 mt-2">
                                <button onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }} className="btn-outline w-full py-2">Log In</button>
                                <button onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }} className="btn-primary w-full py-2">Join Finova</button>
                            </div>
                        </SignedOut>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
