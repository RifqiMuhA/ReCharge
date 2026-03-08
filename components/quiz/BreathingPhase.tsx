"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface BreathingPhaseProps {
    onComplete: () => void;
    isDark: boolean;
}

export default function BreathingPhase({ onComplete, isDark }: BreathingPhaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const flowerRef = useRef<SVGSVGElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const [cycleCount, setCycleCount] = useState(0);

    useEffect(() => {
        if (!flowerRef.current || !textRef.current || !containerRef.current) return;

        const petals = flowerRef.current.querySelectorAll('.petal');
        const particles = flowerRef.current.querySelectorAll('.particle');

        const tl = gsap.timeline({
            repeat: 1, // 2 cycles total (0 then 1)
            onRepeat: () => setCycleCount(c => c + 1),
            onComplete: () => {
                // Morphing out
                gsap.to(containerRef.current, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 1.5,
                    ease: "power2.inOut",
                    onComplete: onComplete
                });
            }
        });

        // initial state
        gsap.set(petals, { scale: 0.5, transformOrigin: "50% 50%" });
        gsap.set(particles, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
        gsap.set(textRef.current, { opacity: 0 });

        // Cycle animation
        tl.call(() => { if (textRef.current) textRef.current.innerText = "Tarik Napas..." })
            .to(textRef.current, { opacity: 1, duration: 1 }, 0)
            .to(petals, {
                scale: 1,
                rotation: 15,
                stagger: 0.1,
                duration: 3,
                ease: "sine.inOut"
            }, 0)
            .to(textRef.current, { opacity: 0, duration: 1 }, 3)
            // Exhale
            .call(() => { if (textRef.current) textRef.current.innerText = "Hembuskan..." }, [], 4)
            .to(textRef.current, { opacity: 1, duration: 1 }, 4)
            .to(petals, {
                scale: 0.6,
                rotation: 0,
                stagger: 0.1,
                duration: 5,
                ease: "sine.inOut"
            }, 4)
            .to(particles, {
                opacity: 1,
                scale: 1,
                y: -50,
                x: "random(-50, 50)",
                stagger: 0.2,
                duration: 4,
                ease: "power1.out"
            }, 4)
            .to(particles, { opacity: 0, duration: 1 }, 7)
            .to(textRef.current, { opacity: 0, duration: 1 }, 8);

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    const textColor = isDark ? "text-floral-white" : "text-pine-teal";
    const highlightColor = isDark ? "#F5F5ED" : "#15221bff";

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center gap-16 w-full h-full relative">
            <h2 ref={textRef} className={`text-4xl md:text-6xl font-tt-commons font-light tracking-wide opacity-0 absolute top-1/4 ${textColor}`}>
                Tarik Napas...
            </h2>

            <div className="w-80 h-80 md:w-[500px] md:h-[500px] relative flex items-center justify-center pointer-events-none mt-20">
                <svg ref={flowerRef} viewBox="0 0 200 200" className="w-full h-full overflow-visible drop-shadow-2xl">
                    {/* Atmospheric Glow */}
                    <circle cx="100" cy="100" r="50" fill={highlightColor} className="opacity-5 blur-2xl" />

                    {/* Layer 1: Outer Petals/Rings */}
                    <g className="petal" style={{ opacity: 0.1 }}>
                        <circle cx="100" cy="100" r="80" fill="none" stroke={highlightColor} strokeWidth="0.5" strokeDasharray="2 4" />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                            <path key={`out-${i}`} d="M100 20 C120 40, 140 70, 100 100 C60 70, 80 40, 100 20 Z" fill="none" stroke={highlightColor} strokeWidth="0.5" transform={`rotate(${angle} 100 100)`} />
                        ))}
                    </g>

                    {/* Layer 2: Middle Petals */}
                    <g className="petal" style={{ opacity: 0.3 }}>
                        <circle cx="100" cy="100" r="50" fill="none" stroke={highlightColor} strokeWidth="0.5" />
                        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
                            <path key={`mid-${i}`} d="M100 50 C110 60, 120 80, 100 100 C80 80, 90 60, 100 50 Z" fill="none" stroke={highlightColor} strokeWidth="1" transform={`rotate(${angle} 100 100)`} />
                        ))}
                    </g>

                    {/* Layer 3: Inner Core */}
                    <g className="petal" style={{ opacity: 0.6 }}>
                        <circle cx="100" cy="100" r="20" fill="none" stroke={highlightColor} strokeWidth="1" />
                        {[0, 90, 180, 270].map((angle, i) => (
                            <path key={`in-${i}`} d="M100 80 C105 85, 110 95, 100 100 C90 95, 95 85, 100 80 Z" fill={highlightColor} transform={`rotate(${angle} 100 100)`} />
                        ))}
                    </g>

                    {/* Breathing Particles */}
                    <circle className="particle" cx="100" cy="100" r="1.5" fill={highlightColor} />
                    <circle className="particle" cx="100" cy="100" r="2" fill={highlightColor} />
                    <circle className="particle" cx="100" cy="100" r="1" fill={highlightColor} />
                    <circle className="particle" cx="100" cy="100" r="2.5" fill={highlightColor} />
                    <circle className="particle" cx="100" cy="100" r="1.5" fill={highlightColor} />
                    <circle className="particle" cx="100" cy="100" r="1" fill={highlightColor} />
                    <circle className="particle" cx="100" cy="100" r="2" fill={highlightColor} />

                    {/* Center Point */}
                    <circle cx="100" cy="100" r="4" fill={highlightColor} className="animate-pulse" />
                </svg>
            </div>

            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <div className="flex gap-2">
                    <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${cycleCount >= 0 ? 'opacity-100 bg-current scale-100' : 'opacity-30 border border-current scale-75'}`} style={{ color: highlightColor }}></div>
                    <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${cycleCount >= 1 ? 'opacity-100 bg-current scale-100' : 'opacity-30 border border-current scale-75'}`} style={{ color: highlightColor }}></div>
                </div>
                <span className="text-xs font-geometric tracking-[0.3em] opacity-40 uppercase">
                    Siklus Nafas
                </span>
            </div>
        </div>
    );
}
