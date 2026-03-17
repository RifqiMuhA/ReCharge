'use client';

import { motion } from 'framer-motion';

/* ──────────────────────────────────────────────
   Icons for Dimension Cards
   ────────────────────────────────────────────── */
const IconStarPath = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ──────────────────────────────────────────────
   Dimension Card Component
   ────────────────────────────────────────────── */
function DimensionCard({
  num,
  title,
  description,
  colorStr,
  delayIdx,
}: {
  num: string;
  title: string;
  description: string;
  colorStr: string;
  delayIdx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: delayIdx * 0.15 }}
      className="relative bg-white rounded-3xl p-8 md:p-10 border-2 border-pine-teal/5 overflow-hidden group hover:border-pine-teal/15 transition-colors duration-300 shadow-sm hover:shadow-md flex flex-col h-full"
    >
      {/* Large faint background number */}
      <div className="absolute top-2 right-6 text-[100px] md:text-[120px] font-tt-commons font-bold text-pine-teal/5 select-none pointer-events-none leading-none z-0 transition-transform duration-500 group-hover:scale-105 group-hover:text-pine-teal/10">
        {num}
      </div>

      <div className="relative z-10 flex-grow">
        {/* Icon Circle */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-10"
          style={{ backgroundColor: colorStr }}
        >
          <IconStarPath className="text-pine-teal/70" />
        </div>

        {/* Text Content */}
        <h3 className="font-tt-commons font-bold text-2xl text-pine-teal lowercase mb-4">
          {title}
        </h3>
        <p className="font-geometric text-sm md:text-base text-pine-teal/60 leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      {/* Decorative colored line at bottom */}
      <div className="relative z-10 w-12 h-1 mt-10 rounded-full transition-all duration-300 group-hover:w-full" style={{ backgroundColor: colorStr }} />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Diagnosis Section
   ────────────────────────────────────────────── */
export default function DiagnosisSection() {
  const dimensions = [
    {
      num: '01',
      title: 'kelelahan emosional',
      description:
        'Energi Anda habis bukan hanya secara fisik, tetapi juga secara batin. Setiap hari terasa berat, dan pemulihan rasanya tidak pernah benar-benar terjadi.',
      colorStr: 'rgba(255,171,210,0.25)', // blush-pop
    },
    {
      num: '02',
      title: 'pelepasan diri',
      description:
        'Anda mulai merasa jauh dari pekerjaan, lingkungan, bahkan dari diri sendiri. Sikap sinis dan dingin muncul sebagai cara melindungi diri.',
      colorStr: 'rgba(141,222,222,0.25)', // pearl-aqua
    },
    {
      num: '03',
      title: 'rasa tidak berarti',
      description:
        'Meski sudah berusaha, tidak ada yang terasa cukup. Anda mempertanyakan kemampuan Anda sendiri dan merasa kontribusi Anda tidak memberi dampak.',
      colorStr: 'rgba(255,249,70,0.25)', // canary-yellow
    },
  ];

  return (
    <section className="relative min-h-screen py-24 md:py-32 overflow-hidden grain-overlay" style={{ background: '#F5F5ED' }}>
      
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
          className="mb-16 md:mb-20 text-center flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-tt-commons font-bold text-pine-teal leading-tight lowercase mb-4">
            memahami burnout
          </h2>
          <p className="text-pine-teal/50 font-geometric text-base md:text-lg lowercase max-w-xl text-center">
            tiga dimensi burnout yang perlu anda kenali, dijelaskan dengan sederhana.
          </p>
        </motion.div>

        {/* 3D Cards alternative — simple 3 column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {dimensions.map((dim, i) => (
            <DimensionCard
              key={dim.num}
              num={dim.num}
              title={dim.title}
              description={dim.description}
              colorStr={dim.colorStr}
              delayIdx={i}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
