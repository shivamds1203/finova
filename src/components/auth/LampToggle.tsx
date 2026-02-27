import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface LampToggleProps {
    isOn: boolean;
    onToggle: () => void;
}

const LampToggle = ({ isOn, onToggle }: LampToggleProps) => {
    const [isPulling, setIsPulling] = useState(false);
    const [isFlickering, setIsFlickering] = useState(false);

    const handlePull = () => {
        setIsPulling(true);
        setTimeout(() => {
            setIsPulling(false);
            if (!isOn) {
                setIsFlickering(true);
                setTimeout(() => setIsFlickering(false), 200);
            }
            onToggle();
        }, 300);
    };

    return (
        <div className="relative flex flex-col items-center">
            {/* Lamp Head (Mount) */}
            <motion.div
                animate={{
                    rotateX: isOn ? [0, -3, 0] : 0,
                    y: isPulling ? 8 : 0
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative z-20 flex flex-col items-center"
            >
                {/* Ceiling Mount / Pole - Now Brush Brass */}
                <div className="w-2 h-40 bg-gradient-to-r from-[#d4af37] via-[#f9d71c] to-[#d4af37] rounded-full shadow-lg" />

                {/* Lamp Shade - Premium Gilded Finish */}
                <div className="relative w-40 h-24 bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] border-[3px] border-[#d4af37]/50 rounded-t-[50px] flex items-end justify-center overflow-hidden shadow-2xl">
                    {/* Interior Gold Lining */}
                    <div className="absolute inset-x-0 bottom-0 h-4 bg-[#d4af37]/20 border-t border-[#d4af37]/30" />

                    {/* The Bulb Glow (Full Yellow) */}
                    <AnimatePresence>
                        {(isOn && !isFlickering) && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-[#ffff00]/50 mix-blend-color-dodge"
                                />
                                <motion.div
                                    animate={{ opacity: [0.8, 1, 0.8] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute bottom-0 w-20 h-20 bg-[#ffff00] rounded-full blur-2xl opacity-100"
                                />
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Definitive Light Cone (Full Yellow Gradient) */}
            <AnimatePresence>
                {isOn && (
                    <motion.svg
                        initial={{ opacity: 0, scaleY: 0.8 }}
                        animate={{ opacity: isFlickering ? [0.2, 0.8, 0.3, 1] : 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0.9 }}
                        className="absolute top-[220px] w-[800px] h-[600px] pointer-events-none z-0"
                        viewBox="0 0 800 600"
                    >
                        <defs>
                            <radialGradient id="lampCone" cx="50%" cy="0%" r="100%">
                                <stop offset="0%" stopColor="#ffff00" stopOpacity="0.6" />
                                <stop offset="50%" stopColor="#ffff00" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <path d="M350,0 L450,0 L750,600 L50,600 Z" fill="url(#lampCone)" filter="blur(45px)" />
                    </motion.svg>
                )}
            </AnimatePresence>

            {/* Pull String Interaction */}
            <motion.button
                onClick={handlePull}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePull()}
                aria-label="Toggle Lamp"
                tabIndex={0}
                className="cursor-pointer group relative flex flex-col items-center outline-none focus:ring-2 focus:ring-amber-200 rounded-full p-2"
                style={{ top: '-15px' }}
                animate={{
                    y: isPulling ? 30 : 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 12 }}
            >
                <div className="w-1 h-28 bg-[#d4af37] group-hover:bg-[#f9d71c] transition-colors shadow-sm" />
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8a6d3b] border-2 border-white shadow-xl group-hover:scale-110 transition-transform flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full opacity-60" />
                </div>
            </motion.button>
        </div>
    );
};

export default LampToggle;
