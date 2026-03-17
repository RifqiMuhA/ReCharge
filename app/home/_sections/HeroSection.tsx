'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import imgIsland from '@/components/photos/home/hero_island_1772989259517.png';

/* ──────────────────────────────────────────────
   Floating decorative sparkles
   ────────────────────────────────────────────── */
function Sparkle({ style, delay, size }: { style: React.CSSProperties; delay: number; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.5],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"
          fill="currentColor"
          className="text-blush-pop/40"
        />
      </svg>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Chat Bubble component
   ────────────────────────────────────────────── */
type BubbleVariant = 'pill' | 'rounded' | 'cloud' | 'sharp' | 'tag';

function ChatBubble({
  text,
  size = 'md',
  variant = 'rounded',
  rotate = 0,
}: {
  text: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: BubbleVariant;
  rotate?: number;
}) {
  const sizeMap: Record<string, { px: number; py: number; text: string }> = {
    xs: { px: 10, py: 5, text: 'text-[10px] md:text-xs' },
    sm: { px: 14, py: 7, text: 'text-xs md:text-sm' },
    md: { px: 18, py: 10, text: 'text-sm md:text-base' },
    lg: { px: 22, py: 12, text: 'text-base md:text-lg' },
    xl: { px: 28, py: 14, text: 'text-lg md:text-xl' },
  };
  const s = sizeMap[size];

  const radiusMap: Record<BubbleVariant, string> = {
    pill: '999px',
    rounded: '20px',
    cloud: '24px 24px 24px 8px',
    sharp: '6px',
    tag: '12px 12px 12px 0px',
  };

  return (
    <div className="relative inline-block" style={{ transform: `rotate(${rotate}deg)` }}>
      <div
        className={`relative ${s.text} backdrop-blur-sm`}
        style={{
          padding: `${s.py}px ${s.px}px`,
          border: '1.5px solid rgba(21,34,27,0.25)',
          borderRadius: radiusMap[variant],
          background: 'rgba(255,171,210,0.08)',
        }}
      >
        <span className="text-pine-teal/70 font-tt-commons font-bold whitespace-nowrap">
          {text}
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Bubble data
   ────────────────────────────────────────────── */
type BubbleData = {
  text: string;
  top: string;
  left: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant: BubbleVariant;
  rotate: number;
};

const ALL_BUBBLES: BubbleData[] = [
  // Upper arc
  { text: 'kamu lambat',       top: '5%',  left: '2%',  size: 'lg',  variant: 'rounded', rotate: -3 },
  { text: 'nggak berguna',     top: '3%',  left: '25%', size: 'xl',  variant: 'pill',    rotate: 2 },
  { text: 'deadline besok!!',  top: '2%',  left: '52%', size: 'md',  variant: 'sharp',   rotate: -1 },
  { text: 'malu-maluin!',      top: '2%',  left: '82%', size: 'lg',  variant: 'cloud',   rotate: 3 },

  // Second arc
  { text: 'gagal terus',       top: '15%', left: '6%',  size: 'md',  variant: 'tag',     rotate: 4 },
  { text: 'overthinking 🌀',   top: '13%', left: '35%', size: 'sm',  variant: 'cloud',   rotate: -2 },
  { text: 'sia-sia',           top: '12%', left: '56%', size: 'xs',  variant: 'sharp',   rotate: -4 },
  { text: 'payah',             top: '16%', left: '88%', size: 'sm',  variant: 'pill',    rotate: -5 },

  // Left side
  { text: 'revisi lagi?!',     top: '26%', left: '1%',  size: 'lg',  variant: 'sharp',   rotate: 2 },
  { text: 'kurang usaha!',     top: '37%', left: '4%',  size: 'md',  variant: 'cloud',   rotate: -3 },
  { text: 'capek...',          top: '48%', left: '2%',  size: 'sm',  variant: 'pill',    rotate: 1 },

  // Right side
  { text: 'harus sempurna!',   top: '25%', left: '72%', size: 'xl',  variant: 'rounded', rotate: 1 },
  { text: 'pecundang',         top: '38%', left: '80%', size: 'lg',  variant: 'rounded', rotate: 4 },
  { text: 'sampah',            top: '52%', left: '88%', size: 'sm',  variant: 'sharp',   rotate: -1 },

  // Scattered
  { text: 'beban',             top: '24%', left: '22%', size: 'xs',  variant: 'cloud',   rotate: 3 },
  { text: 'bodoh',             top: '23%', left: '50%', size: 'xs',  variant: 'pill',    rotate: 6 },
  { text: 'gelap',             top: '35%', left: '22%', size: 'xs',  variant: 'tag',     rotate: -6 },
  { text: 'gitu aja gabisa',   top: '46%', left: '65%', size: 'xs',  variant: 'tag',     rotate: -2 },

  // Lower
  { text: 'tolong',            top: '56%', left: '10%', size: 'xs',  variant: 'rounded', rotate: 2 },
  { text: 'sendiri',           top: '60%', left: '76%', size: 'xs',  variant: 'cloud',   rotate: -3 },
];

/* ──────────────────────────────────────────────
   Sparkle positions
   ────────────────────────────────────────────── */
const SPARKLES = Array.from({ length: 18 }, (_, i) => ({
  style: {
    top: `${5 + Math.random() * 85}%`,
    left: `${5 + Math.random() * 90}%`,
  },
  delay: Math.random() * 4,
  size: 8 + Math.random() * 12,
}));

/* ──────────────────────────────────────────────
   Hero Section
   ────────────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [imageScale, setImageScale] = useState(1.6);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight - window.innerHeight)));

    // Phase 1 (0–15%): Image zoom out 1.6x -> 1x
    const zoomProgress = Math.min(progress / 0.15, 1);
    setImageScale(1.6 - 0.6 * zoomProgress);

    // Phase 2 (10%–70%): Bubbles appear
    if (progress < 0.10) {
      setVisibleCount(0);
    } else {
      const bp = Math.min((progress - 0.10) / 0.60, 1);
      setVisibleCount(Math.round(bp * ALL_BUBBLES.length));
    }

    // Phase 3 (75%): Headline
    setShowHeadline(progress > 0.75);

    // Phase 4 (88%): Subtext
    setShowSubtext(progress > 0.88);

    // Hide scroll hint after initial scroll
    setShowScrollHint(progress < 0.05);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div ref={sectionRef} className="relative h-[500vh] bg-floral-white grain-overlay">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-end pb-10 px-4 md:px-8">

        {/* Soft gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(255,171,210,0.35) 0%, transparent 70%)',
              top: '-5%',
              right: '-10%',
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(141,222,222,0.3) 0%, transparent 70%)',
              bottom: '10%',
              left: '-8%',
            }}
          />
          <div
            className="absolute w-[450px] h-[450px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(255,249,70,0.25) 0%, transparent 70%)',
              top: '40%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>

        {/* Sparkle decorations */}
        {SPARKLES.map((sp, i) => (
          <Sparkle key={i} style={sp.style} delay={sp.delay} size={sp.size} />
        ))}

        {/* Bubble area */}
        <div className="absolute top-0 left-0 right-0 h-[60%] pointer-events-none z-20">
          {ALL_BUBBLES.map((bubble, i) => (
            <AnimatePresence key={i}>
              {i < visibleCount && (
                <motion.div
                  className="absolute"
                  style={{ top: bubble.top, left: bubble.left }}
                  initial={{ opacity: 0, scale: 0.3, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.3 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <ChatBubble
                    text={bubble.text}
                    size={bubble.size}
                    variant={bubble.variant}
                    rotate={bubble.rotate}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Hero illustration */}
        <div
          className="relative z-10 w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] mb-8"
          style={{
            transform: `scale(${imageScale})`,
            willChange: 'transform',
          }}
        >
          <Image
            src={imgIsland}
            alt="Burnout illustration"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Headline */}
        <AnimatePresence>
          {showHeadline && (
            <motion.h1
              className="relative z-30 text-5xl md:text-6xl lg:text-8xl font-tt-commons font-bold text-pine-teal tracking-tight text-center lowercase"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              capek ya?
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Subtext */}
        <AnimatePresence>
          {showSubtext && (
            <motion.p
              className="relative z-30 mt-4 text-base md:text-xl text-pine-teal/50 font-geometric max-w-xl leading-relaxed text-center lowercase"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              mungkin bukan salah anda. mungkin ini yang namanya burnout.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Scroll hint */}
        <AnimatePresence>
          {showScrollHint && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-pine-teal/30 font-geometric text-xs tracking-widest uppercase">
                gulir untuk memahami
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-pine-teal/30">
                  <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
