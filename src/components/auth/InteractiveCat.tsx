import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export type CatState = 'idle' | 'watching' | 'hiding' | 'pointing' | 'success';

interface InteractiveCatProps {
    state: CatState;
    progress?: number;
    verticalProgress?: number;
}

const InteractiveCat = ({ state, progress = 0, verticalProgress = 0 }: InteractiveCatProps) => {
    const [isBlinking, setIsBlinking] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 3D Perspective Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 40 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 40 });

    // Spring-based Gaze Tracking
    const gazeX = useSpring(0, { stiffness: 200, damping: 25 });
    const gazeY = useSpring(0, { stiffness: 200, damping: 25 });

    useEffect(() => {
        // Tightened range for chibi proportions to prevent clipping
        const targetX = (progress * 18) - 9;
        const targetY = (verticalProgress * 12) + 2;
        gazeX.set(targetX);
        gazeY.set(targetY);
    }, [progress, verticalProgress]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = (event.clientX - rect.left - rect.width / 2) * 0.15;
        const mouseY = (event.clientY - rect.top - rect.height / 2) * 0.15;
        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (state !== 'hiding') {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 120);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [state]);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-44 h-44 mx-auto z-20 flex items-center justify-center pointer-events-auto select-none overflow-visible"
            style={{ perspective: '1200px' }}
        >
            <motion.div
                className="relative w-36 h-36"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d'
                }}
            >
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl overflow-visible">
                    <defs>
                        {/* Vibrant Anime Orange Body Gradient */}
                        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FB923C" />
                            <stop offset="100%" stopColor="#F97316" />
                        </linearGradient>

                        {/* Figma-style Highlights */}
                        <radialGradient id="headHighlight" cx="30%" cy="30%" r="50%">
                            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </radialGradient>

                        {/* High-Contrast Blue Iris Gradient (Orange/Blue split) */}
                        <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#60A5FA" />
                            <stop offset="70%" stopColor="#2563EB" />
                            <stop offset="100%" stopColor="#1E3A8A" />
                        </radialGradient>

                        <clipPath id="leftEyeClip">
                            <circle cx="65" cy="100" r="28" />
                        </clipPath>
                        <clipPath id="rightEyeClip">
                            <circle cx="135" cy="100" r="28" />
                        </clipPath>
                        <filter id="cheekBlur">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                        </filter>
                    </defs>

                    {/* Cute Small Body */}
                    <path
                        d="M60,150 Q50,150 50,180 L150,180 Q150,150 140,150 Z"
                        fill="url(#bodyGrad)"
                        stroke="#92400E"
                        strokeWidth="1"
                        strokeOpacity="0.2"
                    />

                    <g transform="translate(0, -10)">
                        {/* Rounded Chibi Ears */}
                        <motion.path
                            d="M60,70 L45,25 Q65,40 85,65 Z"
                            fill="url(#bodyGrad)"
                            stroke="#92400E"
                            strokeWidth="1"
                            strokeOpacity="0.2"
                            animate={{ rotate: state === 'watching' ? [0, -4, 0] : 0 }}
                            transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 2 }}
                        />
                        <motion.path
                            d="M140,70 L155,25 Q135,40 115,65 Z"
                            fill="url(#bodyGrad)"
                            stroke="#92400E"
                            strokeWidth="1"
                            strokeOpacity="0.2"
                            animate={{ rotate: state === 'watching' ? [0, 4, 0] : 0 }}
                            transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 2.2 }}
                        />

                        {/* Main Round Head */}
                        <circle cx="100" cy="100" r="60" fill="url(#bodyGrad)" stroke="#92400E" strokeWidth="1" strokeOpacity="0.2" />
                        <circle cx="85" cy="85" r="30" fill="url(#headHighlight)" opacity="0.4" />

                        {/* Soft Cheeks */}
                        <motion.g
                            animate={{ opacity: state === 'watching' || state === 'success' ? 0.6 : 0.2 }}
                        >
                            <circle cx="65" cy="125" r="10" fill="#FBCFE8" filter="url(#cheekBlur)" />
                            <circle cx="135" cy="125" r="10" fill="#FBCFE8" filter="url(#cheekBlur)" />
                        </motion.g>

                        {/* Big Anime Eyes */}
                        <g transform="translate(0, 5)">
                            <circle cx="65" cy="100" r="28" fill="white" stroke="#F3F4F6" strokeWidth="1" />
                            <circle cx="135" cy="100" r="28" fill="white" stroke="#F3F4F6" strokeWidth="1" />

                            <AnimatePresence mode="wait">
                                {isBlinking || state === 'hiding' ? (
                                    <motion.g
                                        key="blink"
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        exit={{ scaleY: 0 }}
                                        className="origin-center"
                                    >
                                        <path d="M45,100 Q65,112 85,100" fill="none" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
                                        <path d="M115,100 Q135,112 155,100" fill="none" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
                                    </motion.g>
                                ) : (
                                    <motion.g key="eyes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        {/* Left Eye Gaze with Clipping */}
                                        <g clipPath="url(#leftEyeClip)">
                                            <motion.g style={{ x: gazeX, y: gazeY }}>
                                                <g transform="translate(65, 100)">
                                                    {state === 'success' ? (
                                                        <motion.path
                                                            d="M0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 L-14,0 L-4,-4 Z"
                                                            fill="#FBBF24"
                                                            animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                        />
                                                    ) : (
                                                        <>
                                                            <circle r="18" fill="url(#irisGrad)" />
                                                            <circle r="6" fill="#1F2937" />
                                                            <circle cx="-6" cy="-6" r="7" fill="white" opacity="0.9" />
                                                            <circle cx="5" cy="5" r="3" fill="white" opacity="0.5" />
                                                        </>
                                                    )}
                                                </g>
                                            </motion.g>
                                        </g>

                                        {/* Right Eye Gaze with Clipping */}
                                        <g clipPath="url(#rightEyeClip)">
                                            <motion.g style={{ x: gazeX, y: gazeY }}>
                                                <g transform="translate(135, 100)">
                                                    {state === 'success' ? (
                                                        <motion.path
                                                            d="M0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 L-14,0 L-4,-4 Z"
                                                            fill="#FBBF24"
                                                            animate={{ scale: [1, 1.1, 1], rotate: -360 }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                        />
                                                    ) : (
                                                        <>
                                                            <circle r="18" fill="url(#irisGrad)" />
                                                            <circle r="6" fill="#1F2937" />
                                                            <circle cx="-6" cy="-6" r="7" fill="white" opacity="0.9" />
                                                            <circle cx="5" cy="5" r="3" fill="white" opacity="0.5" />
                                                        </>
                                                    )}
                                                </g>
                                            </motion.g>
                                        </g>
                                    </motion.g>
                                )}
                            </AnimatePresence>
                        </g>

                        {/* Cute Tiny Mouth */}
                        <g transform="translate(100, 138)">
                            <path
                                d={state === 'success' ? "M-6,0 Q0,6 6,0" : "M-3,0 Q-1.5,2 0,0 Q1.5,2 3,0"}
                                fill="none"
                                stroke="#1E3A8A"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </g>
                    </g>
                </svg>
            </motion.div>
        </div>
    );
};

export default InteractiveCat;
