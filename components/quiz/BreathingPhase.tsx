"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface BreathingPhaseProps {
    onComplete: () => void;
    isDark: boolean;
}

export default function BreathingPhase({ onComplete, isDark }: BreathingPhaseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const [cycleCount, setCycleCount] = useState(0);

    useEffect(() => {
        if (!orbRef.current || !textRef.current || !containerRef.current) return;

        const tl = gsap.timeline({
            repeat: 1, // 2 cycles total (0 then 1)
            onRepeat: () => setCycleCount(c => c + 1),
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

        // initial state
        gsap.set(orbRef.current, { scale: 0.6, borderRadius: "50%" });
        gsap.set(textRef.current, { opacity: 0 });

        // Cycle animation
        tl.call(() => { if (textRef.current) textRef.current.innerText = "Tarik Napas..." })
            .to(textRef.current, { opacity: 1, duration: 1 }, 0)
            .to(orbRef.current, {
                scale: 1.2,
                borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
                duration: 4,
                ease: "sine.inOut"
            }, 0)
            .to(textRef.current, { opacity: 0, duration: 1 }, 3)
            // Exhale
            .call(() => { if (textRef.current) textRef.current.innerText = "Hembuskan..." }, [], 4)
            .to(textRef.current, { opacity: 1, duration: 1 }, 4)
            .to(orbRef.current, {
                scale: 0.6,
                borderRadius: "50%",
                duration: 5,
                ease: "sine.inOut"
            }, 4)
            .to(textRef.current, { opacity: 0, duration: 1 }, 8);

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    const textColor = isDark ? "text-floral-white" : "text-pine-teal";
    const orbColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(21, 34, 27, 0.08)";
    const orbShadow = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(21, 34, 27, 0.3)";

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center gap-16 w-full h-full relative">
            <h2 ref={textRef} className={`text-5xl md:text-7xl font-heading italic tracking-wide opacity-0 absolute top-1/4 ${textColor}`}>
                Tarik Napas...
            </h2>

            <div className="w-64 h-64 md:w-[400px] md:h-[400px] relative flex flex-col items-center justify-center pointer-events-none mt-10">
                <div 
                    ref={orbRef} 
                    className="w-full h-full backdrop-blur-md transition-all duration-300"
                    style={{ 
                        backgroundColor: orbColor,
                        boxShadow: `0 0 80px ${orbShadow}, inset 0 0 40px ${orbShadow}`
                    }}
                />
            </div>

            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                <div className="flex gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full transition-all duration-1000 ${cycleCount >= 0 ? 'opacity-100 bg-current scale-100' : 'opacity-30 border border-current scale-75'}`} style={{ color: isDark ? "#fff" : "#15221B" }}></div>
                    <div className={`w-2.5 h-2.5 rounded-full transition-all duration-1000 ${cycleCount >= 1 ? 'opacity-100 bg-current scale-100' : 'opacity-30 border border-current scale-75'}`} style={{ color: isDark ? "#fff" : "#15221B" }}></div>
                </div>
                <span className={`text-xs font-body tracking-[0.3em] opacity-40 uppercase ${textColor}`}>
                    Siklus Nafas
                </span>
            </div>
        </div>
    );
}
