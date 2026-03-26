"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PastelCloud = ({ className, color }: { className: string, color: string }) => (
    <svg viewBox="-20 -20 160 120" className={`absolute pointer-events-none drop-shadow-sm ${className}`}>
        <path d="M 25 70 A 20 20 0 0 1 20 30 A 25 25 0 0 1 65 15 A 30 30 0 0 1 110 40 A 20 20 0 0 1 100 75 Z" fill="#FFFFFF" stroke="#15221b" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="65" cy="45" r="5" fill={color} stroke="#15221b" strokeWidth="2.5" opacity="0.9" />
        <circle cx="45" cy="55" r="3" fill={color} stroke="#15221b" strokeWidth="2" opacity="0.8" />
    </svg>
);

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
            // Pop flower head + leaves — ALL SIMULTANEOUSLY
            if (head) {
                const allPetals = head.querySelectorAll('path, circle');
                const leafLeft = flower.querySelector('.leaf-left');
                const leafRight = flower.querySelector('.leaf-right');
                gsap.set(allPetals, { scale: 0, transformOrigin: "50% 100%" });
                gsap.set([leafLeft, leafRight], { scale: 0, transformOrigin: "50% 100%" });
                gsap.set(head, { scale: 0.8, transformOrigin: "50% 100%" });
                tl.to(head, { scale: 1, duration: 0.5, ease: "back.out(1.2)" }, "-=0.2");
                // All petals bloom in unison with a single elastic burst
                tl.to(allPetals, { scale: 1, duration: 1.4, ease: "elastic.out(1, 0.5)", stagger: 0.02 }, "-=0.3");
                // Leaves unfurl simultaneously with the petals
                tl.to([leafLeft, leafRight], { scale: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }, "-=1.2");
            }

            // Fade in text
            if (text) {
                tl.fromTo(text, 
                    { opacity: 0, y: 10 }, 
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
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
            className="w-full h-full flex flex-col items-center justify-end opacity-0 relative px-4 pb-6 pt-10"
        >
            {/* Pastel Cloud Corners (Pink and Blue only) */}
            <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none z-0">
                <PastelCloud className="-top-12 -left-12 w-64 h-48 drop-shadow-sm text-pearl-aqua" color="#8DDEDE" />
                <PastelCloud className="top-10 left-10 w-40 h-28 drop-shadow-sm text-blush-pop" color="#FFABD2" />
                <PastelCloud className="top-24 -left-4 w-48 h-32 drop-shadow-sm text-pearl-aqua scale-x-[1] rotate-[20deg]" color="#8DDEDE" />
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none z-0">
                <PastelCloud className="-top-10 -right-16 w-64 h-48 drop-shadow-sm text-blush-pop scale-x-[-1]" color="#FFABD2" />
                <PastelCloud className="top-16 right-12 w-40 h-28 drop-shadow-sm text-pearl-aqua" color="#8DDEDE" />
                <PastelCloud className="top-28 -right-8 w-48 h-32 drop-shadow-sm text-blush-pop rotate-[-15deg]" color="#FFABD2" />
            </div>

            <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none z-0">
                <PastelCloud className="-bottom-16 -left-16 w-[300px] h-[220px] drop-shadow-sm text-blush-pop" color="#FFABD2" />
                <PastelCloud className="bottom-16 left-20 w-48 h-32 drop-shadow-sm text-pearl-aqua scale-x-[-1]" color="#8DDEDE" />
                <PastelCloud className="bottom-4 left-40 w-32 h-24 drop-shadow-sm text-blush-pop" color="#FFABD2" />
            </div>

            <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none z-0">
                <PastelCloud className="-bottom-12 -right-12 w-[300px] h-[220px] drop-shadow-sm text-pearl-aqua scale-x-[-1]" color="#8DDEDE" />
                <PastelCloud className="bottom-20 right-20 w-40 h-32 drop-shadow-sm text-blush-pop" color="#FFABD2" />
                <PastelCloud className="bottom-4 right-40 w-36 h-28 drop-shadow-sm text-pearl-aqua scale-x-[-1] rotate-12" color="#8DDEDE" />
            </div>

            {/* Side-mid clouds surrounding the flower area */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-0">
                <PastelCloud className="-left-16 -top-16 w-48 h-36" color="#8DDEDE" />
                <PastelCloud className="-left-10 top-10 w-36 h-28 rotate-[10deg]" color="#FFABD2" />
                <PastelCloud className="-left-20 top-32 w-44 h-32 rotate-[-5deg]" color="#8DDEDE" />
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0">
                <PastelCloud className="-right-16 -top-16 w-48 h-36 scale-x-[-1]" color="#FFABD2" />
                <PastelCloud className="-right-10 top-10 w-36 h-28 scale-x-[-1] rotate-[-10deg]" color="#8DDEDE" />
                <PastelCloud className="-right-20 top-32 w-44 h-32 scale-x-[-1] rotate-[5deg]" color="#FFABD2" />
            </div>

            <div className="flex-1 flex items-end justify-center w-full max-w-5xl mb-12 relative z-20">
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

                        return (
                            <div key={idx} className="flower-plant relative flex flex-col items-center justify-end" style={{ height: heights[idx] }}>

                                {/* Feeling text ABOVE flower with sparkle ring */}
                                <div
                                    className="feeling-label absolute z-20 flex flex-col items-center gap-1 -top-[100px] md:-top-[185px]"
                                >
                                    {/* Sparkles ring */}
                                    <div className="relative flex items-center justify-center">
                                        {/* Orbiting sparkle dots */}
                                        {[...Array(8)].map((_, i) => (
                                            <span
                                                key={i}
                                                className="absolute w-2 h-2 rounded-full"
                                                style={{
                                                    background: i % 2 === 0 ? '#FFABD2' : '#8DDEDE',
                                                    top: `${50 + 44 * Math.sin((i / 8) * 2 * Math.PI)}%`,
                                                    left: `${50 + 44 * Math.cos((i / 8) * 2 * Math.PI)}%`,
                                                    transform: 'translate(-50%, -50%)',
                                                    animation: `sparkle-blink ${0.8 + i * 0.15}s ease-in-out infinite alternate`,
                                                    animationDelay: `${i * 0.1}s`,
                                                }}
                                            />
                                        ))}
                                        <span className="font-geometric font-semibold text-2xl md:text-4xl tracking-wide drop-shadow-sm whitespace-nowrap text-pine-teal px-6 py-1">
                                            {feeling}
                                        </span>
                                    </div>
                                </div>

                                <svg viewBox="-50 0 200 300" className="w-20 h-full md:w-32 overflow-visible">
                                    {/* The Stem */}
                                    <path
                                        className="grow-stem"
                                        d={`M 50 300 ${curve}`}
                                        fill="none"
                                        stroke={strokeColor}
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                    />

                                    {/* Left Leaf - nudged 2px left */}
                                    <path
                                        className="leaf-left"
                                        d="M 42 210 C 8 195, -12 175, -2 155 C 16 170, 34 190, 44 208 Z"
                                        fill="#66BB6A"
                                        stroke="#2E7D32"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                    />
                                    {/* Right Leaf - nudged right */}
                                    <path
                                        className="leaf-right"
                                        d="M 42 145 C 68 128, 87 105, 74 85 C 60 100, 47 126, 41 143 Z"
                                        fill="#4CAF50"
                                        stroke="#2E7D32"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                    />

                                    {/* The Flower Head */}
                                    <g className="grow-head" transform="translate(50, 0)">
                                        {/* Back/Center Petal */}
                                        <path className="center-petal" d="M 0 0 C 40 -40, 50 -130, 0 -180 C -50 -130, -40 -40, 0 0" fill="#FFABD2" stroke="#15221b" strokeWidth="2.5" />

                                        {/* Middle Side Petals */}
                                        <path className="side-petal-1" d="M 0 0 C -40 -30, -110 -70, -130 -110 C -100 -130, -50 -70, 0 0" fill="#FFA0C0" stroke="#15221b" strokeWidth="2.5" />
                                        <path className="side-petal-2" d="M 0 0 C 40 -30, 110 -70, 130 -110 C 100 -130, 50 -70, 0 0" fill="#FFA0C0" stroke="#15221b" strokeWidth="2.5" />

                                        {/* Lower Side Petals (Wide Bloom) */}
                                        <path className="lower-petal-1" d="M 0 0 C -40 -10, -130 -10, -150 -50 C -120 -80, -30 -30, 0 0" fill="#FFABD2" stroke="#15221b" strokeWidth="2.5" />
                                        <path className="lower-petal-2" d="M 0 0 C 40 -10, 130 -10, 150 -50 C 120 -80, 30 -30, 0 0" fill="#FFABD2" stroke="#15221b" strokeWidth="2.5" />

                                        {/* Inner Core Petal */}
                                        <path className="inner-petal" d="M 0 0 C 20 -20, 30 -80, 0 -100 C -30 -80, -20 -20, 0 0" fill="#FFF946" stroke="#15221b" strokeWidth="2" />

                                        {/* Sepals (Green Base Holding Flower) */}
                                        <path className="sepal-1" d="M 0 0 C -20 -5, -60 -5, -70 -20 C -50 -30, -20 -15, 0 0" fill="#8DDEDE" stroke="#15221b" strokeWidth="2.5" />
                                        <path className="sepal-2" d="M 0 0 C 20 -5, 60 -5, 70 -20 C 50 -30, 20 -15, 0 0" fill="#8DDEDE" stroke="#15221b" strokeWidth="2.5" />

                                        <circle className="pistil" cx="0" cy="-20" r="10" fill="#FFF946" stroke="#15221b" strokeWidth="2.5" />
                                    </g>

                                    {/* Flower sparkle constellation - star/dot/diamond shapes */}
                                    {/* Top-left star — SPINS */}
                                    <g style={{ animation: 'sparkle-spin 3s linear infinite', transformOrigin: '-120px -80px', animationDelay: '0s' }}>
                                        <path d="M -120 -80 l3 -9 3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 Z" fill="#FFABD2" stroke="#15221b" strokeWidth="1" />
                                    </g>
                                    {/* Top-right diamond — FLOATS */}
                                    <g style={{ animation: 'sparkle-float 2.5s ease-in-out infinite', animationDelay: '0.3s' }}>
                                        <path d="M 225 -90 l6 -9 6 9 -6 9 Z" fill="#8DDEDE" stroke="#15221b" strokeWidth="1" />
                                    </g>
                                    {/* Mid-left dot — PULSES */}
                                    <circle cx="-90" cy="-40" r="5" fill="#15221b"
                                        style={{ animation: 'sparkle-pulse 1.2s ease-in-out infinite alternate', animationDelay: '0.5s' }}
                                    />
                                    {/* Mid-right star — SPINS */}
                                    <g style={{ animation: 'sparkle-spin 4s linear infinite', transformOrigin: '205px -30px', animationDelay: '0.8s' }}>
                                        <path d="M 205 -30 l2.5 -7.5 2.5 7.5 7.5 2.5 -7.5 2.5 -2.5 7.5 -2.5 -7.5 -7.5 -2.5 Z" fill="#FFABD2" stroke="#15221b" strokeWidth="1" />
                                    </g>
                                    {/* Lower-left diamond — FLOATS */}
                                    <g style={{ animation: 'sparkle-float 2s ease-in-out infinite', animationDelay: '1s' }}>
                                        <path d="M -70 30 l5 -7.5 5 7.5 -5 7.5 Z" fill="#15221b" />
                                    </g>
                                    {/* Lower-right dot — PULSES */}
                                    <circle cx="195" cy="20" r="4" fill="#8DDEDE"
                                        style={{ animation: 'sparkle-pulse 1.5s ease-in-out infinite alternate', animationDelay: '1.3s' }}
                                    />
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

            <div ref={textGroupRef} className="w-full flex flex-col items-center text-center gap-2 px-6 z-30 pointer-events-none mt-4 md:mt-8">
                <h3 className="text-lg md:text-3xl font-geometric leading-snug drop-shadow-sm text-pine-teal max-w-[280px] md:max-w-none">
                    &ldquo;Semua rasa yang mekar<br className="hidden sm:block" /> hari ini adalah bagian dari dirimu.&rdquo;
                </h3>
                <p className="text-sm md:text-base font-body font-light tracking-wide opacity-80 text-pine-teal max-w-[260px] md:max-w-none">
                    Teruslah bertumbuh dan rawatlah taman di dalam hatimu.
                </p>
            </div>

            <style>{`
                @keyframes sparkle-blink {
                    0%   { opacity: 0.15; transform: translate(-50%, -50%) scale(0.5); }
                    100% { opacity: 1;    transform: translate(-50%, -50%) scale(1.4); }
                }
                @keyframes sparkle-spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes sparkle-float {
                    0%, 100% { transform: translateY(0px); opacity: 0.7; }
                    50%       { transform: translateY(-8px); opacity: 1; }
                }
                @keyframes sparkle-pulse {
                    0%   { opacity: 0.2; }
                    100% { opacity: 1; }
                }
            `}</style>

        </div>
    );
}
