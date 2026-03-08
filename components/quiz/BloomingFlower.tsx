"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BloomingFlowerProps {
    feelings: string[];
    isDark: boolean;
}

export default function BloomingFlower({ feelings, isDark }: BloomingFlowerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const flowerRef = useRef<SVGSVGElement>(null);
    const textGroupRef = useRef<HTMLDivElement>(null);
    const floatingWordsRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        if (!containerRef.current || !flowerRef.current || !textGroupRef.current) return;

        // Container fade in
        gsap.to(containerRef.current, { opacity: 1, duration: 2, ease: "power2.inOut" });

        // Flower bloom animation
        const petals = flowerRef.current.querySelectorAll('.bloom-petal');
        gsap.fromTo(petals,
            { scale: 0, transformOrigin: "50% 50%" },
            { scale: 1, rotation: 360, duration: 3, stagger: 0.1, ease: "power3.out" }
        );

        // Floating words infinite animation
        floatingWordsRef.current.forEach((word, index) => {
            if (!word) return;
            gsap.fromTo(word,
                { y: 50, opacity: 0, scale: 0.5 },
                {
                    y: -20, opacity: 0.8, scale: 1, duration: 2, delay: 1 + (index * 0.5), ease: "power2.out",
                    onComplete: () => {
                        // Infinite bobbing
                        gsap.to(word, {
                            y: "-=15",
                            duration: 2 + Math.random(),
                            yoyo: true,
                            repeat: -1,
                            ease: "sine.inOut"
                        });
                    }
                }
            );
        });

        // Affirmation text staggered animation
        const sentences = textGroupRef.current.children;
        gsap.fromTo(sentences,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, stagger: 2, delay: 2, ease: "power2.out" }
        );

    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!flowerRef.current) return;

        const { clientX, clientY } = e;
        const rect = flowerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate offset, limit distance so it's subtle
        const moveX = (clientX - centerX) * -0.05;
        const moveY = (clientY - centerY) * -0.05;

        gsap.to(flowerRef.current, {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        if (!flowerRef.current) return;
        gsap.to(flowerRef.current, {
            x: 0,
            y: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)"
        });
    };

    const strokeColor = isDark ? "#F5F5ED" : "#15221bff";
    const accentColor = isDark ? "#FFABD2" : "#8DDEDE";

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex flex-col items-center justify-center gap-12 md:gap-24 opacity-0 relative px-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >

            {/* The Blooming Flower Centered */}
            <div className="relative w-80 h-80 md:w-[600px] md:h-[600px] flex items-center justify-center mt-[-10vh]">

                {/* Floating Words Orbiting the Flower */}
                {feelings.map((feeling, i) => {
                    const positions = [
                        "top-[10%] left-[5%]",
                        "top-[20%] right-[5%]",
                        "bottom-[15%] left-1/2 -translate-x-1/2"
                    ];
                    return (
                        <span
                            key={i}
                            ref={el => { floatingWordsRef.current[i] = el; }}
                            className={`absolute ${positions[i]} font-serif italic text-3xl md:text-5xl opacity-0 pointer-events-none z-10 drop-shadow-lg tracking-wider`}
                            style={{ color: i % 2 === 0 ? accentColor : strokeColor }}
                        >
                            {feeling}
                        </span>
                    );
                })}

                <svg ref={flowerRef} viewBox="0 0 200 200" className="w-full h-full overflow-visible drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    {/* Atmospheric Backglow */}
                    <circle cx="100" cy="100" r="60" fill={accentColor} className="opacity-10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />

                    {/* Layer 1 (Outer Mandala Base) */}
                    <g style={{ opacity: 0.15 }}>
                        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                            <path key={`L1-${i}`} className="bloom-petal" d="M100 100 C 120 20, 160 30, 100 0 C 40 30, 80 20, 100 100 Z" fill="none" stroke={strokeColor} strokeWidth="0.5" transform={`rotate(${angle} 100 100)`} />
                        ))}
                    </g>

                    {/* Layer 2 (Middle Complex Petals) */}
                    <g style={{ opacity: 0.4 }}>
                        {[15, 75, 135, 195, 255, 315].map((angle, i) => (
                            <g key={`L2-${i}`} transform={`rotate(${angle} 100 100)`}>
                                <path className="bloom-petal" d="M100 100 C 130 40, 140 10, 100 20 C 60 10, 70 40, 100 100 Z" fill={isDark ? "rgba(255,171,210,0.15)" : "rgba(141,222,222,0.15)"} stroke={accentColor} strokeWidth="0.8" />
                                <line className="bloom-petal" x1="100" y1="100" x2="100" y2="40" stroke={accentColor} strokeWidth="0.5" strokeDasharray="1 3" />
                            </g>
                        ))}
                    </g>

                    {/* Layer 3 (Inner Lotus) */}
                    <g style={{ opacity: 0.8 }}>
                        {[0, 120, 240].map((angle, i) => (
                            <path key={`L3-${i}`} className="bloom-petal" d="M100 100 C 70 70, 80 40, 100 30 C 120 40, 130 70, 100 100 Z" fill="none" stroke={strokeColor} strokeWidth="1.5" transform={`rotate(${angle} 100 100)`} />
                        ))}
                    </g>

                    {/* Glowing Center Stamen */}
                    <circle cx="100" cy="100" r="12" fill={accentColor} className="animate-pulse opacity-40 blur-md" />
                    <circle cx="100" cy="100" r="4" fill={strokeColor} />
                    <circle cx="100" cy="100" r="8" fill="none" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="1 2" className="animate-spin" style={{ animationDuration: '10s' }} />
                </svg>
            </div>

            {/* Affirmation Text - Positioned at the bottom mimicking a cinematic subtitle */}
            <div ref={textGroupRef} className="absolute bottom-16 md:bottom-24 w-full flex flex-col items-center text-center gap-6 px-4">
                <h3 className={`text-3xl md:text-5xl lg:text-6xl font-tt-commons font-light leading-snug max-w-4xl mx-auto drop-shadow-md ${isDark ? "text-floral-white" : "text-pine-teal"}`}>
                    "Perasaanmu valid. Teruslah bertumbuh seperti taman ini."
                </h3>
                <p className={`text-lg md:text-xl font-geometric font-light tracking-wide opacity-70 max-w-2xl mx-auto ${isDark ? "text-floral-white" : "text-pine-teal"}`}>
                    I appreciate you taking the time to pause and reflect today.
                </p>
                <div className="pt-8 opacity-0" ref={(el) => { if (el) gsap.to(el, { opacity: 1, duration: 2, delay: 4, ease: "power2.inOut" }) }}>
                    <button
                        onClick={() => window.location.reload()}
                        className={`text-sm tracking-[0.2em] font-geometric uppercase border-b border-transparent pb-1 hover:border-current transition-all duration-500 opacity-50 hover:opacity-100 cursor-target ${isDark ? "text-floral-white" : "text-pine-teal"}`}
                    >
                        Tanam Kembali
                    </button>
                </div>
            </div>

        </div>
    );
}
