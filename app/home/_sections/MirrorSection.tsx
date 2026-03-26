'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/scroll-reveal';
import Image from 'next/image';
import scrollHpImg from '@/components/photos/home/scroll-hp.png';
import alarmImg from '@/components/photos/home/alarm.png';
import sleepImg from '@/components/photos/home/sleep.png';
import pialaImg from '@/components/photos/home/piala.png';

/* ──────────────────────────────────────────────
   Phase 1 Data: Scroll Reveal Kalimat
   ────────────────────────────────────────────── */
const phase1Texts = [
  "Kamu scroll tanpa tujuan selama 2 jam...",
  "...tapi masih ngerasa ada yang kurang.",
  "Kamu bilang 'bentar lagi' tapi nggak pernah berhenti.",
  "Rasanya kayak capek, tapi capek ngapain?",
  "Istirahat malah bikin guilty.",
  "Kamu nggak bisa ingat terakhir kali beneran seneng.",
  "Setiap achievement terasa nggak cukup.",
  "Dan kamu nggak tahu ini namanya apa."
];

/* ──────────────────────────────────────────────
   Phase 2 Data: Split Screen Content
   ────────────────────────────────────────────── */
const socialPosts = [
  { text: "Living my best life ✨", author: "@kamu", time: "2h ago" },
  { text: "Grind never stops 💪", author: "@kamu", time: "5h ago" },
  { text: "Grateful everyday 🙏", author: "@kamu", time: "1d ago" },
  { text: "No days off 🔥", author: "@kamu", time: "2d ago" },
];

const trueFeelings = [
  "Nggak ingat terakhir kali ngerasa seneng beneran.",
];

/* ──────────────────────────────────────────────
   Phase 3 Data: Final Feelings
   ────────────────────────────────────────────── */
const finalFeelings = [
  "Udah 3 minggu nggak bisa tidur nyenyak.",
  "Setiap pagi ngerasa berat banget.",
  "Tubuhku minta berhenti tapi aku takut ketinggalan."
];

export default function MirrorSection() {
  return (
    <section className="relative w-full bg-pine-teal text-floral-white overflow-hidden font-tt-commons">
      {/* Background Orbs for moody aesthetic using the brand palette */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #FFABD2 0%, transparent 70%)',
            top: '20%',
            left: '-10%',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #8DDEDE 0%, transparent 70%)',
            bottom: '10%',
            right: '-10%',
          }}
        />
      </div>

      {/* =========================================
          PHASE 1: Scroll Reveal Kalimat
          ========================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-24 pb-16">
        {phase1Texts.map((text, i) => (
          <div key={i} className="relative min-h-[50vh] flex flex-col items-center justify-center text-center">

            {i === 0 && (
              <div
                className="absolute left-1/2 top-1/2 z-0 pointer-events-none
                           w-[105px] sm:w-[130px] md:w-[145px] lg:w-[190px]"
                style={{ transform: 'translateX(calc(50.5vw - 100%)) translateY(-50%) rotate(-23deg)' }}
                aria-hidden="true"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    opacity: { duration: 0.8 },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <Image
                    src={scrollHpImg}
                    alt="Decorative Phone"
                    className="w-full h-auto object-contain drop-shadow-2xl opacity-90"
                  />
                </motion.div>
              </div>
            )}

            {i === 2 && (
              <div
                className="absolute left-[-5%] sm:left-[0%] md:left-[-3%] lg:left-[-13%] top-[37%] md:top-[27%] -translate-y-1/2 z-0 pointer-events-none
                           w-[110px] sm:w-[140px] md:w-[160px] lg:w-[210px]"
                style={{ transform: 'rotate(-6deg)' }}
                aria-hidden="true"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    opacity: { duration: 0.8 },
                    y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <Image
                    src={alarmImg}
                    alt="Decorative Alarm"
                    className="w-full h-auto object-contain drop-shadow-xl opacity-90"
                  />
                </motion.div>
              </div>
            )}
            {i === 4 && (
              <div
                className="absolute left-1/2 top-1/2 z-0 pointer-events-none
                           w-[170px] sm:w-[195px] md:w-[300px] lg:w-[500px]"
                style={{ transform: 'translateX(calc(57vw - 100%)) translateY(-40%) rotate(-12deg)' }}
                aria-hidden="true"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    opacity: { duration: 0.8 },
                    y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <Image
                    src={sleepImg}
                    alt="Decorative Sleep"
                    className="w-full h-auto object-contain drop-shadow-xl opacity-90"
                  />
                </motion.div>
              </div>
            )}
            {i === 6 && (
              <div
                className="absolute right-[-5%] sm:right-[0%] md:right-[15%] lg:right-[-13%] top-[37%] md:top-[27%] -translate-y-1/2 z-0 pointer-events-none
                           w-[140px] sm:w-[180px] md:w-[180px] lg:w-[200px]"
                style={{ transform: 'rotate(2deg)' }}
                aria-hidden="true"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    opacity: { duration: 0.8 },
                    y: { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <Image
                    src={pialaImg}
                    alt="Decorative Trophy"
                    className="w-full h-auto object-contain drop-shadow-xl opacity-90"
                  />
                </motion.div>
              </div>
            )}

            <div className="relative z-10 w-full">
              <ScrollReveal
                baseOpacity={0.1}
                enableBlur={true}
                baseRotation={1}
                blurStrength={6}
                wordAnimationEnd="bottom center"
                rotationEnd="bottom center"
                textClassName="text-floral-white font-tt-commons font-semibold text-[clamp(1.5rem,4vw,3.5rem)] leading-tight tracking-tight relative z-10 mx-auto"
              >
                {text}
              </ScrollReveal>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================
          PHASE 2: Split Screen Mirror
          ========================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-48 pt-24 border-t border-floral-white/5">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 relative">

          {/* Left Column: Social Media (Sticky) */}
          <div className="md:w-5/12 static md:sticky top-32 h-fit">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-pearl-aqua text-sm font-geometric tracking-[0.2em] uppercase mb-8"
            >
              Yang kamu post
            </motion.h3>

            <div className="flex flex-col gap-6">
              {socialPosts.map((post, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-floral-white/5 border border-floral-white/10 rounded-2xl p-5 shadow-lg backdrop-blur-sm relative overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blush-pop to-canary-yellow p-[2px]">
                      <div className="w-full h-full rounded-full bg-pine-teal overflow-hidden flex items-center justify-center">
                        <span className="text-floral-white text-xs font-bold">K</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-floral-white font-semibold text-sm">{post.author}</div>
                      <div className="text-floral-white/50 text-xs">{post.time}</div>
                    </div>
                  </div>
                  <p className="text-floral-white/90 text-[15px] relative z-10">{post.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: True Feelings (Scrolling) */}
          <div className="md:w-7/12 flex flex-col pt-12 md:pt-48 pb-32">
            <h3 className="text-blush-pop text-sm font-geometric tracking-[0.2em] uppercase mb-16 md:mb-24">
              Yang sesungguhnya kamu rasain
            </h3>

            <div className="flex flex-col gap-40 md:gap-64">
              {trueFeelings.map((feeling, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, filter: 'blur(16px)', y: 40 }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  viewport={{ once: false, margin: "-15%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-3xl md:text-5xl lg:text-6xl font-semibold text-floral-white leading-snug tracking-tight"
                >
                  {feeling}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* =========================================
          PHASE 3: Final Feelings (Left Aligned)
          ========================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 md:py-48 border-t border-floral-white/5">
        <div className="flex flex-col gap-32 md:gap-48 text-left">
          {finalFeelings.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40, filter: 'blur(16px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, margin: "-15%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-7xl font-semibold text-floral-white leading-snug tracking-tight max-w-5xl"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
