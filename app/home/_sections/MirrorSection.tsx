'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/* ──────────────────────────────────────────────
   Symptom data with hover explanations
   ────────────────────────────────────────────── */
const symptomsRow1 = [
  { label: 'Susah tidur meski capek', explain: 'Tubuhmu lelah tapi pikiran nggak bisa berhenti.' },
  { label: 'Semua terasa berat', explain: 'Hal kecil pun terasa seperti gunung.' },
  { label: 'Kehilangan motivasi', explain: 'Nggak ada yang bikin semangat lagi.' },
  { label: 'Sering sakit kepala', explain: 'Stres bisa bikin tubuh ikut kelelahan.' },
  { label: 'Mudah marah tanpa alasan', explain: 'Emosi jadi nggak terkontrol.' },
  { label: 'Produktivitas turun', explain: 'Hasilnya nggak sesuai usaha.' },
  { label: 'Merasa terisolasi', explain: 'Kayak nggak ada yang paham.' },
  { label: 'Susah konsentrasi', explain: 'Pikiran kemana-mana nggak bisa fokus.' },
];

const symptomsRow2 = [
  { label: 'Nggak bisa menikmati yang dulu suka', explain: 'Hobi terasa hambar, nggak ada rasa lagi.' },
  { label: 'Merasa kosong setiap hari', explain: 'Kayak menjalani hidup di mode autopilot.' },
  { label: 'Cemas berlebihan', explain: 'Khawatir terus tanpa alasan jelas.' },
  { label: 'Tubuh selalu lelah', explain: 'Tidur berjam-jam pun tetap capek.' },
  { label: 'Sering melamun', explain: 'Pikiran sering kabur tanpa tujuan.' },
  { label: 'Merasa tidak cukup baik', explain: 'Selalu ngerasa kurang meski sudah berusaha.' },
  { label: 'Emosi naik turun', explain: 'Mood swing yang bikin bingung sendiri.' },
  { label: 'Menghindari tanggung jawab', explain: 'Procrastinate karena terlalu overwhelmed.' },
];

const symptomsRow3 = [
  { label: 'Overthinking terus', explain: 'Pikiran berputar kayak loop yang nggak ada ujungnya.' },
  { label: 'Merasa nggak berarti', explain: 'Kayak keberadaanmu nggak ada efeknya.' },
  { label: 'Malas ngapa-ngapain', explain: 'Bukan males biasa — ini udah level nggak punya energi.' },
  { label: 'Pengen menghilang aja', explain: 'Nggak harus pergi jauh — cuma mau lepas sejenak.' },
  { label: 'Nangis tanpa sebab', explain: 'Emosi tumpah di saat nggak diduga.' },
  { label: 'Susah ngobrol sama orang', explain: 'Interaksi sosial jadi terasa melelahkan.' },
  { label: 'Ngerasa jadi beban', explain: 'Kamu bukan beban. Itu burnout yang bicara.' },
  { label: 'Badan pegal terus', explain: 'Stres menumpuk di otot dan sendi.' },
];

const symptomsRow4 = [
  { label: 'Nggak ada semangat bangun pagi', explain: 'Hari belum dimulai tapi udah capek duluan.' },
  { label: 'Kerja terasa sia-sia', explain: 'Usahamu nggak terasa bermakna.' },
  { label: 'Sering lupa hal kecil', explain: 'Otak kelebihan beban, jadi error.' },
  { label: 'Mimpi buruk terus', explain: 'Pikiran bawah sadar ikut kelelahan.' },
  { label: 'Nafsu makan hilang', explain: 'Burnout bisa ganggu pola makan.' },
  { label: 'Takut gagal lagi', explain: 'Trauma kegagalan bikin kamu nggak mau coba.' },
  { label: 'Ngerasa sendirian', explain: 'Padahal banyak orang yang peduli.' },
  { label: 'Capek hati dan pikiran', explain: 'Ini tanda kamu butuh istirahat yang nyata.' },
];

/* ──────────────────────────────────────────────
   Chip colors — soft pastels
   ────────────────────────────────────────────── */
const chipStyles = [
  { bg: 'rgba(255,171,210,0.10)', border: 'rgba(255,171,210,0.30)', color: '#c4749a' },
  { bg: 'rgba(141,222,222,0.10)', border: 'rgba(141,222,222,0.30)', color: '#5a9e9e' },
  { bg: 'rgba(21,34,27,0.05)', border: 'rgba(21,34,27,0.12)', color: '#15221b' },
  { bg: 'rgba(255,249,70,0.08)', border: 'rgba(255,249,70,0.25)', color: '#9e9520' },
];

/* ──────────────────────────────────────────────
   Symptom Chip with hover tooltip
   ────────────────────────────────────────────── */
function SymptomChip({ label, explain, colorIdx }: { label: string; explain: string; colorIdx: number }) {
  const [hovered, setHovered] = useState(false);
  const c = chipStyles[colorIdx % chipStyles.length];

  return (
    <div
      className="shrink-0 relative cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="inline-block font-tt-commons font-bold text-sm md:text-lg lg:text-xl whitespace-nowrap px-5 py-2.5 md:px-7 md:py-3 rounded-full backdrop-blur-sm transition-all duration-300"
        style={{
          background: hovered ? c.border : c.bg,
          border: `1.5px solid ${c.border}`,
          color: c.color,
        }}
      >
        {label}
      </span>

      {/* Tooltip */}
      <motion.div
        className="absolute -top-14 left-1/2 -translate-x-1/2 bg-pine-teal text-floral-white text-xs font-geometric px-4 py-2.5 rounded-xl whitespace-nowrap shadow-lg pointer-events-none z-50"
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 8,
          scale: hovered ? 1 : 0.95,
        }}
        transition={{ duration: 0.2 }}
      >
        {explain}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-pine-teal rotate-45" />
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Marquee Row with interactive chips
   ────────────────────────────────────────────── */
function MarqueeRow({
  items,
  reverse = false,
  speed = 35,
  rowIndex = 0,
  blurAmount = 0,
  opacity = 1,
}: {
  items: { label: string; explain: string }[];
  reverse?: boolean;
  speed?: number;
  rowIndex?: number;
  blurAmount?: number;
  opacity?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="flex overflow-hidden"
      style={{
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
        opacity,
      }}
    >
      <motion.div
        className="flex gap-4 md:gap-6 shrink-0"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {doubled.map((item, i) => (
          <SymptomChip
            key={`${rowIndex}-${i}`}
            label={item.label}
            explain={item.explain}
            colorIdx={i + rowIndex}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Floating ambient particles
   ────────────────────────────────────────────── */
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 3,
    duration: 3 + Math.random() * 5,
    delay: Math.random() * 3,
    color:
      i % 3 === 0
        ? 'rgba(255,171,210,0.3)'
        : i % 3 === 1
        ? 'rgba(141,222,222,0.25)'
        : 'rgba(255,249,70,0.2)',
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Mirror Section — Main
   ────────────────────────────────────────────── */
export default function MirrorSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 grain-overlay"
      style={{ background: '#F5F5ED' }}
    >
      {/* Atmospheric gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255,171,210,0.35) 0%, transparent 70%)',
            top: '-10%',
            left: '-10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(141,222,222,0.3) 0%, transparent 70%)',
            bottom: '-5%',
            right: '-8%',
          }}
        />
      </div>

      <FloatingParticles />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center mb-10 md:mb-16 px-6"
      >
        <motion.span
          className="inline-block text-blush-pop font-tt-commons text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-5"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          coba jujur sama diri sendiri
        </motion.span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-tt-commons font-bold text-pine-teal leading-tight lowercase">
          kamu relate nggak?
        </h2>
        <motion.div
          className="mx-auto mt-4 md:mt-5 h-[3px] rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #FFABD2, #8DDEDE, transparent)' }}
          initial={{ width: 0 }}
          whileInView={{ width: 120 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </motion.div>

      {/* Marquee Rows */}
      <div className="relative z-10 w-full space-y-4 md:space-y-5">
        {/* Fade edges */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: `linear-gradient(90deg, #F5F5ED 0%, transparent 8%, transparent 92%, #F5F5ED 100%)`,
          }}
        />

        <MarqueeRow items={symptomsRow1} reverse={false} speed={45} rowIndex={0} />
        <MarqueeRow items={symptomsRow2} reverse={true}  speed={38} rowIndex={1} />
        <MarqueeRow items={symptomsRow3} reverse={false} speed={50} rowIndex={2} blurAmount={0.5} opacity={0.85} />
        <MarqueeRow items={symptomsRow4} reverse={true}  speed={42} rowIndex={3} blurAmount={1} opacity={0.65} />
      </div>

      {/* Bottom text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 text-center mt-12 md:mt-16 px-6 max-w-2xl"
      >
        <p className="text-pine-teal/50 font-geometric text-sm md:text-base lg:text-lg leading-relaxed">
          kalau beberapa dari itu terasa familiar — kamu mungkin sedang{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-pine-teal font-semibold">
              mengalami burnout.
            </span>
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-[8px] md:h-[10px] rounded-full -z-0"
              style={{ background: 'linear-gradient(90deg, #FFABD2, #8DDEDE)' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </p>

        {/* Scroll indicator */}
        <motion.div
          className="mt-8 md:mt-12 flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-1.5 h-8 md:h-10 rounded-full bg-pine-teal/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 rounded-full"
              style={{ background: 'linear-gradient(180deg, #FFABD2, transparent)', height: '50%' }}
              animate={{ y: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
