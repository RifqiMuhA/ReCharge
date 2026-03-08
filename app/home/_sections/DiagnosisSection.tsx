'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import imgFisik from '@/components/photos/home/burnout-fisik.png';
import imgEmosi from '@/components/photos/home/burnout-emosi.png';
import imgMental from '@/components/photos/home/burnout-mental.png';

const cards: {
  type: string;
  title: string;
  description: string;
  image: StaticImageData;
  accent: string;
  tag: string;
  symptoms: string[];
}[] = [
  {
    type: 'Fisik',
    title: 'Kelelahan Fisik',
    description:
      'Tubuh terasa berat, sering sakit tanpa sebab jelas, dan tidak punya energi meski sudah tidur cukup.',
    image: imgFisik,
    accent: '#FFABD2',
    tag: '01',
    symptoms: ['Sering sakit kepala', 'Susah tidur', 'Otot tegang'],
  },
  {
    type: 'Emosi',
    title: 'Kelelahan Emosi',
    description:
      'Merasa kosong, mudah menangis atau justru mati rasa, kehilangan empati terhadap orang-orang sekitar.',
    image: imgEmosi,
    accent: '#FFF946',
    tag: '02',
    symptoms: ['Mudah marah', 'Merasa kosong', 'Menarik diri'],
  },
  {
    type: 'Mental',
    title: 'Kelelahan Mental',
    description:
      'Sulit berkonsentrasi, pikiran terasa penuh, dan merasa tidak mampu menghadapi tugas-tugas sehari-hari.',
    image: imgMental,
    accent: '#8DDEDE',
    tag: '03',
    symptoms: ['Susah fokus', 'Sering melamun', 'Memori menurun'],
  },
];

// Animated number counter using useMotionValue
function Counter({
  target,
  suffix = '',
  color,
}: {
  target: number;
  suffix?: string;
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, { duration: 2, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, count, target]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-tt-commons font-bold" style={{ color }}>
      <motion.span>{rounded}</motion.span>
    </div>
  );
}

function Card3D({ card, index }: { card: (typeof cards)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const y = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    setRotate({ x: -x * 8, y: y * 8 });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: rotate.x === 0 ? 'transform 0.5s ease' : 'transform 0.1s ease',
      }}
      className="relative bg-[#1e3328] rounded-3xl overflow-hidden cursor-default group"
    >
      {/* Card number badge */}
      <div
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-xs font-tt-commons font-bold text-pine-teal z-10"
        style={{ backgroundColor: card.accent }}
      >
        {card.tag}
      </div>

      {/* Illustration */}
      <div className="relative h-52 w-full overflow-hidden bg-[#243d2e]">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3328] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-7">
        <span
          className="inline-block text-xs font-tt-commons font-bold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full"
          style={{ backgroundColor: `${card.accent}25`, color: card.accent }}
        >
          {card.type}
        </span>
        <h3 className="text-floral-white font-tt-commons font-bold text-2xl mb-3 leading-tight">
          {card.title}
        </h3>
        <p className="text-floral-white/50 font-geometric text-sm leading-relaxed mb-6">
          {card.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {card.symptoms.map((s) => (
            <span
              key={s}
              className="text-xs font-tt-commons px-3 py-1.5 rounded-full border border-floral-white/10 text-floral-white/60"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ backgroundColor: card.accent }}
      />
    </motion.div>
  );
}

export default function DiagnosisSection() {
  return (
    <section className="py-28 bg-[#2D4739] relative overflow-hidden">
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #FFABD2 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <span className="inline-block text-blush-pop font-tt-commons text-sm tracking-[0.25em] uppercase mb-4">
            Mengenal Burnout
          </span>
          <h2 className="text-4xl md:text-6xl font-tt-commons font-bold text-floral-white leading-tight">
            Burnout bukan kelemahan.
            <br />
            <span className="text-canary-yellow">Itu tanda</span> kamu butuh istirahat.
          </h2>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-16 bg-[#1e3328]/60 backdrop-blur rounded-2xl p-6 border border-floral-white/5"
        >
          <div className="text-center">
            <Counter target={67} suffix="%" color="#FFF946" />
            <p className="text-floral-white/40 font-geometric text-xs mt-1">
              Pekerja Indonesia alami burnout
            </p>
          </div>
          <div className="text-center border-x border-floral-white/10">
            <Counter target={3} suffix="x" color="#FFABD2" />
            <p className="text-floral-white/40 font-geometric text-xs mt-1">
              Lebih berisiko sakit serius
            </p>
          </div>
          <div className="text-center">
            <Counter target={40} suffix="%" color="#8DDEDE" />
            <p className="text-floral-white/40 font-geometric text-xs mt-1">
              Produktivitas turun akibat burnout
            </p>
          </div>
        </motion.div>

        {/* 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <Card3D key={card.type} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
