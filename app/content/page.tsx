'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ImageMouseTrail from '@/components/content/MouseTrail';
import { TypingText, TypingTextCursor } from '@/components/animate-ui/primitives/texts/typing';
import { HighlightText } from '@/components/animate-ui/primitives/texts/highlight';
import { RotatingText, RotatingTextContainer } from '@/components/animate-ui/primitives/texts/rotating';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';
import StackingCards from '@/components/content/StackingCards';
import DecryptedText from '@/components/DecryptedText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CanvasSkater from '@/components/animate-ui/CanvasSkater';
import { ReactLenis } from 'lenis/react';

import smilley1 from '@/components/photos/content/smilley1.webp';
import smiley2 from '@/components/photos/content/smiley2.webp';
import smiley3 from '@/components/photos/content/smiley3.webp';
import smiley4 from '@/components/photos/content/smiley4.webp';
import guiltyCharacters from '@/components/photos/content/guilty-characters.svg';
import guiltyCalendar from '@/components/photos/content/guilty-calendar.svg';
import guiltyDesk from '@/components/photos/content/guilty-desk.svg';

import newHeroGif from '@/components/photos/content/00926f5180d7aa056e6e242ba821de90_gif550413-ezgif.com-effects.webp';
import dummySkater from '@/components/photos/content/ezgif-split/6.svg';

const images = [
  smilley1.src,
  smiley2.src,
  smiley3.src,
  smiley4.src,
];

const StarShape = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
    <path d="M50 0 L61 35 L97 35 L68 57 L79 91 L50 70 L21 91 L32 57 L3 35 L39 35 Z" />
  </svg>
);
const SparkleShape = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
    <path d="M50 0 C50 27.6 27.6 50 0 50 C27.6 50 72.4 50 100 C50 72.4 72.4 50 100 50 C72.4 50 50 27.6 50 0Z" />
  </svg>
);
const DiamondShape = () => (
  <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
    <polygon points="50,0 100,50 50,100 0,50" />
  </svg>
);
const DonutShape = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="12" />
  </svg>
);

export default function ContentPage() {
  const skaterContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const whoIsGuiltyRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const manifestoTextRef = useRef<HTMLParagraphElement>(null);

  const counterRef = useRef<HTMLSpanElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const blurTextRef = useRef<HTMLHeadingElement>(null);
  const videoSectionRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLSpanElement>(null);
  const videoTextRef = useRef<HTMLDivElement>(null);
  const pfSectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [playPfIntro, setPlayPfIntro] = useState(false);
  const [frame1Key, setFrame1Key] = useState(0);

  useEffect(() => {
    const handleFrameUpdate = (e: any) => {
      const newFrame = Math.round(e.detail);
      setCurrentFrame(prev => {
        if (newFrame === 2 && prev !== 2) setFrame1Key(k => k + 1);
        return newFrame;
      });
    };
    window.addEventListener("updateSkaterFrame", handleFrameUpdate);
    return () => window.removeEventListener("updateSkaterFrame", handleFrameUpdate);
  }, []);

  const handleVideoMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let onMouseMove: (e: MouseEvent) => void;

    const ctx = gsap.context(() => {
      // -- GSAP ORNAMENTS PARALLAX --
      const parallaxShapes = gsap.utils.toArray('.gsap-parallax-shape') as HTMLElement[];
      onMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        parallaxShapes.forEach((shape) => {
          const speed = parseFloat(shape.getAttribute('data-speed') || '0.05');
          const offsetX = x * speed * window.innerWidth;
          const offsetY = y * speed * window.innerHeight;
          gsap.to(shape, {
            x: offsetX,
            y: offsetY,
            duration: 1.5,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
      };
      window.addEventListener('mousemove', onMouseMove);

      parallaxShapes.forEach((shape) => {
        gsap.to(shape, {
          yPercent: -200,
          rotation: "random(-180, 180)",
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=150%",
            scrub: true,
          }
        });
      });

      // -- BACKGROUND MARQUEE --
      gsap.to('.gsap-marquee-text', {
        xPercent: -100,
        ease: "none",
        duration: 25,
        repeat: -1
      });

      // -- 6-FRAME SKATER SCROLL SEQUENCE --
      if (skaterContainerRef.current) {
        const frameObj = { frame: 0 };
        gsap.to(frameObj, {
          frame: 3,
          roundProps: 'frame',
          ease: 'none',
          scrollTrigger: {
            trigger: skaterContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
          onUpdate: () => {
            const event = new CustomEvent("updateSkaterFrame", { detail: frameObj.frame });
            window.dispatchEvent(event);
          }
        });
      }
      // -- HYBRID WHO IS GUILTY SCROLL --
      const revToP1Wrapper = document.querySelector('.reveal-to-p1-wrapper');
      if (revToP1Wrapper) {
        const tlRev = gsap.timeline({
          scrollTrigger: {
            trigger: revToP1Wrapper,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
          }
        });

        tlRev.to('.reveal-section', {
          scale: 0.85,
          opacity: 0,
          filter: "blur(12px)",
          ease: "power2.inOut"
        }, 0);

        tlRev.fromTo('.panel-1', { xPercent: 100 }, { xPercent: 0, ease: 'none' }, 0);

        const counterTarget = { val: 0 };
        tlRev.to(counterTarget, {
          val: 87, duration: 0.5, roundProps: "val", ease: "none",
          onUpdate: function () {
            if (counterRef.current) counterRef.current.innerText = this.targets()[0].val.toString();
          },
          onComplete: function () {
            if (counterRef.current) gsap.to(counterRef.current, { color: '#FF4500', scale: 1.05, duration: 0.1, yoyo: true, repeat: 5 });
          }
        }, 0.2);

        tlRev.fromTo('.split-text-target',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' },
          0.3
        );
      }

      // -- UNTOLD SECTION 2 (FULL SCREEN TO SHRINKING VIDEO) --
      if (videoSectionRef.current && videoWrapperRef.current && videoTextRef.current) {
        const videoTl = gsap.timeline({
          scrollTrigger: {
            trigger: videoSectionRef.current,
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        videoTl.to(videoWrapperRef.current, {
          width: () => placeholderRef.current ? placeholderRef.current.offsetWidth : 150,
          height: () => placeholderRef.current ? placeholderRef.current.offsetHeight : 50,
          x: () => {
            if (!placeholderRef.current || !videoSectionRef.current) return 0;
            const pRect = placeholderRef.current.getBoundingClientRect();
            const sRect = videoSectionRef.current.getBoundingClientRect();
            return pRect.left - sRect.left;
          },
          y: () => {
            if (!placeholderRef.current || !videoSectionRef.current) return 0;
            const pRect = placeholderRef.current.getBoundingClientRect();
            const sRect = videoSectionRef.current.getBoundingClientRect();
            return pRect.top - sRect.top;
          },
          xPercent: 0,
          yPercent: 0,
          borderRadius: '4rem',
          ease: 'power2.inOut'
        }, 0);

        videoTl.fromTo(videoTextRef.current,
          { opacity: 0 },
          { opacity: 1, ease: 'power2.out' },
          0.4
        );
      }

      // -- PIXELFLAKES PRE-FOOTER SECTION SEQUENCE --
      if (pfSectionRef.current) {
        const autoTl = gsap.timeline({
          paused: true,
          onStart: () => setPlayPfIntro(true)
        });

        autoTl.to('.pf-popup:nth-child(1)', { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, 0.2)
          .to('.pf-popup:nth-child(2)', { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, 0.4)
          .to('.pf-popup:nth-child(3)', { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, 0.6)
          .to('.pf-popup:nth-child(4)', { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, 0.8);

        autoTl.to(pfSectionRef.current, { backgroundColor: '#1A1A1A', duration: 0.8, ease: 'power2.inOut' }, 1.8)
          .to('.pf-text-wrapper', { color: '#FFFFFF', duration: 0.8, ease: 'power2.inOut' }, 1.8)
          .to('.pf-popup', { opacity: 0, y: -10, duration: 0.8, ease: 'power2.inOut' }, 1.8);

        ScrollTrigger.create({
          trigger: pfSectionRef.current,
          start: 'top 50%',
          onEnter: () => { setPlayPfIntro(true); autoTl.restart(); },
          onLeaveBack: () => {
            setPlayPfIntro(false);
            autoTl.pause(0);
            if (pfSectionRef.current) gsap.set(pfSectionRef.current, { backgroundColor: '#E0DDD5' });
            gsap.set('.pf-text-wrapper', { color: '#1A1A1A' });
            gsap.set('.pf-popup', { opacity: 0, y: 0, scale: 0.75 });
          }
        });

        gsap.to('.pf-media-container', {
          width: '100vw',
          height: '100vh',
          borderRadius: '0px',
          opacity: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: pfSectionRef.current,
            start: 'center center',
            end: '+=80%',
            scrub: 1,
          }
        });
      }

      // -- UNTOLD PROJECTS ANIMATION --
      const untoldProjects = gsap.utils.toArray('.untold-project') as HTMLElement[];
      untoldProjects.forEach((proj) => {
        const border = proj.querySelector('.untold-border');
        if (border) {
          gsap.fromTo(border,
            { width: "0%" },
            { width: "100%", duration: 1.5, ease: "power3.inOut", scrollTrigger: { trigger: proj, start: "top 85%" } }
          );
        }

        const texts = proj.querySelectorAll('.untold-text-anim');
        if (texts.length) {
          gsap.fromTo(texts,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: proj, start: "top 75%" } }
          );
        }

        const imgWrapper = proj.querySelector('.untold-img-wrapper');
        const img = proj.querySelector('.untold-img');
        if (imgWrapper) {
          gsap.fromTo(imgWrapper,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: proj, start: "top 80%" } }
          );
        }
        if (img) {
          gsap.fromTo(img,
            { yPercent: -10, scale: 1.05 },
            { yPercent: 10, ease: "none", scrollTrigger: { trigger: proj, start: "top bottom", end: "bottom top", scrub: true } }
          );
        }
      });

    });

    return () => {
      if (typeof window !== 'undefined' && onMouseMove) {
        window.removeEventListener('mousemove', onMouseMove);
      }
      ctx.revert();
    };
  }, []);

  return (
    <ReactLenis root>
      <main
        style={{ backgroundColor: '#f3f4ea' }}
        className="min-h-screen relative text-pine-teal"
      >
        {/* ── BRUSHED STYLE SVG DEFS ── */}
        <svg width="0" height="0" className="absolute pointer-events-none">
          <defs>
            {/* Distorted Ink Bleed Filter */}
            <filter id="ink-bleed" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 12 -5" in="noise" result="coloredNoise" />
              <feDisplacementMap in="SourceGraphic" in2="coloredNoise" scale="4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            
            {/* Torn Paper Clip Path (Top) */}
            <clipPath id="torn-edge-top" clipPathUnits="objectBoundingBox">
              <path d="M0,0.05 C0.05,0.01 0.1,0.07 0.15,0.03 C0.2,0.08 0.25,0.02 0.3,0.06 C0.35,0.03 0.4,0.07 0.45,0.02 C0.5,0.06 0.55,0.01 0.6,0.08 C0.65,0.04 0.7,0.07 0.75,0.03 C0.8,0.07 0.85,0.01 0.9,0.08 C0.95,0.03 1,0.05 L1,1 L0,1 Z" />
            </clipPath>

            {/* Torn Paper Clip Path (Left) */}
            <clipPath id="torn-edge-left" clipPathUnits="objectBoundingBox">
              <path d="M0.03,0 C0.01,0.1 0.05,0.2 0.01,0.3 C0.04,0.4 0.0,0.5 0.03,0.6 C0.01,0.7 0.04,0.8 0.0,0.9 C0.02,0.95 0.01,0.98 0.03,1 L1,1 L1,0 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* ── GRUNGY TEXTURE OVERLAY ── */}
        <div className="fixed inset-0 pointer-events-none z-50 mix-blend-multiply opacity-[0.25]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-paper.png")' }}></div>

        {/* ── Decorative floating shapes (Brushed Style) ── */}
        <div className="gsap-parallax-shape absolute top-20 right-[8%] text-canary-yellow pointer-events-none z-10 opacity-80" style={{ width: 80 }} data-speed="0.05">
          {/* Replaced clean Star with rough scribble */}
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M30,70 Q40,20 50,10 T70,70 Q80,40 90,30 T10,40 Q20,30 30,70 Z" />
            <path d="M20,50 Q50,60 80,40" stroke="#FF4500" strokeWidth="3" opacity="0.6" />
          </svg>
        </div>

        <div className="gsap-parallax-shape absolute top-[40%] right-[5%] text-blush-pop pointer-events-none z-10" style={{ width: 36, opacity: 0.75 }} data-speed="-0.03">
          <SparkleShape />
        </div>

        <div className="gsap-parallax-shape absolute top-[12%] left-[4%] text-pine-teal pointer-events-none z-10" style={{ width: 30, opacity: 0.18 }} data-speed="0.07">
          <DiamondShape />
        </div>

        <div className="gsap-parallax-shape absolute bottom-[15%] left-[6%] text-pearl-aqua pointer-events-none z-10" style={{ width: 60, opacity: 0.35 }} data-speed="-0.08">
          <DonutShape />
        </div>

        <div className="gsap-parallax-shape absolute bottom-[30%] right-[14%] text-blush-pop pointer-events-none z-10" style={{ width: 24, opacity: 0.5 }} data-speed="0.04">
          <StarShape />
        </div>

        <div className="gsap-parallax-shape absolute bottom-[10%] left-[40%] text-canary-yellow pointer-events-none z-10" style={{ width: 32, opacity: 0.4 }} data-speed="-0.06">
          <SparkleShape />
        </div>

        {/* ── SKATER CONTAINER WRAPPER (400vh for scroll room: 100vh per frame) ── */}
        <div ref={skaterContainerRef} className="relative w-full h-[400vh] bg-[#f3f4ea]">

          {/* Sticky Container that holds everything fixed in viewport */}
          <div className="sticky top-0 w-full h-screen flex justify-center items-center overflow-hidden">

            {/* ── FRAME 0: HERO (Original Burnout) ── */}
            <div className={`absolute inset-0 transition-opacity duration-700 flex justify-center items-center ${currentFrame === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
              <div className="absolute top-[12%] md:top-[15%] text-center text-4xl leading-[1.1] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-black font-geometric tracking-tighter w-full px-4 z-20 flex flex-col items-center">
                <h1 className="flex flex-wrap justify-center items-baseline gap-2 text-pine-teal" style={{ filter: 'url(#ink-bleed)' }}>
                  <TypingText text="Jangan " delay={0} duration={40} holdDelay={3000} loop={false} className="block" />
                  <span className="inline-block">&nbsp;</span>
                  <div className="relative inline-block">
                    <TypingText
                      text="biarkan"
                      delay={300}
                      duration={40}
                      holdDelay={3000}
                      loop={false}
                      className="text-pine-teal whitespace-nowrap"
                    />
                  </div>
                  <div className="relative inline-block ml-2">
                    <HighlightText
                      text="Burnout"
                      delay={700}
                      aria-hidden="true"
                      className="text-transparent select-none px-[0.12em] block italic"
                      style={{ 
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M2,45 Q20,25 50,35 T98,25 Q95,45 98,65 Q80,85 50,75 T2,75 Z\' fill=\'%23FFF946\' opacity=\'0.9\'/%3E%3Cpath d=\'M8,55 Q30,45 50,50 T92,45 Q90,60 92,70 Q60,70 50,65 T8,65 Z\' fill=\'%23FF4500\' opacity=\'0.3\'/%3E%3C/svg%3E")',
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        padding: '0.1em 0.2em'
                      }}
                    />
                    <TypingText text="Burnout" delay={700} duration={40} holdDelay={3000} loop={false} className="absolute inset-0 z-10 text-pine-teal italic px-[0.12em]" />
                  </div>
                </h1>
              </div>

              <h2 className="absolute left-4 md:left-[4%] xl:left-[8%] top-[40%] md:top-[55%] -translate-y-1/2 text-[2rem] md:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-black font-geometric text-pine-teal tracking-tighter z-20 md:max-w-[25%] lg:max-w-[30%]" style={{ filter: 'url(#ink-bleed)' }}>
                <TypingText text="Merenggut" delay={1100} duration={40} holdDelay={3000} loop={false} className="inline-block" />
              </h2>

              <h2 className="absolute right-4 md:right-[4%] xl:right-[8%] top-[60%] md:top-[55%] -translate-y-1/2 text-[2rem] md:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-black font-geometric text-pine-teal tracking-tighter z-20 text-right flex items-center justify-end md:max-w-[25%] lg:max-w-[30%]">
                <TypingText text="Mentalmu" delay={1500} duration={40} holdDelay={3000} loop={false} className="inline-block" >
                  <TypingTextCursor className="inline-block !h-[0.8em] !w-[0.04em] align-middle bg-[#FF4500] ml-2 -mt-1" />
                </TypingText>
              </h2>

              <div className="gsap-parallax-shape absolute left-[5%] bottom-[22%] z-10 pointer-events-none opacity-75" data-speed="0.06">
                <svg width="76" height="66" viewBox="0 0 76 66" fill="none">
                  <rect x="0" y="0" width="68" height="48" rx="14" fill="#FFF946" />
                  <polygon points="8,48 26,48 14,64" fill="#FFF946" />
                  <circle cx="17" cy="24" r="5" fill="#15221b" opacity="0.45" />
                  <circle cx="34" cy="24" r="5" fill="#15221b" opacity="0.45" />
                  <circle cx="51" cy="24" r="5" fill="#15221b" opacity="0.45" />
                </svg>
              </div>

              <div className="gsap-parallax-shape absolute right-[4%] top-[28%] z-10 pointer-events-none opacity-60" data-speed="-0.05">
                <svg width="96" height="76" viewBox="0 0 96 76" fill="none">
                  <rect x="0" y="0" width="88" height="56" rx="16" fill="#FFABD2" />
                  <polygon points="62,56 80,56 70,72" fill="#FFABD2" />
                  <rect x="12" y="20" width="38" height="6" rx="3" fill="#15221b" opacity="0.25" />
                  <rect x="12" y="32" width="24" height="6" rx="3" fill="#15221b" opacity="0.15" />
                </svg>
              </div>

              <div className="gsap-parallax-shape absolute right-[19%] top-[28%] z-10 pointer-events-none animate-pulse" data-speed="0.09">
                <svg width="46" height="46" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" fill="#FF4500" />
                  <text x="24" y="31" textAnchor="middle" fontSize="22" fontWeight="900" fill="white" fontFamily="sans-serif">!</text>
                </svg>
              </div>

              <div className="gsap-parallax-shape absolute left-[13%] top-[20%] z-10 pointer-events-none opacity-80" data-speed="0.05">
                <svg width="42" height="42" viewBox="0 0 100 100" fill="#FFF946">
                  <path d="M50 0 C50 27.6 27.6 50 0 50 C27.6 50 72.4 50 100 50 C50 72.4 72.4 50 100 50 C72.4 50 50 27.6 50 0Z" />
                </svg>
              </div>

              <div className="gsap-parallax-shape absolute left-[22%] bottom-[22%] z-10 pointer-events-none opacity-50 animate-pulse" data-speed="-0.07" style={{ animationDuration: '2.2s' }}>
                <svg width="54" height="50" viewBox="0 0 54 50" fill="#FFABD2">
                  <path d="M27 46 C27 46 4 29 4 16 C4 9 9 4 16 4 C20.5 4 24.5 6.5 27 10.5 C29.5 6.5 33.5 4 38 4 C45 4 50 9 50 16 C50 29 27 46 27 46Z" />
                </svg>
              </div>

              <div className="gsap-parallax-shape absolute right-[7%] bottom-[22%] z-10 pointer-events-none opacity-35" data-speed="0.04">
                <svg width="38" height="64" viewBox="0 0 40 68" fill="none">
                  <rect x="1" y="1" width="38" height="66" rx="8" stroke="#15221b" strokeWidth="2" fill="#8DDEDE" fillOpacity="0.45" />
                  <rect x="12" y="5" width="16" height="3" rx="2" fill="#15221b" opacity="0.28" />
                  <circle cx="20" cy="59" r="3" fill="#15221b" opacity="0.22" />
                  <rect x="6" y="13" width="28" height="34" rx="2" fill="#15221b" opacity="0.07" />
                </svg>
              </div>

              <div className="gsap-parallax-shape absolute left-[2%] top-[52%] z-10 pointer-events-none opacity-25" data-speed="0.1">
                <svg width="62" height="62" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="40" stroke="#8DDEDE" strokeWidth="14" />
                </svg>
              </div>

              <div className="gsap-parallax-shape absolute right-[24%] bottom-[16%] z-10 pointer-events-none opacity-55" data-speed="0.06">
                <svg width="30" height="30" viewBox="0 0 100 100" fill="#FFF946">
                  <path d="M50 0 L61 35 L97 35 L68 57 L79 91 L50 70 L21 91 L32 57 L3 35 L39 35 Z" />
                </svg>
              </div>

            </div>

            {/* ── FRAME 2 (swap): HATE COMMENT FULL-SCREEN WALLPAPER ── */}
            <div className={`absolute inset-0 transition-opacity duration-700 overflow-hidden ${currentFrame === 2 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
              <AnimatePresence mode="wait">
                {currentFrame === 2 && (
                  <motion.div
                    key={`f2-hate-${frame1Key}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Radial gradient overlay: 'closing in' effect, darkens the edges around the character */}
                    <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(10, 25, 15, 0.85) 100%)' }}></div>

                    {/* TWO BIG BLOCKS: Top and Bottom */}
                    <motion.div
                      key="f2-hate-top"
                      className="absolute top-[20%] left-0 w-full flex justify-center px-4 md:px-16 z-30"
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                      <h2 className="flex flex-wrap items-center justify-center gap-x-3 md:gap-x-5 lg:gap-x-6 text-3xl md:text-5xl lg:text-[4rem] xl:text-[5rem] font-black tracking-tighter leading-[1.2] text-center w-full">
                        {['GA', 'ADA', 'YANG', 'PEDULI.'].map((word, i) => (
                          <DecryptedText
                            key={i}
                            text={word}
                            animateOn="view"
                            speed={65}
                            maxIterations={15}
                            sequential
                            revealDirection="start"
                            className="inline-block"
                            style={{ color: '#B91C1C' }}
                            encryptedClassName="opacity-30"
                          />
                        ))}
                      </h2>
                    </motion.div>

                    <motion.div
                      key="f2-hate-bottom"
                      className="absolute bottom-[18%] left-0 w-full flex justify-center px-4 md:px-16 z-30"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
                    >
                      <h2 className="flex flex-wrap items-center justify-center gap-x-3 md:gap-x-5 lg:gap-x-6 text-3xl md:text-5xl lg:text-[4rem] xl:text-[5rem] font-black tracking-tighter leading-[1.2] text-center w-full">
                        {['MENDING', 'HAPUS', 'AKUN.'].map((word, i) => (
                          <DecryptedText
                            key={i}
                            text={word}
                            animateOn="view"
                            speed={65}
                            maxIterations={15}
                            sequential
                            revealDirection="end"
                            className="inline-block"
                            style={{ color: '#2D7A2D' }}
                            encryptedClassName="opacity-30"
                          />
                        ))}
                      </h2>
                    </motion.div>


                  </motion.div>
                )}
              </AnimatePresence>
            </div>



            {/* ── FRAME 1 (swap): EKSPEKTASI MAYA (SplitText Pink) ── */}
            <div className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center ${currentFrame === 1 ? 'opacity-100 pointer-events-auto z-40' : 'opacity-0 pointer-events-none z-0'}`}>
              <AnimatePresence>
                {currentFrame === 1 && (
                  <>
                    <motion.div
                      key="f2-top"
                      className="absolute top-[22%] left-0 w-full flex px-8 md:px-16"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                      <h2 className="text-3xl md:text-5xl lg:text-[4rem] xl:text-[5rem] font-black tracking-tighter leading-[1] text-blush-pop text-left max-w-full md:max-w-[50%]">
                        <TypingText text="Menjadi penjara layar sentuh" delay={200} duration={30} holdDelay={3000} loop={false} className="inline-block" />
                      </h2>
                    </motion.div>
                    <motion.div
                      key="f2-bottom"
                      className="absolute bottom-[10%] right-0 w-full flex justify-end px-8 md:px-16"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.15 }}
                    >
                      <h2 className="text-3xl md:text-5xl lg:text-[4rem] xl:text-[5rem] font-black tracking-tighter leading-[1] text-blush-pop text-right max-w-full md:max-w-[50%]">
                        <TypingText text="yang merampas kebebasan mental." delay={1000} duration={30} holdDelay={3000} loop={false} className="inline-block">
                          <TypingTextCursor className="inline-block !h-[0.8em] !w-[0.04em] align-middle bg-[#FF4500] ml-2 -mt-1" />
                        </TypingText>
                      </h2>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>



            {/* ── FRAME 3: TRANSITION TO DARK GREEN ── */}
            <div className={`absolute inset-0 transition-opacity duration-700 flex justify-center items-center ${currentFrame === 3 ? 'opacity-100 pointer-events-auto z-40' : 'opacity-0 pointer-events-none z-0'}`}>
              <div className="absolute w-full h-full bg-pine-teal transition-opacity duration-1000"></div>
            </div>

            {/* Center Skater Canvas sequence */}
            <div className="relative w-[220px] sm:w-[280px] lg:w-[320px] xl:w-[380px] z-30 pointer-events-none mt-24">
              <CanvasSkater />
            </div>

            {/* Scroll Indicator – hanya frame 0 */}
            {currentFrame === 0 && (
              <motion.div
                className="absolute bottom-[6%] text-xs md:text-sm font-bold tracking-[0.2em] uppercase font-geometric pointer-events-none text-pine-teal flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              >
                <span>( Scroll Bawah )</span>
                <div className="w-[1px] h-8 bg-pine-teal opacity-50"></div>
              </motion.div>
            )}

          </div>
        </div> {/* ── END SKATER CONTAINER WRAPPER ── */}



        {/* ── HYBRID SCROLL: REVEAL TO PANEL 1 ── */}
        <div className="reveal-to-p1-wrapper w-full h-[120vh] relative z-[4] bg-pine-teal">
          <div className="sticky top-0 w-full h-screen overflow-hidden">

            {/* Scroll Reveal Section */}
            <section className="reveal-section absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-pine-teal z-[4]">
              <div className="max-w-6xl mx-auto px-6 text-center w-full">
                <ScrollReveal
                  baseOpacity={0.1}
                  enableBlur
                  baseRotation={3}
                  blurStrength={4}
                  containerClassName="text-center w-full"
                  textClassName="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold font-geometric text-[#f3f4ea] leading-tight"
                >
                  Nilai dirimu tidak diukur dari sejauh mana mereka memujimu, apalagi menghakimi.
                </ScrollReveal>
              </div>
            </section>

            {/* Panel 1 (Comes in from Right) */}
            <section className="panel-1 absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#f3f4ea] text-pine-teal overflow-hidden shadow-[-20px_0_40px_rgba(0,0,0,0.15)] px-6 z-[5]" style={{ clipPath: 'url(#torn-edge-left)' }}>
              <div className="absolute inset-0 opacity-[0.6] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-paper.png")' }}></div>
              <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
              
              <div className="absolute left-[20vw] top-[70vh] -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none skater-dummy-img opacity-0 block">
                <img src={dummySkater.src} className="w-[320px] md:w-[450px] lg:w-[500px] object-contain drop-shadow-2xl mix-blend-multiply opacity-90" alt="Skater" />
                {/* Scribble behind dummy skater */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 text-pine-teal opacity-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10,50 Q20,10 50,20 T90,50 Q80,90 50,80 T10,50 Z" />
                  <path d="M20,60 Q40,20 60,60 T80,40" strokeWidth="4" opacity="0.5" />
                </svg>
              </div>
              
              <h2 className="text-4xl md:text-6xl lg:text-[7rem] font-black text-center uppercase leading-[1.1] tracking-tighter max-w-6xl z-10 font-geometric split-text-target text-pine-teal" style={{ filter: 'url(#ink-bleed)' }}>
                Mengapa remaja <br />
                <span className="text-blush-pop relative inline-block z-10 px-4">
                  Cemas?
                  {/* Brush stroke behind Cemas? */}
                  <svg className="absolute inset-0 w-full h-full -z-10 text-pine-teal scale-125" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,45 Q25,25 50,35 T100,30 L100,70 Q75,85 50,75 T0,65 Z" fill="currentColor" opacity="0.15"/>
                  </svg>
                </span>
              </h2>
              
              <div className="mt-12 flex flex-col items-center justify-center text-pine-teal z-10 relative">
                <div className="text-[12rem] lg:text-[18rem] font-black leading-none font-geometric tracking-tighter" style={{ filter: 'url(#ink-bleed)' }}><span ref={counterRef}>0</span>%</div>
                
                {/* Splatter under the percentage */}
                <svg className="absolute inset-0 w-full h-full -z-10 text-blush-pop opacity-30 transform -translate-y-12 scale-150 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="20" cy="20" r="15" opacity="0.4"/>
                  <circle cx="80" cy="40" r="20" opacity="0.6"/>
                  <path d="M30,80 Q45,60 60,90 T90,70" stroke="currentColor" strokeWidth="4" fill="none"/>
                </svg>

                <p className="text-xl md:text-2xl font-bold uppercase tracking-widest mt-0 text-blush-pop font-geometric text-center max-w-lg">Remaja Mengalami Cyberbullying di Sosial Media</p>
              </div>
            </section>

          </div>
        </div>


        {/* ── UNTOLD ACTUAL SECTION 2 (SHRINKING FULL-VIEWPORT VIDEO) ── */}
        <section
          ref={videoSectionRef}
          className="w-full h-screen bg-[#e8e9de] relative overflow-hidden flex items-center justify-center cursor-none"
          onMouseEnter={() => setIsHoveringVideo(true)}
          onMouseLeave={() => setIsHoveringVideo(false)}
          onMouseMove={handleVideoMouseMove}
          onClick={toggleMute}
        >
          <motion.div
            className="fixed top-0 left-0 w-24 h-24 bg-[#FF4500] rounded-full flex items-center justify-center text-white text-xs font-bold tracking-widest pointer-events-none z-[100] mix-blend-normal"
            animate={{
              x: cursorPos.x - 48,
              y: cursorPos.y - 48,
              scale: isHoveringVideo ? 1 : 0,
              opacity: isHoveringVideo ? 1 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
          >
            ( {isMuted ? 'UNMUTE' : 'MUTE'} )
          </motion.div>

          <div
            ref={videoWrapperRef}
            className="absolute top-0 left-0 w-[100vw] h-[100vh] overflow-hidden z-20 origin-top-left"
          >
            <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none mix-blend-multiply transition-opacity duration-700"></div>

            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              autoPlay
              loop
              muted
              playsInline
            />

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80 text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase z-20 font-geometric transition-opacity duration-300">
              ( MENGAMBIL JEDA )
            </div>
          </div>

          {/* The Text Block that reveals as the video shrinks */}
          <div
            ref={videoTextRef}
            className="absolute inset-0 flex flex-col items-start justify-center z-30 opacity-0 px-[6vw] md:px-[8vw]"
          >
            <p className="text-sm md:text-base font-bold tracking-[0.25em] uppercase text-[#1A1A1A]/40 mb-8 font-geometric">
              ( Detoks Digital )
            </p>

            <h3 className="text-[2.8rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-black text-[#1A1A1A] leading-[1.1] mb-10 font-geometric w-full">
              Disconnect{' '}
              <span className="inline-flex items-center gap-1 align-middle">
                <span className="text-[#1A1A1A]/30 font-light">(</span>
                <span
                  ref={placeholderRef}
                  className="inline-block w-[130px] sm:w-[170px] md:w-[220px] lg:w-[280px] xl:w-[340px] h-[75px] sm:h-[95px] md:h-[120px] lg:h-[150px] xl:h-[180px] align-middle rounded-2xl bg-[#1A1A1A]/5"
                  aria-hidden="true"
                />
                <span className="text-[#1A1A1A]/30 font-light">)</span>
              </span>{' '}
              sementara untuk menyelamatkan dirimu.
            </h3>

            <div className="w-20 h-[2px] bg-[#1A1A1A]/15 mb-6" />

            <p className="text-lg md:text-xl lg:text-2xl text-[#1A1A1A]/55 font-medium leading-[1.6] max-w-2xl font-geometric text-left">
              Menjauh dari layar dan notifikasi beracun adalah bentuk perlindungan diri. Berani melepaskan ikatan pada standar dunia maya akan membebaskan batasan pikiranmu.
            </p>
          </div>

        </section>

        {/* ── PIXELFLAKES PRE-FOOTER SECTION (PENGALAMAN) ── */}
        <section ref={pfSectionRef} className="w-full h-screen bg-[#E0DDD5] relative overflow-hidden z-20">
          <ImageMouseTrail items={images} maxNumberOfImages={5} fadeAnimation={true} distance={40} imgClass="w-32 md:w-48 h-40 md:h-60 rounded-2xl shadow-2xl">
            <div className="w-full h-screen flex flex-col items-center justify-center relative">

              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="pf-popup absolute top-[10%] left-[5%] md:left-[10%] w-32 md:w-56 h-32 md:h-56 rounded-2xl overflow-hidden opacity-0 scale-75 shadow-lg rotate-[-6deg]">
                  <img src={images[0]} alt="Pop 1" className="w-full h-full object-cover grayscale opacity-90" />
                </div>
                <div className="pf-popup absolute top-[50%] right-[5%] md:right-[15%] w-40 md:w-64 h-24 md:h-40 rounded-xl overflow-hidden opacity-0 scale-75 shadow-xl rotate-[4deg]">
                  <img src={images[1]} alt="Pop 2" className="w-full h-full object-cover grayscale opacity-80" />
                </div>
                <div className="pf-popup absolute bottom-[15%] left-[40%] w-36 md:w-60 h-48 md:h-72 rounded-3xl overflow-hidden opacity-0 scale-75 shadow-2xl rotate-[-3deg]">
                  <img src={images[2]} alt="Pop 3" className="w-full h-full object-cover grayscale opacity-95" />
                </div>
                <div className="pf-popup absolute bottom-[10%] right-[30%] w-24 md:w-40 h-24 md:h-40 border-4 border-[#1A1A1A] rounded-full overflow-hidden opacity-0 scale-75 shadow-md rotate-[12deg]">
                  <img src={images[3]} alt="Pop 4" className="w-full h-full object-cover grayscale opacity-85" />
                </div>
              </div>

              <div className="max-w-6xl mx-auto w-full relative z-20 mb-16 px-4 md:px-12 pointer-events-none select-none">
                <div className="pf-text-wrapper w-full max-w-5xl mx-auto text-center font-bold font-geometric leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] tracking-tight mix-blend-normal" style={{ color: '#1A1A1A' }}>
                  <div className="block"><TypingText text="Mari kita dengar kisah" delay={100} duration={30} loop={false} inView={true} inViewOnce={false} inViewMargin="-10%" className="inline-block" /></div>
                  <div className="block"><TypingText text="Mereka yang berhasil" delay={1000} duration={30} loop={false} inView={true} inViewOnce={false} inViewMargin="-10%" className="inline-block" /></div>
                  <div className="flex flex-wrap items-center justify-center gap-[0.3em] my-1">
                    <TypingText text="menembus" delay={1800} duration={30} loop={false} inView={true} inViewOnce={false} inViewMargin="-10%" className="inline-block" />
                    <HighlightText text="penjara" delay={2300} className="px-[0.3em] pb-[0.05em] pt-[0.1em] font-black text-[#1A1A1A] rounded-[0.25em]" style={{ backgroundImage: 'linear-gradient(to right, #8DDEDE, #8DDEDE)' }} />
                  </div>
                  <div className="block"><TypingText text="digital dan menemukan" delay={2600} duration={30} loop={false} inView={true} inViewOnce={false} inViewMargin="-10%" className="inline-block" /></div>
                  <div className="block"><TypingText text="kembali suaranya." delay={3400} duration={30} loop={false} inView={true} inViewOnce={false} inViewMargin="-10%" className="inline-block" /></div>
                </div>
              </div>

              <div className="pf-text-wrapper absolute bottom-8 right-8 md:bottom-12 md:right-12 text-sm md:text-base font-geometric leading-relaxed max-w-sm text-right pointer-events-auto z-40 font-medium transition-colors duration-700" style={{ color: '#1A1A2A' }}>
                <span className="text-blush-pop font-black mr-2">(*)</span>
                Kami hadir untuk membantu kamu{' '}
                <RotatingTextContainer
                  text={['mematikan', 'mereset', 'menyembuhkan']}
                  duration={1800}
                  delay={500}
                  y={20}
                  className="inline-flex items-center mx-1 font-bold underline decoration-blush-pop decoration-2 underline-offset-4 pf-text-wrapper transition-colors duration-700"
                  style={{ overflow: 'hidden', paddingBlock: 0, minWidth: '6em', display: 'inline-block', color: 'inherit' }}
                >
                  <RotatingText
                    className="font-black"
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </RotatingTextContainer>{' '}
                kesehatan mental berdamai dengan dunia nyata.
              </div>

              <div className="pf-media-container absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] md:w-[25vw] h-[15vh] md:h-[20vh] bg-pine-teal rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden flex items-center justify-center shadow-2xl opacity-80 z-30 hidden pointer-events-auto">
                <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
                <div className="w-full h-full bg-pine-teal/30 flex items-center justify-center" />
              </div>

            </div>
          </ImageMouseTrail>
        </section>

        {/* ── STACKING CARDS SECTION (SELECTED NARRATIVES) ── */}
        <StackingCards images={images} />

        {/* ── SECTION BERIKUTNYA SEPERTI HERO (PUTIH/BEIGE) ── */}
        <section className="w-full h-screen bg-[#f3f4ea] relative z-10 flex flex-col items-center justify-center border-t border-pine-teal/20">
          <h2 className="text-3xl md:text-5xl font-geometric font-black text-pine-teal">FOOTER / NEXT SECTION</h2>
        </section>

      </main>
    </ReactLenis>
  );
}
