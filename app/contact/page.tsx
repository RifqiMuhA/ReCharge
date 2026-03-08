"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import featherImg from '@/components/photos/contact/feather.webp';
import hands1Img from '@/components/photos/contact/hands1.webp';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        email: '',
        intent: ''
    });

    const [intentPlaceholder, setIntentPlaceholder] = useState('bercerita tentang...');
    const intentsList = ["Bercerita tentang hari ini", "Mencari jati diri", "Explore kemampuan diri"];
    const [coverText, setCoverText] = useState("");

    const paper1Ref = useRef<HTMLDivElement>(null);
    const paper2Ref = useRef<HTMLDivElement>(null);
    const mainPaperRef = useRef<HTMLDivElement>(null);
    const coverRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    const [isHoveringField, setIsHoveringField] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            // Initial stacked state
            gsap.set([paper1Ref.current, paper2Ref.current, mainPaperRef.current], {
                y: 60,
                opacity: 0,
                rotationZ: 0,
                x: 0,
                transformOrigin: "bottom left"
            });

            gsap.set(coverRef.current, {
                y: 60,
                opacity: 1, // Start fully visible
                transformOrigin: "center center"
            });

            // Animate forming the scattered papers like opening a letter
            tl.to([mainPaperRef.current, coverRef.current], {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out"
            })
                .to(paper1Ref.current, {
                    opacity: 1,
                    rotationZ: -4,
                    x: -12,
                    y: -4,
                    duration: 1,
                    ease: "back.out(1.4)"
                }, "-=0.9")
                .to(paper2Ref.current, {
                    opacity: 0.9,
                    rotationZ: 4,
                    x: 10,
                    y: 8,
                    duration: 1,
                    ease: "back.out(1.4)"
                }, "-=0.9")
                // Cover slides UP smoothly
                .to(coverRef.current, {
                    yPercent: -105,
                    duration: 1.2,
                    ease: "power2.inOut"
                }, "+=0.6")
                // Push to back (behind paper1 which is -z-20)
                .set(coverRef.current, { zIndex: -30 })
                // Drop down straight perfectly completely hidden
                .to(coverRef.current, {
                    yPercent: 0,
                    y: 0,
                    x: 0,
                    rotationZ: 0,
                    duration: 1.2,
                    ease: "power2.out"
                });
        });

        // Typing effect for intent placeholder
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimeout: NodeJS.Timeout;

        const type = () => {
            const currentWord = intentsList[wordIndex];

            if (isDeleting) {
                setIntentPlaceholder(currentWord.substring(0, charIndex - 1));
                charIndex--;
            } else {
                setIntentPlaceholder(currentWord.substring(0, charIndex + 1));
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % intentsList.length;
                typeSpeed = 500; // Pause before new word
            }

            typingTimeout = setTimeout(type, typeSpeed);
        };

        typingTimeout = setTimeout(type, 1000);

        // Typing effect for cover text
        let coverCharIdx = 0;
        const targetCoverText = "tuang perasaanmu";
        let coverTypingTimeout: NodeJS.Timeout;

        const typeCover = () => {
            setCoverText(targetCoverText.substring(0, coverCharIdx + 1));
            coverCharIdx++;

            if (coverCharIdx < targetCoverText.length) {
                coverTypingTimeout = setTimeout(typeCover, 70);
            }
        };
        coverTypingTimeout = setTimeout(typeCover, 500);

        // GSAP Mouse move tracking for custom cursor
        const handleMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            }
        };
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            ctx.revert();
            clearTimeout(typingTimeout);
            clearTimeout(coverTypingTimeout);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Effect for bouncing cursor in and out
    useEffect(() => {
        if (!cursorRef.current) return;
        if (isHoveringField) {
            gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.2)", overwrite: "auto" });
        } else {
            gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.15, ease: "power2.out", overwrite: "auto" });
        }
    }, [isHoveringField]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Custom animation or submission logic here
        console.log("Form submitted: ", formData);
        alert("Pesan Anda telah tekirim!");
        setFormData({ name: '', location: '', email: '', intent: '' });
    };

    return (
        <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 md:p-8 lg:p-12 bg-[#F5F5ED] overflow-hidden relative cursor-auto box-border">

            {/* Custom Feather Tracker */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] transform -translate-x-[100%] -translate-y-[100%] opacity-0 mix-blend-multiply"
                style={{ scale: 0 }}
            >
                <Image src={featherImg} alt="feather" fill className="object-contain drop-shadow-sm" />
            </div>

            <div className="max-w-[85rem] w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

                {/* Left Panel: Typography & Copy */}
                <div className="w-full lg:w-4/12 flex flex-col gap-6 md:gap-8 lg:sticky lg:top-32 lg:px-0 px-4">
                    <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-geometric font-light leading-[1.05] tracking-tighter text-pine-teal">
                        Mari tulis bab
                        baru untuk
                        pulih.
                    </h1>

                    <div className="flex flex-col gap-3 text-pine-teal text-xs md:text-sm font-geometric tracking-tight leading-relaxed mt-2">
                        <p className="opacity-80">
                            <span className="text-blush-pop mr-1">(*)</span> Siap untuk memulai perjalanan resiliensi Anda? <br />
                            Isi panel di samping atau kirim ke
                        </p>
                        <Link href="mailto:halo@recharge.id" className="font-bold border-b border-pine-teal pb-0.5 inline-table w-max hover:text-blush-pop hover:border-blush-pop transition-colors tracking-tight">
                            halo@recharge.id
                        </Link>
                        <p className="opacity-80">
                            — kami selalu siap mendengar.
                        </p>
                    </div>
                </div>

                {/* Right Panel: Mad Libs Interactive Form with Paper Layout */}
                <div className="w-full lg:w-8/12 relative mt-8 lg:mt-0 px-2 sm:px-4 lg:px-8" style={{ perspective: "1500px" }}>

                    {/* Layered Paper Base Effects */}
                    <div ref={paper1Ref} className="absolute inset-y-0 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 bg-white shadow-md rounded-sm border border-black/5 -z-20"></div>
                    <div ref={paper2Ref} className="absolute inset-y-0 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 bg-white/80 shadow-sm rounded-sm border border-black/5 -z-10"></div>

                    {/* The Cover that slides up and drops behind */}
                    <div ref={coverRef} className="absolute inset-y-0 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 bg-[#F5F5ED] shadow-2xl rounded-sm border border-pine-teal/10 z-50 flex flex-col md:flex-row items-center justify-center pointer-events-none overflow-hidden gap-6 px-10">
                        {/* Inner tint */}
                        <div className="absolute inset-0 bg-pine-teal/[0.03]"></div>

                        <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32">
                            <Image src={hands1Img} alt="hands pouring feelings" fill className="object-contain drop-shadow-sm" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-tt-commons-light text-pine-teal font-medium tracking-tight">
                                {coverText}<span className="animate-blink font-light">|</span>
                            </h2>
                        </div>
                    </div>

                    {/* Main Paper Content */}
                    <div ref={mainPaperRef} className="bg-[#FAF9F6] shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-sm border border-[#E5E5DF] relative transform-style-3d">

                        {/* Lines wrap inside so they don't break outside the rounded corners */}
                        <div className="absolute inset-0 overflow-hidden rounded-sm pointer-events-none z-0">
                            {/* Vertical ruled line margin (like notebook) */}
                            <div className="absolute top-0 bottom-0 left-6 md:left-12 w-[1px] bg-blush-pop/30 h-full"></div>
                            <div className="absolute top-0 bottom-0 left-7 md:left-13 w-[1px] bg-blush-pop/10 h-full"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-y-7 text-base sm:text-xl md:text-2xl lg:text-3xl font-geometric font-light leading-relaxed text-pine-teal/90 px-4 py-8 sm:px-8 sm:py-10 md:px-16 md:py-12 relative z-10 w-full box-border">

                            <div className="flex flex-nowrap items-end gap-x-2 sm:gap-x-3 w-full">
                                <span className="pb-1 shrink-0 whitespace-nowrap">Nama saya</span>
                                <div className="relative inline-block group border-b border-pine-teal/30 focus-within:border-pine-teal transition-colors flex-grow min-w-[40px] md:max-w-[300px]">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onMouseEnter={() => setIsHoveringField(true)}
                                        onMouseLeave={() => setIsHoveringField(false)}
                                        placeholder="Jane Doe"
                                        required
                                        className="w-full bg-transparent outline-none text-center text-pine-teal font-normal pb-0.5 placeholder-pine-teal/20 text-base md:text-lg tracking-tight relative z-10 cursor-none min-w-0"
                                    />
                                    <span className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-colors z-20 ${formData.name ? 'bg-blush-pop' : 'bg-transparent'}`}></span>
                                </div>
                                <span className="pb-1 shrink-0 whitespace-nowrap">dari</span>
                                <div className="relative inline-block group border-b border-pine-teal/30 focus-within:border-pine-teal transition-colors flex-grow min-w-[40px] md:max-w-[250px]">
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        onMouseEnter={() => setIsHoveringField(true)}
                                        onMouseLeave={() => setIsHoveringField(false)}
                                        placeholder="Jakarta"
                                        required
                                        className="w-full bg-transparent outline-none text-center text-pine-teal font-normal pb-0.5 placeholder-pine-teal/20 text-base md:text-lg tracking-tight relative z-10 cursor-none min-w-0"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-nowrap items-end gap-x-2 sm:gap-x-4 w-full">
                                <span className="pb-1 shrink-0 whitespace-nowrap">bisa dihubungi di</span>
                                <div className="relative inline-block group border-b border-pine-teal/30 focus-within:border-pine-teal transition-colors flex-grow min-w-[50px] md:max-w-[320px]">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onMouseEnter={() => setIsHoveringField(true)}
                                        onMouseLeave={() => setIsHoveringField(false)}
                                        placeholder="jane@email.com"
                                        required
                                        className="w-full bg-transparent outline-none text-center text-pine-teal font-normal pb-0.5 placeholder-pine-teal/20 text-base md:text-lg tracking-tight relative z-10 cursor-none min-w-0"
                                    />
                                    {formData.email && !formData.email.includes('@') && (
                                        <span className="absolute -bottom-5 left-0 text-[9px] sm:text-[10px] font-geometric font-bold tracking-widest text-[#FF4000] uppercase whitespace-nowrap translate-y-2">
                                            Format email tidak valid.
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-nowrap items-end gap-x-2 sm:gap-x-3 w-full">
                                <span className="pb-1 shrink-0 whitespace-nowrap">Saya ingin</span>
                                <div className="relative inline-block group border-b border-pine-teal/30 focus-within:border-pine-teal transition-colors flex-grow min-w-[50px]">
                                    <input
                                        type="text"
                                        name="intent"
                                        value={formData.intent}
                                        onChange={handleChange}
                                        onMouseEnter={() => setIsHoveringField(true)}
                                        onMouseLeave={() => setIsHoveringField(false)}
                                        placeholder={intentPlaceholder}
                                        required
                                        className="w-full bg-transparent outline-none text-center text-pine-teal font-normal pb-0.5 placeholder-pine-teal/40 text-base md:text-lg tracking-tight relative z-10 placeholder:opacity-50 cursor-none min-w-0"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blush-pop text-pine-teal text-xs font-geometric tracking-[0.2em] font-bold uppercase py-4 px-8 rounded hover:shadow-[0_8px_20px_rgba(21,34,27,0.15)] flex items-center justify-center gap-3 relative overflow-hidden group w-full sm:w-auto transition-all duration-500 ease-out"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-pine-teal -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-left"></span>
                                    <span className="relative z-10 group-hover:text-floral-white transition-colors duration-400">Kirim Pesan</span>
                                    <svg className="w-5 h-5 relative z-10 group-hover:text-floral-white transition-colors duration-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                                        <line x1="16" y1="8" x2="2" y2="22"></line>
                                        <line x1="17.5" y1="15" x2="9" y2="15"></line>
                                    </svg>
                                </button>
                            </div>

                        </form>

                    </div>
                </div>

            </div>
        </div>
    );
}
