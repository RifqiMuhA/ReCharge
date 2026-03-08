"use client";

import { useState, useEffect } from 'react';
import BreathingPhase from '@/components/quiz/BreathingPhase';
import GardenInput from '@/components/quiz/GardenInput';
import BloomingFlower from '@/components/quiz/BloomingFlower';
import AudioVisualizer from '@/components/quiz/AudioVisualizer';

type Phase = 'breathing' | 'input' | 'reveal';

export default function QuizPage() {
    const [phase, setPhase] = useState<Phase>('breathing');
    const [feelings, setFeelings] = useState<string[]>(['', '', '']);
    const [timeOfDay, setTimeOfDay] = useState<'morning' | 'sunset' | 'night'>('morning');

    useEffect(() => {
        // Determine time of day for dynamic background
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 16) {
            setTimeOfDay('morning');
        } else if (hour >= 16 && hour < 19) {
            setTimeOfDay('sunset');
        } else {
            setTimeOfDay('night');
        }
    }, []);

    const getBgClass = () => {
        switch (timeOfDay) {
            case 'morning':
                return 'bg-gradient-to-br from-floral-white via-floral-white to-pearl-aqua/30 text-pine-teal';
            case 'sunset':
                return 'bg-gradient-to-br from-[#FFD1A9] via-[#FFABD2] to-[#B39CD0] text-pine-teal';
            case 'night':
                return 'bg-gradient-to-br from-[#0A1128] via-[#12224A] to-pine-teal text-floral-white';
            default:
                return 'bg-floral-white text-pine-teal';
        }
    };

    const handleBreathingComplete = () => {
        // Simple seamless transition to input phase
        setPhase('input');
    };

    const handleInputComplete = (userFeelings: string[]) => {
        setFeelings(userFeelings);
        setPhase('reveal');
    };

    return (
        <div className={`fixed inset-0 w-full h-full flex flex-col transition-colors duration-[3000ms] overflow-hidden ${getBgClass()}`}>

            {/* Dynamic mesh gradient overlay */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%)'
            }}></div>

            <AudioVisualizer isDark={timeOfDay === 'night'} />

            <div className="flex-grow flex items-center justify-center relative z-10 w-full px-4">
                {phase === 'breathing' && (
                    <BreathingPhase onComplete={handleBreathingComplete} isDark={timeOfDay === 'night'} />
                )}

                {phase === 'input' && (
                    <GardenInput onComplete={handleInputComplete} isDark={timeOfDay === 'night'} />
                )}

                {phase === 'reveal' && (
                    <BloomingFlower feelings={feelings} isDark={timeOfDay === 'night'} />
                )}
            </div>
        </div>
    );
}
