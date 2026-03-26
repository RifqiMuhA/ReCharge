'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from '@/components/ui/scroll-stack';
import { Highlight } from '@/components/ui/hero-highlight';

/* ──────────────────────────────────────────────
   Icons for Dimension Cards
   ────────────────────────────────────────────── */
const IconBatteryEmpty = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="2" y="7" width="16" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="22" y1="11" x2="22" y2="13" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="6" y1="12" x2="6" y2="12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconShieldCross = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12h6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPauseCircle = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="10" y1="15" x2="10" y2="9" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="14" y1="15" x2="14" y2="9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconEyeFocus = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTrophyEmpty = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M8 21h8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 4h10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 4v8a5 5 0 01-10 0V4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 9h3v3a3 3 0 003 3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 9h-3v3a3 3 0 01-3 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ──────────────────────────────────────────────
   Dimension Card Component
   ────────────────────────────────────────────── */
function DimensionCard({
  num,
  title,
  description,
  quote,
  source,
  colorStr,
}: {
  num: string;
  title: React.ReactNode;
  description: React.ReactNode;
  quote: string;
  source: string;
  colorStr: string;
}) {
  return (
    <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-pine-teal/10 overflow-hidden group hover:border-pine-teal/20 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] flex flex-col gap-6 items-start justify-center min-h-[300px]">
      {/* Large faint background number */}
      <div className="absolute top-0 right-4 text-[120px] md:text-[180px] font-tt-commons font-bold text-pine-teal/5 select-none pointer-events-none leading-none z-0 transition-transform duration-500 group-hover:scale-105 group-hover:text-pine-teal/10">
        {num}
      </div>

      <div className="relative z-10 flex-grow pt-2 md:pt-0 w-full">
        {/* Text Content */}
        <h3 className="font-tt-commons font-bold text-2xl md:text-3xl text-pine-teal lowercase mb-3 md:mb-4">
          {title}
        </h3>
        <p className="font-geometric text-base md:text-lg text-pine-teal/80 leading-relaxed mb-6">
          {description}
        </p>

        {/* Quote Section */}
        <div className="pl-4 border-l-2 border-pine-teal/20 relative">
          <p className="font-geometric italic text-sm md:text-base text-pine-teal/60 mb-2">
            "{quote}"
          </p>
          <span className="font-tt-commons font-semibold text-xs md:text-xs text-pine-teal/40 uppercase tracking-wider">
            {source}
          </span>
        </div>

        {/* Decorative colored line at bottom */}
        <div className="w-12 h-1 mt-8 rounded-full transition-all duration-300 group-hover:w-32 opacity-70" style={{ backgroundColor: colorStr }} />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Diagnosis Section
   ────────────────────────────────────────────── */
export default function DiagnosisSection() {
  const dimensions = [
    {
      num: '01',
      title: <>Kelelahan yang tidak hilang meski <Highlight className="italic text-pine-teal">sudah istirahat</Highlight></>,
      description: <>Kamu tidur cukup, tapi bangun tetap merasa lelah. Bukan karena kurang istirahat — melainkan karena energimu sudah <Highlight className="italic text-pine-teal">terkuras</Highlight> jauh sebelum hari dimulai. Ini bukan kelemahan. Ini adalah sinyal.</>,
      quote: 'Burnout is not a problem to be solved, it is a response to be understood — a signal that something in the environment needs to change.',
      source: 'Christina Maslach, Ph.D., UC Berkeley · Maslach Burnout Inventory',
      colorStr: 'rgba(255,171,210,0.25)', // blush-pop
    },
    {
      num: '02',
      title: <>Mati rasa, bukan <Highlight className="italic text-pine-teal">sedih</Highlight></>,
      description: <>Kamu tidak menangis. Kamu tidak marah. Kamu hanya <Highlight className="italic text-pine-teal">tidak merasakan apa-apa</Highlight>. Scrolling, liking, closing — semua terasa seperti gerak otomatis tanpa makna.</>,
      quote: 'Cynicism is the mind\'s way of protecting itself from further disappointment. It is exhaustion wearing a mask of indifference.',
      source: 'Christina Maslach, Ph.D. · "Burnout: The Cost of Caring"',
      colorStr: 'rgba(141,222,222,0.25)', // pearl-aqua
    },
    {
      num: '03',
      title: <><Highlight className="italic text-pine-teal">Guilty</Highlight> saat istirahat</>,
      description: <>Satu jam tidak melakukan apa-apa terasa seperti pemborosan. Padahal tubuhmu sudah meminta berhenti sejak lama — kamu yang memilih untuk <Highlight className="italic text-pine-teal">mengabaikannya</Highlight>, karena berhenti terasa seperti kekalahan.</>,
      quote: 'Our devices make it nearly impossible to disconnect, and that constant connectivity is taking a real toll on mental health.',
      source: 'Sharon Claffey, Ph.D., Psikolog Klinis',
      colorStr: 'rgba(255,249,70,0.25)', // canary-yellow
    },
    {
      num: '04',
      title: <>Mengukur hidup dengan <Highlight className="italic text-pine-teal">standar orang lain</Highlight></>,
      description: <>Setiap kali membuka feed, kamu melihat seseorang yang tampak lebih produktif, lebih bahagia, lebih cukup. Tanpa sadar, kamu mulai <Highlight className="italic text-pine-teal">mengejar standar</Highlight> yang bahkan bukan milikmu.</>,
      quote: 'Social media enables effortless upward comparison — we see curated highlights and measure ourselves against an impossible standard.',
      source: 'Sharon Claffey, Ph.D., Psikolog Klinis',
      colorStr: 'rgba(255,171,210,0.25)', // blush-pop
    },
    {
      num: '05',
      title: <>Pencapaian yang terasa <Highlight className="italic text-pine-teal">hampa</Highlight></>,
      description: <>Kamu berhasil. Kamu seharusnya bangga. Tapi yang ada hanya satu pertanyaan: <Highlight className="italic text-pine-teal">sudah cukupkah ini?</Highlight> Dan jawaban yang muncul, hampir selalu — belum.</>,
      quote: 'Reduced personal accomplishment is not about failing — it is about succeeding and still feeling like it is never enough.',
      source: 'Christina Maslach, Ph.D. · Maslach Burnout Inventory, Dimensi Ketiga',
      colorStr: 'rgba(141,222,222,0.25)', // pearl-aqua
    },
  ];

  return (
    <section className="relative min-h-screen py-24 md:py-32 overflow-hidden grain-overlay" style={{ background: '#F5F5ED', WebkitOverflowScrolling: 'touch' }}>

      {/* Background soft styling */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col justify-between">
        <div className="w-[120%] h-[300px] bg-gradient-to-b from-white/40 to-transparent -ml-[10%]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-0 text-center flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-geometric font-bold text-pine-teal leading-tight mb-4">
            Memahami <Highlight className="italic">Burnout</Highlight>
          </h2>
          <p className="text-pine-teal/50 font-geometric text-base md:text-lg lowercase max-w-xl text-center">
            lima dimensi burnout yang perlu kamu kenali, dijelaskan dengan sederhana.
          </p>
        </motion.div>

        {/* Scroll Stack Layout */}
        <div className="-mt-12 md:-mt-24 w-full max-w-4xl mx-auto" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
          <ScrollStack
            useWindowScroll={true}
            itemDistance={100}
            itemScale={0.03}
            itemStackDistance={30}
            stackPosition="20%"
            scaleEndPosition="10%"
            baseScale={0.88}
          >
            {dimensions.map((dim) => (
              <ScrollStackItem key={dim.num} itemClassName="w-full">
                <div style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}>
                  <DimensionCard
                    num={dim.num}
                    title={dim.title}
                    description={dim.description}
                    quote={dim.quote}
                    source={dim.source}
                    colorStr={dim.colorStr}
                  />
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

      </div>
    </section>
  );
}
