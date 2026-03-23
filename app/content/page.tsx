'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import ImageMouseTrail from '@/components/content/MouseTrail';
import { TypingText, TypingTextCursor } from '@/components/animate-ui/primitives/texts/typing';
import { HighlightText } from '@/components/animate-ui/primitives/texts/highlight';
import { RotatingText, RotatingTextContainer } from '@/components/animate-ui/primitives/texts/rotating';
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
import guiltyRunning from '@/components/photos/content/guilty-running.svg';
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

  // Custom refs for WhoIsGuilty new features
  const counterRef = useRef<HTMLSpanElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const blurTextRef = useRef<HTMLHeadingElement>(null);
  // Custom video section refs & states
  const videoSectionRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoTextRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

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
           frame: 5,
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

      // -- WHO IS GUILTY VERTICAL STACKING SCROLL --
      
      // PANEL 1
      const counterTarget = { val: 0 };
      gsap.to(counterTarget, {
        val: 87, duration: 3, roundProps: "val", ease: "power2.out",
        onUpdate: function() {
          if (counterRef.current) counterRef.current.innerText = this.targets()[0].val.toString();
        },
        onComplete: function() {
          if (counterRef.current) gsap.to(counterRef.current, { color: '#FF4500', scale: 1.05, duration: 0.1, yoyo: true, repeat: 5 });
        },
        scrollTrigger: { trigger: ".panel-1", start: "top center", toggleActions: "play none none reverse" }
      });
      
      gsap.fromTo('.split-text-target', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)', scrollTrigger: { trigger: ".panel-1", start: "top center", toggleActions: "play none none reverse" } }
      );

      // PANEL 2: Sticky Notes
      gsap.to('.sticky-note', {
        scale: 1, opacity: 1, x: "random(-240, 240)", y: "random(-180, 180)", rotation: "random(-45, 45)", duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: ".panel-2", start: "top center", toggleActions: "play reverse play reverse" },
        onComplete: () => {
          gsap.to('.sticky-note', { rotation: "+=random(-2, 2)", x: "+=random(-2, 2)", y: "+=random(-2, 2)", duration: 0.05, yoyo: true, repeat: -1, ease: "none" });
        }
      });

      // PANEL 3: Clock & Desk
      const clockTarget = { val: 23 * 60 + 45 }; 
      gsap.to(clockTarget, {
        val: 27 * 60, roundProps: "val", ease: "none",
        onUpdate: function() {
          const totalMinutes = this.targets()[0].val;
          const hours = Math.floor(totalMinutes / 60) % 24;
          const mins = totalMinutes % 60;
          if (clockRef.current) clockRef.current.innerText = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        },
        scrollTrigger: { trigger: ".panel-3", start: "top top", end: "+=100%", scrub: true }
      });
      
      gsap.to('.desk-fg-layer', {
        y: -100, ease: 'none', scrollTrigger: { trigger: ".panel-3", start: "top top", end: "+=100%", scrub: true }
      });

      // PANEL 4: Chat Bubbles Burst & Running Parallax
      gsap.to('.running-parallax', {
        y: -150, ease: 'none', scrollTrigger: { trigger: ".panel-4", start: "top top", end: "+=100%", scrub: true }
      });
      gsap.to('.chat-bubble', {
        scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: ".panel-4", start: "top center", toggleActions: "play reverse play reverse" }
      });

      gsap.to('.no-escape-text', {
        opacity: 0.8, color: '#FF4500', scale: 1.05, duration: 0.05, yoyo: true, repeat: -1,
        scrollTrigger: { trigger: ".panel-4", start: "top center", toggleActions: "play pause play pause" }
      });



      // -- UNTOLD SECTION 2 (FULL SCREEN TO SHRINKING VIDEO) --
      if (videoSectionRef.current && videoWrapperRef.current && videoTextRef.current) {
        const videoTl = gsap.timeline({
          scrollTrigger: {
            trigger: videoSectionRef.current,
            start: 'top top',
            end: '+=100%', // 100vh of scrolling to shrink
            pin: true,
            scrub: true,
          }
        });

        // Shrink and move the video to the left
        videoTl.to(videoWrapperRef.current, {
          width: '42vw',
          height: '65vh',
          xPercent: -45,
          yPercent: 0,
          borderRadius: '1.5rem',
          ease: 'power2.inOut'
        }, 0);

        videoTl.to(videoSectionRef.current, {
           backgroundColor: '#e8e9de',
           ease: 'power2.inOut'
        }, 0);

        // Fade in the adjacent text on the right
        videoTl.fromTo(videoTextRef.current,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, ease: 'power2.out' },
          0.4 // Start fading in midway through the shrink
        );
      }

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
        {/* ── Decorative floating shapes ── */}
        <div className="gsap-parallax-shape absolute top-20 right-[8%] text-canary-yellow pointer-events-none z-10" style={{ width: 52 }} data-speed="0.05">
          <StarShape />
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

      {/* ── SKATER CONTAINER WRAPPER ── */}
      <div ref={skaterContainerRef} className="relative w-full bg-[#f3f4ea]">
        
        {/* The Skater SVG Sequence pinned via CSS sticky */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50">
          <div className="sticky top-[15vh] w-full flex justify-end -mr-[5vw]">
             <div className="w-[320px] sm:w-[420px] lg:w-[520px] translate-x-[15%]">
               <CanvasSkater />
             </div>
          </div>
        </div>

        {/* ── HERO SECTION ── */}
        <section ref={heroRef} className="relative w-full min-h-screen bg-transparent overflow-hidden flex flex-col justify-center">
        
        {/* Giant Background Marquee GSAP Ornament */}
        <div className="gsap-marquee-wrapper absolute top-[40%] left-0 -translate-y-1/2 w-[200vw] text-pine-teal opacity-[0.04] pointer-events-none z-0 overflow-hidden mix-blend-multiply flex whitespace-nowrap">
            <h2 className="gsap-marquee-text text-[22vw] font-black uppercase font-geometric tracking-tighter leading-none px-4 flex-shrink-0">
               RECHARGE YOUR MIND • TAKE A BREAK • NO ESCAPE • 
            </h2>
            <h2 className="gsap-marquee-text text-[22vw] font-black uppercase font-geometric tracking-tighter leading-none px-4 flex-shrink-0">
               RECHARGE YOUR MIND • TAKE A BREAK • NO ESCAPE • 
            </h2>
        </div>

        {/* Spinning Badge Ornament */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12 opacity-80 z-20 pointer-events-none hidden md:block mix-blend-multiply">
          <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-[140px] md:h-[140px] text-pine-teal animate-[spin_12s_linear_infinite]">
            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
            <text fontSize="10.5" fontWeight="900" fill="currentColor" letterSpacing="1.8" className="font-geometric uppercase tracking-widest text-[#FFF946]">
              <textPath href="#circlePath">
                Tarik Napas • Istirahat • ReCharge • 
              </textPath>
            </text>
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-pine-teal font-black animate-pulse">
            ✶
          </div>
        </div>
        
        <div id="hero-text-content" className="w-full relative z-40">
          <ImageMouseTrail
            items={images}
            maxNumberOfImages={20}
            distance={40}
            imgClass="w-32 h-40 sm:w-44 sm:h-56 rounded-xl object-cover shadow-xl grayscale hover:grayscale-0 transition-opacity duration-500 z-50 pointer-events-none"
          >
            <div className="w-full h-[100vh] flex flex-col justify-center px-6 md:px-16 lg:px-28 relative z-40">

          {/* Label */}
          <motion.div
            className="text-xs font-bold tracking-widest uppercase mb-5 opacity-40 font-geometric pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ( ReCharge )
          </motion.div>

          {/* 2-column: Text left + GIF right */}
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-0 relative">

            {/* Left: Heading */}
            <div className="flex-1 lg:flex-[1.2] min-w-0 relative z-20">
              <h1 className="text-5xl md:text-6xl lg:text-[6.5rem] xl:text-[7rem] font-bold font-geometric leading-[0.9] tracking-tighter text-pine-teal pointer-events-none">
                <div className="flex flex-wrap items-baseline">
                  <TypingText
                    text="Jangan"
                    delay={0}
                    duration={40}
                    holdDelay={3000}
                    loop={false}
                    className="block"
                  />
                  <span>&nbsp;</span>
                  <div className="relative inline-block">
                    <HighlightText
                      text="biarkan"
                      delay={480}
                      aria-hidden="true"
                      className="text-transparent select-none px-[0.12em]"
                      style={{ backgroundImage: 'linear-gradient(to right, #FFF946, #FFF946)' }}
                    />
                    <TypingText
                      text="biarkan"
                      delay={300}
                      duration={40}
                      holdDelay={3000}
                      loop={false}
                      className="absolute inset-0 z-10 text-pine-teal whitespace-nowrap overflow-hidden flex items-center"
                    />
                  </div>
                </div>

                <TypingText
                  text="Burnout"
                  delay={700}
                  duration={40}
                  holdDelay={3000}
                  loop={false}
                  className="block mt-1 lg:mt-2 italic"
                />

                <div className="flex flex-wrap items-center mt-1 lg:mt-2">
                  <TypingText
                    text="merenggut"
                    delay={1100}
                    duration={40}
                    holdDelay={3000}
                    loop={false}
                    className="inline"
                  />

                  {/* Burnout GIF illustration inline between words */}
                  <motion.img
                    src="/burnout.gif"
                    alt="Burnout animation"
                    className="inline-block w-[1.2em] h-[1.2em] object-contain mx-1 align-middle flex-shrink-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05, delay: 1.46 }}
                  />

                  <TypingText
                    text="mentalmu"
                    delay={1500}
                    duration={40}
                    holdDelay={3000}
                    loop={false}
                    className="inline"
                  >
                    <TypingTextCursor className="inline-block !h-[0.8em] !w-[0.03em] align-middle bg-pine-teal ml-2 -mt-1" />
                  </TypingText>
                </div>
              </h1>

              {/* Decorative line separator */}
              <motion.div
                className="w-16 h-[2px] bg-pine-teal/20 mt-6 mb-5"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 2.4 }}
              />

              {/* Paragraph with RotatingText */}
              <motion.div
                className="max-w-sm text-sm md:text-base font-geometric text-pine-teal/55 leading-relaxed pointer-events-none"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.8 }}
              >
                <span className="text-blush-pop font-bold">(*)</span> Kami hadir untuk membantu kamu{' '}
                <RotatingTextContainer
                  text={['mengenali', 'memahami', 'merawat']}
                  duration={1800}
                  delay={3200}
                  y={20}
                  className="inline-flex items-center"
                  style={{ overflow: 'hidden', paddingBlock: 0, minWidth: '6.2em', display: 'inline-block' }}
                >
                  <RotatingText
                    className="font-bold text-pine-teal underline decoration-canary-yellow decoration-2 underline-offset-2"
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </RotatingTextContainer>
                {' '}kesehatan mental —{' '}
                karena kamu layak merasa baik-baik saja.
              </motion.div>
            </div>
          </div>
        </div>
      </ImageMouseTrail>
    </div>
  </section>

  {/* ── THE TRANSITION TEXT ── */}
    <section className="w-full min-h-[70vh] bg-transparent flex items-center px-6 lg:px-28 py-20 relative z-40">
       <div className="text-left w-full max-w-4xl mx-auto">
           <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-20%" }} transition={{ duration: 0.8, ease: "easeOut" }}>
             <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-pine-teal font-geometric leading-[1.1] tracking-tighter w-full">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 lg:gap-x-4 lg:gap-y-3">
                  <TypingText text="Banyak hal bisa" delay={0} duration={35} loop={false} className="inline-block whitespace-nowrap" />
                  <div className="w-full h-0"></div>
                  
                  <TypingText text="menjadi alasan kita" delay={600} duration={35} loop={false} className="inline-block whitespace-nowrap" />
                  <div className="w-full h-0"></div>

                  <div className="relative inline-block">
                    <HighlightText
                      text="Burnout"
                      delay={1400}
                      aria-hidden="true"
                      className="text-transparent select-none px-[0.12em]"
                      style={{ backgroundImage: 'linear-gradient(to right, #FFF946, #FFF946)' }}
                    />
                    <TypingText
                      text="Burnout"
                      delay={1200}
                      duration={40}
                      loop={false}
                      className="absolute inset-0 z-10 text-pine-teal whitespace-nowrap overflow-hidden flex items-center italic"
                    />
                  </div>
                  <div className="w-full h-0"></div>
                  
                  <TypingText text="dan menyerah" delay={1800} duration={35} loop={false} className="inline-block whitespace-nowrap" />
                  <TypingText text="pada kehidupan." delay={2300} duration={35} loop={false} className="inline-block whitespace-nowrap text-pine-teal/70">
                    <TypingTextCursor className="inline-block !h-[0.8em] !w-[0.03em] align-middle bg-pine-teal ml-2 -mt-1" />
                  </TypingText>
                </div>
             </h2>
           </motion.div>
       </div>
    </section>

  </div> {/* ── END SKATER CONTAINER WRAPPER ── */}

      {/* ── WHO IS GUILTY - STICKY VERTICAL EDITION ── */}
      <div
        ref={whoIsGuiltyRef}
        id="who-is-guilty-section"
        className="w-full relative bg-[#f3f4ea]"
      >
        {/* Panel 1 */}
        <div className="panel-1-wrapper w-full h-[150vh] relative z-[1]">
          <section className="panel-1 sticky top-0 w-full h-screen flex flex-col items-center justify-center bg-[#f3f4ea] text-pine-teal overflow-hidden rounded-t-none lg:rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-6">
            <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
            <div className="absolute left-[15vw] top-[75vh] -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none skater-dummy-img opacity-0">
               <img src={dummySkater.src} className="w-[320px] md:w-[450px] lg:w-[500px] object-contain drop-shadow-lg" alt="Skater" />
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-[7rem] font-black text-center uppercase leading-[1.1] tracking-tighter max-w-6xl z-10 font-geometric split-text-target text-pine-teal">
              Mengapa kita <br /><span className="text-[#FF4500]">kelelahan?</span>
            </h2>
            <div className="mt-12 flex flex-col items-center justify-center text-pine-teal">
              <div className="text-[12rem] lg:text-[18rem] font-black leading-none font-geometric tracking-tighter"><span ref={counterRef}>0</span>%</div>
              <p className="text-2xl font-bold uppercase tracking-widest mt-0 text-[#FF4500] font-geometric">Pelajar & Pekerja Mengalami Burnout</p>
            </div>
          </section>
        </div>

        {/* Panel 2 */}
        <div className="panel-2-wrapper w-full h-[150vh] relative z-[2]">
          <section className="panel-2 sticky top-0 w-full h-screen flex items-center justify-center relative overflow-hidden bg-[#f3f4ea] text-pine-teal rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
            <h3 className="text-6xl md:text-8xl font-black opacity-20 z-0 absolute text-center w-full font-geometric text-pine-teal">Tugas <br />Menumpuk</h3>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none sticky-notes-container">
              {['Revisi Bab 1-3', 'Deadline Nanti Malam!', 'Meeting Jam 8 Pagi', 'Project X Belum Kelar', 'Email Client', 'Bikin Laporan', 'Ujian Besok', 'Fix Bugs Prio 1', 'Bales Chat Dosen', 'Bikin PPT', 'Bimbingan Besok Pagi', 'Review Jurnal Terbaru'].map((note, idx) => (
                <div key={idx} className="sticky-note absolute w-48 h-48 sm:w-64 sm:h-64 bg-pine-teal text-[#f3f4ea] text-2xl sm:text-3xl font-bold font-geometric p-6 flex items-center justify-center text-center shadow-[10px_10px_0px_rgba(0,0,0,0.2)] border-none opacity-0 scale-50" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>{note}</div>
              ))}
            </div>
          </section>
        </div>

        {/* Panel 3 */}
        <div className="panel-3-wrapper w-full h-[150vh] relative z-[3]">
          <section className="panel-3 sticky top-0 w-full h-screen flex flex-col items-center justify-start relative px-12 pt-[15vh] overflow-hidden bg-[#f3f4ea] text-pine-teal rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
            <div className="text-center w-full max-w-4xl z-20 space-y-4">
              <div className="text-2xl md:text-4xl font-bold tracking-widest text-[#f3f4ea] uppercase border-4 border-pine-teal rounded-full px-8 py-3 inline-block font-geometric bg-pine-teal shadow-[6px_6px_0px_rgba(0,0,0,0.2)]"><span ref={clockRef}>23:45</span>, Ruang Kerja</div>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] font-geometric mt-6 text-pine-teal">Waktu terus berjalan, secangkir kopi lagi.</h3>
            </div>
            <div className="desk-bg-layer absolute bottom-0 left-0 w-full h-[60vh] pointer-events-none flex items-end opacity-40 z-0"><div className="w-full h-full bg-[url('/guilty-desk.svg')] bg-cover bg-bottom filter grayscale brightness-50 contrast-200"></div></div>
            <div className="desk-fg-layer absolute bottom-0 left-0 w-full h-[50vh] pointer-events-none flex items-end justify-center z-10">
              <div className="relative w-full max-w-5xl h-full">
                <img src={guiltyDesk.src} alt="Messy Desk" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] drop-shadow-[0_0_50px_rgba(45,71,57,0.3)] filter sepia-[0.3] hue-rotate-[120deg] brightness-90 saturate-200" />
                <div className="absolute bottom-[30%] left-[45%] w-[20%] h-[20%] bg-pine-teal opacity-20 blur-2xl animate-pulse"></div>
              </div>
            </div>
          </section>
        </div>

        {/* Panel 4 */}
        <div className="panel-4-wrapper w-full h-screen relative z-[4]">
          <section className="panel-4 sticky top-0 w-full h-screen flex items-center relative px-20 overflow-hidden bg-[#f3f4ea] text-pine-teal rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
            <div className="running-parallax absolute bottom-0 left-0 w-[120%] h-[75vh] pointer-events-none origin-bottom opacity-20 mix-blend-multiply"><img src={guiltyRunning.src} alt="Characters Running" className="w-full h-full object-cover object-bottom filter grayscale contrast-150" /></div>
            <div className="chat-bubbles-container absolute inset-0 z-20">
              {[ { text: '"Revisi lagi ya, besok kelar!"', top: '20%', left: '10%' }, { text: '"Ping!"', top: '15%', left: '40%' }, { text: '"Udah sampai mana?"', top: '25%', left: '70%' }, { text: '"Slide 4 tolong diganti"', top: '40%', left: '80%' }, { text: '"Urgent! Cek email sekarang."', top: '50%', left: '15%' }, { text: '"Bisa tambah fitur ini sekalian?"', top: '65%', left: '60%' }, { text: '"Jadwal maju jadi jam 7 pagi"', top: '75%', left: '25%' }, { text: '"Tolong kerjain di weekend ya 🙏"', top: '80%', left: '75%' } ].map((b, i) => (<div key={i} className="chat-bubble absolute text-xl sm:text-2xl font-bold bg-[#1A1A1A] text-[#f3f4ea] border-none rounded-3xl p-4 sm:p-6 shadow-[10px_10px_0px_rgba(0,0,0,0.2)] opacity-0 scale-50 font-geometric max-w-xs" style={{ top: b.top, left: b.left }}>{b.text}</div>))}
            </div>
            <h3 className="no-escape-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black opacity-10 uppercase tracking-tighter whitespace-nowrap z-0 text-[#1A1A1A]">NO ESCAPE</h3>
          </section>
        </div>
      </div>

      {/* ── UNTOLD ACTUAL SECTION 2 (SHRINKING FULL-VIEWPORT VIDEO) ── */}
      <section
        ref={videoSectionRef}
        className="w-full h-screen bg-[#f3f4ea] relative overflow-hidden flex items-center justify-center cursor-none"
        onMouseEnter={() => setIsHoveringVideo(true)}
        onMouseLeave={() => setIsHoveringVideo(false)}
        onMouseMove={handleVideoMouseMove}
        onClick={toggleMute}
      >
        {/* Custom Orange Unmute Cursor */}
        <motion.div
          className="fixed top-0 left-0 w-24 h-24 bg-[#FF4500] rounded-full flex items-center justify-center text-white text-xs font-bold tracking-widest pointer-events-none z-[100] mix-blend-normal"
          animate={{
            x: cursorPos.x - 48, // Center cursor (48 = half of w-24/h-24)
            y: cursorPos.y - 48,
            scale: isHoveringVideo ? 1 : 0,
            opacity: isHoveringVideo ? 1 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
        >
          ( {isMuted ? 'UNMUTE' : 'MUTE'} )
        </motion.div>

        {/* The Shrinking Video Wrapper */}
        <div
          ref={videoWrapperRef}
          className="w-[100vw] h-[100vh] relative overflow-hidden z-10 mt-12 mb-12"
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

          {/* Subtle overlay label that disappears when shrunk */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 text-sm font-bold tracking-widest uppercase z-20 font-geometric transition-opacity duration-300">
            ( MENGAMBIL JEDA )
          </div>
        </div>

        {/* The Text Block that reveals as the video shrinks */}
        <div
          ref={videoTextRef}
          className="absolute right-[8vw] top-1/2 -translate-y-1/2 w-[38vw] flex flex-col items-start z-20"
        >
          {/* Label */}
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#1A1A1A]/40 mb-6 font-geometric">
            ( Mengambil Jeda )
          </p>

          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1A1A1A] leading-[1.1] mb-5 font-geometric">
            Mendengarkan tubuh adalah langkah awal.
          </h3>

          {/* Divider */}
          <div className="w-12 h-[2px] bg-[#1A1A1A]/15 mb-5" />

          <p className="text-base md:text-lg text-[#1A1A1A]/55 font-medium leading-relaxed max-w-md mb-6 font-geometric">
            Cerita yang paling bermakna dimulai dari empati—memahami batasan diri, mengakui kelelahan, dan berani melepaskan kendali sejenak.
          </p>

          <div className="text-sm font-geometric text-[#1A1A1A]/45 leading-relaxed max-w-md">
            <span className="text-[#FF4500] font-bold">(*)</span> Kami hadir untuk membantu kamu{' '}
            <RotatingTextContainer
              text={['mengenali', 'memahami', 'merawat']}
              duration={1800}
              delay={500}
              y={20}
              className="inline-flex items-center"
              style={{ overflow: 'hidden', paddingBlock: 0, minWidth: '6.2em', display: 'inline-block' }}
            >
              <RotatingText
                className="font-bold text-[#1A1A1A] underline decoration-[#FF4500] decoration-2 underline-offset-2"
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </RotatingTextContainer>
            {' '}kesehatan mental — karena kamu layak merasa baik-baik saja.
          </div>
        </div>

      </section>

      </main>
    </ReactLenis>
  );
}