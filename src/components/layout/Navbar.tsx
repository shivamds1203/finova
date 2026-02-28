import { motion } from 'framer-motion';
import { Search, Bell, Menu, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { CurrencySelector } from '../common/CurrencySelector';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

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
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <div className="w-4 h-4 bg-[var(--surface)] rounded-sm rotate-45" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-text-primary">Finova</span>
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
                    <button className="md:hidden p-2 text-text-primary">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
