"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface AudioVisualizerProps {
    isDark: boolean;
}

export default function AudioVisualizer({ isDark }: AudioVisualizerProps) {
    const barsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        let animations: gsap.core.Tween[] = [];

        if (isPlaying) {
            barsRef.current.forEach((bar) => {
                if (!bar) return;

                const animateBar = () => {
                    const height = 4 + Math.random() * 16; // Random height between 4px and 20px
                    const duration = 0.3 + Math.random() * 0.4; // Random duration between 0.3s and 0.7s

                    const anim = gsap.to(bar, {
                        height: `${height}px`,
                        duration: duration,
                        ease: "sine.inOut",
                        onComplete: animateBar
                    });
                    animations.push(anim);
                };

                animateBar();
            });
        } else {
            // Flatten bars when muted
            barsRef.current.forEach((bar) => {
                if (!bar) return;
                gsap.to(bar, {
                    height: "2px",
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        }

        return () => {
            animations.forEach(anim => anim.kill());
        };
    }, [isPlaying]);

    const barColor = isDark ? "bg-floral-white/70" : "bg-pine-teal/70";

    return (
        <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="fixed bottom-8 right-8 z-50 flex items-end gap-1 h-6 cursor-target group opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Toggle Audio"
        >
            {[1, 2, 3, 4, 5].map((i, index) => (
                <div
                    key={i}
                    ref={el => { barsRef.current[index] = el; }}
                    className={`w-1 rounded-t-sm origin-bottom ${barColor}`}
                    style={{ height: '2px' }}
                />
            ))}
            <span className={`absolute -top-6 right-0 text-xs font-geometric tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${isDark ? "text-floral-white/50" : "text-pine-teal/50"}`}>
                {isPlaying ? "BGM ON" : "BGM MUTE"}
            </span>
        </button>
    );
}
