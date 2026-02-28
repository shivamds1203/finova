import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, Key, Smartphone, ChevronRight, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SECURITY_STATS = [
    { label: 'Encryption Standard', value: 'AES-256', sub: 'Military Grade' },
    { label: 'Active Sessions', value: '1', sub: 'New York, US' },
    { label: 'Security Score', value: '98/100', sub: 'Optimized' },
];

const Security = () => {
    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
        >
            {/* Header */}
            <div>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-text-secondary hover:text-[var(--text-primary)] transition-colors mb-4 text-sm font-bold"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
                <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">Security Vault</h1>
                <p className="text-text-secondary font-medium mt-1">Your data is secured with enterprise-level biometric and cryptographic standards.</p>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 relative z-10">
                {SECURITY_STATS.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="card-premium p-6 group"
                    >                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2">{stat.label}</div>
                        <div className="text-2xl font-black mb-1 text-[var(--text-primary)]">{stat.value}</div>
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {stat.sub}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Connection Section */}
                <div className="card-premium p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--surface-muted)] flex items-center justify-center border-2 border-[var(--border)] shadow-sm">
                            <Lock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[var(--text-primary)]">Encryption Management</h3>
                            <p className="text-sm text-text-secondary font-medium">End-to-end status of your cloud vault.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-5 bg-[var(--background)] rounded-2xl border-2 border-[var(--border)] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-[var(--surface-muted)] rounded-xl border border-[var(--border-subtle)]">
                                    <Key className="w-5 h-5 text-[var(--text-primary)]" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-[var(--text-primary)]">Master Encryption Key</div>
                                    <div className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Rotated 2 days ago</div>
                                </div>
                            </div>
                            <button onClick={() => toast.success('Key revoked successfully')} className="text-xs font-black uppercase tracking-widest text-primary hover:underline">Revoke</button>
                        </div>

                        <div className="p-5 bg-[var(--background)] rounded-2xl border-2 border-[var(--border)] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-[var(--surface-muted)] rounded-xl border border-[var(--border-subtle)]">
                                    <EyeOff className="w-5 h-5 text-[var(--text-primary)]" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-[var(--text-primary)]">Privacy Mode</div>
                                    <div className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Active while screen sharing</div>
                                </div>
                            </div>
                            <div className="w-12 h-6 bg-[var(--text-primary)] rounded-full p-1 flex items-center justify-end">
                                <div className="w-4 h-4 bg-[var(--background)] rounded-full shadow-lg" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Biometrics */}
                <div className="card-premium p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border-2 border-[var(--border)] shadow-sm">
                            <Smartphone className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[var(--text-primary)]">Identity & Biometrics</h3>
                            <p className="text-sm text-text-secondary font-medium">Manage how you access your account.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {['Face ID Authentication', 'Two-Factor (2FA)', 'Hardware Security Key'].map((item, idx) => (
                            <div key={item} className="flex items-center justify-between py-4 border-b border-[var(--border-subtle)] last:border-0 group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    <span className="text-sm font-bold text-[var(--text-primary)]">{item}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-text-secondary group-hover:text-[var(--text-primary)] transition-colors" />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                        <div className="text-xs font-bold text-amber-500/80 leading-relaxed">
                            Your security score could be improved by connecting a YubiKey or similar hardware device.
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Log */}
            <div className="card-premium p-8">
                <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-6">Recent Security Activity</div>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-4 p-4 hover:bg-[var(--surface-muted)] rounded-2xl transition-all">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <div className="flex-1">
                                <div className="text-sm font-bold text-[var(--text-primary)]">Successful login from Mac Studio</div>
                                <div className="text-[10px] text-text-secondary font-medium uppercase tracking-widest">紐約, US • Chrome 122.0.0</div>
                            </div>
                            <div className="text-[10px] font-black text-text-secondary uppercase tracking-widest">2h ago</div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Security;
