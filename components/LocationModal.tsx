"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import Image from "next/image";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    label: string;
    description?: string;
    images: string[]; // Array of 4 image URLs
  } | null;
}

export default function LocationModal({
  isOpen,
  onClose,
  data,
}: LocationModalProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isOpen && galleryRef.current) {
      // GSAP stagger animation for gallery images
      const ctx = gsap.context(() => {
        // Header animation
        gsap.fromTo(
          headerRef.current,
          { y: 40, opacity: 0, rotateX: -15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.1,
          },
        );

        // Images stagger with sophisticated easing
        gsap.fromTo(
          imageRefs.current,
          {
            y: 60,
            opacity: 0,
            scale: 0.9,
            rotateY: -10,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2,
          },
        );

        // Content animation
        gsap.fromTo(
          contentRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.6,
          },
        );
      }, galleryRef);

      return () => ctx.revert();
    }
  }, [isOpen]);

  // Close on Escape key & prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!data) return null;

  // Default content if not provided
  const description =
    data.description ||
    `Bergabunglah dengan komunitas di ${data.label} untuk berbagi cerita dan dukungan. Kami menciptakan ruang aman untuk kesehatan mental yang lebih baik.`;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Backdrop with sophisticated blur */}
          <motion.div
            className="absolute inset-0 bg-pine-teal/60 backdrop-blur-2xl"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(32px)" }}
            exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.5 }}
          >
            {/* Animated grain texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
          </motion.div>

          {/* Modal Content */}
          <motion.div
            ref={galleryRef}
            className="relative w-full max-w-6xl bg-floral-white/95 backdrop-blur-md rounded-[2.5rem] shadow-[0_50px_120px_rgba(21,34,27,0.4)] overflow-hidden border border-pine-teal/10"
            initial={{ scale: 0.88, y: 50, opacity: 0, rotateX: 10 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.92, y: 30, opacity: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.19, 1, 0.22, 1],
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Decorative top bar gradient */}
            <div className="h-1.5 bg-gradient-to-r from-pearl-aqua via-blush-pop to-canary-yellow" />

            {/* Close Button - Sophisticated design */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-pine-teal/5 backdrop-blur-sm hover:bg-pine-teal/10 border border-pine-teal/20 flex items-center justify-center transition-all duration-500 group hover:rotate-90 hover:scale-110 hover:border-blush-pop/40"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5 text-pine-teal group-hover:text-blush-pop transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="p-6 md:p-10 lg:p-12 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-pine-teal/20 scrollbar-track-transparent">
              {/* Header Section with Awwwards-style animation */}
              <div
                ref={headerRef}
                className="mb-8 md:mb-12 space-y-3"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blush-pop"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-xs md:text-sm font-geometric tracking-[0.3em] uppercase text-pine-teal/60 font-medium">
                    Komunitas Global
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-tt-commons font-light text-pine-teal leading-[0.95] tracking-tight">
                  {data.label}
                </h2>
              </div>

              {/* Gallery Grid - Aesthetic 4-image layout */}
              <div className="grid grid-cols-4 grid-rows-2 gap-3 md:gap-4 mb-8 md:mb-12 h-[300px] md:h-[400px]">
                {/* Large featured image (spans 2 cols, 2 rows) */}
                <motion.div
                  ref={(el) => {
                    imageRefs.current[0] = el;
                  }}
                  className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group bg-gradient-to-br from-pearl-aqua/20 to-blush-pop/20"
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={data.images[0]}
                    alt={`${data.label} view 1`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine-teal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Corner accent */}
                  <div className="absolute top-3 left-3 w-16 h-16 border-l-2 border-t-2 border-white/40 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                {/* Top right image */}
                <motion.div
                  ref={(el) => {
                    imageRefs.current[1] = el;
                  }}
                  className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden group bg-gradient-to-br from-canary-yellow/20 to-pearl-aqua/20"
                  whileHover={{ scale: 1.03, zIndex: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={data.images[1]}
                    alt={`${data.label} view 2`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-pine-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                {/* Bottom right - split into 2 smaller images */}
                <motion.div
                  ref={(el) => {
                    imageRefs.current[2] = el;
                  }}
                  className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group bg-gradient-to-br from-blush-pop/20 to-canary-yellow/20"
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={data.images[2]}
                    alt={`${data.label} view 3`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-blush-pop/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>

                <motion.div
                  ref={(el) => {
                    imageRefs.current[3] = el;
                  }}
                  className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group bg-gradient-to-br from-pearl-aqua/20 to-pine-teal/20"
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={data.images[3]}
                    alt={`${data.label} view 4`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-pearl-aqua/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </div>

              {/* Content Section */}
              <div ref={contentRef} className="space-y-6">
                <p className="text-base md:text-lg lg:text-xl font-geometric text-pine-teal/80 leading-relaxed max-w-3xl">
                  {description}
                </p>

                {/* Stats Cards - Awwwards style */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4">
                  <motion.div
                    className="bg-pearl-aqua/10 rounded-2xl p-4 md:p-6 border border-pearl-aqua/20 hover:border-pearl-aqua/50 hover:bg-pearl-aqua/15 transition-all duration-500 group cursor-pointer"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-2xl md:text-3xl lg:text-4xl font-tt-commons font-light text-pine-teal mb-1 group-hover:scale-110 transition-transform duration-300 origin-left">
                      250+
                    </div>
                    <div className="text-xs md:text-sm font-geometric text-pine-teal/60 tracking-wide">
                      Anggota Aktif
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-blush-pop/10 rounded-2xl p-4 md:p-6 border border-blush-pop/20 hover:border-blush-pop/50 hover:bg-blush-pop/15 transition-all duration-500 group cursor-pointer"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    <div className="text-2xl md:text-3xl lg:text-4xl font-tt-commons font-light text-pine-teal mb-1 group-hover:scale-110 transition-transform duration-300 origin-left">
                      80+
                    </div>
                    <div className="text-xs md:text-sm font-geometric text-pine-teal/60 tracking-wide">
                      Events/Tahun
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-canary-yellow/10 rounded-2xl p-4 md:p-6 border border-canary-yellow/30 hover:border-canary-yellow/60 hover:bg-canary-yellow/15 transition-all duration-500 group cursor-pointer"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="text-2xl md:text-3xl lg:text-4xl font-tt-commons font-light text-pine-teal mb-1 group-hover:scale-110 transition-transform duration-300 origin-left">
                      24/7
                    </div>
                    <div className="text-xs md:text-sm font-geometric text-pine-teal/60 tracking-wide">
                      Dukungan
                    </div>
                  </motion.div>
                </div>

                {/* CTA Button - Hero style */}
                <div className="pt-6 flex flex-col sm:flex-row gap-3">
                  <motion.button
                    className="flex-1 bg-blush-pop hover:bg-pine-teal text-pine-teal hover:text-floral-white px-6 md:px-8 py-3 md:py-4 rounded-full font-tt-commons font-bold text-sm md:text-base tracking-wide transition-colors duration-500 ease-out shadow-lg hover:shadow-[0_20px_60px_rgba(255,171,210,0.4)] flex items-center justify-center gap-3 group relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Bergabung Sekarang</span>
                    <svg
                      className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  </motion.button>

                  <motion.button
                    className="flex-1 bg-pine-teal/5 hover:bg-pine-teal/10 text-pine-teal px-6 md:px-8 py-3 md:py-4 rounded-full font-tt-commons font-medium text-sm md:text-base tracking-wide border border-pine-teal/20 hover:border-pine-teal/40 transition-all duration-500 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Pelajari Lebih Lanjut</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Bottom decorative bar */}
            <div className="h-1 bg-gradient-to-r from-pearl-aqua via-blush-pop to-canary-yellow opacity-40" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
