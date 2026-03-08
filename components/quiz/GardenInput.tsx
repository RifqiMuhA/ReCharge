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
        // Morph in
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        );

        // Stagger inputs
        if (formRef.current) {
            gsap.fromTo(formRef.current.children,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, stagger: 0.2, duration: 1, delay: 0.5, ease: "power2.out" }
            );
        }
    }, []);

    const handleSubmit = () => {
        if (feelings.some(f => f.trim() === '')) return; // Require all 3

        // Submit animation
        const tl = gsap.timeline({
            onComplete: () => onComplete(feelings)
        });

        tl.to(buttonRef.current, { scale: 0.9, duration: 0.2 })
            .to(buttonRef.current, { scale: 1.5, opacity: 0, duration: 0.8, ease: "power2.out" })
            .to(containerRef.current, { opacity: 0, y: -50, duration: 1, ease: "power3.in" }, "-=0.5");
    };

    const textColor = isDark ? "text-floral-white" : "text-pine-teal";
    const bgGlass = isDark ? "bg-[#F5F5ED]/5 border-[#F5F5ED]/10 drop-shadow-2xl" : "bg-[#15221bff]/5 border-[#15221bff]/10 drop-shadow-2xl";
    const placeholderColor = isDark ? "placeholder-floral-white/20" : "placeholder-pine-teal/20";
    const focusBorder = isDark ? "focus:border-[#8DDEDE]/50" : "focus:border-[#15221bff]/50";

    const isComplete = feelings.every(f => f.trim() !== '');

    return (
        <div ref={containerRef} className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-16 opacity-0 px-4">
            <div className="text-center space-y-6">
                <h2 className={`text-4xl md:text-6xl font-tt-commons font-light tracking-wide ${textColor}`}>
                    Apa <span className="italic font-serif">perasaanmu</span> saat ini?
                </h2>
                <p className={`text-lg md:text-xl font-geometric font-light opacity-60 ${textColor} max-w-md mx-auto`}>
                    Luapkan beban pikiranmu dan tanamkan ke dalam taman ini.
                </p>
            </div>

            <div ref={formRef} className={`w-full p-8 md:p-16 rounded-[2.5rem] backdrop-blur-xl border flex flex-col gap-8 shadow-[0_30px_60px_rgba(0,0,0,0.05)] ${bgGlass}`}>
                {feelings.map((feeling, index) => (
                    <div key={index} className="relative group flex items-center">
                        <span className={`text-sm font-geometric tracking-[0.2em] opacity-30 w-12 ${textColor}`}>
                            0{index + 1}
                        </span>
                        <input
                            type="text"
                            value={feeling}
                            onChange={(e) => {
                                const newFeelings = [...feelings];
                                newFeelings[index] = e.target.value;
                                setFeelings(newFeelings);
                            }}
                            placeholder="Aku merasa..."
                            className={`w-full bg-transparent border-b border-current/10 ${focusBorder} outline-none py-3 px-2 font-tt-commons text-3xl md:text-4xl font-light transition-all duration-500 ease-out focus:bg-current/5 focus:pl-6 rounded-t-lg ${textColor} ${placeholderColor}`}
                        />
                        {/* Interactive focus indicator line */}
                        <div className="absolute bottom-0 left-12 right-0 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-focus-within:opacity-50 transition-opacity duration-700 pointer-events-none" style={{ color: isDark ? '#8DDEDE' : '#15221bff' }}></div>
                    </div>
                ))}

                <div className="mt-12 flex flex-col items-center relative">
                    <button
                        ref={buttonRef}
                        onClick={handleSubmit}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        disabled={!isComplete}
                        className={`group relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 ease-out cursor-target mt-8 ${!isComplete ? 'opacity-30 scale-90 saturate-0' : 'opacity-100 hover:scale-[1.15] hover:shadow-[0_0_40px_rgba(255,171,210,0.3)]'}`}
                        style={{ backgroundColor: isComplete ? (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(21,34,27,0.05)') : 'transparent' }}
                        aria-label="Tanam Perasaan"
                    >
                        {/* Refined Drop SVG */}
                        <svg viewBox="0 0 100 100" className="w-10 h-10 overflow-visible z-10">
                            <path
                                d="M50 15 C50 15, 25 60, 25 75 C25 88.8, 36.2 100, 50 100 C63.8 100, 75 88.8, 75 75 C75 60, 50 15, 50 15 Z"
                                fill={isHovering && isComplete ? (isDark ? "#8DDEDE" : "#FFABD2") : "none"}
                                stroke={isDark ? "#F5F5ED" : "#15221bff"}
                                strokeWidth="2"
                                className="transition-colors duration-500"
                            />
                            {/* Inner sprout indicating planting */}
                            <path
                                d="M50 85 C 40 70, 60 70, 50 50"
                                fill="none"
                                stroke={isDark ? (isHovering && isComplete ? "#15221bff" : "#F5F5ED") : (isHovering && isComplete ? "#F5F5ED" : "#15221bff")}
                                strokeWidth="2"
                                strokeLinecap="round"
                                className={`transition-all duration-700 ease-out origin-bottom ${isComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                            />
                        </svg>

                        {/* Ripple Effect Background */}
                        {isHovering && isComplete && (
                            <>
                                <span className="absolute inset-0 rounded-full bg-current opacity-10 animate-ping" style={{ color: isDark ? "#8DDEDE" : "#FFABD2", animationDuration: '2s' }}></span>
                                <span className="absolute inset-[-20%] rounded-full border border-current opacity-20 animate-spin" style={{ color: isDark ? "#8DDEDE" : "#FFABD2", animationDuration: '6s', animationDirection: 'reverse' }}></span>
                            </>
                        )}
                    </button>
                    {/* Helper text appearing only when complete */}
                    <span className={`absolute -bottom-12 text-sm font-geometric tracking-[0.2em] transition-all duration-700 ease-out uppercase ${isComplete ? 'opacity-60 translate-y-0' : 'opacity-0 -translate-y-4'} ${textColor}`}>
                        Tanam Benih
                    </span>
                </div>
            </div>
        </div>
    );
}
