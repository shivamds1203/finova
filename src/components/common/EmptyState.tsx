import { motion } from 'framer-motion';
import { Plus, Coffee, Ghost, Zap } from 'lucide-react';

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    type?: 'default' | 'financial' | 'search';
}

const EmptyState = ({ title, description, actionLabel, onAction, type = 'default' }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            {/* Animated Illustration Container */}
            <div className="relative mb-8">
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 2, -2, 0]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-32 h-32 rounded-[40px] bg-[var(--surface-muted)] flex items-center justify-center border-2 border-[var(--border)] shadow-inner overflow-hidden"
                >
                    {type === 'financial' ? <Zap className="w-12 h-12 text-amber-500" /> :
                        type === 'search' ? <Ghost className="w-12 h-12 text-text-secondary" /> :
                            <Coffee className="w-12 h-12 text-text-secondary" />}

                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500/5 rounded-full blur-xl" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-rose-500/5 rounded-full blur-xl" />
                </motion.div>

                {/* Magnetic Sparkles */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-200/50 blur-[2px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="text-xl font-black text-[var(--text-primary)] mb-2 truncate max-w-md">
                    {title}
                </h3>
                <p className="text-text-secondary font-medium text-sm leading-relaxed max-w-sm mb-8 mx-auto">
                    {description}
                </p>

                {actionLabel && (
                    <button
                        onClick={onAction}
                        className="btn-primary-ultra px-8 py-4 flex items-center gap-2 mx-auto"
                    >
                        <Plus className="w-4 h-4" />
                        {actionLabel}
                    </button>
                )}
            </motion.div>
        </div>
    );
};

export default EmptyState;
