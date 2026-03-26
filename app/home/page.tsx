import HeroSection from './_sections/HeroSection';
import FamiliarSection from './_sections/FamiliarSection';
import MirrorSection from './_sections/MirrorSection';
import DiagnosisSection from './_sections/DiagnosisSection';
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
      <HeroSection />
      {/* <FamiliarSection /> */}
      <MirrorSection />
      <DiagnosisSection />
      <PreHeroSection />
      <HeroSection />
      <MirrorDiagnosisTransition />
      <CtaSection />
    </>
  );
}
