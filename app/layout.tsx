import './globals.css';
import TargetCursor from '@/components/TargetCursor';
import SmoothScroll from '@/components/SmoothScroll';
import { GeistSans } from "geist/font/sans";
import localFont from 'next/font/local';
import { cn } from "@/lib/utils";
import LayoutWrapper from '@/components/LayoutWrapper';

const geist = GeistSans;

const geometric = localFont({
  src: './fonts/geometric-415-lite.otf',
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
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
