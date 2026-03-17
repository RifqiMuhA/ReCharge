import HeroSection from './_sections/HeroSection';
import FamiliarSection from './_sections/FamiliarSection';
import MirrorSection from './_sections/MirrorSection';
import DiagnosisSection from './_sections/DiagnosisSection';
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
      <CtaSection />
    </>
  );
}
