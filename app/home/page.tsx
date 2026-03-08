import HeroSection from './_sections/HeroSection';
import MirrorSection from './_sections/MirrorSection';
import DiagnosisSection from './_sections/DiagnosisSection';
import SolutionSection from './_sections/SolutionSection';
import TestimonialSection from './_sections/TestimonialSection';
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
      <MirrorSection />
      <DiagnosisSection />
      <SolutionSection />
      <TestimonialSection />
      <CtaSection />
    </>
  );
}
