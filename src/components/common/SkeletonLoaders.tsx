import { motion } from 'framer-motion';

export const Shimmer = () => (
    <motion.div
        animate={{
            x: ['-100%', '100%']
        }}
        transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent opacity-20 z-10"
    />
);

export const SkeletonCard = () => (
    <div className="card-premium p-6 relative overflow-hidden bg-[var(--surface-muted)] border-2 border-[var(--border)]">
        <Shimmer />
        <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--border-subtle)]" />
            <div className="w-16 h-4 bg-[var(--border-subtle)] rounded-lg" />
        </div>
        <div className="space-y-2">
            <div className="w-24 h-3 bg-[var(--border-subtle)] rounded-lg opacity-60" />
            <div className="w-32 h-8 bg-[var(--border-subtle)] rounded-xl" />
        </div>
    </div>
);

export const SkeletonChart = () => (
    <div className="card-premium p-8 h-[450px] relative overflow-hidden bg-[var(--surface-muted)] border-2 border-[var(--border)] flex flex-col">
        <Shimmer />
        <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
                <div className="w-48 h-6 bg-[var(--border-subtle)] rounded-xl" />
                <div className="w-32 h-3 bg-[var(--border-subtle)] rounded-lg opacity-60" />
            </div>
            <div className="w-32 h-10 bg-[var(--border-subtle)] rounded-xl" />
        </div>
        <div className="flex-1 w-full bg-[var(--border-subtle)]/50 rounded-2xl animate-pulse" />
    </div>
);
