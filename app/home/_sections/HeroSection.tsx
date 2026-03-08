'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  const blobRef = useRef<HTMLDivElement>(null);

  // Breathing gradient blob
  useEffect(() => {
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.008;
      if (blobRef.current) {
        const x = 50 + Math.sin(t) * 12;
        const y = 50 + Math.cos(t * 0.7) * 10;
        const s = 1 + Math.sin(t * 1.3) * 0.06;
        blobRef.current.style.transform = `translate(${x - 50}%, ${y - 50}%) scale(${s})`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2D4739]">
      {/* Breathing gradient blob */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={blobRef}
          className="w-[700px] h-[700px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at center, #FFABD2 0%, #FFF946 40%, transparent 70%)',
            filter: 'blur(80px)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* Canary yellow pill accent - top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ delay: 1.2, duration: 0.6, ease: 'backOut' }}
        className="absolute top-[18%] right-[8%] bg-canary-yellow text-pine-teal text-xs font-tt-commons font-bold px-4 py-2 rounded-full hidden md:block"
      >
        Mental Health Platform
      </motion.div>

      {/* Blush pop pill - bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 6 }}
        transition={{ delay: 1.4, duration: 0.6, ease: 'backOut' }}
        className="absolute bottom-[22%] left-[6%] bg-blush-pop text-pine-teal text-xs font-tt-commons font-bold px-4 py-2 rounded-full hidden md:block"
      >
        #KenaLiBatas
      </motion.div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-block text-blush-pop/80 font-tt-commons text-sm tracking-[0.25em] uppercase">
            Selamat datang di ReCharge
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          className="text-[clamp(3rem,10vw,8rem)] font-tt-commons font-bold leading-[0.92] text-floral-white mb-8 tracking-tight"
        >
          Kenali Batas.
          <br />
          <span className="text-canary-yellow">Sebelum</span>
          <br />
          Terlambat.
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          variants={fadeUp}
          className="text-floral-white/60 font-geometric text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Platform edukasi dan dukungan kesehatan mental untuk mencegah burnout
          di tempat kerja dan kehidupan sehari-hari.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/quiz"
            className="group relative bg-canary-yellow text-pine-teal px-8 py-4 rounded-full font-tt-commons font-bold text-base overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,249,70,0.35)]"
          >
            <span className="relative z-10">Cek Kondisimu →</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            href="/content"
            className="border border-floral-white/30 text-floral-white px-8 py-4 rounded-full font-tt-commons font-bold text-base backdrop-blur-sm hover:bg-floral-white/10 hover:-translate-y-1 transition-all duration-300"
          >
            Pelajari Lebih Lanjut
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={fadeUp}
          className="mt-20 flex flex-col items-center gap-2 text-floral-white/30"
        >
          <span className="font-geometric text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-floral-white/30 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
