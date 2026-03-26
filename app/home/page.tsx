import PreHeroSection from './_sections/PreHeroSection';
import HeroSection from './_sections/HeroSection';
import MirrorDiagnosisTransition from '@/components/MirrorDiagnosisTransition';
import CtaSection from './_sections/CtaSection';

export const metadata = {
  title: 'ReCharge — Kenali Batas, Sebelum Terlambat',
  description:
    'Platform edukasi dan dukungan kesehatan mental untuk mencegah burnout di tempat kerja dan kehidupan sehari-hari.',
};

export default function HomePage() {
  return (
    <>
      <PreHeroSection />
      <HeroSection />
      <MirrorDiagnosisTransition />
      <CtaSection />
    </>
  );
}
