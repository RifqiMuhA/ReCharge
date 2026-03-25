import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { TypingText } from '@/components/animate-ui/primitives/texts/typing';

const projects = [
  {
    title: 'BURNOUT DIARY',
    description: 'A personal journey through the digital noise. How stepping away from the screen redefined the meaning of connection. Reclaiming time became the ultimate protest against the algorithm.',
    color: '#8DDEDE',
    textColor: '#1A1A1A'
  },
  {
    title: 'SILENT ROOM',
    description: 'Creating boundaries in a boundless world. The silent room is an experiment in sensory deprivation and digital detox, designed for absolute focus.',
    color: '#FF6B9E',
    textColor: '#1A1A1A'
  },
  {
    title: 'RECONNECT',
    description: 'The art of mindful scrolling and meaningful disconnection. Finding peace in offline hours without the fear of missing out.',
    color: '#E0DDD5',
    textColor: '#1A1A1A'
  },
  {
    title: 'UNPLUGGED',
    description: 'Exploring raw, analog creativity. What happens when we strip away the pixels and reconnect with the physical world?',
    color: '#1A1A1A',
    textColor: '#E0DDD5'
  },
  {
    title: 'ECHO CHAMBERS',
    description: 'Breaking free from the algorithm\'s loop and discovering authentic voices beyond the automated feed.',
    color: '#FF4500',
    textColor: '#1A1A1A'
  },
];

export default function StackingCards({ images }: { images: string[] }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const mappedProjects = projects.map((p, i) => ({
    ...p,
    src: images[i % images.length]
  }));

  return (
    <div ref={container} className="w-full relative bg-[#f3f4ea] pt-20 pb-32">
      <section className='vh-[30vh] md:h-[50vh] w-full flex flex-col items-center justify-center mb-16'>
        <h2 className='text-4xl md:text-6xl lg:text-[7rem] font-black uppercase text-pine-teal font-geometric text-center leading-[0.9] tracking-tighter flex flex-col items-center pointer-events-none select-none'>
          <TypingText text="Selected" delay={200} duration={50} loop={false} className="block" />
          <span className="text-blush-pop"><TypingText text="Narratives" delay={700} duration={50} loop={false} className="block" /></span>
        </h2>
      </section>

      <section className='w-full'>
        {mappedProjects.map((project, i) => {
          const targetScale = 1 - (mappedProjects.length - i) * 0.05;
          return (
            <Card
              key={`card_${i}`}
              i={i}
              title={project.title}
              color={project.color}
              textColor={project.textColor}
              description={project.description}
              src={project.src}
              progress={scrollYProgress}
              range={[i * 0.2, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </section>
    </div>
  );
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  color: string;
  textColor: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  color,
  textColor,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className='h-screen flex items-center justify-center sticky top-0 px-4 md:px-12'>
      <motion.div
        style={{
          backgroundColor: color,
          color: textColor,
          scale,
          top: `calc(-10vh + ${i * 30}px)`,
        }}
        className={`flex flex-col relative h-[80vh] w-full max-w-7xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 origin-top shadow-[-10px_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-black/10`}
      >
        <div className="flex border-b border-current pb-4 md:pb-6 mb-4 md:mb-8 justify-between items-center opacity-80">
          <h2 className='text-3xl md:text-5xl lg:text-[4rem] font-black font-geometric uppercase tracking-tighter'>{title}</h2>
          <span className="text-sm md:text-lg font-bold font-geometric tracking-widest">( 0{i + 1} )</span>
        </div>
        
        <div className={`flex flex-col md:flex-row h-full gap-8 md:gap-16`}>
          <div className={`w-full md:w-[40%] flex flex-col justify-between`}>
            <p className='text-lg md:text-2xl font-medium font-geometric leading-[1.4] opacity-90'>{description}</p>
            <span className='flex items-center gap-4 mt-8 group cursor-pointer w-max hover:opacity-75 transition-opacity'>
              <span className="font-bold uppercase tracking-widest font-geometric text-sm md:text-base border border-current rounded-full px-6 py-3">Explore Story</span>
            </span>
          </div>

          <div className={`relative w-full md:w-[60%] h-64 md:h-full rounded-[1rem] md:rounded-[2rem] overflow-hidden shadow-inner`}>
            <motion.div className={`w-full h-full grayscale mix-blend-luminosity`} style={{ scale: imageScale }}>
              <img src={src} alt={title} className='w-full h-full object-cover transition-all duration-700' />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
