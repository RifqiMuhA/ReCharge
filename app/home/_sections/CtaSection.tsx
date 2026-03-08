'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CtaSection() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const spotlight = spotlightRef.current;
    if (!section || !spotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.left = `${x}px`;
      spotlight.style.top = `${y}px`;
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-40 bg-[#2D4739] overflow-hidden flex items-center justify-center"
    >
      {/* Mouse spotlight */}
      <div
        ref={spotlightRef}
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,249,70,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.15s ease, top 0.15s ease',
          left: '50%',
          top: '50%',
        }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #F5F5ED 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full border border-blush-pop/20" />
      <div className="absolute top-14 left-14 w-8 h-8 rounded-full bg-blush-pop/20" />
      <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full border border-canary-yellow/20" />
      <div className="absolute bottom-14 right-14 w-8 h-8 rounded-full bg-canary-yellow/20" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block text-blush-pop font-tt-commons text-sm tracking-[0.25em] uppercase mb-6"
        >
          Mulai hari ini
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-7xl font-tt-commons font-bold text-floral-white leading-[0.95] mb-8 tracking-tight"
        >
          Satu langkah kecil
          <br />
          <span className="text-canary-yellow">sudah cukup.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-floral-white/50 font-geometric text-lg mb-12 leading-relaxed"
        >
          Tidak perlu langsung sembuh. Tidak perlu langsung "baik-baik aja".
          <br />
          Cukup mulai dari mengenali dirimu sendiri.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/quiz"
            className="group relative bg-canary-yellow text-pine-teal px-10 py-4 rounded-full font-tt-commons font-bold text-base overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,249,70,0.3)] transition-all duration-300"
          >
            <span className="relative z-10">Mulai Quiz Burnout →</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            href="/content"
            className="border border-floral-white/20 text-floral-white px-10 py-4 rounded-full font-tt-commons font-bold text-base hover:bg-floral-white/10 hover:-translate-y-1 transition-all duration-300"
          >
            Baca Artikel
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-floral-white/25 font-geometric text-xs"
        >
          Gratis · Tanpa registrasi · Privasi terjaga
        </motion.p>
      </div>
    </section>
  );
}
