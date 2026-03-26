"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import hale1 from '@/components/quiz/hale_1.webp';
import hale2 from '@/components/quiz/hale_2.webp';
import hale3 from '@/components/quiz/hale_3.webp';
import wind2 from '@/components/quiz/wind_2.webp';
import wind3 from '@/components/quiz/wind_3.webp';
import leaf from '@/components/quiz/leaf.webp';

interface BreathingPhaseProps {
    onComplete: () => void;
    isDark: boolean;
}

export default function BreathingPhase({ onComplete, isDark }: BreathingPhaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const frame1Ref = useRef<HTMLDivElement>(null);
    const frame2Ref = useRef<HTMLDivElement>(null);
    const frame3Ref = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const bgWindRef = useRef<HTMLDivElement>(null);
    const leavesRef = useRef<HTMLDivElement>(null);

    // Exactly 2 winds as requested
    const wind2Ref = useRef<HTMLDivElement>(null);
    const wind3Ref = useRef<HTMLDivElement>(null);

    // Energy Draw Particles
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !frame1Ref.current || !frame2Ref.current || !frame3Ref.current || !textRef.current || !bgWindRef.current || !leavesRef.current || !wind2Ref.current || !wind3Ref.current || !particlesRef.current) return;

        // --- Background Wind Sweep Effect ---
        const bgWindEls = Array.from(bgWindRef.current.children) as HTMLDivElement[];
        bgWindEls.forEach((el, i) => {
            gsap.fromTo(el,
                { x: "-100vw", opacity: 0 },
                {
                    x: "100vw",
                    opacity: 1,
                    duration: 12 + Math.random() * 6,
                    ease: "sine.inOut",
                    repeat: -1,
                    delay: Math.random() * 4,
                    yoyo: true
                }
            );
        });

        // --- Flying Leaves Effect (leaf.webp) ---
        const leafEls = Array.from(leavesRef.current.children) as HTMLDivElement[];
        leafEls.forEach((el, i) => {
            // Randomize Y coordinates extensively for natural scattering
            const startY = 10 + Math.random() * 80; // 10vh to 90vh
            const endY = startY + (Math.random() * 60 - 30); // Drift wildly up or down up to 30vh

            gsap.fromTo(el,
                { x: "-20vw", y: `${startY}vh`, rotation: Math.random() * -180, scale: Math.random() * 0.5 + 0.5, opacity: 0.8 },
                {
                    x: "120vw",
                    y: `${endY}vh`,
                    rotation: 360 * (Math.random() > 0.5 ? 2 : -2), // Spin 2 times, randomly clockwise or counter
                    scale: Math.random() * 0.8 + 0.7,
                    opacity: 0.9,
                    duration: 12 + Math.random() * 8,
                    ease: "sine.inOut",
                    repeat: -1,
                    delay: Math.random() * 12,
                    yoyo: false
                }
            );
        });

        // --- Breathing Cycle Sequence ---
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(containerRef.current, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 1.5,
                    ease: "power2.inOut",
                    onComplete: onComplete
                });
            }
        });

        // Initial State (hale_1 = Diam)
        gsap.set(textRef.current, { opacity: 0 });
        gsap.set([frame2Ref.current, frame3Ref.current], { opacity: 0 });
        gsap.set(frame1Ref.current, { opacity: 1 });
        gsap.set([wind2Ref.current, wind3Ref.current], { opacity: 0, scale: 0.1 }); // Hide winds

        // Helper for Inhale Energy Draw Magical Particles
        const particleEls = Array.from(particlesRef.current.children) as HTMLDivElement[];
        const animateEnergyDraw = (startTime: number) => {
            particleEls.forEach((el, i) => {
                // Scatter randomly in an outer ring around the chest
                const angle = Math.random() * Math.PI * 2;
                const distance = 150 + Math.random() * 150; // 150 to 300px away 
                const startX = Math.cos(angle) * distance;
                const startY = Math.sin(angle) * distance;

                // Move smoothly and continuously to center (no stopping)
                tl.fromTo(el,
                    { x: startX, y: startY, opacity: 0, scale: Math.random() * 0.5 + 0.5 },
                    { x: 0, y: 0, scale: 0, duration: 2, ease: "power2.in" }, // Fast suck at the end
                    startTime
                )
                    // Fade in early, then fade out just before hitting exact center
                    .to(el, { opacity: Math.random() * 0.6 + 0.4, duration: 0.5 }, startTime)
                    .to(el, { opacity: 0, duration: 0.5 }, startTime + 1.5);
            });
        };

        // --- CYCLE 1: INHALE (hale_1 -> hale_3) ---
        tl.call(() => { if (textRef.current) textRef.current.innerHTML = "Tarik napas..." })
            .to(textRef.current, { opacity: 1, duration: 1 }, 0)

            .set(frame1Ref.current, { opacity: 0 }, 1)
            .set(frame3Ref.current, { opacity: 1 }, 1)

        animateEnergyDraw(0.5); // Add magical energy draw before peak inhale

        tl.to(textRef.current, { opacity: 0, duration: 1 }, 3)

            // --- CYCLE 1: EXHALE (hale_3 -> hale_2) ---
            .call(() => { if (textRef.current) textRef.current.innerHTML = "Hembuskan..." }, [], 4)
            .to(textRef.current, { opacity: 1, duration: 1 }, 4)

            .set(frame3Ref.current, { opacity: 0 }, 5)
            .set(frame2Ref.current, { opacity: 1 }, 5) // Exhale swap

            // Exhale Wind from Mouth (Sliding strictly left and right horizontally)
            .fromTo(wind2Ref.current, { opacity: 0, scale: 0.2, x: 0, y: 0 }, { opacity: 0.8, scale: 0.8, x: -80, y: 0, duration: 1.5, ease: "power2.out" }, 5)
            .fromTo(wind3Ref.current, { opacity: 0, scale: 0.2, x: 0, y: 0 }, { opacity: 0.8, scale: 0.8, x: 80, y: 0, duration: 1.5, ease: "power2.out" }, 5)

            .to([wind2Ref.current, wind3Ref.current], { opacity: 0, duration: 1.5, ease: "power2.in" }, 6.5) // Fade ends gracefully

            .to(textRef.current, { opacity: 0, duration: 1 }, 8)

            // --- CYCLE 2: INHALE PREP (Sekali lagi...) ---
            .call(() => { if (textRef.current) textRef.current.innerHTML = "Sekali lagi..." }, [], 9)
            .to(textRef.current, { opacity: 1, duration: 0.8 }, 9)

            // Natural resting reset 
            .set(frame2Ref.current, { opacity: 0 }, 10)
            .set(frame1Ref.current, { opacity: 1 }, 10)

            .to(textRef.current, { opacity: 0, duration: 0.8 }, 10.5)

            // --- CYCLE 2: INHALE (Tarik napas...) ---
            .call(() => { if (textRef.current) textRef.current.innerHTML = "Tarik napas..." }, [], 11.5)
            .to(textRef.current, { opacity: 1, duration: 1 }, 11.5)

            .set(frame1Ref.current, { opacity: 0 }, 12.5)
            .set(frame3Ref.current, { opacity: 1 }, 12.5)

        animateEnergyDraw(12.0); // Add second energy draw

        tl.to(textRef.current, { opacity: 0, duration: 1 }, 14.5)

            // --- CYCLE 2: EXHALE ---
            .call(() => { if (textRef.current) textRef.current.innerHTML = "Hembuskan..." }, [], 15.5)
            .to(textRef.current, { opacity: 1, duration: 1 }, 15.5)

            .set(frame3Ref.current, { opacity: 0 }, 16.5)
            .set(frame2Ref.current, { opacity: 1 }, 16.5)

            // Exhale Wind Again (Sliding strictly left and right horizontally)
            .fromTo(wind2Ref.current, { opacity: 0, scale: 0.2, x: 0, y: 0 }, { opacity: 0.8, scale: 0.8, x: -80, y: 0, duration: 1.5, ease: "power2.out" }, 16.5)
            .fromTo(wind3Ref.current, { opacity: 0, scale: 0.2, x: 0, y: 0 }, { opacity: 0.8, scale: 0.8, x: 80, y: 0, duration: 1.5, ease: "power2.out" }, 16.5)

            .to([wind2Ref.current, wind3Ref.current], { opacity: 0, duration: 1.5, ease: "power2.in" }, 18)

            .to(textRef.current, { opacity: 0, duration: 1 }, 19.5);

        return () => {
            gsap.killTweensOf(bgWindEls);
            gsap.killTweensOf(leafEls);
            tl.kill();
        };
    }, [onComplete]);

    const textColor = isDark ? "text-floral-white" : "text-pine-teal";
    const bgWindColor = "#8DDEDE"; // Pearl-aqua blue for background wind

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-start w-full h-[100dvh] relative overflow-hidden pt-12 md:pt-24 pb-10">

            {/* Background Wind Particles Render Layer */}
            <div ref={bgWindRef} className="absolute inset-0 pointer-events-none z-0">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={`bg-wind-${i}`}
                        className="absolute w-2/3 md:w-1/2 min-w-[300px]"
                        style={{
                            top: `${15 + Math.random() * 70}%`,
                            color: bgWindColor
                        }}
                    >
                        {/* Wavy stroke brushed wind */}
                        <svg className="w-full h-auto drop-shadow-sm opacity-60" viewBox="0 0 400 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M0,20 C100,0 300,40 400,20 C300,38 100,2 0,20 Z" />
                            <path d="M50,30 C120,15 250,35 300,30 C250,33 120,17 50,30 Z" opacity="0.6" />
                            <path d="M150,15 C200,5 250,25 350,15 C250,22 200,8 150,15 Z" opacity="0.4" />
                        </svg>
                    </div>
                ))}
            </div>

            {/* Flying Real Leaves Effect */}
            <div ref={leavesRef} className="absolute inset-0 pointer-events-none z-0">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={`leaf-${i}`}
                        className="absolute w-10 h-10 md:w-14 md:h-14 drop-shadow-md opacity-90"
                    >
                        <Image src={leaf} alt="Daun terbang" fill className="object-contain" />
                    </div>
                ))}
            </div>

            {/* CENTERAL CONTAINER: Perfectly Aligned to start higher up near Navbar */}
            <div className="flex flex-col items-center justify-start w-full max-w-lg z-10 gap-6 md:gap-10 relative">
                {/* Natural Document Flow Text */}
                <h2
                    ref={textRef}
                    className={`text-4xl md:text-5xl lg:text-5xl font-geometric font-light tracking-wide opacity-0 ${textColor} text-center leading-relaxed px-4 min-h-[3rem]`}
                >
                    Tarik Napas...
                </h2>

                {/* Center Breathing Character */}
                <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] relative flex flex-col items-center justify-center pointer-events-none flex-none">

                    {/* Energy Draw Particles Center Anchored exactly at the Mouth/Upper Chest */}
                    <div className="absolute top-[26%] left-1/2 w-0 h-0 z-30 flex justify-center items-center pointer-events-none origin-center">
                        <div ref={particlesRef} className="absolute inset-0">
                            {[...Array(16)].map((_, i) => (
                                <div
                                    key={`energy-dot-${i}`}
                                    className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#8DDEDE] shadow-[0_0_10px_#8DDEDE] opacity-0 block"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Main character frames */}
                    <div ref={frame1Ref} className="absolute inset-0 z-10">
                        <Image src={hale1} alt="Posisi diam" fill className="object-contain" priority />
                    </div>
                    <div ref={frame2Ref} className="absolute inset-0 z-10">
                        <Image src={hale2} alt="Mengeluarkan napas" fill className="object-contain" priority />
                    </div>
                    <div ref={frame3Ref} className="absolute inset-0 z-10">
                        <Image src={hale3} alt="Menarik napas" fill className="object-contain" priority />
                    </div>

                    {/* Exhale pearl-aqua winds blowing out from exactly the mouth */}
                    <div className="absolute top-[23%] left-1/2 w-0 h-0 z-20 flex justify-center items-center pointer-events-none origin-center">

                        {/* W2: Slides Left */}
                        <div ref={wind2Ref} className="absolute top-0 right-0 w-24 h-12 md:w-32 md:h-16 opacity-0 scale-x-[-1]">
                            <Image src={wind2} alt="W2" fill className="object-contain" />
                        </div>

                        {/* W3: Slides Right */}
                        <div ref={wind3Ref} className="absolute top-0 left-0 w-24 h-12 md:w-32 md:h-16 opacity-0">
                            <Image src={wind3} alt="W3" fill className="object-contain" />
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}