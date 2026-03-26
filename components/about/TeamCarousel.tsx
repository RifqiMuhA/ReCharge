'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  monologue: string;
  facts: string[];
}

interface TeamCarouselProps {
  isOpen: boolean;
  onClose: () => void;
  members: TeamMember[];
  initialIndex?: number;
}

export default function TeamCarousel({ isOpen, onClose, members, initialIndex = 0 }: TeamCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  // Auto-sync index when modal is opened
  React.useEffect(() => {
    if (isOpen) setCurrentIndex(initialIndex);
  }, [isOpen, initialIndex]);

  // Prevent scrolling when carousel is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#15221b]/95 backdrop-blur-md cursor-pointer"
          onClick={onClose}
        >
          <div className="absolute top-6 right-6 md:top-12 md:right-12 text-[#f3f4ea] text-lg md:text-xl font-geometric uppercase tracking-widest hover:text-[#FFABD2] transition-colors">
            [ Tutup ]
          </div>
          
          <div 
            className="w-[92vw] max-w-6xl h-[85vh] md:h-[80vh] flex flex-col md:flex-row bg-[#f3f4ea] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={`img-${currentIndex}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full md:w-[45%] h-[45%] md:h-full relative shrink-0"
              >
                 <img src={members[currentIndex].image} alt={members[currentIndex].name} className="w-full h-full object-cover grayscale mix-blend-multiply" />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div 
                key={`text-${currentIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                className="w-full md:w-[55%] h-[55%] md:h-full p-6 md:p-12 lg:p-16 flex flex-col justify-center text-[#15221b] overflow-y-auto"
              >
                <h3 className="text-sm md:text-base font-bold tracking-[0.25em] text-[#FF4500] uppercase mb-2">
                  {members[currentIndex].role}
                </h3>
                <h2 className="text-5xl md:text-7xl font-geometric tracking-tighter leading-none mb-6 uppercase">
                  {members[currentIndex].name}
                </h2>
                
                <div className="mb-8">
                  <p className="text-lg md:text-2xl font-light italic leading-relaxed border-l-4 border-pine-teal pl-4 opacity-80">
                    "{members[currentIndex].monologue}"
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest opacity-50">Fakta Kunci</h4>
                  <ul className="space-y-3">
                    {members[currentIndex].facts.map((fact, idx) => (
                      <li key={idx} className="flex gap-3 text-base md:text-xl font-medium tracking-tight">
                        <span className="text-[#FFABD2] shrink-0">✦</span> {fact}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Navigation Controls */}
                <div className="mt-8 md:mt-auto pt-8 flex items-center justify-between border-t border-[#15221b]/10 shrink-0">
                   <button onClick={handlePrev} className="text-lg font-geometric font-bold hover:text-[#FF4500] uppercase tracking-widest transition-colors py-2 px-4 -ml-4">Prev</button>
                   <span className="text-sm opacity-50 font-geometric tracking-widest">{currentIndex + 1} / {members.length}</span>
                   <button onClick={handleNext} className="text-lg font-geometric font-bold hover:text-[#FF4500] uppercase tracking-widest transition-colors py-2 px-4 -mr-4">Next</button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
