import React, { forwardRef } from 'react';
import mockupBg from '@/components/photos/content/FOR  BACKGROUND.svg';

interface ComputerMockupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  screenClassName?: string;
  imageClassName?: string;
}

const ComputerMockup = forwardRef<HTMLDivElement, ComputerMockupProps>(
  ({ children, className, screenClassName, imageClassName, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={`relative inline-block overflow-hidden ${className || ''}`} // Removed fixed max-w so it responds to GSAP width
        {...props}
      >
        {/* Gambar Base Komputer */}
        <img 
          src={mockupBg.src || mockupBg} 
          alt="Computer Mockup" 
          className={`w-full h-auto pointer-events-none relative z-10 drop-shadow-2xl ${imageClassName || ''}`}
        />
        
        {/* Area Layar Web - Koordinat (top, left, dll) bisa ditweak/disesuaikan dengan kotak layar asli */}
        {/* Saat ini layar disetel di z-0 (di bawah frame SVG), asumsikan layar laptop transparan */}
        <div 
          className={`absolute top-[4.5%] left-[10.5%] right-[10.5%] bottom-[12.5%] bg-black z-0 overflow-hidden rounded-md flex items-center justify-center ${screenClassName || ''}`}
        >
           {children}
        </div>
      </div>
    );
  }
);
ComputerMockup.displayName = 'ComputerMockup';

export default ComputerMockup;
