"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

// ... (other imports)

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
import featherImg from "@/components/photos/contact/feather.webp";
import hands1Img from "@/components/photos/contact/hands1.webp";
import bird1Img from "@/components/photos/contact/bird_1.webp";
import bird2Img from "@/components/photos/contact/bird_2.webp";
import bird3Img from "@/components/photos/contact/bird_3.webp";
import birdLetter1Img from "@/components/photos/contact/bird_letter_1.webp";
import birdLetter2Img from "@/components/photos/contact/bird_letter_2.webp";
import birdLetter3Img from "@/components/photos/contact/bird_letter_3.webp";
import birdRantingImg from "@/components/photos/contact/bird_ranting.webp";
import sarangBurungImg from "@/components/photos/contact/sarang_burung.webp";
import WorldMap from "@/components/ui/world-map";
import MapLocationModal from "@/components/ui/map-location-modal";
import { motion } from "motion/react";

// We'll reuse birdLetter1Img as the standalone letter falling for now since there's no dedicated letter.webp
// Alternatively, we can use a basic UI element for the letter. Let's use a subtle div styled as a letter.

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_CARDS = [
    {
        name: "Instagram",
        handle: "@recharge_id",
        url: "https://instagram.com",
        rotation: "-rotate-6",
        offset: "translate-y-[10%] hover:-translate-y-4 lg:hover:-translate-y-10",
        bgColor: "bg-blush-pop",
        icon: (
            <svg className="w-8 h-8 sm:w-16 sm:h-16 text-pine-teal/80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
        )
    },
    {
        name: "X Space",
        handle: "@recharge_id",
        url: "https://twitter.com",
        rotation: "rotate-3",
        offset: "translate-y-[5%] hover:-translate-y-12 lg:hover:-translate-y-20 md:translate-y-[10%]",
        bgColor: "bg-pearl-aqua",
        icon: (
            <svg className="w-8 h-8 sm:w-16 sm:h-16 text-pine-teal/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961h-1.91z" />
            </svg>
        )
    },
    {
        name: "YouTube",
        handle: "ReCharge Indonesia",
        url: "https://youtube.com",
        rotation: "-rotate-2",
        offset: "translate-y-[5%] hover:-translate-y-6 lg:hover:-translate-y-12",
        bgColor: "bg-blush-pop",
        icon: (
            <svg className="w-8 h-8 sm:w-16 sm:h-16 text-pine-teal/80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
        )
    },
    {
        name: "TikTok",
        handle: "@recharge_id",
        url: "https://tiktok.com",
        rotation: "rotate-6",
        offset: "translate-y-[15%] hover:-translate-y-2 lg:hover:-translate-y-8 md:translate-y-[20%]",
        bgColor: "bg-pearl-aqua",
        icon: (
            <svg className="w-8 h-8 sm:w-16 sm:h-16 text-pine-teal/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.61-5.46-.02-.24-.02-.48-.02-.72.01-1.14.28-2.29.83-3.31 1.15-2.07 3.32-3.51 5.67-3.8 0 1.34.01 2.68.01 4.02-.69.06-1.35.32-1.87.82-.69.65-1.02 1.64-.81 2.58.21.92.83 1.72 1.69 2.11 1.05.47 2.34.39 3.29-.27.87-.58 1.4-1.57 1.44-2.61.03-3.08.01-6.16.02-9.24.01-3.67.01-7.34.02-11.01h3.94z" />
            </svg>
        )
    },
    {
        name: "WhatsApp",
        handle: "ReCharge Support",
        url: "https://wa.me/628123456789",
        rotation: "-rotate-4",
        offset: "translate-y-[20%] hover:-translate-y-4 lg:hover:-translate-y-8",
        bgColor: "bg-blush-pop",
        icon: (
            <svg className="w-8 h-8 sm:w-16 sm:h-16 text-pine-teal/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.48-8.45zm-8.475 18.068h-.005c-1.774 0-3.515-.471-5.04-1.365l-.361-.212-3.746.975.998-3.633-.234-.37A9.851 9.851 0 0 1 2.158 11.9c.002-5.448 4.453-9.888 9.932-9.888 2.651.001 5.143 1.026 7.014 2.887 1.87 1.861 2.903 4.336 2.902 6.965C22.004 17.3 17.55 21.737 12.045 21.517zM17.48 14.155c-.297-.148-1.758-.863-2.03-.96-.272-.099-.47-.148-.668.148-.198.297-.768.96-.94 1.158-.173.198-.346.222-.644.074-1.463-.733-2.582-1.458-3.606-2.901-.264-.37.311-.34.887-.938.099-.099.198-.222.247-.37.049-.148.025-.272-.025-.37-.049-.099-.668-1.595-.916-2.18-.241-.571-.486-.494-.668-.501-.173-.007-.371-.008-.57-.008s-.52.074-.792.37c-.272.297-1.04 1.006-1.04 2.455 0 1.449 1.064 2.85 1.213 3.048.148.198 2.055 3.197 4.976 4.409.697.29 1.24.464 1.666.594.698.22 1.332.189 1.834.114.562-.083 1.728-.698 1.975-1.378.247-.68.247-1.261.173-1.378-.074-.117-.272-.185-.569-.333z" />
            </svg>
        )
    }
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        email: "",
        intent: "",
    });

    const [intentPlaceholder, setIntentPlaceholder] = useState(
        "bercerita tentang...",
    );
    const intentsList = [
        "Bercerita tentang hari ini",
        "Mencari jati diri",
        "Explore kemampuan diri",
    ];
    const [coverText, setCoverText] = useState("");

    const paper1Ref = useRef<HTMLDivElement>(null);
    const paper2Ref = useRef<HTMLDivElement>(null);
    const mainPaperRef = useRef<HTMLDivElement>(null);
    const coverRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    // Bird Flight Refs
    const flightPathRef = useRef<HTMLDivElement>(null);
    const birdContainerRef = useRef<HTMLDivElement>(null);
    const birdFlightRef = useRef<HTMLDivElement>(null);
    const birdCageRef = useRef<HTMLDivElement>(null);
    const letterRef = useRef<HTMLDivElement>(null);

    // Text Refs
    const textKirimPesanRef = useRef<HTMLDivElement>(null);
    const textKeSemuaRef = useRef<HTMLDivElement>(null);
    const textPerasaanmuRef = useRef<HTMLDivElement>(null);
    const textBerhargaRef = useRef<HTMLDivElement>(null);

    const birdFramesNormalRef = useRef<(HTMLImageElement | null)[]>([]);
    const birdFramesLetterRef = useRef<(HTMLImageElement | null)[]>([]);
    const birdNormalContainerRef = useRef<HTMLDivElement>(null);
    const birdLetterContainerRef = useRef<HTMLDivElement>(null);
    const birdRantingRef = useRef<HTMLImageElement>(null);

    const [isHoveringField, setIsHoveringField] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // Modal state
    const [activeModal, setActiveModal] = useState<any>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            // Initial stacked state
            gsap.set([paper1Ref.current, paper2Ref.current, mainPaperRef.current], {
                y: 60,
                opacity: 0,
                rotationZ: 0,
                x: 0,
                transformOrigin: "bottom left",
            });

            gsap.set(coverRef.current, {
                y: 60,
                opacity: 1, // Start fully visible
                transformOrigin: "center center",
            });

            // Animate forming the scattered papers like opening a letter
            tl.to([mainPaperRef.current, coverRef.current], {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
            })
                .to(
                    paper1Ref.current,
                    {
                        opacity: 1,
                        rotationZ: -4,
                        x: -12,
                        y: -4,
                        duration: 1,
                        ease: "back.out(1.4)",
                    },
                    "-=0.9",
                )
                .to(
                    paper2Ref.current,
                    {
                        opacity: 0.9,
                        rotationZ: 4,
                        x: 10,
                        y: 8,
                        duration: 1,
                        ease: "back.out(1.4)",
                    },
                    "-=0.9",
                )
                // Cover slides UP smoothly
                .to(
                    coverRef.current,
                    {
                        yPercent: -105,
                        duration: 1.2,
                        ease: "power2.inOut",
                    },
                    "+=0.6",
                )
                // Push to back (behind paper1 which is -z-20)
                .set(coverRef.current, { zIndex: -30 })
                // Drop down straight perfectly completely hidden
                .to(coverRef.current, {
                    yPercent: 0,
                    y: 0,
                    x: 0,
                    rotationZ: 0,
                    duration: 1.2,
                    ease: "power2.out",
                });

            // --- ADVANCED BIRD SCROLLYTELLING ANIMATION ---
            if (flightPathRef.current && birdContainerRef.current) {
                // Pin the main container for the entire animation duration
                ScrollTrigger.create({
                    trigger: birdContainerRef.current,
                    start: "center center",
                    end: "+=3500", // Long scroll distance for all phases
                    pin: true,
                    pinSpacing: true,
                });

                // Master Timeline tied to scroll
                const masterTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: birdContainerRef.current,
                        start: "center center",
                        end: "+=3500",
                        scrub: 1,
                    },
                });

                // Phase 1: Letter falls, Texts appear. Bird is initially static (frame 1)
                masterTl
                    .addLabel("phase1")
                    .fromTo(
                        letterRef.current,
                        { y: "-80vh", opacity: 0, rotationZ: -20 },
                        {
                            y: "15vh",
                            opacity: 1,
                            rotationZ: 0,
                            duration: 2,
                            ease: "power2.out",
                        },
                        "phase1",
                    ) // falls closer to bird
                    .fromTo(
                        textKirimPesanRef.current,
                        { x: -50, opacity: 0 },
                        { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
                        "phase1+=0.5",
                    )
                    .fromTo(
                        textKeSemuaRef.current,
                        { x: 50, opacity: 0 },
                        { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
                        "phase1+=0.5",
                    );

                // Phase 2: Letter reaches bird -> Bird changes to holding letter. NO flying yet.
                masterTl
                    .addLabel("phase2", "+=0.3")
                    // The letter disappears as it "enters" the bird's beak
                    .to(letterRef.current, { opacity: 0, duration: 0.1 }, "phase2")
                    // Switch static bird to bird with letter
                    .to(
                        birdNormalContainerRef.current,
                        { opacity: 0, duration: 0.1 },
                        "phase2",
                    )
                    .to(
                        birdLetterContainerRef.current,
                        { opacity: 1, duration: 0.1 },
                        "phase2",
                    );

                // Phase 2.5: Cage hides, texts hide, bird starts flapping and liftoff.
                masterTl
                    .addLabel("phase2_5", "+=1") // Wait a moment before flying
                    .to(
                        [
                            birdCageRef.current,
                            textKirimPesanRef.current,
                            textKeSemuaRef.current,
                        ],
                        { opacity: 0, duration: 1.5, ease: "power2.inOut" },
                        "phase2_5",
                    )
                    // Initiate "flying" by moving up slightly (omitting scale to prevent GSAP matrix conflicts)
                    .to(
                        birdFlightRef.current,
                        { y: "-5vh", duration: 2, ease: "power1.inOut" },
                        "phase2_5",
                    );

                // Phase 3: "Perasaanmu" and "Berharga" Awwwards style text animation
                masterTl
                    .addLabel("phase3", "+=0.5")
                    .fromTo(
                        textPerasaanmuRef.current,
                        { y: 50, opacity: 0, rotationX: -90 },
                        {
                            y: 0,
                            opacity: 1,
                            rotationX: 0,
                            transformOrigin: "bottom center",
                            duration: 1.5,
                            ease: "back.out(1.7)",
                        },
                        "phase3",
                    )
                    .fromTo(
                        textBerhargaRef.current,
                        { y: 50, opacity: 0, rotationX: -90 },
                        {
                            y: 0,
                            opacity: 1,
                            rotationX: 0,
                            transformOrigin: "bottom center",
                            duration: 1.5,
                            ease: "back.out(1.7)",
                        },
                        "phase3+=0.3",
                    )
                    // Let them stay a bit, then fade out
                    .to(
                        [textPerasaanmuRef.current, textBerhargaRef.current],
                        { y: -50, opacity: 0, duration: 1.5, ease: "power2.in" },
                        "+=2",
                    ); // Stay longer

                // Phase 4: Bird lands on ranting.
                masterTl
                    .addLabel("phase4", "+=0.5")
                    // Instantly hide the flying container
                    .to(birdFlightRef.current, { opacity: 0, duration: 0.01 }, "phase4")
                    // Instantly show the landed bird without scaling/fading animation.
                    // Scale 1.2 (slightly smaller), scaleX -1.2 (FLIPPED to the left side)
                    .fromTo(
                        birdRantingRef.current,
                        { opacity: 0, scaleY: 1.2, scaleX: -1.2 },
                        { opacity: 1, scaleY: 1.2, scaleX: -1.2, duration: 0.01 },
                        "phase4+=0.01",
                    );

                // Continuous Flying Sprite Loops (We only loop the letter frames now)
                // We let it play infinitely. Since it's inside birdLetterContainerRef, it stays hidden during Phase 1.
                // Since birdFlightRef goes opacity 0 in Phase 4, it stays hidden in Phase 4.
                const flapTl = gsap.timeline({ repeat: -1 });
                flapTl
                    .to(
                        birdFramesLetterRef.current[0],
                        { opacity: 0, duration: 0 },
                        "+=0.15",
                    )
                    .to(birdFramesLetterRef.current[1], { opacity: 1, duration: 0 }, "<")
                    .to(
                        birdFramesLetterRef.current[1],
                        { opacity: 0, duration: 0 },
                        "+=0.15",
                    )
                    .to(birdFramesLetterRef.current[2], { opacity: 1, duration: 0 }, "<")
                    .to(
                        birdFramesLetterRef.current[2],
                        { opacity: 0, duration: 0 },
                        "+=0.15",
                    )
                    .to(birdFramesLetterRef.current[0], { opacity: 1, duration: 0 }, "<");
            }
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
                    overwrite: "auto",
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
            gsap.to(cursorRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: "back.out(1.2)",
                overwrite: "auto",
            });
        } else {
            gsap.to(cursorRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.15,
                ease: "power2.out",
                overwrite: "auto",
            });
        }
    }, [isHoveringField]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setHasSubmitted(true);

        // Ensure required fields are manually checked if we bypass native validation
        if (
            !formData.name ||
            !formData.email ||
            !formData.location ||
            !formData.intent
        ) {
            // we can just return or show custom error, but for now we just return to avoid standard prompts
            return;
        }

        // Scroll to the bird animation section smoothly with slower custom duration via GSAP
        if (flightPathRef.current) {
            gsap.to(window, {
                duration: 2.5, // 2.5 seconds = slower smooth scroll
                scrollTo: { y: flightPathRef.current, offsetY: 0 },
                ease: "power2.inOut",
            });
        }
    };

    const handleDotClick = (location: any) => {
        if (!location) return;

        setActiveModal({
            label: location.label,
            header:
                location.label === "Jakarta"
                    ? "Pusat Komunitas ReCharge"
                    : location.label === "Tokyo"
                        ? "Work-Life Balance Initiative"
                        : location.label === "London"
                            ? "European Mental Health Hub"
                            : location.label === "Sydney"
                                ? "Outdoor Wellness Connect"
                                : location.label === "New York"
                                    ? "Burnout Recovery NYC"
                                    : "Expat Coping & Support",
            content: location.description || "",
            images: location.images || [],
            accessoryImage: hands1Img,
        });
    };

    return (
        <div className="w-full bg-[#F5F5ED] overflow-hidden relative cursor-auto box-border">
            {/* Custom Feather Tracker */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] transform -translate-x-[50%] -translate-y-[50%] opacity-0 mix-blend-multiply"
                style={{ scale: 0 }}
            >
                <Image
                    src={featherImg}
                    alt="feather"
                    fill
                    className="object-contain drop-shadow-sm"
                />
            </div>

            <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 md:p-8 lg:p-12">
                <div className="max-w-[85rem] w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
                    {/* Left Panel: Typography & Copy */}
                    <div className="w-full lg:w-4/12 flex flex-col gap-6 md:gap-8 lg:sticky lg:top-32 lg:px-0 px-4">
                        <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-geometric font-light leading-[1.05] tracking-tighter text-pine-teal">
                            Mari tulis bab baru untuk pulih bersama.
                        </h1>

                        <div className="flex flex-col gap-3 text-pine-teal text-md md:text-lg font-geometric tracking-tight leading-relaxed mt-2">
                            <p className="opacity-80">
                                <span className="text-blush-pop mr-1">(*)</span> Siap untuk
                                memulai perjalanan resiliensi Anda? <br />
                                Isi panel di samping atau kirim ke
                            </p>
                            <Link
                                href="mailto:halo@recharge.id"
                                className="font-bold text-lg border-b border-pine-teal pb-0.5 inline-table w-max hover:text-blush-pop hover:border-blush-pop transition-colors tracking-tight"
                            >
                                halo@recharge.id
                            </Link>
                            <p className="opacity-80">— kami selalu siap mendengar.</p>
                        </div>
                    </div>

                    {/* Right Panel: Mad Libs Interactive Form with Paper Layout */}
                    <div
                        className="w-full lg:w-8/12 relative mt-8 lg:mt-0 px-2 sm:px-4 lg:px-8"
                        style={{ perspective: "1500px" }}
                    >
                        {/* Layered Paper Base Effects */}
                        <div
                            ref={paper1Ref}
                            className="absolute inset-y-0 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 bg-white shadow-md rounded-sm border border-pine-teal/20 -z-20"
                        ></div>
                        <div
                            ref={paper2Ref}
                            className="absolute inset-y-0 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 bg-white/80 shadow-sm rounded-sm border border-pine-teal/30 -z-10"
                        ></div>

                        {/* The Cover that slides up and drops behind */}
                        <div
                            ref={coverRef}
                            className="absolute inset-y-0 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 bg-[#F5F5ED] shadow-2xl rounded-sm border border-pine-teal/20 z-50 flex flex-col md:flex-row items-center justify-center pointer-events-none overflow-hidden gap-6 px-10"
                        >
                            {/* Inner tint */}
                            <div className="absolute inset-0 bg-pine-teal/[0.03]"></div>

                            <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32">
                                <Image
                                    src={hands1Img}
                                    alt="hands pouring feelings"
                                    fill
                                    className="object-contain drop-shadow-sm"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-tt-commons-light text-pine-teal font-medium tracking-tight">
                                    {coverText}
                                    <span className="animate-blink font-light">|</span>
                                </h2>
                            </div>
                        </div>

                        {/* Main Paper Content */}
                        <div
                            ref={mainPaperRef}
                            className="bg-[#FAF9F6] shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-sm border border-pine-teal/30 relative transform-style-3d"
                        >
                            {/* Lines wrap inside so they don't break outside the rounded corners */}
                            <div className="absolute inset-0 overflow-hidden rounded-sm pointer-events-none z-0">
                                {/* Vertical ruled line margin (like notebook) */}
                                <div className="absolute top-0 bottom-0 left-6 md:left-12 w-[1px] bg-blush-pop/30 h-full"></div>
                                <div className="absolute top-0 bottom-0 left-7 md:left-13 w-[1px] bg-blush-pop/10 h-full"></div>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                noValidate
                                className="flex flex-col gap-y-7 text-base sm:text-xl md:text-2xl lg:text-3xl font-geometric font-light leading-relaxed text-pine-teal/90 px-4 py-8 sm:px-8 sm:py-10 md:px-16 md:py-12 relative z-10 w-full box-border"
                            >
                                <div className="flex flex-nowrap items-end gap-x-2 sm:gap-x-3 w-full">
                                    <span className="pb-1 shrink-0 whitespace-nowrap">
                                        Nama saya
                                    </span>
                                    <div
                                        className={`relative inline-block group border-b ${hasSubmitted && !formData.name ? "border-red-500" : "border-pine-teal/30 focus-within:border-pine-teal"} transition-colors flex-grow min-w-[40px] md:max-w-[300px]`}
                                    >
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
                                        <span
                                            className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-colors z-20 ${formData.name ? "bg-blush-pop" : "bg-transparent"}`}
                                        ></span>
                                        {hasSubmitted && !formData.name && (
                                            <span className="absolute -bottom-5 left-0 right-0 text-center text-[9px] sm:text-[10px] font-geometric font-bold tracking-widest text-red-500 uppercase whitespace-nowrap translate-y-2">
                                                Wajib Diisi
                                            </span>
                                        )}
                                    </div>
                                    <span className="pb-1 shrink-0 whitespace-nowrap">dari</span>
                                    <div
                                        className={`relative inline-block group border-b ${hasSubmitted && !formData.location ? "border-red-500" : "border-pine-teal/30 focus-within:border-pine-teal"} transition-colors flex-grow min-w-[40px] md:max-w-[250px]`}
                                    >
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
                                        {hasSubmitted && !formData.location && (
                                            <span className="absolute -bottom-5 left-0 right-0 text-center text-[9px] sm:text-[10px] font-geometric font-bold tracking-widest text-red-500 uppercase whitespace-nowrap translate-y-2">
                                                Wajib Diisi
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-nowrap items-end gap-x-2 sm:gap-x-4 w-full">
                                    <span className="pb-1 shrink-0 whitespace-nowrap">
                                        bisa dihubungi di
                                    </span>
                                    <div
                                        className={`relative inline-block group border-b ${hasSubmitted && (!formData.email || (formData.email && !formData.email.includes("@"))) ? "border-red-500" : "border-pine-teal/30 focus-within:border-pine-teal"} transition-colors flex-grow min-w-[50px] md:max-w-[320px]`}
                                    >
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
                                        {hasSubmitted && !formData.email && (
                                            <span className="absolute -bottom-5 left-0 right-0 text-center text-[9px] sm:text-[10px] font-geometric font-bold tracking-widest text-red-500 uppercase whitespace-nowrap translate-y-2">
                                                Wajib Diisi
                                            </span>
                                        )}
                                        {formData.email && !formData.email.includes("@") && (
                                            <span className="absolute -bottom-5 left-0 right-0 text-center text-[9px] sm:text-[10px] font-geometric font-bold tracking-widest text-red-500 uppercase whitespace-nowrap translate-y-2">
                                                Format email tidak valid.
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-nowrap items-end gap-x-2 sm:gap-x-3 w-full">
                                    <span className="pb-1 shrink-0 whitespace-nowrap">
                                        Saya ingin
                                    </span>
                                    <div
                                        className={`relative inline-block group border-b ${hasSubmitted && !formData.intent ? "border-red-500" : "border-pine-teal/30 focus-within:border-pine-teal"} transition-colors flex-grow min-w-[50px]`}
                                    >
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
                                        {hasSubmitted && !formData.intent && (
                                            <span className="absolute -bottom-5 left-0 right-0 text-center text-[9px] sm:text-[10px] font-geometric font-bold tracking-widest text-red-500 uppercase whitespace-nowrap translate-y-2">
                                                Wajib Diisi
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blush-pop text-pine-teal text-xs font-geometric tracking-[0.2em] font-bold uppercase py-4 px-8 rounded hover:shadow-[0_8px_20px_rgba(21,34,27,0.15)] flex items-center justify-center gap-3 relative overflow-hidden group w-full sm:w-auto transition-all duration-500 ease-out"
                                    >
                                        <span className="absolute inset-0 w-full h-full bg-pine-teal -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-left"></span>
                                        <span className="relative z-10 group-hover:text-floral-white transition-colors duration-400">
                                            Kirim Pesan
                                        </span>
                                        <svg
                                            className="w-5 h-5 relative z-10 group-hover:text-floral-white transition-colors duration-400"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
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

            {/* --- ADVANCED GSAP BIRD PLAYGROUND --- */}
            <div
                ref={flightPathRef}
                className="w-full relative bg-[#F5F5ED] overflow-hidden"
            >
                {/* Center pinned container */}
                <div
                    ref={birdContainerRef}
                    className="w-full h-[180px] md:h-[220px] flex flex-col items-center justify-center relative z-40"
                >
                    {/* Animated Texts Container */}
                    <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-50 overflow-hidden perspective-1000">
                        {/* Phase 1 Texts */}
                        <div
                            ref={textKirimPesanRef}
                            className="text-3xl sm:text-4xl md:text-6xl font-geometric text-pine-teal/80 absolute right-[62%] top-[40%] md:top-1/2 -translate-y-1/2 opacity-0 whitespace-nowrap text-right"
                        >
                            kirim pesan
                        </div>
                        <div
                            ref={textKeSemuaRef}
                            className="text-3xl sm:text-4xl md:text-6xl font-geometric text-pine-teal/80 absolute left-[62%] top-[40%] md:top-1/2 -translate-y-1/2 opacity-0 whitespace-nowrap"
                        >
                            kepada sesama
                        </div>

                        {/* Phase 3 Texts (Awwwards Style) */}
                        <div
                            ref={textPerasaanmuRef}
                            className="text-4xl sm:text-5xl md:text-8xl font-geometric font-bold text-blush-pop absolute right-[60%] top-[40%] md:top-1/2 -translate-y-1/2 opacity-0 whitespace-nowrap text-right"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            perasaan
                        </div>
                        <div
                            ref={textBerhargaRef}
                            className="text-4xl sm:text-5xl md:text-8xl font-geometric font-bold text-blush-pop absolute left-[60%] top-[40%] md:top-1/2 -translate-y-1/2 opacity-0 whitespace-nowrap"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            berharga
                        </div>
                    </div>

                    {/* Falling Letter */}
                    <div
                        ref={letterRef}
                        className="absolute z-40 w-10 h-6 bg-white border border-gray-200 shadow-md flex items-center justify-center rotate-12 opacity-0 top-[28%] -mt-10 mr-12"
                    >
                        {/* Simple CSS letter graphic */}
                        <div className="absolute top-0 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[12px] border-l-transparent border-r-transparent border-t-gray-100"></div>
                        <div className="w-3 h-3 rounded-full bg-red-400 absolute opacity-50"></div>
                    </div>

                    <div className="relative w-48 h-64 sm:w-56 sm:h-72 flex items-center justify-center">
                        <div
                            ref={birdCageRef}
                            className="absolute inset-0 z-10 translate-y-16"
                        >
                            <Image
                                src={sarangBurungImg}
                                alt="Sarang Burung"
                                fill
                                className="object-contain pointer-events-none"
                            />
                        </div>

                        {/* The Bird superimposed on the cage */}
                        <div
                            ref={birdFlightRef}
                            className="absolute w-28 h-28 sm:w-36 sm:h-36 z-30 translate-y-0"
                        >
                            {/* Phase 0 & 1 Container: Normal Bird */}
                            <div ref={birdNormalContainerRef} className="absolute inset-0">
                                <Image
                                    ref={(el) => {
                                        birdFramesNormalRef.current[0] = el;
                                    }}
                                    src={bird1Img}
                                    alt="Bird normal 1"
                                    fill
                                    className="object-contain pointer-events-none opacity-100 -scale-x-100"
                                />
                                <Image
                                    ref={(el) => {
                                        birdFramesNormalRef.current[1] = el;
                                    }}
                                    src={bird2Img}
                                    alt="Bird normal 2"
                                    fill
                                    className="object-contain pointer-events-none opacity-0 -scale-x-100"
                                />
                                <Image
                                    ref={(el) => {
                                        birdFramesNormalRef.current[2] = el;
                                    }}
                                    src={bird3Img}
                                    alt="Bird normal 3"
                                    fill
                                    className="object-contain pointer-events-none opacity-0 -scale-x-100"
                                />
                            </div>

                            {/* Phase 2 & 3 Container: Bird with Letter */}
                            <div
                                ref={birdLetterContainerRef}
                                className="absolute inset-0 opacity-0"
                            >
                                <Image
                                    ref={(el) => {
                                        birdFramesLetterRef.current[0] = el;
                                    }}
                                    src={birdLetter1Img}
                                    alt="Bird letter 1"
                                    fill
                                    className="object-contain pointer-events-none opacity-100 -scale-x-100"
                                />
                                <Image
                                    ref={(el) => {
                                        birdFramesLetterRef.current[1] = el;
                                    }}
                                    src={birdLetter2Img}
                                    alt="Bird letter 2"
                                    fill
                                    className="object-contain pointer-events-none opacity-0 -scale-x-100"
                                />
                                <Image
                                    ref={(el) => {
                                        birdFramesLetterRef.current[2] = el;
                                    }}
                                    src={birdLetter3Img}
                                    alt="Bird letter 3"
                                    fill
                                    className="object-contain pointer-events-none opacity-0 -scale-x-100"
                                />
                            </div>
                        </div>

                        {/* Phase 4: Landed on Ranting (Moved OUTSIDE birdFlightRef to isolate it from flight container opacity/transform) */}
                        <div className="absolute w-28 h-28 sm:w-36 sm:h-36 z-30 translate-y-0 pointer-events-none">
                            <Image
                                ref={birdRantingRef}
                                src={birdRantingImg}
                                alt="Bird ranting"
                                fill
                                className="object-contain pointer-events-none opacity-0"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* World Map Section (Replaces Images) */}
            <div className="w-full relative flex flex-col items-center justify-center pb-32 overflow-hidden bg-[#F5F5ED]">
                <div className="max-w-7xl mx-auto text-center px-4 md:px-8 z-10 w-full relative">
                    <h2 className="font-geometric font-bold text-4xl md:text-6xl lg:text-7xl text-pine-teal mb-6">
                        Gabung Komunitas
                    </h2>
                    <p className="text-base md:text-xl text-pine-teal/70 max-w-3xl mx-auto mb-16 font-tt-commons-light">
                        Kamu tidak sendirian, selalu ada orang baik di sekitar mu bahkan di
                        seluruh dunia yang saling peduli
                    </p>

                    {/* World Map Component */}
                    <div className="w-full max-w-5xl mx-auto opacity-90 relative z-20">
                        <WorldMap
                            lineColor="#8DDEDE"
                            onDotClick={handleDotClick}
                            dots={[
                                {
                                    start: {
                                        lat: -6.2088,
                                        lng: 106.8456,
                                        imageUrl:
                                            "https://images.unsplash.com/photo-1555899434-94d1368aa7af?q=80&w=400&h=400&fit=crop",
                                        label: "Jakarta",
                                        description:
                                            "Pusat komunitas ReCharge Indonesia. Kami telah membantu ribuan individu menemukan keseimbangan hidup melalui program mindfulness, konseling, dan support groups yang rutin diadakan setiap minggu.",
                                        images: [
                                            "https://images.unsplash.com/photo-1555899434-94d1368aa7af?q=80&w=800&h=800&fit=crop",
                                            "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?q=80&w=800&h=400&fit=crop",
                                            "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400&h=400&fit=crop",
                                            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=400&h=400&fit=crop",
                                        ],
                                    },
                                    end: {
                                        lat: 35.6762,
                                        lng: 139.6503,
                                        imageUrl:
                                            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&h=400&fit=crop",
                                        label: "Tokyo",
                                        description:
                                            "Komunitas Tokyo fokus pada work-life balance di tengah budaya kerja yang intens. Kami menyediakan workshop meditation, yoga, dan peer support yang disesuaikan dengan kebutuhan lokal.",
                                        images: [
                                            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&h=800&fit=crop",
                                            "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&h=400&fit=crop",
                                            "https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=400&h=400&fit=crop",
                                            "https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=400&h=400&fit=crop",
                                        ],
                                    },
                                },
                                {
                                    start: {
                                        lat: -6.2088,
                                        lng: 106.8456,
                                        imageUrl:
                                            "https://images.unsplash.com/photo-1555899434-94d1368aa7af?q=80&w=400&h=400&fit=crop",
                                        label: "Jakarta",
                                    },
                                    end: {
                                        lat: 51.5074,
                                        lng: -0.1278,
                                        imageUrl:
                                            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=400&h=400&fit=crop",
                                        label: "London",
                                        description:
                                            "Hub komunitas Eropa kami di London menawarkan layanan multikultural dengan profesional kesehatan mental bersertifikat. Bergabunglah dalam monthly meetups dan creative therapy sessions.",
                                        images: [
                                            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&h=800&fit=crop",
                                            "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=800&h=400&fit=crop",
                                            "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=400&h=400&fit=crop",
                                            "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=400&h=400&fit=crop",
                                        ],
                                    },
                                },
                                {
                                    start: {
                                        lat: -6.2088,
                                        lng: 106.8456,
                                        imageUrl:
                                            "https://images.unsplash.com/photo-1555899434-94d1368aa7af?q=80&w=400&h=400&fit=crop",
                                        label: "Jakarta",
                                    },
                                    end: {
                                        lat: -33.8688,
                                        lng: 151.2093,
                                        imageUrl:
                                            "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=400&h=400&fit=crop",
                                        label: "Sydney",
                                        description:
                                            "Sydney community champions outdoor wellness activities. Join us for beach meditation, nature walks, and wellness retreats yang menggabungkan kesehatan mental dengan keindahan alam Australia.",
                                        images: [
                                            "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&h=800&fit=crop",
                                            "https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?q=80&w=800&h=400&fit=crop",
                                            "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=400&h=400&fit=crop",
                                            "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=400&h=400&fit=crop",
                                        ],
                                    },
                                },
                                {
                                    start: {
                                        lat: -6.2088,
                                        lng: 106.8456,
                                        imageUrl:
                                            "https://images.unsplash.com/photo-1555899434-94d1368aa7af?q=80&w=400&h=400&fit=crop",
                                        label: "Jakarta",
                                    },
                                    end: {
                                        lat: 40.7128,
                                        lng: -74.006,
                                        imageUrl:
                                            "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=400&h=400&fit=crop",
                                        label: "New York",
                                        description:
                                            "Di jantung Manhattan, komunitas NYC kami menyediakan safe space untuk professional burnout recovery. Weekly sessions, networking events, dan access ke mental health resources terbaik.",
                                        images: [
                                            "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&h=800&fit=crop",
                                            "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=800&h=400&fit=crop",
                                            "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=400&h=400&fit=crop",
                                            "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=400&h=400&fit=crop",
                                        ],
                                    },
                                },
                                {
                                    start: {
                                        lat: -6.2088,
                                        lng: 106.8456,
                                        imageUrl:
                                            "https://images.unsplash.com/photo-1555899434-94d1368aa7af?q=80&w=400&h=400&fit=crop",
                                        label: "Jakarta",
                                    },
                                    end: {
                                        lat: 25.2048,
                                        lng: 55.2708,
                                        imageUrl:
                                            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400&h=400&fit=crop",
                                        label: "Dubai",
                                        description:
                                            "Komunitas Dubai melayani diverse expat community dengan bilingual support (English/Arabic). Kami fokus pada stress management dan cultural adjustment dalam lingkungan yang supportive.",
                                        images: [
                                            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&h=800&fit=crop",
                                            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&h=400&fit=crop",
                                            "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=400&h=400&fit=crop",
                                            "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=400&h=400&fit=crop",
                                        ],
                                    },
                                },
                            ]}
                        />
                    </div>
                </div>

                {/* Spacer to push content down and not overlap with map */}
                <div className="h-16 md:h-24 w-full"></div>

                {/* Hubungi Kami Section before Polaroids */}
                <div className="w-full flex flex-col items-center justify-center pointer-events-none z-10 px-4 mb-16 md:mb-24">
                    <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-geometric font-bold text-pine-teal mb-2 sm:mb-4 tracking-tight leading-none text-center">
                        Hubungi <span className="italic font-light">Kami</span>
                    </h2>
                    <div className="flex flex-col items-center gap-1 sm:gap-2">
                        <div className="bg-blush-pop text-pine-teal px-4 py-1 sm:px-6 sm:py-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-geometric tracking-wide transform -rotate-1 whitespace-nowrap shadow-md">
                            Looking Forward to
                        </div>
                        <div className="bg-pine-teal text-floral-white px-4 py-1 sm:px-6 sm:py-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-geometric tracking-wide transform ml-4 md:ml-8 rotate-1 whitespace-nowrap shadow-md">
                            Connect with You!
                        </div>
                    </div>
                </div>

                {/* Social Media Polaroids - Hiding at the bottom edge */}
                <div className="absolute -bottom-16 sm:-bottom-24 md:-bottom-32 left-0 w-full flex items-end justify-center z-0 pointer-events-none -space-x-6 sm:-space-x-12 md:-space-x-16 lg:-space-x-24">
                    {SOCIAL_CARDS.map((card, idx) => (
                        <a
                            key={idx}
                            href={card.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block relative transition-all duration-500 hover:z-50 pointer-events-auto ${card.rotation} ${card.offset} cursor-pointer hover:scale-105`}
                            style={{ zIndex: SOCIAL_CARDS.length - idx }}
                        >
                            <div className={`${card.bgColor} p-2 sm:p-3 md:p-4 pb-10 sm:pb-12 md:pb-16 lg:pb-20 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] rounded-sm border border-pine-teal/5 w-32 sm:w-44 md:w-60 lg:w-72 group`}>
                                <div className="relative w-full aspect-square bg-pine-teal/5 overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#FAF9F6] transition-colors z-10">
                                        {card.icon}
                                    </div>
                                </div>
                                <div className="absolute bottom-2 sm:bottom-3 md:bottom-5 lg:bottom-6 left-0 w-full text-center px-1">
                                    <span className="font-tt-commons text-[10px] sm:text-sm md:text-base tracking-wide text-pine-teal/80 group-hover:text-pine-teal transition-colors truncate block">
                                        {card.handle}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Location Modal */}
            {activeModal && (
                <MapLocationModal
                    data={activeModal}
                    onClose={() => setActiveModal(null)}
                />
            )}
        </div>
    );
}
