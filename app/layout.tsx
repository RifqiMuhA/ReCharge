import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TargetCursor from '@/components/TargetCursor';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata = {
  title: 'ReCharge - Kenali Batas, Sebelum Terlambat',
  description: 'Mental health and burnout support platform for Indonesians.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen flex flex-col font-geometric text-pine-teal bg-floral-white">
        <TargetCursor
          spinDuration={2}
          parallaxOn
          hoverDuration={0.2}
        />
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow pt-32">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
