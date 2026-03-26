"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import bird1 from '@/components/photos/contact/bird_1.webp';
import bird2 from '@/components/photos/contact/bird_2.webp';
import bird3 from '@/components/photos/contact/bird_3.webp';

interface GardenInputProps {
    onComplete: (feelings: string[]) => void;
    isDark: boolean;
}

export default function GardenInput({ onComplete }: GardenInputProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const boardRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const birdRef = useRef<HTMLDivElement>(null);
    const birdFramesRef = useRef<(HTMLImageElement | null)[]>([]);

    const [feeling, setFeeling] = useState('');
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });

        // Swinging wooden sign effect
        // Set transform perspective for realistic 3D swing
        gsap.set(containerRef.current, { perspective: 1000 });

        gsap.fromTo(boardRef.current,
            { rotationX: -80, y: -50, opacity: 0, transformOrigin: "top center" },
            { rotationX: 0, y: 0, opacity: 1, duration: 2.5, ease: "elastic.out(1, 0.4)", delay: 0.2 }
        );

        // Flapping Animation: Only loop between wings-down (bird2) and wings-up (bird3) to avoid static bird frame
        gsap.set(birdFramesRef.current[0], { opacity: 0 }); // Hide resting bird initially
        gsap.set(birdFramesRef.current[1], { opacity: 1 }); // Show flapping bird

        const flapTl = gsap.timeline({ repeat: -1 });
        flapTl
            .to(birdFramesRef.current[1], { opacity: 0, duration: 0 }, "+=0.15")
            .to(birdFramesRef.current[2], { opacity: 1, duration: 0 }, "<")
            .to(birdFramesRef.current[2], { opacity: 0, duration: 0 }, "+=0.15")
            .to(birdFramesRef.current[1], { opacity: 1, duration: 0 }, "<");

        // Bird Swoop Animation: straight flight, no rotation
        gsap.fromTo(birdRef.current,
            { x: "-30vw", y: "-30vh", scale: 0.6, opacity: 0 },
            { x: 0, y: 0, scale: 1, opacity: 1, duration: 2.5, ease: "power2.out", delay: 1.2 }
        );

        // Stop flapping precisely when landing
        gsap.delayedCall(1.2 + 2.5, () => {
            flapTl.pause();
            gsap.set(birdFramesRef.current[0], { opacity: 1 }); // Folded wings
            gsap.set([birdFramesRef.current[1], birdFramesRef.current[2]], { opacity: 0 }); // Hide flapped wings
            // Slight landing settle bounce
            gsap.to(birdRef.current, { y: 2, duration: 0.4, ease: "bounce.out" });
        });

        if (elementsRef.current) {
            gsap.fromTo(elementsRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 1.2, delay: 1, ease: "power2.out" }
            );
        }
    }, []);

    const handleSubmit = () => {
        if (!feeling.trim()) return;

        const tl = gsap.timeline({
            onComplete: () => onComplete([feeling]) // Pass array of 1 for BloomingFlower compatibility
        });

        tl.to(buttonRef.current, { scale: 0.9, duration: 0.2 })
            .to(buttonRef.current, { scale: 1.5, opacity: 0, duration: 0.6, ease: "power2.out" })
            .to(boardRef.current, { y: 100, rotationZ: 5, opacity: 0, duration: 0.8, ease: "power2.in" }, "-=0.4")
            .to(containerRef.current, { opacity: 0, duration: 0.5 }, "-=0.2");
    };

    const isComplete = feeling.trim() !== '';

    return (
        <div ref={containerRef} className="w-full px-4 flex flex-col items-center justify-center relative">

            <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center mt-2">
                {/* Ropes hanging from above - using Tailwind colors */}
                <div className="absolute -top-24 md:-top-32 left-[15%] w-1.5 h-24 md:h-32 bg-pine-teal/40 transform -translate-x-1/2 blur-[0.5px]"></div>
                <div className="absolute -top-24 md:-top-32 right-[15%] w-1.5 h-24 md:h-32 bg-pine-teal/40 transform translate-x-1/2 blur-[0.5px]"></div>

                {/* The Brushed Board utilizing Tailwind Config Colors */}
                <div
                    ref={boardRef}
                    className="w-full relative px-6 py-8 md:px-16 md:py-12 rounded-xl md:rounded-3xl"
                >
                    {/* SVG Brushed Background Texture */}
                    <div className="absolute inset-0 z-0 pointer-events-none drop-shadow-[0_20px_40px_rgba(21,34,27,0.3)]">
                        <svg preserveAspectRatio="none" viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm text-floral-white">
                            {/* Outer darker brush stroke - Pine Teal border */}
                            <path d="M 2 5 C 20 2, 80 1, 98 4 C 99 20, 97 80, 96 95 C 80 98, 20 99, 4 96 C 1 80, 3 20, 2 5 Z" fill="#15221b" />
                            {/* Inner lighter wood brush stroke - Floral White main background */}
                            <path d="M 3 6 C 25 3, 75 4, 95 5 C 97 25, 95 75, 94 93 C 75 96, 25 95, 6 94 C 2 75, 5 25, 3 6 Z" fill="currentColor" />
                            <path d="M 4 8 C 30 5, 70 5, 93 7 C 95 30, 93 70, 92 90 C 70 93, 30 93, 7 91 C 4 70, 6 30, 4 8 Z" fill="currentColor" />

                            {/* Horizontal dry brush/wood grain lines using Pine Teal */}
                            <g className="text-pine-teal">
                                <path d="M 10 20 Q 50 15 90 22" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.08" />
                                <path d="M 8 40 Q 50 38 92 41" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.05" />
                                <path d="M 12 60 Q 50 63 88 58" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.1" />
                                <path d="M 9 80 Q 50 78 91 82" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.08" />
                            </g>
                        </svg>
                    </div>

                    {/* Bird flying and landing on top-left edge with flap layers */}
                    <div ref={birdRef} className="absolute -top-[70px] md:-top-[90px] left-2 md:left-8 w-24 md:w-32 h-24 md:h-32 drop-shadow-[0_10px_10px_rgba(21,34,27,0.3)] z-50 origin-bottom">
                        <Image ref={el => { birdFramesRef.current[0] = el }} src={bird1} alt="Burung Diam" className="absolute inset-0 w-full h-full object-contain" />
                        <Image ref={el => { birdFramesRef.current[1] = el }} src={bird2} alt="Burung Kepak 1" className="absolute inset-0 w-full h-full object-contain opacity-0" />
                        <Image ref={el => { birdFramesRef.current[2] = el }} src={bird3} alt="Burung Kepak 2" className="absolute inset-0 w-full h-full object-contain opacity-0" />
                    </div>

                    {/* Content Group on Board */}
                    <div ref={elementsRef} className="flex flex-col items-center text-center gap-8 md:gap-10 relative z-10 w-full px-2">
                        <h2 className="text-3xl md:text-5xl font-geometric font-medium text-pine-teal tracking-tight leading-snug">
                            Tulis 1 kata mengenai perasaanmu hari ini
                        </h2>

                        {/* Blue Paper pinned to the board */}
                        <div className="w-[96%] relative group mt-4 mb-6 mx-auto z-20">

                            <div className="w-full bg-[#E5F1F8] border border-[#D1E5F0] shadow-[0_6px_12px_rgba(21,34,27,0.15)] rounded-sm -rotate-1 transition-transform duration-500 group-focus-within:rotate-0 flex flex-col items-center justify-center py-10 md:py-14 px-6 md:px-10 relative">

                                {/* Yellow Push Pin */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                                    {/* The plastic head of the pin */}
                                    <div className="w-7 h-7 rounded-full bg-canary-yellow shadow-[0_3px_5px_rgba(21,34,27,0.3)] border border-pine-teal/10 relative z-10 flex items-center justify-center">
                                        <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-white/70"></div>
                                    </div>
                                    {/* The needle poking into paper */}
                                    <div className="w-[3px] h-3 bg-gray-400 -mt-1 rounded-b-full shadow-inner z-0"></div>
                                </div>

                                <input
                                    type="text"
                                    value={feeling}
                                    onChange={(e) => setFeeling(e.target.value)}
                                    placeholder="Tulis di sini..."
                                    className="w-full bg-transparent outline-none py-2 text-center font-heading italic text-4xl md:text-5xl text-pine-teal placeholder-pine-teal/30 focus:outline-none focus:placeholder-pine-teal/15 transition-all duration-300 relative z-10"
                                />
                            </div>
                        </div>

                        <div className="buttons relative z-20 mt-4 pt-2 w-full flex justify-center">
                            <button
                                ref={buttonRef}
                                onClick={handleSubmit}
                                disabled={!isComplete}
                                className={`blob-btn font-geometric uppercase font-bold tracking-[0.2em] transition-all duration-500 ease-in-out ${!isComplete ? 'opacity-30 scale-95 cursor-not-allowed' : 'opacity-100 hover:scale-[1.03] shadow-lg shadow-pine-teal/10'}`}
                            >
                                <span className="relative z-10 uppercase text-pine-teal">Tumbuhkan</span>
                                <span className="blob-btn__inner">
                                    <span className="blob-btn__blobs">
                                        <span className="blob-btn__blob"></span>
                                        <span className="blob-btn__blob"></span>
                                        <span className="blob-btn__blob"></span>
                                        <span className="blob-btn__blob"></span>
                                    </span>
                                </span>
                            </button>

                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ height: 0, width: 0, position: 'absolute' }}>
                                <defs>
                                    <filter id="goo">
                                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" result="goo"></feColorMatrix>
                                        <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div>

                    <style>{`
                        .buttons {
                            text-align: center;
                            border-radius: 30px;
                        }
                        .blob-btn {
                            z-index: 1;
                            position: relative;
                            padding: 20px 46px;
                            text-align: center;
                            color: #15221b;
                            font-size: 18px;
                            background-color: transparent;
                            outline: none;
                            border: none;
                            transition: color 0.5s;
                            cursor: pointer;
                            border-radius: 30px;
                        }
                        .blob-btn:before {
                            content: "";
                            z-index: 1;
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            border: 2px solid #15221b;
                            border-radius: 30px;
                        }
                        .blob-btn:after {
                            content: "";
                            z-index: -2;
                            position: absolute;
                            left: 3px;
                            top: 3px;
                            width: 100%;
                            height: 100%;
                            transition: all 0.3s 0.2s;
                            border-radius: 30px;
                        }
                        .blob-btn:not(:disabled):hover {
                            color: #15221b;
                            border-radius: 30px;
                        }
                        .blob-btn:not(:disabled):hover:after {
                            transition: all 0.3s;
                            left: 0;
                            top: 0;
                            border-radius: 30px;
                        }
                        .blob-btn__inner {
                            z-index: -1;
                            overflow: hidden;
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            border-radius: 30px;
                            background: #ffffff;
                        }
                        .blob-btn__blobs {
                            position: relative;
                            display: block;
                            height: 100%;
                            filter: url('#goo');
                        }
                        .blob-btn__blob {
                            position: absolute;
                            top: 2px;
                            width: 25%;
                            height: 100%;
                            background: #FFABD2;
                            border-radius: 100%;
                            transform: translate3d(0, 150%, 0) scale(1.7);
                            transition: transform 0.45s;
                        }
                        @supports (filter: url('#goo')) {
                            .blob-btn__blob {
                                transform: translate3d(0, 150%, 0) scale(1.4);
                            }
                        }
                        .blob-btn__blob:nth-child(1) { left: 0%; transition-delay: 0s; }
                        .blob-btn__blob:nth-child(2) { left: 30%; transition-delay: 0.08s; }
                        .blob-btn__blob:nth-child(3) { left: 60%; transition-delay: 0.16s; }
                        .blob-btn__blob:nth-child(4) { left: 90%; transition-delay: 0.24s; }
                        .blob-btn:not(:disabled):hover .blob-btn__blob {
                            transform: translateZ(0) scale(1.7);
                        }
                        @supports (filter: url('#goo')) {
                            .blob-btn:not(:disabled):hover .blob-btn__blob {
                                transform: translateZ(0) scale(1.4);
                            }
                        }
                    `}</style>
                </div>
            </div>

        </div>
    );
}