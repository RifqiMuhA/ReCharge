"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface GardenInputProps {
    onComplete: (feelings: string[]) => void;
    isDark: boolean;
}

export default function GardenInput({ onComplete, isDark }: GardenInputProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [feelings, setFeelings] = useState(['', '', '']);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        );

        if (formRef.current) {
            gsap.fromTo(formRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 1, delay: 0.5, ease: "power2.out" }
            );
        }
    }, []);

    const handleSubmit = () => {
        if (feelings.some(f => f.trim() === '')) return;

        const tl = gsap.timeline({
            onComplete: () => onComplete(feelings)
        });

        tl.to(buttonRef.current, { scale: 0.9, duration: 0.2 })
          .to(buttonRef.current, { scale: 1.5, opacity: 0, duration: 0.6, ease: "power2.out" })
          .to(containerRef.current, { opacity: 0, filter: "blur(10px)", duration: 1, ease: "power2.inOut" }, "-=0.4");
    };

    const textColor = isDark ? "text-floral-white" : "text-pine-teal";
    const placeholderColor = isDark ? "placeholder-floral-white/20" : "placeholder-pine-teal/20";
    const focusColor = isDark ? "#8DDEDE" : "#15221bff";

    const isComplete = feelings.every(f => f.trim() !== '');

    return (
        <div ref={containerRef} className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-16 opacity-0 px-4 min-h-screen py-24 hover:bg-transparent">
            <div className="text-center space-y-4">
                <h2 className={`text-5xl md:text-7xl font-heading italic tracking-wide ${textColor}`}>
                    Apa perasaanmu saat ini?
                </h2>
                <p className={`text-lg md:text-xl font-body font-light opacity-60 ${textColor} max-w-md mx-auto`}>
                    Luapkan beban pikiranmu ke ruang bebas ini.
                </p>
            </div>

            <div ref={formRef} className="w-full flex flex-col gap-8 md:gap-12 mt-8">
                {feelings.map((feeling, index) => (
                    <div key={index} className="relative group w-full flex items-end">
                        <span className={`text-sm md:text-base font-body tracking-wider opacity-30 w-12 pb-2 ${textColor}`}>
                            0{index + 1}
                        </span>
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                value={feeling}
                                onChange={(e) => {
                                    const newFeelings = [...feelings];
                                    newFeelings[index] = e.target.value;
                                    setFeelings(newFeelings);
                                }}
                                placeholder="Tuliskan di sini..."
                                className={`w-full bg-transparent border-b border-current/10 outline-none py-2 font-heading italic text-4xl mt-2 md:text-5xl transition-all duration-500 ease-out focus:bg-current/5 ${textColor} ${placeholderColor}`}
                            />
                            {/* Animated Underline */}
                            <div 
                                className="absolute bottom-0 left-0 h-[2px] w-0 bg-current group-focus-within:w-full transition-all duration-700 pointer-events-none" 
                                style={{ color: focusColor }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex flex-col items-center relative">
                <button
                    ref={buttonRef}
                    onClick={handleSubmit}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    disabled={!isComplete}
                    className={`group relative flex items-center gap-3 rounded-full px-8 py-4 transition-all duration-700 ease-out cursor-target
                        ${!isComplete ? 'opacity-30 scale-95 saturate-0' : 'opacity-100 hover:scale-105 shadow-xl'}
                    `}
                    style={{ 
                        backgroundColor: isComplete ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(21,34,27,0.05)') : 'transparent',
                        backdropFilter: isComplete ? 'blur(10px)' : 'none'
                    }}
                >
                    <span className={`font-body text-lg tracking-wider uppercase ${textColor}`}>
                        Tumbuhkan
                    </span>
                    {/* Minimalist Arrow */}
                    <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#FFF" : "#15221B"} strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>

                    {/* Ripple Context */}
                    {isHovering && isComplete && (
                        <span className="absolute inset-0 rounded-full bg-current opacity-10 animate-ping" style={{ color: focusColor, animationDuration: '2s' }}></span>
                    )}
                </button>
            </div>
        </div>
    );
}
