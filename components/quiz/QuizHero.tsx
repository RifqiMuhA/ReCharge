"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import pattern1 from '@/components/quiz/pattern_1.webp';
import pattern2 from '@/components/quiz/pattern_2.webp';
import pattern3 from '@/components/quiz/pattern_3.webp';
import pattern4 from '@/components/quiz/pattern_4.webp';
import pattern5 from '@/components/quiz/pattern_5.webp';
import pattern6 from '@/components/quiz/pattern_6.webp';

interface QuizHeroProps {
    onComplete: () => void;
}

export default function QuizHero({ onComplete }: QuizHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const patternsRef = useRef<(HTMLDivElement | null)[]>([]);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Text entrance animations
            tl.fromTo(titleRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
            )
                .fromTo(subtitleRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                    "-=0.8"
                )
                .fromTo(glowRef.current,
                    { scale: 0.5, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 2, ease: "sine.out" },
                    "-=1.5"
                )
                .fromTo(btnRef.current,
                    { y: 20, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
                    "-=0.5"
                );

            // Pop-up animation for patterns
            gsap.fromTo(patternsRef.current,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: "back.out(1.5)",
                    delay: 0.6 // Start right after text appears
                }
            );

            // Add continuous floating (melayang) effect after they appear
            patternsRef.current.forEach((el, index) => {
                if (!el) return;
                gsap.to(el, {
                    y: index % 2 === 0 ? -15 : 15,
                    x: index % 3 === 0 ? 10 : -10,
                    duration: 3 + Math.random() * 2,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    delay: 2.5 + (index * 0.1) // Adjusted delay since pop-up moved
                });
            });

            // Breathing effect on the background glow
            if (glowRef.current) {
                gsap.to(glowRef.current, {
                    scale: 1.1,
                    opacity: 0.7,
                    duration: 4,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    delay: 2
                });
            }

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const patterns = [
        // Top Left
        { src: pattern1, alt: 'pattern 1', className: 'absolute -top-40 -left-20 md:-top-56 md:-left-44 w-24 h-24 md:w-40 md:h-40' },
        // Top Right
        { src: pattern2, alt: 'pattern 2', className: 'absolute -top-32 -right-16 md:-top-48 md:-right-40 w-20 h-20 md:w-36 md:h-36' },
        // Middle Left
        { src: pattern3, alt: 'pattern 3', className: 'absolute top-[60%] -translate-y-1/2 -left-32 md:-left-72 w-28 h-28 md:w-48 md:h-48' },
        // Middle Right
        { src: pattern4, alt: 'pattern 4', className: 'absolute top-[30%] -translate-y-1/2 -right-32 md:-right-64 w-32 h-32 md:w-52 md:h-52' },
        // Bottom Left
        { src: pattern5, alt: 'pattern 5', className: 'absolute -bottom-36 -left-16 md:-bottom-48 md:-left-36 w-24 h-24 md:w-40 md:h-40' },
        // Bottom Right
        { src: pattern6, alt: 'pattern 6', className: 'absolute -bottom-32 -right-20 md:-bottom-44 md:-right-44 w-28 h-28 md:w-48 md:h-48' },
    ];

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative">
            <div className="relative z-10 text-center flex flex-col items-center mt-[-80px] md:mt-0">
                {/* Magical ambient glow behind the entire text block */}
                <div
                    ref={glowRef}
                    className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-0"
                >
                    <div className="w-[120%] h-[150%] bg-blush-pop/30 rounded-[100%] blur-[60px] md:blur-[80px]"></div>
                </div>

                <div className="relative w-fit">
                    {/* Pop-up patterns wrapping the text tightly */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        {patterns.map((p, i) => (
                            <div key={i} className={p.className}>
                                <div
                                    ref={el => { patternsRef.current[i] = el }}
                                    className="w-full h-full relative"
                                >
                                    <Image src={p.src} alt={p.alt} fill className="object-contain" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="relative z-20 flex flex-col items-center">
                        <h1
                            ref={titleRef}
                            className="text-5xl md:text-7xl font-geometric text-pine-teal tracking-wide relative opacity-0"
                        >
                            Ruang <span className="italic">Recharge</span>
                        </h1>

                        {/* Decorative Line under Title */}
                        <svg className="w-48 md:w-64 h-3 mx-auto mt-4 mb-2 text-pine-teal/20" viewBox="0 0 100 10" fill="none" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>

                        <p
                            ref={subtitleRef}
                            className="text-base md:text-lg font-geometric font-light text-pine-teal/80 max-w-sm md:max-w-md mx-auto relative opacity-0"
                        >
                            Ambil nafas sejenak, mari lepaskan apa yang membebanimu hari ini.
                        </p>
                    </div>
                </div>

                <div ref={btnRef} className="mt-20 md:mt-24 relative opacity-0 group">
                    <button
                        onClick={onComplete}
                        className="bg-blush-pop text-pine-teal text-sm font-geometric tracking-[0.2em] font-bold uppercase py-4 px-12 rounded-full shadow-[0_8px_20px_rgba(255,171,210,0.3)] group-hover:shadow-[0_8px_20px_rgba(21,34,27,0.15)] focus:outline-none focus:ring-2 focus:ring-pine-teal/30 focus:ring-offset-2 flex items-center justify-center gap-3 relative overflow-hidden transition-all duration-500 ease-out z-10"
                    >
                        <span className="absolute inset-0 w-full h-full bg-pine-teal -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-left"></span>
                        <span className="relative z-10 group-hover:text-floral-white transition-colors duration-400">
                            Mulai
                        </span>
                    </button>
                    {/* Stars eruption wrapper behind button */}
                    <div className="absolute top-1/2 left-1/2 w-0 h-0 z-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[5rem] group-hover:-translate-y-[3rem] group-hover:rotate-12 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] z-0">
                            <svg className="w-6 h-6 text-pine-teal/70 animate-[spin_4s_linear_infinite]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0l2 9 9 2-9 2-2 9-2-9-9-2 9-2z" />
                            </svg>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-[4rem] group-hover:translate-y-[2rem] group-hover:-rotate-12 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] delay-75 z-0">
                            <svg className="w-5 h-5 text-pine-teal/50 animate-[spin_3s_linear_infinite_reverse]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0l2 9 9 2-9 2-2 9-2-9-9-2 9-2z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
