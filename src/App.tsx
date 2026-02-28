import Hero from './components/layout/Hero';
import Features from './components/layout/Features';
import Navbar from './components/layout/Navbar';
import MainLayout from './components/layout/MainLayout';
import CustomCursor from './components/common/CustomCursor';
import CommandPalette from './components/common/CommandPalette';
import ToastSystem from './components/common/ToastSystem';
import Auth from './pages/Login'; // Now serves as Auth component
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Pricing from './pages/Pricing';
import Investments from './pages/Investments';
import Security from './pages/Security';
import Documents from './pages/Documents';
import Expenses from './pages/Expenses';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Wallet from './pages/Wallet';
import Credit from './pages/Credit';
import { ThemeProvider } from './providers/ThemeProvider';
import { CurrencyProvider } from './providers/CurrencyContext';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, AuthenticateWithRedirectCallback } from '@clerk/clerk-react';

const PageTransition = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
        {children}
    </motion.div>
);

const LandingPage = () => (
    <PageTransition>
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <Features />
            <footer className="bg-surface py-20 border-t border-border-subtle">
                <div className="container mx-auto px-6 text-center text-text-secondary text-sm">
                    © 2026 Finova Inc. All rights reserved. Built with precision for production.
                </div>
            </footer>
        </div>
    </PageTransition>
);

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<PageTransition><Auth initialMode="login" /></PageTransition>} />
                <Route path="/signup" element={<PageTransition><Auth initialMode="signup" /></PageTransition>} />
                <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback />} />
                <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
                <Route path="/security" element={<PageTransition><div className="min-h-screen"><Navbar /><Security /></div></PageTransition>} />
                <Route
                    path="/dashboard/*"
                    element={
                        <>
                            <SignedIn>
                                <MainLayout>
                                    <PageTransition>
                                        <Routes>
                                            <Route path="/" element={<Dashboard />} />
                                            <Route path="expenses" element={<Expenses />} />
                                            <Route path="investments" element={<Investments />} />
                                            <Route path="analytics" element={<Analytics />} />
                                            <Route path="reports" element={<Reports />} />
                                            <Route path="settings" element={<Settings />} />
                                            <Route path="security" element={<Security />} />
                                            <Route path="documents" element={<Documents />} />
                                            <Route path="wallet" element={<Wallet />} />
                                            <Route path="credit" element={<Credit />} />
                                        </Routes>
                                    </PageTransition>
                                </MainLayout>
                            </SignedIn>
                            <SignedOut>
                                <Navigate to="/login" replace />
                            </SignedOut>
                        </>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="finova-theme">
            <CurrencyProvider>
                <Router>
                    <CustomCursor />
                    <CommandPalette />
                    <ToastSystem />
                    <AnimatedRoutes />
                </Router>
            </CurrencyProvider>
        </ThemeProvider>
    );
}

export default App;
