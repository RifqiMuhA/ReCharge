"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BloomingFlowerProps {
    feelings: string[];
    isDark: boolean;
}

export default function BloomingFlower({ feelings, isDark }: BloomingFlowerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textGroupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textGroupRef.current) return;

        // Container fade in
        gsap.to(containerRef.current, { opacity: 1, duration: 2, ease: "power2.inOut" });

        const flowers = containerRef.current.querySelectorAll('.flower-plant');
        
        flowers.forEach((flower, index) => {
            const stem = flower.querySelector('.grow-stem');
            const head = flower.querySelector('.grow-head');
            const text = flower.querySelector('.feeling-label');

            const tl = gsap.timeline({ delay: 1 + (index * 0.4) });

            // Grow stem from bottom (stroke dash)
            if (stem) {
                gsap.set(stem, { strokeDasharray: 300, strokeDashoffset: 300 });
                tl.to(stem, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" });
            }

            // Pop flower head
            if (head) {
                gsap.set(head, { scale: 0, transformOrigin: "50% 100%" });
                tl.to(head, { scale: 1, duration: 1, ease: "back.out(1.5)" }, "-=0.3");
            }

            // Fade in text
            if (text) {
                tl.fromTo(text, 
                    { opacity: 0, y: 10 }, 
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
                    "-=0.5"
                );
            }
        });

        // Affirmation text staggered animation
        const sentences = textGroupRef.current.children;
        gsap.fromTo(sentences,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, stagger: 1, delay: 4, ease: "power2.out" }
        );

    }, []);

    const strokeColor = isDark ? "#F5F5ED" : "#15221bff";
    const accentColor = isDark ? "#FFABD2" : "#8DDEDE";

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex flex-col items-center justify-between opacity-0 relative px-4 pt-20 pb-4"
        >
            <div className="flex-grow flex items-end justify-center w-full max-w-5xl mb-32">
                <div className="flex flex-row justify-center items-end gap-12 md:gap-24 w-full h-[300px] md:h-[400px]">
                    {feelings.map((feeling, idx) => {
                        // Different heights and slight curves for organic feel
                        const heights = [200, 300, 240];
                        const curve = idx === 0 ? "Q 30 100, 50 0" : (idx === 2 ? "Q 70 100, 50 0" : "Q 50 150, 50 0");
                        
                        return (
                            <div key={idx} className="flower-plant relative flex flex-col items-center justify-end" style={{ height: heights[idx] }}>
                                
                                <span 
                                    className="feeling-label absolute -top-12 font-heading italic text-3xl md:text-5xl tracking-wide drop-shadow-md whitespace-nowrap"
                                    style={{ color: strokeColor }}
                                >
                                    {feeling}
                                </span>

                                <svg viewBox="0 0 100 300" className="w-16 h-full md:w-24 overflow-visible">
                                    {/* The Stem */}
                                    <path 
                                        className="grow-stem" 
                                        d={`M 50 300 ${curve}`} 
                                        fill="none" 
                                        stroke={strokeColor} 
                                        strokeWidth="3" 
                                        strokeLinecap="round" 
                                    />
                                    
                                    {/* The Flower Head */}
                                    <g className="grow-head" transform="translate(50, 0)">
                                        {/* Simple elegant organic flower head */}
                                        <path d="M 0 0 C 20 -20, 30 -40, 0 -60 C -30 -40, -20 -20, 0 0" fill={isDark ? "rgba(255,171,210,0.4)" : "rgba(141,222,222,0.4)"} stroke={accentColor} strokeWidth="2" />
                                        <path d="M 0 0 C 40 -10, 50 -30, 20 -40 C 0 -20, 10 -10, 0 0" fill="none" stroke={strokeColor} strokeWidth="1.5" />
                                        <path d="M 0 0 C -40 -10, -50 -30, -20 -40 C 0 -20, -10 -10, 0 0" fill="none" stroke={strokeColor} strokeWidth="1.5" />
                                        <circle cx="0" cy="-15" r="5" fill={accentColor} />
                                    </g>
                                </svg>

                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Affirmation Text */}
            <div ref={textGroupRef} className="absolute bottom-8 w-full flex flex-col items-center text-center gap-4 px-4 bg-black/10 py-6 backdrop-blur-sm rounded-3xl max-w-4xl mx-auto">
                <h3 className={`text-3xl md:text-5xl font-heading italic leading-snug drop-shadow-lg ${isDark ? "text-floral-white" : "text-pine-teal"}`}>
                    &ldquo;Semua rasa yang mekar hari ini adalah bagian dari dirimu.&rdquo;
                </h3>
                <p className={`text-base md:text-lg font-body font-light tracking-wide opacity-80 ${isDark ? "text-floral-white" : "text-pine-teal"}`}>
                    Teruslah bertumbuh dan rawatlah taman di dalam hatimu.
                </p>
                <div className="pt-4 opacity-0 border border-current/20 rounded-full px-6 py-2 hover:bg-current/10 transition-colors" ref={(el) => { if (el) gsap.to(el, { opacity: 1, duration: 2, delay: 5, ease: "power2.inOut" }) }}>
                    <button
                        onClick={() => window.location.reload()}
                        className={`text-sm tracking-[0.2em] font-body uppercase transition-all duration-500 opacity-80 hover:opacity-100 cursor-target ${isDark ? "text-floral-white" : "text-pine-teal"}`}
                    >
                        Tanam Kembali
                    </button>
                </div>
            </div>

        </div>
    );
}
