'use client';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { TypingText } from '@/components/animate-ui/primitives/texts/typing';

const projects = [
  {
    title: 'HAPUS 7 HARI',
    description: 'Aku sempat tidak bisa tidur 3 hari karena terus mengecek notifikasi. Setiap komen buruk terasa seperti tamparan nyata. Langkah pertamaku: hapus semua aplikasi dari HP selama 7 hari. Tidak ada yang notis — dan aku mulai bisa bernapas lagi.',
  },
  {
    title: 'KUNCI SEBELUM TIDUR',
    description: 'Nilai aku anjlok, bukan karena bodoh, tapi karena scrolling 6 jam sehari menguras semua energi berpikir. Trikku: 1 jam sebelum tidur, HP masuk laci dan dikunci. Dalam 2 minggu otak aku terasa lebih jernih dari pada setahun terakhir.',
  },
  {
    title: 'JALAN TANPA HP',
    description: 'Aku kehilangan teman-teman asli karena lebih nyaman online. Sampai suatu hari sadar sudah 6 bulan tidak ngobrol langsung dengan siapapun. Aku mulai dengan hal kecil: jalan pagi bareng tetangga tiap Minggu. Tanpa HP. Tanpa konten. Benar-benar hadir.',
  },
  {
    title: 'UNFOLLOW MASSAL',
    description: 'Aku terperangkap di lingkaran konten yang membuatku merasa dunia ini gelap semua. Algoritmanya tahu itu membuatku ketagihan. Cara keluarku: unfollow 200 akun sekaligus, ganti dengan channel belajar dan konten alam. Persepsi hidupku berubah total dalam 3 minggu.',
  },
];

export default function StackingCards({ images }: { images: string[] }) {
  const mappedProjects = projects.map((p, i) => ({
    ...p,
    src: images[i % images.length]
  }));

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full relative bg-[#F5F5ED] pt-20 text-pine-teal">
      
      {/* TITLE SECTION */}
      <section className='min-h-[30vh] md:h-[40vh] w-full flex flex-col items-center justify-center mb-8 md:mb-16 px-6 relative z-10'>
        <h2 className='text-[3.5rem] sm:text-6xl md:text-[8rem] lg:text-[10rem] font-black font-geometric text-center leading-[0.85] tracking-tighter flex flex-col items-center pointer-events-none select-none drop-shadow-sm xl:mt-12'>
          <TypingText text="Selected" delay={200} duration={50} loop={false} className="block" />
          <span className="text-blush-pop">
            <TypingText text="Narratives" delay={700} duration={50} loop={false} className="block" />
          </span>
        </h2>
      </section>

      {/* PROJECTS LIST (UNTOLD WORK STYLE WITH STACK EFFECT) */}
      <section className='w-full relative z-20 pb-20'>
        {mappedProjects.map((project, i) => {
          const targetScale = 1 - ((mappedProjects.length - i) * 0.05);
          return (
            <StackingItem 
              key={i} 
              project={project} 
              i={i} 
              targetScale={targetScale}
              images={images}
            />
          );
        })}
      </section>
      
    </div>
  );
}

interface StackingItemProps {
  project: { title: string; description: string; src: string; };
  i: number;
  targetScale: number;
  images: string[];
}

const StackingItem = ({ project, i, targetScale }: StackingItemProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  });

  // Using a smoother offset and slightly less extreme scale offset
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);

  return (
    <div 
      ref={container} 
      className="sticky top-0 md:top-[5vh] w-full min-h-[95vh] bg-[#F5F5ED] flex flex-col justify-start overflow-hidden pt-8 md:pt-12 pb-24 md:pb-32 isolate" 
      style={{ zIndex: i + 10 }}
    >
      <motion.div 
        style={{ scale, opacity, transformOrigin: 'top center' }} 
        className="w-full relative"
      >
        <div className="relative mx-6 md:mx-20 lg:mx-32 xl:mx-48 2xl:mx-72 border-t border-pine-teal/20 pb-20 md:border-none md:pb-10 flex flex-col">
          
          {/* The Curve SVG (hidden on mobile, uses border-t instead) */}
          <div className="pointer-events-none absolute top-[-10px] left-0 z-10 w-full hidden md:block h-[40px]">
            <div className="pointer-events-auto absolute left-0 top-[-10px] w-full">
              <svg viewBox="0 0 2500 40" style={{ width: '100%', height: '40px', background: 'transparent' }}>
                <path d="M0,20 Q1250,40 2500,20" stroke="#15221b" strokeOpacity="0.15" strokeWidth="1" fill="none" />
              </svg>
            </div>
          </div>

          <div className="relative grid w-full gap-8 md:gap-10 overflow-hidden py-10 md:py-16 md:grid-cols-12 group/card">
            
            {/* LEFT SIDE (Content) */}
            <div className="col-span-8 flex flex-col justify-between gap-10 md:gap-16 lg:pb-10 relative z-20">
              
              {/* Number & Title */}
              <div className="flex flex-col gap-4 md:gap-8 lg:grid lg:grid-cols-[80px_1fr] lg:items-start font-geometric">
                <div className="relative flex w-full max-w-[80px] items-center text-pine-teal/70 lg:top-4 font-bold text-2xl tracking-widest hidden lg:flex">
                   ( 0{i + 1} )
                </div>
                <a className="w-fit cursor-pointer outline-none group/title">
                  <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7.5rem] leading-[0.9] uppercase font-black tracking-tighter text-pine-teal group-hover/title:text-[#FFF946] transition-colors duration-500 ease-out inline-block">
                    {project.title}
                  </h1>
                </a>
                
                {/* Mobile Image */}
                <a className="block md:hidden w-full overflow-hidden rounded-[8px] mt-4 aspect-[4/5] outline-none group/img">
                   <img src={project.src} alt={project.title} className="w-full h-full object-cover group-hover/img:scale-[1.03] transition-all duration-[1.5s]" />
                </a>
              </div>

              {/* Description & Button */}
              <div className="grid md:gap-8 lg:gap-16 lg:mt-4 lg:grid-cols-[80px_1fr]">
                 <div className="hidden lg:block"></div> {/* Spacer */}
                 <div className="flex flex-col gap-8 md:max-w-[85%]">
                    
                    <div className="text-pine-teal text-base md:text-xl font-light leading-[1.6] tracking-wide">
                      <p>{project.description}</p>
                    </div>

                    {/* Told By */}
                    <div className="flex flex-col gap-4 mt-2">
                       <p className="text-pine-teal/70 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Told by</p>
                       <div className="flex items-center gap-4">
                          <p className="font-geometric text-sm md:text-base font-bold uppercase tracking-widest text-[#15221b]">
                            <span className="opacity-40">( </span>ReCharge<span className="opacity-40"> )</span>
                          </p>
                       </div>
                    </div>

                    {/* Explore Button removed per user request */}

                 </div>
              </div>
            </div>

            {/* RIGHT SIDE (Desktop Image) */}
            <div className="col-span-4 hidden md:block relative z-10">
              <a className="group/img aspect-[450/600] lg:aspect-[450/650] w-full block overflow-hidden rounded-[4px] cursor-pointer bg-pine-teal/5 lg:mt-8 outline-none relative">
                <img src={project.src} alt={project.title} className="absolute inset-0 h-full w-full object-cover transition-all duration-[1.5s] group-hover/img:scale-110" />
              </a>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
