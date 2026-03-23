'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function DancePreloaderHero() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [showHero, setShowHero] = useState(false)

    useEffect(() => {
        const timer1 = setTimeout(() => setIsLoaded(true), 1000)
        const timer2 = setTimeout(() => setShowHero(true), 2000)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 overflow-hidden relative">

            {/* FIX 1: AnimatePresence container BENAR */}
            <AnimatePresence>
                {!showHero && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center z-50"
                    >
                        {/* 5 Orang Ilustrasi */}
                        <div className="relative w-[600px] h-[600px] max-w-full mx-auto">

                            {/* 1. Kiri Atas */}
                            <motion.div
                                className="absolute top-20 left-20 w-24 h-32"
                                animate={isLoaded ? {
                                    rotate: [-5, 0, 15],
                                    scale: [1, 1.05, 1]
                                } : {}}
                                transition={{ duration: 1.5, repeat: 1 }}
                            >
                                <svg viewBox="0 0 80 100" fill="none">
                                    <ellipse cx="40" cy="40" rx="20" ry="15" fill="#6B7280" />
                                    <circle cx="35" cy="15" r="6" fill="#F3F4F6" />
                                    <path d="M25 50L35 70" stroke="#4B5563" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </motion.div>

                            {/* 2. Kanan Atas */}
                            <motion.div
                                className="absolute top-16 right-16 w-20 h-28"
                                animate={isLoaded ? {
                                    rotate: [5, 0, -10],
                                    x: [0, -5, 0]
                                } : {}}
                                transition={{ duration: 1.8, delay: 0.2, repeat: 1 }}
                            >
                                <svg viewBox="0 0 60 80" fill="none">
                                    <rect x="20" y="20" width="20" height="40" rx="8" fill="#6B7280" />
                                    <circle cx="25" cy="10" r="5" fill="#F3F4F6" />
                                    <path d="M15 50Q25 60 35 50" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </motion.div>

                            {/* 3. Kiri Bawah */}
                            <motion.div
                                className="absolute bottom-20 left-24 w-22 h-30"
                                animate={isLoaded ? {
                                    rotate: [-3, 0, 12],
                                    scaleY: [1, 1.02, 1]
                                } : {}}
                                transition={{ duration: 1.6, delay: 0.4, repeat: 1 }}
                            >
                                <svg viewBox="0 0 70 90" fill="none">
                                    <ellipse cx="35" cy="40" rx="25" ry="20" fill="#6B7280" />
                                    <circle cx="30" cy="15" r="7" fill="#F3F4F6" />
                                    <rect x="15" y="50" width="12" height="25" rx="6" fill="#8B4513" />
                                    <path d="M20 55Q25 52 30 55" stroke="#654321" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </motion.div>

                            {/* 4. Kanan Bawah */}
                            <motion.div
                                className="absolute bottom-16 right-20 w-24 h-28"
                                animate={isLoaded ? {
                                    rotate: [3, 0, -8],
                                    x: [0, 8, 0]
                                } : {}}
                                transition={{ duration: 1.4, delay: 0.6, repeat: 1 }}
                            >
                                <svg viewBox="0 0 80 90" fill="none">
                                    <path d="M20 30Q30 20 40 30Q50 40 60 30Q70 20 70 30Q70 50 60 60Q50 70 40 60Q30 50 20 60Q10 70 10 50Q10 30 20 30Z" fill="#6B7280" />
                                    <circle cx="38" cy="18" r="6" fill="#F3F4F6" />
                                    <path d="M45 55L50 65L55 55" stroke="#4B5563" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </motion.div>

                            {/* 5. TENGAH STAR */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
                                animate={isLoaded ? {
                                    rotate: [0, 360],
                                    scale: [0.8, 1.2, 1]
                                } : {
                                    scale: 0.5,
                                    rotate: 0
                                }}
                                transition={{
                                    rotate: { duration: 2, repeat: 1 },
                                    scale: { duration: 1.5, delay: 0.8 }
                                }}
                            >
                                <svg viewBox="0 0 120 120" fill="none">
                                    <motion.circle
                                        cx="60" cy="60" r="45"
                                        stroke="#F59E0B" strokeWidth="6" strokeDasharray="10 5"
                                        animate={isLoaded ? { pathLength: [0, 1], rotate: [0, 360] } : {}}
                                        transition={{ duration: 2, delay: 1 }}
                                    />
                                    <motion.path
                                        d="M60 10 L65 40 L95 40 L70 55 L75 85 L60 70 L45 85 L50 55 L25 40 L55 40 Z"
                                        fill="#FBBF24" stroke="#F59E0B" strokeWidth="3"
                                        animate={isLoaded ? { scale: [0.5, 1.3, 1], rotate: [180, 360] } : { scale: 0.3 }}
                                        transition={{ duration: 1.8, delay: 1.2 }}
                                    />
                                </svg>
                            </motion.div>

                            {/* Stars */}
                            {isLoaded && (
                                <motion.div
                                    className="absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0.3], scale: [0.8, 1.4, 1] }}
                                    transition={{ duration: 2, delay: 1.5 }}
                                >
                                    <circle cx="20%" cy="20%" r="8" fill="#FBBF24" opacity="0.8" style={{ position: 'absolute' }} />
                                    <circle cx="80%" cy="20%" r="6" fill="#F59E0B" opacity="0.6" style={{ position: 'absolute' }} />
                                    <circle cx="20%" cy="80%" r="7" fill="#FCD34D" opacity="0.7" style={{ position: 'absolute' }} />
                                    <circle cx="80%" cy="80%" r="5" fill="#FBBF24" opacity="0.9" style={{ position: 'absolute' }} />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FIX 2: Hero section DI LUAR AnimatePresence */}
            {showHero && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative z-40 text-center max-w-4xl mx-auto px-8 pt-40"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight mb-8">
                        Welcome to
                        <br />
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                            Burnout Recovery
                        </span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed max-w-3xl mx-auto">
                        4 orang lelah sudah bangun. Saatnya Anda juga pulih dari burnout dan reclaim mental health Anda.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-12 px-12 py-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300"
                    >
                        Start Recovery Journey
                    </motion.button>
                </motion.div>
            )}
        </div>
    )
}
