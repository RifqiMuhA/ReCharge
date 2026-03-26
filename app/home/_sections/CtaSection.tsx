'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

/* ──────────────────────────────────────────────
   Floating decorative shapes
   ────────────────────────────────────────────── */
function FloatingShapes() {
  const shapes = [
    { top: '10%', left: '8%', size: 60, color: 'rgba(255,171,210,0.25)', delay: 0 },
    { top: '20%', right: '12%', size: 40, color: 'rgba(141,222,222,0.2)', delay: 1 },
    { top: '65%', left: '5%', size: 35, color: 'rgba(255,249,70,0.2)', delay: 2 },
    { top: '75%', right: '8%', size: 50, color: 'rgba(255,171,210,0.15)', delay: 0.5 },
    { top: '40%', left: '85%', size: 25, color: 'rgba(141,222,222,0.25)', delay: 1.5 },
  ];

  return (
    <>
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: s.top,
            left: s.left,
            right: (s as any).right,
            width: s.size,
            height: s.size,
            background: s.color,
          }}
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4 + i,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}

/* ──────────────────────────────────────────────
   Decorative SVG — hand holding plant (Light Theme adjusted)
   ────────────────────────────────────────────── */
function HealingIllustration() {
  return (
    <motion.div
      className="relative z-10 mb-8"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mx-auto">
        {/* Pot */}
        <path
          d="M40 75 L50 100 L70 100 L80 75 Z"
          fill="rgba(255,171,210,0.15)"
          stroke="#FFABD2"
          strokeWidth="1.5"
        />
        {/* Stem */}
        <path
          d="M60 75 C60 55, 60 45, 60 30"
          stroke="#2D4739"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left leaf */}
        <path
          d="M60 55 C45 45, 35 35, 40 25 C50 20, 55 40, 60 55"
          fill="rgba(141,222,222,0.25)"
          stroke="#8DDEDE"
          strokeWidth="1"
        />
        {/* Right leaf */}
        <path
          d="M60 45 C75 35, 85 25, 80 18 C70 15, 65 35, 60 45"
          fill="rgba(255,171,210,0.2)"
          stroke="#FFABD2"
          strokeWidth="1"
        />
        {/* Top leaf */}
        <path
          d="M60 30 C55 15, 50 8, 55 5 C62 3, 62 20, 60 30"
          fill="rgba(255,249,70,0.3)"
          stroke="#FFF946"
          strokeWidth="1"
        />
        {/* Small sparkle dots */}
        <circle cx="45" cy="20" r="2" fill="#d1cc24" opacity="0.6" />
        <circle cx="78" cy="15" r="1.5" fill="#c4749a" opacity="0.6" />
        <circle cx="35" cy="40" r="1.5" fill="#5a9e9e" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   CTA Section — Light Theme Version
   ────────────────────────────────────────────── */
export default function CtaSection() {
  return (
    <section
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden grain-overlay py-20"
      style={{ background: '#F5F5ED' }}
    >
      {/* Soft gradient backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, #FFABD2 0%, transparent 100%)' }}
        />
      </div>

      <FloatingShapes />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto mt-10">
        <HealingIllustration />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-tt-commons font-bold text-pine-teal leading-[1.1] mb-6 lowercase tracking-tight"
        >
          mari kita cari tahu
          <br />
          bersama
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-pine-teal/50 font-geometric text-base md:text-lg mb-10 leading-relaxed lowercase max-w-lg mx-auto"
        >
          ikuti kuis singkat untuk memahami tingkat burnout anda. tanpa penilaian, hanya kejernihan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <Link
            href="/quiz"
            className="group relative bg-canary-yellow text-pine-teal px-12 py-4 rounded-full font-tt-commons font-bold text-base md:text-lg overflow-hidden transition-all duration-300 lowercase hover:scale-105"
            style={{ boxShadow: '0 8px 30px -5px rgba(255,249,70,0.6)' }}
          >
            <span className="relative z-10">mulai kuis</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-pine-teal/30 font-geometric text-xs lowercase"
        >
          hanya sekitar 2 menit · sepenuhnya gratis
        </motion.p>
      </div>

      {/* Footer tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-auto pt-16 pb-8 relative z-10 w-full text-center"
      >
        <p className="text-pine-teal/20 font-geometric text-xs lowercase tracking-wider">
          recharge © 2026 · dibuat dengan penuh perhatian
        </p>
      </motion.div>
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
