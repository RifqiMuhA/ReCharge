'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ──────────────────────────────────────────────
   Icons for Familiar Section Cards
   ────────────────────────────────────────────── */
const IconNeutralFace = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" strokeDasharray="4 4" className="text-blush-pop" />
    <path d="M8 9h.01M16 9h.01M8 15h8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconOverthinking = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 4c-4 0-7 2.5-7 6 0 1.5.8 2.8 2 3.8-.5 1.5-.5 3-1.5 4v1c1.5-.5 3.5-.5 5-1.5 1 .3 2.1.5 3.2.5 5 0 8.5-4.5 8.5-9s-4-5.8-10.2-4.8z" strokeDasharray="3 3" className="text-blush-pop" />
    <path d="M9 10c1.5-2 4.5-2 6 0M9 14c1.5-1 4.5-1 6 0" strokeLinecap="round" />
  </svg>
);

const IconFatigue = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 18c3-4 11-4 14 0" className="text-blush-pop" />
    <path d="M16 7l-3 3h3M9 9l-2 2h2M5 11l-1.5 1.5h1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLossMotivation = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 7l-7 7-4-4L3 17" strokeDasharray="3 3" className="text-blush-pop" />
    <path d="M21 7h-5M21 7v5" strokeLinecap="round" strokeLinejoin="round" className="text-blush-pop" />
    <circle cx="21" cy="7" r="1.5" fill="currentColor" />
    <circle cx="14" cy="14" r="1.5" fill="currentColor" />
    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
  </svg>
);

const IconEasilyTriggered = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2A10 10 0 1 0 22 12" strokeDasharray="3 3" className="text-blush-pop" />
    <path d="M16 4l-1 3 3 1-3 1 1 3-3-1-1 3-1-3-3 1 1-3-3-1 3-1-1-3 3 1z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ──────────────────────────────────────────────
   Content Data
   ────────────────────────────────────────────── */
const familiarCards = [
  {
    id: 'mati-rasa',
    title: 'mati rasa secara emosional',
    description:
      'Anda merasa terputus dari perasaan sendiri — seolah menyaksikan kehidupan dari balik layar kaca, tanpa bisa benar-benar terlibat.',
    icon: IconNeutralFace,
  },
  {
    id: 'terjebak-pikiran',
    title: 'terjebak dalam pikiran',
    description:
      'Pikiran Anda terus berputar tanpa henti. Setiap kekhawatiran memicu kekhawatiran baru, hingga sulit untuk beristirahat dengan tenang.',
    icon: IconOverthinking,
  },
  {
    id: 'selalu-lelah',
    title: 'selalu merasa lelah',
    description:
      'Meski sudah cukup tidur, tubuh dan pikiran tetap terasa berat. Kelelahan ini bukan sekadar fisik — ia meresap hingga ke dalam.',
    icon: IconFatigue,
  },
  {
    id: 'kehilangan-motivasi',
    title: 'kehilangan motivasi',
    description:
      'Hal-hal yang dulu Anda sukai kini terasa seperti beban. Semangat untuk memulai sesuatu pun perlahan menghilang.',
    icon: IconLossMotivation,
  },
  {
    id: 'mudah-terpancing',
    title: 'mudah terpancing emosi',
    description:
      'Hal kecil bisa memicu reaksi besar. Anda mudah tersinggung atau marah kepada orang-orang yang Anda sayangi — dan itu pun membuat Anda kelelahan.',
    icon: IconEasilyTriggered,
  },
];

/* ──────────────────────────────────────────────
   Familiar Section
   ────────────────────────────────────────────── */
export default function FamiliarSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const activeContent = familiarCards.find((c) => c.id === activeCard);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-8 grain-overlay" style={{ background: '#F5F5ED' }}>
      
      {/* Background ambient light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, #2D3748 0%, transparent 100%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-tt-commons font-bold text-pine-teal lowercase mb-4 tracking-tight">
            apakah ini terasa familiar?
          </h2>
          <p className="text-pine-teal/50 font-geometric text-base md:text-lg lowercase max-w-2xl mx-auto">
            terkadang kita tidak menyadari seberapa banyak yang sedang kita tanggung.
          </p>
        </motion.div>

        {/* Cards container */}
        <div className="w-full mb-10 overflow-x-auto pb-6 hide-scrollbar">
          <div className="flex flex-row snap-x snap-mandatory gap-4 md:gap-6 w-max mx-auto px-4 md:px-0">
            {familiarCards.map((card, idx) => {
              const isActive = activeCard === card.id;
              return (
                <motion.button
                  key={card.id}
                  onClick={() => setActiveCard(isActive ? null : card.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="snap-center shrink-0 w-[200px] md:w-[220px] h-[220px] md:h-[240px] flex flex-col items-center justify-center text-center p-6 rounded-[28px] transition-all duration-300 outline-none"
                  style={{
                    backgroundColor: isActive ? 'rgba(255,171,210,0.08)' : 'rgba(255,255,255,0.6)',
                    border: isActive ? '2px solid rgba(255,171,210,0.6)' : '2px solid rgba(21,34,27,0.06)',
                    boxShadow: isActive ? '0 10px 40px -10px rgba(255,171,210,0.15)' : 'none',
                    backdropFilter: 'blur(8px)',
                  }}
                  whileHover={{
                    y: -5,
                    backgroundColor: isActive ? 'rgba(255,171,210,0.1)' : 'rgba(255,255,255,0.9)',
                    border: isActive ? '2px solid rgba(255,171,210,0.8)' : '2px solid rgba(21,34,27,0.1)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`mb-6 p-4 rounded-full transition-colors duration-300 ${isActive ? 'bg-white' : 'bg-transparent'}`}>
                    <card.icon />
                  </div>
                  <span className={`font-tt-commons text-lg md:text-xl leading-snug lowercase transition-colors duration-300 ${isActive ? 'text-pine-teal font-semibold' : 'text-pine-teal/70'}`}>
                    {card.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Description Area */}
        <div className="w-full max-w-3xl min-h-[140px] flex flex-col items-center justify-center px-6">
          <AnimatePresence mode="wait">
            {activeContent ? (
              <motion.div
                key={activeContent.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full bg-white/60 backdrop-blur-md border md:border-2 border-pine-teal/5 rounded-3xl p-6 md:p-8 text-center"
                style={{
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.02)'
                }}
              >
                <h3 className="font-tt-commons font-semibold text-lg md:text-xl text-pine-teal mb-2 lowercase">
                  {activeContent.title}
                </h3>
                <p className="font-geometric text-sm md:text-base leading-relaxed text-pine-teal/60">
                  {activeContent.description}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-pine-teal/30 font-geometric text-sm lowercase"
              >
                pilih salah satu untuk melihat penjelasannya.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
