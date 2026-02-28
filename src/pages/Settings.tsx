import { motion } from 'framer-motion';
import { ArrowLeft, Bell, CreditCard, Lock, Moon, Shield, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../providers/ThemeProvider';
import toast from 'react-hot-toast';

const Settings = () => {
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10 max-w-4xl"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-text-secondary hover:text-[var(--text-primary)] transition-colors mb-4 text-sm font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </button>
                    <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">Preferences</h1>
                    <p className="text-text-secondary font-medium mt-1">Manage your account, security, and display settings.</p>
                </div>
                <button onClick={() => toast.success('Settings saved successfully')} className="h-[48px] px-6 bg-[var(--text-primary)] text-[var(--background)] rounded-xl font-bold hover:opacity-90 transition-opacity">
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Section */}
                <div className="md:col-span-3 card-premium p-8">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-[var(--surface-muted)] border-2 border-[var(--border)]">
                            <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[var(--text-primary)]">Profile Settings</h2>
                            <p className="text-text-secondary text-sm font-medium mt-1">Update your personal information and contact details.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Full Name</label>
                            <input type="text" defaultValue="Alex Sterling" className="w-full bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:border-primary transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Email Address</label>
                            <input type="email" defaultValue="alex.sterling@finova.co" className="w-full bg-[var(--surface-muted)] border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:border-primary transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Theme & Display */}
                <div className="md:col-span-1 card-premium p-8 relative overflow-hidden">
                    <div className="flex items-start gap-4 mb-8 relative z-10">
                        <div className="p-3 rounded-xl bg-[var(--surface-muted)] border-2 border-[var(--border)]">
                            <Moon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[var(--text-primary)]">Appearance</h2>
                        </div>
                    </div>
                    <div className="space-y-4 relative z-10">
                        <button
                            onClick={() => setTheme('light')}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-[var(--border)] bg-[var(--surface-muted)] hover:border-[var(--text-primary)]'}`}
                        >
                            <span className="font-bold text-sm text-[var(--text-primary)]">Light Mode</span>
                            {theme === 'light' && <div className="w-2 h-2 rounded-full bg-primary" />}
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-[var(--border)] bg-[var(--surface-muted)] hover:border-[var(--text-primary)]'}`}
                        >
                            <span className="font-bold text-sm text-[var(--text-primary)]">Dark Mode</span>
                            {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-primary" />}
                        </button>
                        <button
                            onClick={() => setTheme('system')}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-[var(--border)] bg-[var(--surface-muted)] hover:border-[var(--text-primary)]'}`}
                        >
                            <span className="font-bold text-sm text-[var(--text-primary)]">System Prefs</span>
                            {theme === 'system' && <div className="w-2 h-2 rounded-full bg-primary" />}
                        </button>
                    </div>
                </div>

                {/* Security & Notifications */}
                <div className="md:col-span-2 space-y-8">
                    <div className="card-premium p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-[var(--surface-muted)] border-2 border-[var(--border)]">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[var(--text-primary)]">Security Protocols</h2>
                                <p className="text-text-secondary text-sm font-medium mt-1">Finova uses AES-256 bank-level encryption.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-[var(--border)] rounded-xl bg-[var(--surface-muted)]">
                                <div>
                                    <div className="font-bold text-sm text-[var(--text-primary)]">Two-Factor Auth (2FA)</div>
                                    <div className="text-xs text-text-secondary mt-0.5">Secure your account via App Authenticator.</div>
                                </div>
                                <button onClick={() => toast('2FA management coming soon')} className="px-4 py-2 bg-[var(--text-primary)] text-[var(--background)] rounded-lg text-xs font-bold">Manage</button>
                            </div>
                            <div className="flex items-center justify-between p-4 border border-[var(--border)] rounded-xl bg-[var(--surface-muted)]">
                                <div>
                                    <div className="font-bold text-sm text-[var(--text-primary)]">Active Sessions</div>
                                    <div className="text-xs text-text-secondary mt-0.5">You are logged in on 2 devices.</div>
                                </div>
                                <button onClick={() => toast.success('Logged out of all other sessions')} className="px-4 py-2 border border-[var(--border)] text-[var(--text-primary)] rounded-lg text-xs font-bold hover:bg-[var(--surface)]">Log out all</button>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium p-8">
                        <div className="flex items-center gap-4 mb-2">
                            <Bell className="w-5 h-5 text-text-secondary" />
                            <h2 className="text-lg font-bold text-[var(--text-primary)]">Notification Toggles</h2>
                        </div>
                        <div className="space-y-4 mt-6">
                            {[
                                { title: 'Security Alerts', desc: 'Login attempts and password changes', active: true },
                                { title: 'Large Transactions', desc: 'Any cash movement over $1,000', active: true },
                                { title: 'Investment Drops', desc: 'Alert if portfolio dips by 5% in 24h', active: false },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer">
                                    <div>
                                        <div className="font-bold text-sm text-[var(--text-primary)]">{item.title}</div>
                                        <div className="text-xs text-text-secondary mt-0.5">{item.desc}</div>
                                    </div>
                                    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${item.active ? 'bg-primary' : 'bg-[var(--border)]'}`}>
                                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${item.active ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default Settings;
