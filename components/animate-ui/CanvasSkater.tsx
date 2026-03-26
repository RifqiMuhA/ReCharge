"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import frame01 from '@/components/photos/content/ezgif-split/1.svg';
import frame02 from '@/components/photos/content/ezgif-split/2.svg';
import frame03 from '@/components/photos/content/ezgif-split/3.svg';
import frame04 from '@/components/photos/content/ezgif-split/4.svg';
import frame05 from '@/components/photos/content/ezgif-split/5.svg';
import frame06 from '@/components/photos/content/ezgif-split/6.svg';

const frames = [frame01, frame02, frame03, frame04, frame05, frame06];

export default function CanvasSkater() {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const idx = Math.min(Math.max(customEvent.detail, 0), frames.length - 1);
      setCurrentFrame(idx);
    };

    window.addEventListener("updateSkaterFrame", handleUpdate);
    return () => window.removeEventListener("updateSkaterFrame", handleUpdate);
  }, []);

  return (
    <div className="relative w-full aspect-[3/4]">
      {frames.map((frame, i) => (
        <Image
          key={i}
          src={frame}
          alt={`Sequence frame ${i + 1}`}
          fill
          className={`object-contain transition-opacity duration-150 ${
            i === currentFrame ? 'opacity-100' : 'opacity-0'
          }`}
          priority={i === 0}
        />
      ))}
    </div>
  );
}
