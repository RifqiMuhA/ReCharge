"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import QuizHero from '@/components/quiz/QuizHero';
import BreathingPhase from '@/components/quiz/BreathingPhase';
import GardenInput from '@/components/quiz/GardenInput';
import BloomingFlower from '@/components/quiz/BloomingFlower';
import AudioVisualizer from '@/components/quiz/AudioVisualizer';

type Phase = 'hero' | 'breathing' | 'input' | 'reveal';

// Phase background map — aligned to brand palette
const phaseBg: Record<Phase, string> = {
    hero: 'bg-floral-white',
    breathing: 'bg-floral-white',
    input: 'bg-floral-white',
    reveal: 'bg-floral-white', // Bright final reveal
};

const phaseText: Record<Phase, string> = {
    hero: 'text-pine-teal',
    breathing: 'text-pine-teal',
    input: 'text-pine-teal',
    reveal: 'text-pine-teal', // Dark text on bright background
};

export default function QuizPage() {
    const [phase, setPhase] = useState<Phase>('hero');
    const [feelings, setFeelings] = useState<string[]>(['', '', '']);

    const handleHeroComplete = () => setPhase('breathing');
    const handleBreathingComplete = () => setPhase('input');
    const handleInputComplete = (userFeelings: string[]) => {
        setFeelings(userFeelings);
        setPhase('reveal');
    };

    const isDark = phase === 'reveal';

    return (
        <div
            className={`
        min-h-[100dvh] relative w-full flex flex-col pt-[80px]
        font-geometric
        transition-colors duration-[1800ms] ease-in-out
        overflow-hidden
        ${phaseBg[phase]} ${phaseText[phase]}
      `}
        >

            {/* ── Noise texture grain overlay (always present, subtle) ── */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px 128px',
                }}
            />

            {/* ── Breathing phase: soft warm radial vignette ── */}
            <AnimatePresence>
                {phase === 'breathing' && (
                    <motion.div
                        key="breath-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{
                            background:
                                'radial-gradient(ellipse 80% 70% at 50% 40%, #FFABD240 0%, transparent 75%)',
                        }}
                    />
                )}
            </AnimatePresence>

            {/* ── Input phase: corner blush accents ── */}
            <AnimatePresence>
                {phase === 'input' && (
                    <motion.div
                        key="input-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        {/* soft dark vignette edges for the pine-teal forest feel */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(21,34,27,0.2) 100%)',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reveal phase background wrapper removed; using global phaseBg instead for a clean floral-white */}

            {/* UI Tracking elements removed for cleaner immersion and to prevent navbar overlapping */}

            {/* ── Audio visualizer ── */}
            <AudioVisualizer isDark={isDark} />

            {/* ── Main content area ── */}
            <div className="flex-grow flex items-center justify-center relative z-10 w-full px-4 overflow-hidden">
                <AnimatePresence mode="wait">

                    {phase === 'hero' && (
                        <motion.div
                            key="hero"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                            className="w-full flex justify-center"
                        >
                            <QuizHero
                                onComplete={handleHeroComplete}
                            />
                        </motion.div>
                    )}

                    {phase === 'breathing' && (
                        <motion.div
                            key="breathing"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                            className="w-full flex justify-center"
                        >
                            <BreathingPhase
                                onComplete={handleBreathingComplete}
                                isDark={false}
                            />
                        </motion.div>
                    )}

                    {phase === 'input' && (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                            className="w-full flex justify-center"
                        >
                            <GardenInput
                                onComplete={handleInputComplete}
                                isDark={false}
                            />
                        </motion.div>
                    )}

                    {phase === 'reveal' && (
                        <motion.div
                            key="reveal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                            className="w-full flex justify-center"
                        >
                            <BloomingFlower
                                feelings={feelings}
                                isDark={false}
                            />
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* ── Pulse keyframe (inline) ── */}
            <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }
      `}</style>
        </div>
    );
}