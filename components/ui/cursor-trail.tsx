'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorTrailProps {
  color?: string; // e.g., 'rgba(255, 171, 210, 0.5)'
  size?: number;
  blur?: number;
}

export default function CursorTrail({ color = 'rgba(255, 171, 210, 0.5)', size = 150, blur = 40 }: CursorTrailProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  // Smooth spring physics for the "trailing" effect
  const springConfig = { damping: 40, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - size / 2);
      mouseY.set(e.clientY - size / 2);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, size, isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
      style={{
        x: smoothX,
        y: smoothY,
        width: size,
        height: size,
        backgroundColor: color,
        filter: `blur(${blur}px)`,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  );
}
