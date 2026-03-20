"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

import { useTheme } from "next-themes";

interface MapProps {
    dots?: Array<{
        start: { lat: number; lng: number; label?: string; imageUrl?: string };
        end: { lat: number; lng: number; label?: string; imageUrl?: string };
    }>;
    lineColor?: string;
    onDotClick?: (dot: { lat: number; lng: number; label?: string; imageUrl?: string }) => void;
}

export default function WorldMap({
    dots = [],
    lineColor = "#0ea5e9", // We will likely override this via props to match ReCharge theme
    onDotClick,
}: MapProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const map = new DottedMap({ height: 100, grid: "diagonal" });

    const { theme } = useTheme();
    const [hoveredDot, setHoveredDot] = useState<{ x: number, y: number, imageUrl: string, label?: string } | null>(null);
    const [lastHovered, setLastHovered] = useState<{ x: number, y: number, imageUrl: string, label?: string } | null>(null);
    const [hoveredDotKey, setHoveredDotKey] = useState<string | null>(null);

    const DOT_DEFAULT = '#FFABD2';  // blush-pop pink
    const DOT_HOVER = '#15221b';    // pine-teal

    const handleHover = (dotPoint: { lat: number; lng: number; imageUrl?: string; label?: string }) => {
        if (dotPoint.imageUrl) {
            const point = projectPoint(dotPoint.lat, dotPoint.lng);
            const data = { x: point.x, y: point.y, imageUrl: dotPoint.imageUrl, label: dotPoint.label };
            setHoveredDot(data);
            setLastHovered(data);
        }
    };

    const svgMap = map.getSVG({
        radius: 0.22,
        color: theme === "dark" ? "#FFFFFF40" : "#00000040",
        shape: "circle",
        backgroundColor: theme === "dark" ? "black" : "transparent",
    });

    const projectPoint = (lat: number, lng: number) => {
        const x = (lng + 180) * (800 / 360);
        const y = (90 - lat) * (400 / 180);
        return { x, y };
    };

    const createCurvedPath = (
        start: { x: number; y: number },
        end: { x: number; y: number }
    ) => {
        const midX = (start.x + end.x) / 2;
        const midY = Math.min(start.y, end.y) - 50;
        return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    };

    return (
        <div className="w-full aspect-[2/1] dark:bg-transparent bg-transparent rounded-lg relative font-sans">
            <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
                className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
                alt="world map"
                height="495"
                width="1056"
                draggable={false}
            />
            <svg
                ref={svgRef}
                viewBox="0 0 800 400"
                className="w-full h-full absolute inset-0 pointer-events-none select-none"
            >
                {dots.map((dot, i) => {
                    const startPoint = projectPoint(dot.start.lat, dot.start.lng);
                    const endPoint = projectPoint(dot.end.lat, dot.end.lng);
                    return (
                        <g key={`path-group-${i}`}>
                            <motion.path
                                d={createCurvedPath(startPoint, endPoint)}
                                fill="none"
                                stroke="url(#path-gradient)"
                                strokeWidth="1"
                                initial={{
                                    pathLength: 0,
                                }}
                                animate={{
                                    pathLength: 1,
                                }}
                                transition={{
                                    duration: 1,
                                    delay: 0.5 * i,
                                    ease: "easeOut",
                                }}
                                key={`start-upper-${i}`}
                            ></motion.path>
                        </g>
                    );
                })}

                <defs>
                    <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
                        <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {dots.map((dot, i) => (
                    <g key={`points-group-${i}`}>
                        <g
                            key={`start-${i}`}
                            onMouseEnter={() => { handleHover(dot.start); setHoveredDotKey(`start-${i}`); }}
                            onMouseLeave={() => { setHoveredDot(null); setHoveredDotKey(null); }}
                            onClick={() => onDotClick && dot.start.imageUrl && onDotClick(dot.start)}
                            className={dot.start.imageUrl ? "cursor-pointer pointer-events-auto" : "pointer-events-auto"}
                        >
                            <circle
                                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                                r={dot.start.imageUrl ? "14" : "4"}
                                fill="transparent"
                            />
                            <circle
                                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                                r="4"
                                fill={hoveredDotKey === `start-${i}` ? DOT_HOVER : DOT_DEFAULT}
                                style={{ transition: 'fill 0.3s' }}
                            />
                            <circle
                                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                                r="4"
                                fill={hoveredDotKey === `start-${i}` ? DOT_HOVER : DOT_DEFAULT}
                                opacity="0.5"
                            >
                                <animate
                                    attributeName="r"
                                    from="4"
                                    to="16"
                                    dur="1.5s"
                                    begin="0s"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="opacity"
                                    from="0.5"
                                    to="0"
                                    dur="1.5s"
                                    begin="0s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                            {/* Blinking cursor label */}
                            {dot.start.label && (
                                <text
                                    x={projectPoint(dot.start.lat, dot.start.lng).x + 5}
                                    y={projectPoint(dot.start.lat, dot.start.lng).y - 5}
                                    fontSize="6"
                                    fill={lineColor}
                                    fontFamily="monospace"
                                    className="select-none"
                                >
                                    <animate
                                        attributeName="opacity"
                                        values="1;0;1"
                                        dur="1.1s"
                                        repeatCount="indefinite"
                                    />
                                    |
                                </text>
                            )}
                        </g>
                        <g
                            key={`end-${i}`}
                            onMouseEnter={() => { handleHover(dot.end); setHoveredDotKey(`end-${i}`); }}
                            onMouseLeave={() => { setHoveredDot(null); setHoveredDotKey(null); }}
                            onClick={() => onDotClick && dot.end.imageUrl && onDotClick(dot.end)}
                            className={dot.end.imageUrl ? "cursor-pointer pointer-events-auto" : "pointer-events-auto"}
                        >
                            <circle
                                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                                r={dot.end.imageUrl ? "14" : "4"}
                                fill="transparent"
                            />
                            <circle
                                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                                r="4"
                                fill={hoveredDotKey === `end-${i}` ? DOT_HOVER : DOT_DEFAULT}
                                style={{ transition: 'fill 0.3s' }}
                            />
                            <circle
                                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                                r="4"
                                fill={hoveredDotKey === `end-${i}` ? DOT_HOVER : DOT_DEFAULT}
                                opacity="0.5"
                            >
                                <animate
                                    attributeName="r"
                                    from="4"
                                    to="16"
                                    dur="1.5s"
                                    begin="0s"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="opacity"
                                    from="0.5"
                                    to="0"
                                    dur="1.5s"
                                    begin="0s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                            {/* Blinking cursor label */}
                            {dot.end.label && (
                                <text
                                    x={projectPoint(dot.end.lat, dot.end.lng).x + 5}
                                    y={projectPoint(dot.end.lat, dot.end.lng).y - 5}
                                    fontSize="6"
                                    fill={lineColor}
                                    fontFamily="monospace"
                                    className="select-none"
                                >
                                    <animate
                                        attributeName="opacity"
                                        values="1;0;1"
                                        dur="1.1s"
                                        repeatCount="indefinite"
                                    />
                                    |
                                </text>
                            )}
                        </g>
                    </g>
                ))}
            </svg>

            {/* Hover Image Overlay */}
            <div
                className="absolute pointer-events-none z-50"
                style={{
                    left: lastHovered ? `${(lastHovered.x / 800) * 100}%` : '50%',
                    top: lastHovered ? `${(lastHovered.y / 400) * 100}%` : '50%',
                    transform: lastHovered
                        ? (lastHovered.x / 800 > 0.7
                            ? 'translate(-100%, -100%)'
                            : (lastHovered.x / 800 < 0.3 ? 'translate(0%, -100%)' : 'translate(-50%, -100%)'))
                        : 'translate(-50%, -100%)',
                    marginLeft: lastHovered && (lastHovered.x / 800 > 0.7) ? '-12px' : (lastHovered && lastHovered.x / 800 < 0.3 ? '12px' : '0'),
                    marginTop: '-12px'
                }}
            >
                <motion.div
                    className="rounded-xl overflow-hidden shadow-2xl border-2 border-white/50 bg-white"
                    animate={{
                        opacity: hoveredDot ? 1 : 0,
                        scale: hoveredDot ? 1 : 0.5,
                        y: hoveredDot ? 0 : 20
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                        originX: lastHovered && (lastHovered.x / 800) > 0.7 ? 1 : (lastHovered && (lastHovered.x / 800) < 0.3 ? 0 : 0.5),
                        originY: 1
                    }}
                >
                    {lastHovered?.imageUrl && (
                        <div className="w-28 h-28 md:w-40 md:h-40 relative group">
                            {/* We use standard img to avoid next/image domain config issues for arbitrary URLs, or require valid domains */}
                            <img
                                src={lastHovered.imageUrl}
                                alt={lastHovered.label || "Location view"}
                                className="w-full h-full object-cover"
                            />
                            {lastHovered.label && (
                                <motion.div
                                    className="absolute bottom-2 left-2 bg-black/60 font-tt-commons text-white text-xs md:text-sm px-2 py-1 rounded backdrop-blur-sm"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: hoveredDot ? 1 : 0, scale: hoveredDot ? 1 : 0.8 }}
                                    transition={{ delay: 0.1, duration: 0.2 }}
                                >
                                    {lastHovered.label}
                                </motion.div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
