'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import MirrorSection from '@/app/home/_sections/MirrorSection';
import DiagnosisSection from '@/app/home/_sections/DiagnosisSection';

export default function MirrorDiagnosisTransition() {
  const mirrorRef = useRef<HTMLDivElement>(null);

  // Track when the bottom of MirrorSection exits viewport
  // This gives us a 0→1 progress as the user scrolls past mirror content
  const { scrollYProgress } = useScroll({
    target: mirrorRef,
    offset: ['end end', 'end start'],
  });

  // Subtle exit animation as DiagnosisSection overlaps
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const blurValue = useTransform(scrollYProgress, [0, 0.6], [0, 8]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <div className="relative w-full">

      {/* ── MirrorSection: scrolls naturally, fades/scales at exit ── */}
      <motion.div
        ref={mirrorRef}
        className="relative w-full"
        style={{
          scale,
          opacity,
          filter,
        }}
      >
        <MirrorSection />
      </motion.div>

      {/* ── DiagnosisSection: overlaps like a card sliding over ── */}
      <div className="relative z-10 w-full bg-[#F5F5ED] -mt-[20vh] rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,0,0.08)]">
        <DiagnosisSection />
      </div>

    </div>
  );
}
