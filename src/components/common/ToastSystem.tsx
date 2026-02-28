import { toast, Toaster, ToastBar } from 'react-hot-toast';
import { CheckCircle2, XCircle, Info, X, Loader2, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const TOAST_DURATION = 4000;

const typeConfig = {
    success: {
        icon: CheckCircle2,
        label: 'Success',
        bgGradient: 'from-emerald-500/[0.12] to-emerald-400/[0.06]',
        border: 'border-emerald-500/30',
        iconBg: 'bg-emerald-500',
        iconShadow: 'shadow-emerald-500/40',
        labelColor: 'text-emerald-500',
        bar: 'bg-emerald-500',
        glow: 'shadow-emerald-500/10',
    },
    error: {
        icon: XCircle,
        label: 'Error',
        bgGradient: 'from-rose-500/[0.12] to-rose-400/[0.06]',
        border: 'border-rose-500/30',
        iconBg: 'bg-rose-500',
        iconShadow: 'shadow-rose-500/40',
        labelColor: 'text-rose-500',
        bar: 'bg-rose-500',
        glow: 'shadow-rose-500/10',
    },
    loading: {
        icon: Loader2,
        label: 'Loading',
        bgGradient: 'from-violet-500/[0.12] to-blue-500/[0.06]',
        border: 'border-violet-500/30',
        iconBg: 'bg-violet-500',
        iconShadow: 'shadow-violet-500/40',
        labelColor: 'text-violet-400',
        bar: 'bg-violet-500',
        glow: 'shadow-violet-500/10',
    },
    blank: {
        icon: Bell,
        label: 'Notice',
        bgGradient: 'from-[var(--surface-muted)]/80 to-[var(--surface)]/60',
        border: 'border-[var(--border)]',
        iconBg: 'bg-[var(--text-primary)]',
        iconShadow: 'shadow-black/20',
        labelColor: 'text-text-secondary',
        bar: 'bg-[var(--text-primary)]',
        glow: 'shadow-black/5',
    },
};

const ToastSystem = () => {
    return (
        <Toaster
            position="top-right"
            gutter={10}
            toastOptions={{
                duration: TOAST_DURATION,
                style: {
                    background: 'transparent',
                    boxShadow: 'none',
                    padding: 0,
                    margin: 0,
                    maxWidth: 'none',
                },
            }}
        >
            {(t) => {
                const type = (t.type as keyof typeof typeConfig) in typeConfig
                    ? (t.type as keyof typeof typeConfig)
                    : 'blank';
                const cfg = typeConfig[type];
                const Icon = cfg.icon;
                const isLoading = type === 'loading';

                return (
                    <ToastBar toast={t}>
                        {({ message }) => (
                            <motion.div
                                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 60, scale: 0.88, transition: { duration: 0.2 } }}
                                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                                className={`
                                    relative flex items-center gap-4 
                                    min-w-[340px] max-w-[420px]
                                    px-4 py-3.5
                                    rounded-2xl border
                                    bg-gradient-to-br backdrop-blur-xl
                                    ${cfg.bgGradient} ${cfg.border}
                                    shadow-2xl ${cfg.glow}
                                    overflow-hidden
                                `}
                                style={{
                                    background: 'var(--surface)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)',
                                }}
                            >
                                {/* Left accent bar */}
                                <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full ${cfg.bar}`} />

                                {/* Icon */}
                                <div className={`
                                    w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ml-1
                                    ${cfg.iconBg} text-white shadow-lg ${cfg.iconShadow}
                                `}>
                                    <Icon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                                </div>

                                {/* Text content */}
                                <div className="flex-1 min-w-0">
                                    <div className={`text-[10px] font-black uppercase tracking-[0.18em] mb-0.5 ${cfg.labelColor}`}>
                                        {cfg.label}
                                    </div>
                                    <div className="text-sm font-semibold text-[var(--text-primary)] leading-snug truncate">
                                        {message as string}
                                    </div>
                                </div>

                                {/* Dismiss button (hide on loading) */}
                                {!isLoading && (
                                    <button
                                        onClick={() => toast.dismiss(t.id)}
                                        className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-text-secondary hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-all"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}

                                {/* Progress bar */}
                                {!isLoading && (
                                    <motion.div
                                        key={t.id}
                                        initial={{ scaleX: 1, opacity: 1 }}
                                        animate={{ scaleX: 0, opacity: 0.7 }}
                                        transition={{ duration: TOAST_DURATION / 1000, ease: 'linear' }}
                                        className={`absolute bottom-0 left-0 right-0 h-[2px] origin-left ${cfg.bar} opacity-60`}
                                    />
                                )}
                            </motion.div>
                        )}
                    </ToastBar>
                );
            }}
        </Toaster>
    );
};

export default ToastSystem;
