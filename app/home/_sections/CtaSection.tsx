'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TrueFocus from '@/components/ui/true-focus';

export default function CtaSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden py-24 bg-[#8DDEDE]">
      
      {/* Background grain texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      <div className="relative z-10 w-full px-6 max-w-6xl mx-auto flex flex-col items-center">
        
        {/* TrueFocus Heading */}
        <div className="w-full font-geometric font-bold text-[#15221B] lowercase" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          <TrueFocus
            sentence="ready to take the first step?"
            manualMode={false}
            blurAmount={5}
            borderColor="#15221B"
            glowColor="rgba(21, 34, 27, 0.3)"
            animationDuration={0.5}
            pauseBetweenAnimations={1}
            className="justify-start"
          />
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 md:mt-24"
        >
          <Link 
            href="/quiz" 
            className="inline-flex items-center justify-center rounded-[100px] border border-[#15221B] bg-transparent hover:bg-[#15221B] hover:text-[#F5F5ED] text-[#15221B] font-geometric font-medium lowercase px-[32px] py-[14px] transition-colors duration-300 ease-in-out"
          >
            <span className="text-lg md:text-xl relative top-[1px]">mulai kuis →</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

