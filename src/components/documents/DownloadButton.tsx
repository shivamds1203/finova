import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, CheckCircle2 } from 'lucide-react';

interface DownloadButtonProps {
    onClick: () => Promise<void>;
    label?: string;
}

const DownloadButton = ({ onClick, label = "Download Report" }: DownloadButtonProps) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleClick = async () => {
        if (status !== 'idle') return;

        setStatus('loading');
        try {
            await onClick();
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            setStatus('idle');
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
            className="relative overflow-hidden group px-8 py-4 bg-slate-900 text-white rounded-2xl shadow-xl font-black flex items-center justify-center min-w-[200px]"
        >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

            <AnimatePresence mode="wait">
                {status === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 relative z-10"
                    >
                        <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        <span>{label}</span>
                    </motion.div>
                )}

                {status === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-3 relative z-10 text-emerald-400"
                    >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Generating...</span>
                    </motion.div>
                )}

                {status === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-3 relative z-10 text-emerald-400"
                    >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Ready</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default DownloadButton;
