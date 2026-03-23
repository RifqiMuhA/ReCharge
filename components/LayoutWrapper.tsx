"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isQuizRoute = pathname === '/quiz';

    return (
        <>
            {!isQuizRoute && <Navbar />}
            <main className={`${!isQuizRoute ? 'flex-grow pt-16' : 'flex-grow w-full h-full'}`}>
                {children}
            </main>
            {!isQuizRoute && <Footer />}
        </>
    );
}
