import { toast, Toaster, ToastBar } from 'react-hot-toast';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastSystem = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: 'transparent',
                    boxShadow: 'none',
                    padding: 0,
                    margin: 0,
                },
            }}
        >
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 40, scale: 0.9 }}
                            className={`
                                relative flex items-center gap-3 min-w-[320px] p-4 rounded-[20px] border-2 shadow-2xl overflow-hidden
                                ${t.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                                    t.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' :
                                        'bg-[var(--surface)] border-[var(--border)] text-[var(--text-primary)] dark:bg-[var(--surface-muted)]'}
                            `}
                            style={{ boxShadow: 'var(--shadow-l3)' }}
                        >
                            {/* Icon Section */}
                            <div className={`
                                w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                                ${t.type === 'success' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' :
                                    t.type === 'error' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' :
                                        'bg-[var(--text-primary)] text-[var(--background)]'}
                            `}>
                                {t.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
                                    t.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
                                        <Info className="w-5 h-5" />}
                            </div>

                            {/* Message */}
                            <div className="flex-1 pr-6">
                                <div className="text-sm font-bold uppercase tracking-widest opacity-40 mb-0.5">
                                    {t.type === 'success' ? 'Success' : t.type === 'error' ? 'Error' : 'Notification'}
                                </div>
                                <div className="text-sm font-semibold">{message as string}</div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="absolute top-4 right-4 text-text-secondary hover:text-[var(--text-primary)] transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Progress Bar Animation */}
                            <motion.div
                                initial={{ scaleX: 1 }}
                                animate={{ scaleX: 0 }}
                                transition={{ duration: 4, ease: "linear" }}
                                className={`
                                    absolute bottom-0 left-0 right-0 h-1 origin-left
                                    ${t.type === 'success' ? 'bg-emerald-500' :
                                        t.type === 'error' ? 'bg-rose-500' :
                                            'bg-[var(--text-primary)] opacity-20'}
                                `}
                            />
                        </motion.div>
                    )}
                </ToastBar>
            )}
        </Toaster>
    );
};

export default ToastSystem;
