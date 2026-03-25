import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface BlurTextProps {
    text: string;
    className?: string;
    delay?: number;
    animateBy?: 'words' | 'letters';
    direction?: 'bottom' | 'top';
}

export const BlurText = ({ text, delay = 0, className = '', animateBy = 'words', direction = 'bottom' }: BlurTextProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const words = text.split(' ');

    const initialY = direction === 'bottom' ? 50 : -50;

    const variants = {
        hidden: {
            filter: 'blur(10px)',
            opacity: 0,
            y: initialY
        },
        visible: (i: number) => ({
            filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
            opacity: [0, 0.5, 1],
            y: [initialY, -5, 0],
            transition: {
                duration: 0.35,
                times: [0, 0.5, 1],
                delay: (delay / 1000) + (i * 0.1),
                ease: 'easeOut' as any
            }
        })
    };

    return (
        <span ref={ref} className={`inline-block ${className}`}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={variants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="inline-block mr-[0.25em] last:mr-0 text-inherit leading-inherit"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};
