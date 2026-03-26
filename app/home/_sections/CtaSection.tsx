'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import TrueFocus from '@/components/ui/true-focus';
import CursorTrail from '@/components/ui/cursor-trail';

export default function CtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 1]);
  const contentScale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [20, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] -mt-8" style={{ color: '#15221B' }}>
      {/* Sticky inner container */}
      <div
        className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#8DDEDE', color: '#15221B' }}
      >
        {/* Cursor trail */}
        <div className="absolute inset-0 z-[5]">
          <CursorTrail size={200} blur={40} />
        </div>

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] opacity-[0.06]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 w-full px-6 max-w-6xl mx-auto flex flex-col items-center"
          style={{
            opacity: contentOpacity,
            scale: contentScale,
            y: contentY,
            color: '#15221B',
          }}
        >
          <div
            className="w-full font-geometric font-bold lowercase"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#15221B',
            }}
          >
            <TrueFocus
              sentence="ready to take the first step?"
              manualMode={false}
              blurAmount={2}
              borderColor="#15221B"
              glowColor="rgba(21, 34, 27, 0.4)"
              animationDuration={0.8}
              pauseBetweenAnimations={1}
              className="justify-start inline-flex items-center"
            />
          </div>

          <div className="mt-16 md:mt-24 pointer-events-auto">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-[100px] font-geometric font-medium lowercase px-[32px] py-[14px] transition-colors duration-300 ease-in-out"
              style={{
                color: '#15221B',
                border: '2px solid #15221B',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#15221B';
                e.currentTarget.style.color = '#F5F5ED';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#15221B';
              }}
            >
              <span style={{ color: 'inherit' }} className="text-lg md:text-xl relative top-[1px]">mulai kuis →</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}