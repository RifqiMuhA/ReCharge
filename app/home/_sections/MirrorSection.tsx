'use client';

import { motion } from 'framer-motion';

const symptomsRow1 = [
  'Susah tidur meski capek',
  'Semua terasa berat',
  'Kehilangan motivasi',
  'Sering sakit kepala',
  'Mudah marah tanpa alasan',
  'Produktivitas turun drastis',
  'Merasa terisolasi',
  'Susah konsentrasi',
];

const symptomsRow2 = [
  'Nggak bisa menikmati hal yang dulu suka',
  'Merasa kosong setiap hari',
  'Cemas berlebihan',
  'Tubuh selalu lelah',
  'Sering melamun di tengah kerja',
  'Merasa tidak cukup baik',
  'Emosi naik turun',
  'Menghindari tanggung jawab',
];

function MarqueeRow({
  items,
  reverse = false,
  speed = 35,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-6 shrink-0"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="shrink-0 flex items-center gap-6"
          >
            <span
              className={`font-tt-commons font-bold text-xl md:text-2xl whitespace-nowrap ${
                i % 3 === 0
                  ? 'text-blush-pop'
                  : i % 3 === 1
                  ? 'text-pine-teal'
                  : 'text-pearl-aqua'
              }`}
            >
              {item}
            </span>
            <span className="text-pine-teal/20 text-2xl">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function MirrorSection() {
  return (
    <section className="py-24 bg-floral-white overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-14 px-6"
      >
        <span className="inline-block text-blush-pop font-tt-commons text-sm tracking-[0.25em] uppercase mb-4">
          Coba jujur sama diri sendiri
        </span>
        <h2 className="text-4xl md:text-6xl font-tt-commons font-bold text-pine-teal leading-tight">
          Kamu relate nggak?
        </h2>
      </motion.div>

      {/* Marquee rows */}
      <div className="space-y-5">
        <MarqueeRow items={symptomsRow1} reverse={false} speed={40} />
        <MarqueeRow items={symptomsRow2} reverse={true} speed={32} />
      </div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center mt-14 text-pine-teal/50 font-geometric text-base px-6"
      >
        Kalau beberapa dari itu terasa familiar — kamu mungkin sedang{' '}
        <span className="text-pine-teal font-semibold underline decoration-blush-pop decoration-2 underline-offset-4">
          mengalami burnout.
        </span>
      </motion.p>
    </section>
  );
}
