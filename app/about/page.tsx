'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';
import ScrollReveal from '@/components/ScrollReveal';
import TeamCarousel, { TeamMember } from '@/components/about/TeamCarousel';

export default function AboutPage() {
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);

  // Horizontal scroll registration
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pinSection = pinRef.current;
    const scrollWrapper = scrollWrapperRef.current;

    if (pinSection && scrollWrapper) {
      const getScrollAmount = () => -(scrollWrapper.scrollWidth - window.innerWidth);

      const tween = gsap.to(scrollWrapper, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: pinSection,
          start: "top top",
          end: () => `+=${scrollWrapper.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, []);

  const openCarousel = (index: number) => {
    setSelectedMemberIndex(index);
    setIsCarouselOpen(true);
  };

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Raka",
      role: "Lead Storyteller",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=800&fit=crop",
      monologue: "Pesan teks yang menyakitkan di timeline bisa tinggal seumur hidup di kepala. Saya ingin platform ini menjadi antitesis dari memori buruk itu.",
      facts: ["Manusia nokturnal", "Suka memasak tanpa resep yang jelas", "Kolektor kaset pita"]
    },
    {
      id: 2,
      name: "Dina",
      role: "Visual Archetype",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&h=800&fit=crop",
      monologue: "Estetika tidak hanya soal cantik. Brutalism kami pilih untuk merefleksikan bahwa penyembuhan mental itu nyata, terjal, namun membanggakan.",
      facts: ["Selalu pakai kaos kaki beda warna", "Sketsa manual sebelum Figma", "Phobia makanan pedas"]
    },
    {
      id: 3,
      name: "Bima",
      role: "Systems Weaver",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&h=800&fit=crop",
      monologue: "Efisiensi kode adalah bahasaku. Aku mengatur interaksi supaya ruang napas digital pengguna tetap stabil setiap kali mereka menghela napas.",
      facts: ["Keyboard mekanikal bersuara paling berisik", "Seorang puitis di balik kode CSS", "Alergi durian"]
    }
  ];

  return (
    <ReactLenis root>
      <main className="bg-[#F5F5ED] text-pine-teal overflow-hidden relative">
        


        {/* SECTION 1: HERO */}
        <section className="w-full h-screen flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-24">
           <motion.div 
             initial={{ opacity: 0, y: 100 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="max-w-7xl"
           >
             <h2 className="text-lg md:text-2xl uppercase tracking-[0.3em] text-pearl-aqua font-bold mb-6">Manifesto Kami</h2>
             <h1 className="text-[12vw] sm:text-[10vw] md:text-[8rem] lg:text-[10rem] font-geometric font-black leading-[0.9] tracking-tighter uppercase">
               Mereset <br />
               <span className="text-blush-pop italic">Kewarasan</span> <br />
               <span className="text-pearl-aqua">Digital.</span>
             </h1>
           </motion.div>
        </section>

        {/* SECTION 2: HORIZONTAL SCROLL CARDS */}
        <section ref={pinRef} className="w-full h-screen bg-[#15221b] text-[#F5F5ED] overflow-hidden flex items-center relative">
          
          <div className="absolute top-12 left-6 md:top-24 md:left-24 z-10 pointer-events-none">
            <h3 className="text-2xl md:text-5xl font-geometric tracking-tighter uppercase text-[#FFABD2] opacity-80">Kelebihan Kami</h3>
          </div>

          <div ref={scrollWrapperRef} className="flex h-full items-center pl-[5vw] lg:pl-[15vw] gap-[15vw] md:gap-[25vw] pt-24 md:pt-0">
            {/* Card 1 */}
            <div className="w-[85vw] md:w-[60vw] lg:w-[45vw] shrink-0">
               <h4 className="text-[6rem] md:text-[10rem] font-geometric font-black text-blush-pop leading-none mb-4 md:mb-8 opacity-90 drop-shadow-2xl">01</h4>
               <h5 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4 md:mb-8 text-pearl-aqua">Komunitas Tanpa Penghakiman</h5>
               <p className="text-xl md:text-3xl font-light opacity-80 leading-relaxed md:leading-snug">Kami adalah ruang aman yang dibangun oleh dan untuk mereka yang pernah merasakan luka digital. Komunitas ReCharge hadir agar kamu tahu: pengalamanmu valid, dan kamu tidak sendirian.</p>
            </div>
            {/* Card 2 */}
            <div className="w-[85vw] md:w-[60vw] lg:w-[45vw] shrink-0">
               <h4 className="text-[6rem] md:text-[10rem] font-geometric font-black text-pearl-aqua leading-none mb-4 md:mb-8 opacity-90 drop-shadow-2xl">02</h4>
               <h5 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4 md:mb-8 text-blush-pop">Platform Pemulihan Nyata</h5>
               <p className="text-xl md:text-3xl font-light opacity-80 leading-relaxed md:leading-snug">ReCharge bukan sekadar konten. Kami adalah platform yang merancang pengalaman interaktif agar kamu dapat mengenali, memproses, dan akhirnya melepaskan beban cyberbullying dengan cara yang bermakna.</p>
            </div>
            {/* Card 3 */}
            <div className="w-[85vw] md:w-[60vw] lg:w-[45vw] shrink-0">
               <h4 className="text-[6rem] md:text-[10rem] font-geometric font-black text-blush-pop leading-none mb-4 md:mb-8 opacity-90 drop-shadow-2xl">03</h4>
               <h5 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4 md:mb-8 text-pearl-aqua">Bersama Kita Pulih</h5>
               <p className="text-xl md:text-3xl font-light opacity-80 leading-relaxed md:leading-snug">Setiap anggota komunitas kami adalah bukti bahwa pemulihan mungkin terjadi. Melalui berbagi cerita, panduan terstruktur, dan dukungan sesama, ReCharge mengubah luka menjadi kekuatan kolektif.</p>
            </div>
            {/* Spacer */}
            <div className="w-[10vw] shrink-0"></div>
          </div>
        </section>

        {/* SECTION 3: TEAM GRID & MODAL TRIGGER */}
        <section className="w-full py-24 md:py-40 px-6 md:px-12 lg:px-24 flex flex-col justify-center relative min-h-screen">
           
           <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-16 md:mb-24 gap-12">
             <div className="max-w-4xl">
               <h2 className="text-[3.5rem] sm:text-6xl md:text-[8rem] font-geometric font-black uppercase leading-[0.9] tracking-tighter mb-8">
                 Dapur <span className="text-[#FF4500]">Redaksi.</span>
               </h2>
               <p className="text-xl md:text-3xl opacity-65 font-light max-w-2xl leading-relaxed">
                 Tim kecil eksperimental yang percaya bahwa platform rehabilitasi harus dibuat dari kejujuran dan rasa muak terhadap pembungkaman.
               </p>
             </div>
             
             <button 
                onClick={() => openCarousel(0)}
                className="group relative px-8 md:px-16 py-6 md:py-8 bg-[#15221b] text-[#FFF946] rounded-full overflow-hidden shrink-0 shadow-xl"
             >
                <span className="relative z-10 text-xl md:text-2xl font-bold font-geometric uppercase tracking-widest group-hover:text-[#15221b] transition-colors duration-500">Cari Tahu Team Ini</span>
                <div className="absolute inset-0 bg-[#FFF946] rounded-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
             </button>
           </div>

           {/* Grid Layout Monologues */}
           <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 auto-rows-[350px] md:auto-rows-[400px]">
             
             <div 
                className="md:col-span-5 row-span-1 md:row-span-2 relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] cursor-pointer shadow-2xl"
                onClick={() => openCarousel(0)}
             >
                <img src={teamMembers[0].image} alt={teamMembers[0].name} className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-teal/95 via-pine-teal/20 to-transparent flex flex-col justify-end p-8 md:p-12 translate-y-12 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 transition-all duration-500">
                   <h3 className="text-4xl md:text-6xl font-geometric font-bold text-[#FFF946] uppercase">{teamMembers[0].name}</h3>
                   <p className="text-[#F5F5ED] tracking-widest uppercase mt-2 opacity-80">{teamMembers[0].role}</p>
                </div>
             </div>

             <div 
                className="md:col-span-4 row-span-1 md:col-start-6 relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] cursor-pointer shadow-xl"
                onClick={() => openCarousel(1)}
             >
                <img src={teamMembers[1].image} alt={teamMembers[1].name} className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-teal/95 via-pine-teal/20 to-transparent flex flex-col justify-end p-8 translate-y-8 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 transition-all duration-500">
                   <h3 className="text-3xl md:text-5xl font-geometric font-bold text-[#FFABD2] uppercase">{teamMembers[1].name}</h3>
                   <p className="text-[#F5F5ED] text-sm md:text-base tracking-widest uppercase mt-2 opacity-80">{teamMembers[1].role}</p>
                </div>
             </div>

             <div 
                className="md:col-span-4 md:col-start-9 row-span-1 md:row-span-2 relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] cursor-pointer shadow-2xl"
                onClick={() => openCarousel(2)}
             >
                <img src={teamMembers[2].image} alt={teamMembers[2].name} className="w-full h-full object-cover object-center grayscale mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-teal/95 via-pine-teal/20 to-transparent flex flex-col justify-end p-8 md:p-12 translate-y-12 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 transition-all duration-500">
                   <h3 className="text-4xl md:text-6xl font-geometric font-bold text-[#FF4500] uppercase">{teamMembers[2].name}</h3>
                   <p className="text-[#F5F5ED] tracking-widest uppercase mt-2 opacity-80">{teamMembers[2].role}</p>
                </div>
             </div>

             <div className="hidden md:flex md:col-span-3 md:col-start-6 md:row-start-2 bg-[#E0DDD5]/40 rounded-[3rem] p-10 items-end justify-start mix-blend-multiply opacity-50 pointer-events-none">
               <svg viewBox="0 0 100 100" className="w-20 h-20 text-pine-teal" fill="currentColor">
                 <path d="M50 0 L61 35 L97 35 L68 57 L79 91 L50 70 L21 91 L32 57 L3 35 L39 35 Z" />
               </svg>
             </div>
           </div>

        </section>



        <TeamCarousel 
           isOpen={isCarouselOpen}
           onClose={() => setIsCarouselOpen(false)}
           members={teamMembers}
           initialIndex={selectedMemberIndex}
        />
      </main>
    </ReactLenis>
  );
}
