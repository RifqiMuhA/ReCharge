"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import CursorTrail from "@/components/ui/cursor-trail";

import headingImg from "@/components/photos/home/landing/heading.png";
import org1 from "@/components/photos/home/landing/org-1.png";
import org2 from "@/components/photos/home/landing/org-2.png";
import org3 from "@/components/photos/home/landing/org-3.png";
import org4 from "@/components/photos/home/landing/org-4.png";
import chat1 from "@/components/photos/home/landing/chat-1.png";
import chat2 from "@/components/photos/home/landing/chat-2.png";
import chat3 from "@/components/photos/home/landing/chat-3.png";
import chat4 from "@/components/photos/home/landing/chat-4.png";
import hias1 from "@/components/photos/home/landing/hias-1.png";
import bunga2 from "@/components/photos/home/landing/bunga-2.png";
import hiasA from "@/components/photos/home/landing/hias- (1).png";
import hiasB from "@/components/photos/home/landing/hias- (2).png";
import hiasC from "@/components/photos/home/landing/hias- (3).png";
import hiasD from "@/components/photos/home/landing/hias- (4).png";
import hiasE from "@/components/photos/home/landing/hias-2.png";

const people = [
  {
    id: 0,
    img: org1,
    chat: chat1,
    size: "clamp(90px, 16vw, 220px)",
    chatClass:
      "absolute -top-[25%] right-[-120%] md:-top-[10%] md:right-[-60%] w-[120px] md:w-[170px]",
  },
  {
    id: 1,
    img: org2,
    chat: chat2,
    size: "clamp(110px, 20vw, 275px)",
    chatClass:
      "absolute -top-[20%] right-[-95%] md:-top-[7%] md:right-[-40%] w-[130px] md:w-[190px]",
  },
  {
    id: 2,
    img: org3,
    chat: chat3,
    size: "clamp(120px, 20vw, 313px)",
    offsetY: "clamp(20px, 4vw, 50px)",
    chatClass:
      "absolute -top-[25%] right-[-75%] md:-top-[10%] md:right-[-30%] w-[130px] md:w-[190px]",
  },
  {
    id: 3,
    img: org4,
    chat: chat4,
    size: "clamp(110px, 20vw, 275px)",
    chatClass:
      "absolute -top-[25%] right-[-40%] md:-top-[5%] md:right-[-23%] w-[90px] md:w-[120px]",
  },
];

export default function PreHeroSection() {
  const [step, setStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Delay the appearance of the first person by expanding the first threshold.
    // Gives time for the title and decorations to be admired while user scrolls the first bit.
    if (latest < 0.20) setStep(-1);
    else if (latest < 0.32) setStep(0);
    else if (latest < 0.44) setStep(1);
    else if (latest < 0.56) setStep(2);
    else if (latest < 0.68) setStep(3);
    else setStep(4);
  });

  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const yShift = useTransform(scrollYProgress, [0.75, 1], ["0%", "8%"]);
  const borderRadius = useTransform(scrollYProgress, [0.75, 1], [0, 60]);

  return (
    <section
      ref={containerRef}
      className="relative bg-pine-teal w-full"
      style={{ height: "420vh" }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y: yShift,
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        }}
        className="sticky top-0 h-screen w-full bg-floral-white overflow-hidden flex flex-col shadow-2xl origin-top"
      >
        <CursorTrail size={180} blur={40} />

        {/* ── hias1 — bunga+kotak hijau, pojok kanan atas ── */}
        <div className="absolute right-[1%] md:right-[20%] top-[4%] md:top-[10%] z-[6] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.6, type: "spring" }}
          >
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-[50px] md:w-[72px]"
            >
              <Image src={hias1} alt="" className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── hiasA — bintang 4 sudut, kiri sejajar baris 1 heading ── */}
        <div className="absolute left-[6%] md:left-[8%] top-[30%] md:top-[28%] z-[7] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.75, rotate: -18 }}
            whileInView={{ opacity: 0.9, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="w-[52px] md:w-[78px]"
          >
            <motion.div
              animate={{ rotate: [0, 15, 0], y: [0, -6, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src={hiasA} alt="" className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── hiasB — bunga 8 kelopak, kiri atas (di atas subtitle) ── */}
        <div className="absolute left-[26%] md:left-[30%] top-[6%] md:top-[5%] z-[7] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.72, rotate: 14 }}
            whileInView={{ opacity: 0.85, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 1.4 }}
            className="w-[24px] md:w-[36px]"
          >
            <motion.div
              animate={{ rotate: [0, 20, 0], y: [0, -4, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src={hiasB} alt="" className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── hiasB ke-2 — bunga 8 kelopak, tengah atas ── */}
        <div className="absolute left-[54%] md:left-[56%] top-[5%] md:top-[4%] z-[7] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.72 }}
            whileInView={{ opacity: 0.85, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 2.0 }}
            className="w-[18px] md:w-[26px]"
          >
            <motion.div
              animate={{ rotate: [0, -20, 0], y: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src={hiasB} alt="" className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── hiasC — setengah lingkaran, kanan bawah ── */}
        <div className="absolute right-[6%] md:right-[35%] top-[38%] md:top-[36%] z-[7] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.88, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 2.6 }}
            className="w-[44px] md:w-[64px]"
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src={hiasC} alt="" className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── hiasD — diamond, kiri bawah heading ── */}
        <div className="absolute left-[16%] md:left-[20%] top-[56%] md:top-[48%] z-[7] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.72, rotate: -14 }}
            whileInView={{ opacity: 0.8, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 2.2 }}
            className="w-[24px] md:w-[36px]"
          >
            <motion.div
              animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src={hiasD} alt="" className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── hias2 — bunga spike besar, kanan sejajar heading ── */}
        <div className="absolute right-[2%] md:right-[3%] top-[28%] md:top-[30%] z-[7] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            whileInView={{ opacity: 0.75, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 2.4 }}
            className="w-[56px] md:w-[84px]"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1], rotate: [0, 8, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src={hiasE} alt="" className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Top: subtitle + heading image ──── */}
        <div className="w-full max-w-5xl mx-auto px-6 pt-20 md:pt-32 flex flex-col items-center flex-shrink-0 relative z-[2]">
          {/* bunga-2 (tidak berubah) */}
          <div className="absolute left-[10%] md:left-[16%] top-[20%] md:top-[18%] z-[7] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: 8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 1.8, type: "spring" }}
              className="w-[34px] md:w-[50px]"
            >
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, -4, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src={bunga2} alt="" className="w-full h-auto" />
              </motion.div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative z-[20] font-tt-commons text-pine-teal/70 text-sm md:text-base text-center mb-4 md:mb-6"
          >
            Kamu mungkin sudah burnout — tanpa menyadarinya
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative z-[20] w-full px-4 origin-center"
            style={{ transform: "scale(1.5)" }}
          >
            <Image
              src={headingImg}
              alt="Tubuh dan pikiranmu sudah lama mengirim sinyal"
              className="w-full h-auto object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* ── Bottom: characters row ──────────── */}
        <div className="flex-1 w-full flex items-end justify-center overflow-visible">
          <div
            className="w-full flex items-end justify-center"
            style={{ gap: "clamp(24px, 5vw, 80px)" }}
          >
            {people.map((person) => {
              const showPerson = step >= person.id;
              const showChat = step === person.id;

              return (
                <div
                  key={person.id}
                  className="relative flex-shrink-0 flex justify-center items-end"
                  style={{ width: person.size, transform: person.offsetY ? `translateY(${person.offsetY})` : undefined }}
                >
                  <div className="relative w-full" style={{ visibility: showPerson ? "visible" : "hidden" }}>
                    <AnimatePresence>
                      {showPerson && (
                        <motion.div
                          initial={{ opacity: 0, y: 120 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 80,
                            damping: 18,
                            mass: 1.1,
                          }}
                          className="relative w-full"
                        >
                          <AnimatePresence>
                            {showChat && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.4, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.7, y: -8 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 180,
                                  damping: 18,
                                  delay: 0.3,
                                }}
                                className={`${person.chatClass} z-20 pointer-events-none`}
                              >
                                <Image
                                  src={person.chat}
                                  alt="Chat bubble"
                                  className="w-full h-auto object-contain drop-shadow-md"
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <Image
                            src={person.img}
                            alt={`Person ${person.id + 1}`}
                            className="w-full h-auto object-contain object-bottom pointer-events-none select-none"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}