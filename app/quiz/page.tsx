"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BreathingPhase from '@/components/quiz/BreathingPhase';
import GardenInput from '@/components/quiz/GardenInput';
import BloomingFlower from '@/components/quiz/BloomingFlower';
import AudioVisualizer from '@/components/quiz/AudioVisualizer';

type Phase = 'breathing' | 'input' | 'reveal';

export default function QuizPage() {
    const [phase, setPhase] = useState<Phase>('breathing');
    const [feelings, setFeelings] = useState<string[]>(['', '', '']);

    const handleBreathingComplete = () => {
        setPhase('input');
    };

    const handleInputComplete = (userFeelings: string[]) => {
        setFeelings(userFeelings);
        setPhase('reveal');
    };

    return (
        <div className={`fixed inset-0 w-full h-full flex flex-col font-body transition-colors duration-[2000ms] overflow-hidden ${phase === 'reveal' ? 'bg-black text-floral-white' : 'bg-canary-yellow text-pine-teal'}`}>

            {/* Botanical Background (Reveal Only) */}
            <AnimatePresence>
                {phase === 'reveal' && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2.5 }}
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1490750967868-8f52a4128f11?q=80&w=2000&auto=format&fit=crop')"
                        }}
                    >
                        <div className="absolute inset-0 bg-[#15221b]/70 backdrop-blur-md z-0"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Subtle Gradient Overlays */}
            <AnimatePresence>
                {phase !== 'reveal' && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-overlay"
                        style={{
                            background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 249, 70, 0) 80%)'
                        }}
                    ></motion.div>
                )}
            </AnimatePresence>

            {/* Dynamic mesh gradient overlay for aesthetic tinting */}
            <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none z-0" style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.2) 100%)'
            }}></div>

            <AudioVisualizer isDark={phase === 'reveal'} />

            <div className="flex-grow flex items-center justify-center relative z-10 w-full px-4">
                {phase === 'breathing' && (
                    <BreathingPhase onComplete={handleBreathingComplete} isDark={false} />
                )}

                {phase === 'input' && (
                    <GardenInput onComplete={handleInputComplete} isDark={false} />
                )}

                {phase === 'reveal' && (
                    <BloomingFlower feelings={feelings} isDark={true} />
                )}
            </div>
        </div>
    );
}
