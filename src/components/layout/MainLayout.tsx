import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Wallet,
    TrendingUp,
    BarChart3,
    FileText,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Bell,
    Search,
    Shield,
    CreditCard,
    User as UserIcon
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SignedIn, UserButton, useUser, useClerk } from '@clerk/clerk-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { CurrencySelector } from '../common/CurrencySelector';
import toast from 'react-hot-toast';

const MENU_ITEMS = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Wallet size={20} />, label: 'Wallet', path: '/dashboard/wallet' },
    { icon: <CreditCard size={20} />, label: 'Credit', path: '/dashboard/credit' },
    { icon: <TrendingUp size={20} />, label: 'Investments', path: '/dashboard/investments' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: <FileText size={20} />, label: 'Expenses', path: '/dashboard/expenses' },
    { icon: <FileText size={20} />, label: 'Reports', path: '/dashboard/reports' },
    { icon: <FileText size={20} />, label: 'Documents', path: '/dashboard/documents' },
    { icon: <Shield size={20} />, label: 'Security', path: '/dashboard/security' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/dashboard/settings' },
];

const Sidebar = ({ isCollapsed, setIsCollapsed }: { isCollapsed: boolean, setIsCollapsed: (val: boolean) => void }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signOut } = useClerk();

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 80 : 260 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="hidden lg:flex flex-col h-screen bg-[var(--surface)]/80 backdrop-blur-[20px] border-r border-white/5 sticky top-0 left-0 z-50 overflow-hidden"
        >
            {/* Sidebar Header - Logo */}
            <button onClick={() => navigate('/')} className="h-[72px] flex items-center px-6 gap-3 border-b border-[var(--border-subtle)] shrink-0 hover:bg-[var(--surface-muted)] transition-colors w-full text-left cursor-pointer">
                <div className="min-w-[32px] w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                    <div className="w-4 h-4 bg-[var(--surface)] rounded-sm rotate-45" />
                </div>
                {!isCollapsed && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold text-text-primary whitespace-nowrap"
                    >
                        Finova
                    </motion.span>
                )}
            </button>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-3 space-y-2 overflow-y-auto no-scrollbar">
                {MENU_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative group truncate ${isActive ? 'text-primary bg-[var(--surface-muted)]' : 'text-text-secondary hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)]'
                                }`}
                        >
                            <div className={`shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                {item.icon}
                            </div>

                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="font-medium text-sm"
                                >
                                    {item.label}
                                </motion.span>
                            )}

                            {/* Active Indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer / User / Collapse */}
            <div className="p-4 border-t border-[var(--border-subtle)] space-y-4 shrink-0">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[var(--surface-muted)] text-text-secondary transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    {!isCollapsed && <span className="text-sm font-medium">Collapse Menu</span>}
                </button>

                <button
                    onClick={() => signOut({ redirectUrl: '/' })}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 transition-colors"
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
                </button>
            </div>
        </motion.aside>
    );
};

const Header = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    return (
        <header className="fixed top-0 right-0 left-0 md:left-64 h-20 bg-[var(--surface)]/50 backdrop-blur-[20px] border-b border-white/5 z-30 px-8 flex items-center justify-between transition-colors duration-400">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-full max-w-md hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search transactions, stocks..."
                        className="w-full pl-10 pr-4 py-2 bg-[var(--background)] border border-[var(--border-subtle)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[var(--text-primary)]"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 border-r border-[var(--border-subtle)] pr-6">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface-muted)] text-text-secondary hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted-active)] transition-colors border border-[var(--border-subtle)] text-sm font-bold">
                        <ChevronLeft size={16} />
                        <span className="hidden sm:inline">Home</span>
                    </button>
                    <CurrencySelector />
                    <ThemeToggle />
                </div>
                <button onClick={() => toast("No new notifications")} className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--surface)]" />
                </button>

                <SignedIn>
                    <div className="flex items-center gap-3 pl-6 border-l border-[var(--border-subtle)]">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-[var(--text-primary)]">{user?.fullName || "Pro User"}</div>
                            <div className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Pro Member</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[var(--surface-muted)] border-2 border-[var(--surface)] shadow-sm flex items-center justify-center transition-opacity shrink-0">
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: "w-10 h-10 border-none",
                                        userButtonPopoverCard: "shadow-premium rounded-2xl border border-[var(--border)]"
                                    }
                                }}
                            />
                        </div>
                    </div>
                </SignedIn>
            </div>
        </header>
    );
};

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[var(--surface)] border-t border-[var(--border-subtle)] z-50 px-4 flex items-center justify-between">
            {MENU_ITEMS.slice(0, 5).map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <button
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className={`flex flex-col items-center justify-center gap-1 flex-1 transition-colors ${isActive ? 'text-primary' : 'text-text-secondary'
                            }`}
                    >
                        {item.icon}
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--background)] flex">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 p-6 lg:p-10 pb-24 lg:pb-10">
                    {children}
                </main>
            </div>
            <BottomNav />
        </div>
    );
};

export default MainLayout;
