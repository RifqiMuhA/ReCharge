'use client';
import React, { useRef, createRef } from 'react';

interface ImageMouseTrailProps {
  items: string[];
  children?: React.ReactNode;
  imgClass?: string;
  maxNumberOfImages?: number;
  distance?: number;
  fadeAnimation?: boolean;
}

export default function ImageMouseTrail({
  items,
  children,
  imgClass = 'w-40 h-48',
  maxNumberOfImages = 2,
  distance = 25,
  fadeAnimation = false,
}: ImageMouseTrailProps) {
  const renderCount = Math.max(items.length, 100); // 100 items to prevent teleporting on fast drags
  const renderedItems = Array.from({ length: renderCount }).map(
    (_, index) => items[index % items.length]
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLImageElement | null)[]>([]);

  const globalIndex = useRef(0);
  const last = useRef({ x: 0, y: 0 });

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;
    image.style.left = `${relativeX}px`;
    image.style.top = `${relativeY}px`;

    image.style.zIndex = ((globalIndex.current % renderedItems.length) + 1).toString();

    image.dataset.status = 'active';

    // Cegah image ngilang duluan sebelum timeout baru kalau di-hover berkali-kali
    if (image.dataset.timeoutId) {
      clearTimeout(parseInt(image.dataset.timeoutId));
    }
    const timeout = setTimeout(() => {
      image.dataset.status = 'inactive';
    }, 1500); // Extended trail duration to 1.5s
    image.dataset.timeoutId = timeout.toString();

    last.current = { x, y };
  };

  const distanceFromLast = (x: number, y: number) => {
    return Math.hypot(x - last.current.x, y - last.current.y);
  };

  const deactivate = (image: HTMLImageElement) => {
    image.dataset.status = 'inactive';
  };

  const handleOnMove = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    if (distanceFromLast(clientX, clientY) > distance) {
      const lead = refs.current[globalIndex.current % renderedItems.length];
      if (lead) activate(lead, clientX, clientY);
      globalIndex.current++;
    }
  };

  return (
    <div
      onMouseMove={handleOnMove}
      onTouchMove={handleOnMove}
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden`}
    >
      {renderedItems.map((url, index) => (
        <img
          key={`mousetrail-${index}`}
          className={`object-cover z-10 scale-0 opacity-0 data-[status='active']:scale-100 data-[status='active']:opacity-100 transition duration-500 ease-out absolute -translate-y-1/2 -translate-x-1/2 ${imgClass} ${fadeAnimation ? 'mix-blend-luminosity' : ''}`}
          data-index={index}
          data-status="inactive"
          src={url}
          alt={`image-${index}`}
          ref={(el) => {
            refs.current[index] = el;
          }}
        />
      ))}
      <div className="relative z-20 pointer-events-none w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
