import './globals.css';
import TargetCursor from '@/components/TargetCursor';
import SmoothScroll from '@/components/SmoothScroll';
import LayoutWrapper from '@/components/LayoutWrapper';

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
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
