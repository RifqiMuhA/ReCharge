'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import Image from 'next/image';
import loaderImg from '@/components/photos/home/loader.png';

interface PreloaderProps {
  isLoaded: boolean;
  loadedCount: number;
  totalFrames: number;
}

export default function SequencePreloader({ isLoaded, loadedCount, totalFrames }: PreloaderProps) {
  const calculatedProgress = totalFrames > 0 ? (loadedCount / totalFrames) * 100 : 0;
  // If parent says isLoaded, force the progress to hit 100% smoothly
  const targetProgress = isLoaded ? 100 : calculatedProgress;
  
  const [displayProgress, setDisplayProgress] = useState(0);
  const [shouldExit, setShouldExit] = useState(false);
  
  // Framer Motion spring for smooth number and bar animation (simulating real load)
  const springProgress = useSpring(0, { stiffness: 45, damping: 20 });

  useEffect(() => {
    springProgress.set(targetProgress);
  }, [targetProgress, springProgress]);

  useEffect(() => {
    return springProgress.on('change', (latest) => {
      setDisplayProgress(latest);
      // Wait until the spring animation actually reaches ~100% before exiting
      if (isLoaded && latest >= 99.8) {
        setShouldExit(true);
      }
    });
  }, [springProgress, isLoaded]);

  return (
    <AnimatePresence mode="wait">
      {!shouldExit && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-floral-white"
        >
          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 pointer-events-none z-[1] opacity-[0.05]"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
            }}
          />

          {/* Animated Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-8 w-[140px] md:w-[220px] relative z-20"
          >
            {/* Soft backdrop glow to make it blend well */}
            <div className="absolute inset-0 bg-blush-pop/20 blur-[50px] rounded-full scale-110" />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image 
                src={loaderImg} 
                alt="Loading" 
                className="w-full h-auto object-contain relative z-10 drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Percentage */}
          <div className="overflow-hidden relative z-20">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-[14vw] md:text-[10vw] font-tt-commons font-bold text-blush-pop tracking-tighter leading-none drop-shadow-sm"
            >
              {shouldExit ? 100 : Math.round(displayProgress)}%
            </motion.div>
          </div>

          {/* Progress Bar Container */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center w-full max-w-sm px-8 z-20">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-blush-pop font-geometric font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-4 drop-shadow-sm"
            >
              Loading the Experience
            </motion.span>
            <div className="w-full h-1.5 bg-blush-pop/10 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-blush-pop rounded-full shadow-[0_0_10px_rgba(255,171,210,0.8)]"
                style={{ width: `${shouldExit ? 100 : displayProgress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
