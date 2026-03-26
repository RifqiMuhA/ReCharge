'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 192;
/*
  Bubbles: positioned around perimeter of screen, pop in from edges
*/
type BubbleConfig = {
  id: number;
  text: string;
  top: string;
  left: string;
  rotate: number;
  size: 'sm' | 'md' | 'lg';
  enterFrom: 'left' | 'right' | 'top' | 'bottom';
  appearAt: number; // scroll progress 0-1 when this bubble pops in
};

const BUBBLE_TEXTS = [
  "you're not enough",
  "you should be grateful",
  "why are you like this",
  "everyone else is fine",
  "lazy",
  "it's all in your head",
  "try harder",
  "stop being dramatic",
  "nobody cares",
  "just deal with it",
  "you're overreacting",
  "get over it",
];

const POSITIONED_BUBBLES: BubbleConfig[] = [
  // Top row — enter from top
  { id: 0, text: BUBBLE_TEXTS[0], top: '8%', left: '5%', rotate: -4, size: 'md', enterFrom: 'left', appearAt: 0.30 },
  { id: 1, text: BUBBLE_TEXTS[1], top: '5%', left: '30%', rotate: 2, size: 'lg', enterFrom: 'top', appearAt: 0.35 },
  { id: 2, text: BUBBLE_TEXTS[2], top: '3%', left: '60%', rotate: -2, size: 'sm', enterFrom: 'top', appearAt: 0.40 },
  { id: 3, text: BUBBLE_TEXTS[3], top: '7%', left: '82%', rotate: 3, size: 'md', enterFrom: 'right', appearAt: 0.33 },

  // Left side — enter from left
  { id: 4, text: BUBBLE_TEXTS[4], top: '22%', left: '2%', rotate: 5, size: 'sm', enterFrom: 'left', appearAt: 0.38 },
  { id: 5, text: BUBBLE_TEXTS[5], top: '40%', left: '3%', rotate: -3, size: 'lg', enterFrom: 'left', appearAt: 0.45 },
  { id: 6, text: BUBBLE_TEXTS[6], top: '58%', left: '1%', rotate: 2, size: 'md', enterFrom: 'left', appearAt: 0.50 },
  { id: 7, text: BUBBLE_TEXTS[7], top: '75%', left: '4%', rotate: -5, size: 'sm', enterFrom: 'left', appearAt: 0.55 },

  // Right side — enter from right
  { id: 8, text: BUBBLE_TEXTS[8], top: '20%', left: '80%', rotate: -3, size: 'md', enterFrom: 'right', appearAt: 0.36 },
  { id: 9, text: BUBBLE_TEXTS[9], top: '38%', left: '82%', rotate: 4, size: 'sm', enterFrom: 'right', appearAt: 0.42 },
  { id: 10, text: BUBBLE_TEXTS[10], top: '55%', left: '78%', rotate: -2, size: 'lg', enterFrom: 'right', appearAt: 0.48 },
  { id: 11, text: BUBBLE_TEXTS[11], top: '72%', left: '83%', rotate: 3, size: 'md', enterFrom: 'right', appearAt: 0.53 },

  // Bottom row — enter from bottom
  { id: 12, text: BUBBLE_TEXTS[0], top: '85%', left: '8%', rotate: 3, size: 'sm', enterFrom: 'bottom', appearAt: 0.58 },
  { id: 13, text: BUBBLE_TEXTS[3], top: '88%', left: '35%', rotate: -2, size: 'md', enterFrom: 'bottom', appearAt: 0.60 },
  { id: 14, text: BUBBLE_TEXTS[6], top: '90%', left: '55%', rotate: 4, size: 'sm', enterFrom: 'bottom', appearAt: 0.62 },
  { id: 15, text: BUBBLE_TEXTS[9], top: '86%', left: '75%', rotate: -4, size: 'lg', enterFrom: 'bottom', appearAt: 0.56 },

  // Inner scattered — closer to illustration
  { id: 16, text: BUBBLE_TEXTS[2], top: '18%', left: '20%', rotate: -6, size: 'sm', enterFrom: 'left', appearAt: 0.52 },
  { id: 17, text: BUBBLE_TEXTS[5], top: '16%', left: '65%', rotate: 5, size: 'sm', enterFrom: 'right', appearAt: 0.54 },
  { id: 18, text: BUBBLE_TEXTS[8], top: '65%', left: '18%', rotate: 3, size: 'sm', enterFrom: 'left', appearAt: 0.58 },
  { id: 19, text: BUBBLE_TEXTS[11], top: '68%', left: '68%', rotate: -3, size: 'sm', enterFrom: 'right', appearAt: 0.60 },
];

const sizeClasses: Record<string, string> = {
  sm: 'text-xs md:text-sm px-3 py-1.5',
  md: 'text-sm md:text-base px-4 py-2',
  lg: 'text-base md:text-lg px-5 py-2.5',
};

function Bubble({ bubble, scrollYProgress }: { bubble: BubbleConfig; scrollYProgress: any }) {
  const enterOffset = { left: -120, right: 120, top: -80, bottom: 80 };
  const dir = bubble.enterFrom;
  const offsetX = dir === 'left' ? enterOffset.left : dir === 'right' ? enterOffset.right : 0;
  const offsetY = dir === 'top' ? enterOffset.top : dir === 'bottom' ? enterOffset.bottom : 0;

  const fadeStart = bubble.appearAt;
  const fadeIn = fadeStart + 0.03;
  const fadeOutStart = 0.92;
  const fadeOutEnd = 0.98;

  const opacity = useTransform(scrollYProgress, [fadeStart, fadeIn, fadeOutStart, fadeOutEnd], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [fadeStart, fadeIn], [offsetX, 0]);
  const y = useTransform(scrollYProgress, [fadeStart, fadeIn], [offsetY, 0]);
  const scale = useTransform(scrollYProgress, [fadeStart, fadeIn], [0.5, 1]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: bubble.top,
        left: bubble.left,
        opacity,
        x,
        y,
        scale,
        rotate: bubble.rotate,
      }}
      className="pointer-events-none z-20"
    >
      <div
        className={`${sizeClasses[bubble.size]} bg-floral-white/80 backdrop-blur-md text-pine-teal/90 font-tt-commons font-bold tracking-wide whitespace-nowrap shadow-sm`}
        style={{
          border: '1.5px solid rgba(21,34,27,0.2)',
          borderRadius: '20px',
        }}
      >
        {bubble.text}
      </div>
    </motion.div>
  );
}



export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Load images
  useEffect(() => {
    let unmounted = false;
    const loadedImages: HTMLImageElement[] = [];

    const loadImages = async () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = `/sequence/frame-${i}.jpg`;
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
        if (unmounted) return;
        loadedImages.push(img);
        setLoadedCount(loadedImages.length);
      }
      setImages(loadedImages);
    };

    loadImages();
    return () => { unmounted = true; };
  }, []);

  // Frame Index Mapping (0 to 191)
  const currentFrameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Render to canvas
  useEffect(() => {
    const drawToCanvas = (img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        ctx.scale(dpr, dpr);
      }

      // Cover: fill entire viewport
      const imgAspect = img.width / img.height;
      const canvasAspect = w / h;

      let renderW = w;
      let renderH = h;
      let offsetX = 0;
      let offsetY = 0;

      if (imgAspect > canvasAspect) {
        renderH = h;
        renderW = renderH * imgAspect;
        offsetX = (w - renderW) / 2;
      } else {
        renderW = w;
        renderH = renderW / imgAspect;
        offsetY = (h - renderH) / 2;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    };

    // Current subscription
    const unsubscribe = currentFrameIndex.on('change', (latest) => {
      const idx = Math.floor(latest);
      if (images[idx]) {
        drawToCanvas(images[idx]);
      }
    });

    if (images[0] && currentFrameIndex.get() === 0) {
      drawToCanvas(images[0]);
    }

    const onResize = () => {
      const idx = Math.floor(currentFrameIndex.get());
      if (images[idx]) drawToCanvas(images[idx]);
    };

    window.addEventListener('resize', onResize);
    return () => {
      unsubscribe();
      window.removeEventListener('resize', onResize);
    };
  }, [images, currentFrameIndex]);

  // Overlays
  const isLoaded = loadedCount >= Math.min(FRAME_COUNT, 30); // Consider loaded when first 30 frames are ready

  const opacity35 = useTransform(scrollYProgress, [0.15, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
  const y35 = useTransform(scrollYProgress, [0.15, 0.55], ['10%', '-10%']);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-floral-white">

      {/* Preloader */}
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-floral-white"
          >
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-[12vw] md:text-[8vw] font-tt-commons font-bold text-pine-teal tracking-tighter mix-blend-difference leading-none"
              >
                {Math.round((loadedCount / FRAME_COUNT) * 100)}%
              </motion.div>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="text-pine-teal font-geometric text-sm tracking-widest uppercase mb-4 opacity-50">
                Loading the Experience
              </span>
              <div className="w-64 h-1 bg-pine-teal/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pine-teal rounded-full"
                  style={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-floral-white grain-overlay flex flex-col items-center justify-center">
        {/* Soft gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(255,171,210,0.35) 0%, transparent 70%)',
              top: '-5%',
              right: '-10%',
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

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-multiply"
        />

        {/* Antigravity Bubbles */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {POSITIONED_BUBBLES.map((bubble) => (
            <Bubble key={bubble.id} bubble={bubble} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Text Story Overlays */}
        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center container mx-auto px-6">

          {/* 35% Overlay */}
          <motion.div
            style={{ opacity: opacity35, y: y35 }}
            className="absolute inset-0 flex flex-col items-start justify-center pl-[5%] md:pl-[10%]"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-tt-commons font-bold text-pine-teal tracking-tight drop-shadow-md">
              It starts with<br />just one scroll.
            </h2>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
