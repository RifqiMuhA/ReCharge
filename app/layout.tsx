import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TargetCursor from '@/components/TargetCursor';
import SmoothScroll from '@/components/SmoothScroll';
import { GeistSans } from "geist/font/sans";
import localFont from 'next/font/local';
import { cn } from "@/lib/utils";

const geist = GeistSans;

const geometric = localFont({
  src: './fonts/Geometric415Lite.woff',
  variable: '--font-geometric',
  display: 'swap',
});

export const metadata = {
  title: 'ReCharge - Kenali Batas, Sebelum Terlambat',
  description: 'Mental health and burnout support platform for Indonesians.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={cn("font-sans", geist.variable, geometric.variable)}>
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
