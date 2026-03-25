"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import gsap from "gsap";

export interface MapLocationData {
    label: string;
    header: string;
    content: string;
    images: string[]; // 4 image URLs
    accessoryImage?: string; // local static import (passed as src)
}

interface MapLocationModalProps {
    data: MapLocationData | null;
    onClose: () => void;
}

export default function MapLocationModal({ data, onClose }: MapLocationModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (data) {
            // Lock background scroll
            document.body.style.overflow = 'hidden';

            if (imageRefs.current.length > 0) {
                // Staggered image entrance with GSAP
                gsap.fromTo(
                    imageRefs.current.filter(Boolean),
                    { y: 60, opacity: 0, scale: 0.92, rotateZ: (i) => i % 2 === 0 ? -2 : 2 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotateZ: 0,
                        duration: 0.9,
                        stagger: 0.1,
                        ease: "power3.out",
                        delay: 0.2
                    }
                );

                if (textRef.current) {
                    gsap.fromTo(
                        textRef.current.children,
                        { y: 30, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            stagger: 0.12,
                            ease: "power3.out",
                            delay: 0.45
                        }
                    );
                }
            }
        } else {
            // Unlock background scroll
            document.body.style.overflow = '';
        }

        return () => {
            // Always cleanup on unmount
            document.body.style.overflow = '';
        };
    }, [data]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) onClose();
    };

    return (
        <AnimatePresence>
            {data && (
                <motion.div
                    ref={overlayRef}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ backgroundColor: "rgba(21, 34, 27, 0.75)", backdropFilter: "blur(12px)" }}
                    onClick={handleBackdropClick}
                >
                    {/* Modal Container - overflow-y-auto here, overflow-hidden on inner grid */}
                    <motion.div
                        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#F5F5ED] rounded-2xl"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
                        initial={{ scale: 0.88, y: 40, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.92, y: 20, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-blush-pop flex items-center justify-center transition-all duration-300 group hover:scale-105 active:scale-95 shadow-sm overflow-hidden"
                            aria-label="Close modal"
                        >
                            {/* Sliding pine-teal overlay */}
                            <span className="absolute inset-0 bg-pine-teal -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] origin-left rounded-full" />
                            <svg className="w-4 h-4 text-pine-teal group-hover:text-floral-white transition-colors duration-300 relative z-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
                            {/* Left: Images Grid */}
                            <div className="relative grid grid-cols-2 gap-2 p-3 md:p-5 bg-pine-teal/5">
                                {/* Large image (top-left, spans 2 rows on 2-col grid) */}
                                <div
                                    ref={el => { imageRefs.current[0] = el; }}
                                    className="col-span-2 relative h-36 md:h-52 rounded-xl overflow-hidden group"
                                    style={{ opacity: 0 }}
                                >
                                    {data.images[0] && (
                                        <img
                                            src={data.images[0]}
                                            alt={`${data.label} - Photo 1`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-pine-teal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                </div>

                                {/* Bottom images in a row */}
                                {[1, 2, 3].map((idx) => (
                                    <div
                                        key={idx}
                                        ref={el => { imageRefs.current[idx] = el; }}
                                        className={`relative rounded-xl overflow-hidden group ${idx === 3 ? 'hidden md:block md:col-span-2 h-24 md:h-28' : 'h-24 md:h-28'}`}
                                        style={{ opacity: 0 }}
                                    >
                                        {data.images[idx] && (
                                            <img
                                                src={data.images[idx]}
                                                alt={`${data.label} - Photo ${idx + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-pine-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                    </div>
                                ))}
                            </div>

                            {/* Right: Text Content */}
                            <div className="relative flex flex-col justify-center px-5 py-6 md:px-10 md:py-12 min-h-full">
                                {/* Aesthetic line divider */}
                                <div className="absolute top-0 left-0 h-full w-[1px] bg-pine-teal/10 hidden md:block" />
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-pine-teal/10 block md:hidden" />

                                <div ref={textRef} className="flex flex-col gap-3 md:gap-5 z-10">
                                    {/* City Badge */}
                                    <div style={{ opacity: 0 }}>
                                        <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-geometric font-bold tracking-[0.22em] uppercase bg-canary-yellow text-pine-teal px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md">
                                            <span className="w-1.5 h-1.5 rounded-full bg-pine-teal/60" />
                                            {data.label}
                                        </span>
                                    </div>

                                    {/* Header */}
                                    <div style={{ opacity: 0 }}>
                                        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-geometric font-bold text-pine-teal leading-tight">
                                            {data.header}
                                        </h2>
                                    </div>

                                    {/* Thin divider */}
                                    <div style={{ opacity: 0 }}>
                                        <div className="w-8 md:w-12 h-[2px] bg-blush-pop rounded-full" />
                                    </div>

                                    {/* Content */}
                                    <div style={{ opacity: 0 }}>
                                        <p className="text-sm md:text-lg font-tt-commons-light text-pine-teal/75 leading-relaxed">
                                            {data.content}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Accessory image positioned decoratively pinned to the bottom right of the container */}
                                {data.accessoryImage && (
                                    <div className="absolute bottom-2 right-2 md:bottom-6 md:right-6 w-16 h-16 md:w-24 md:h-24 opacity-25 pointer-events-none -rotate-6 z-0">
                                        <Image
                                            src={data.accessoryImage}
                                            alt="decoration"
                                            fill
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
