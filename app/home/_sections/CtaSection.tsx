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
    </section>
  );
}
