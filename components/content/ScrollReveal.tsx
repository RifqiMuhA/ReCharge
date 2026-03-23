import React, { useRef, ReactNode, JSX } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for conditional classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  baseOpacity?: number;
  enableBlur?: boolean;
  baseRotation?: number;
  blurStrength?: number;
}

export default function ScrollReveal({
  children,
  className,
  baseOpacity = 0.1,
  enableBlur = false,
  baseRotation = 0,
  blurStrength = 4,
}: ScrollRevealProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 40%'], // Fade in as it scrolls into this window
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [baseOpacity, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [baseRotation, 0]);
  const blurFilter = useTransform(
    scrollYProgress,
    [0, 1],
    [`blur(${enableBlur ? blurStrength : 0}px)`, `blur(0px)`]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{
        opacity,
        y,
        rotateX: rotate,
        filter: blurFilter,
        willChange: 'opacity, transform, filter',
      }}
      className={cn(className, 'transition-colors')}
    >
      {children}
    </motion.div>
  );
}
