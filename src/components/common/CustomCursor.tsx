import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth springs for trailing effect
    const springConfig = { damping: 25, stiffness: 250 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target as HTMLElement;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible, mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden lg:block"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: '-50%',
                translateY: '-50%',
            }}
        >
            {/* Outer Ring */}
            <motion.div
                className="absolute inset-0 border border-[var(--border-subtle)] rounded-full"
                animate={{
                    scale: isPointer ? 1.5 : 1,
                    opacity: isPointer ? 0.3 : 0.2,
                }}
            />

            {/* Inner Dot */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-[var(--text-primary)] rounded-full -translate-x-1/2 -translate-y-1/2"
                animate={{
                    scale: isPointer ? 0.5 : 1,
                }}
            />

            {/* Magnetic Core (Subtle Glow) */}
            {isPointer && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.1, scale: 2 }}
                    className="absolute inset-0 bg-[var(--text-primary)] rounded-full blur-md"
                />
            )}
        </motion.div>
    );
};

export default CustomCursor;
