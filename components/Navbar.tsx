"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [navHidden, setNavHidden] = useState(false);
    const lastScrollY = useRef(0);

    // Refs for GSAP
    const menuRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Content', path: '/content' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const desktopLinks = navLinks.filter(l => l.name !== 'Home');

    useEffect(() => {
        // Close menu on route change
        setIsMobileMenuOpen(false);
        setNavHidden(false);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Don't hide if menu is open or at very top
            if (isMobileMenuOpen || currentScrollY < 50) {
                setNavHidden(false);
                lastScrollY.current = currentScrollY;
                return;
            }

            if (currentScrollY > lastScrollY.current) {
                // Scrolling down
                setNavHidden(true);
            } else {
                // Scrolling up
                setNavHidden(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (!menuRef.current) return;

        if (isMobileMenuOpen) {
            // Animate Overlay In
            gsap.to(menuRef.current, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.5,
                ease: 'power3.out'
            });

            // Animate Links In
            gsap.fromTo(linksRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
            );
        } else {
            // Animate Overlay Out
            gsap.to(menuRef.current, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.4,
                ease: 'power3.inOut'
            });
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <nav className={`fixed w-full z-50 top-0 pt-6 px-4 sm:px-8 pointer-events-none transition-transform duration-500 ease-out ${navHidden ? '-translate-y-[150%]' : 'translate-y-0'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">

                    {/* Left: Home / Logo */}
                    <div className="flex-1 flex justify-start z-50">
                        <Link href="/" className={`text-xl font-medium font-tt-commons transition-colors hover:text-pearl-aqua ${isMobileMenuOpen ? 'text-white' : 'text-pine-teal'}`}>
                            ReCharge<span className="animate-blink ml-0.5">_</span>
                        </Link>
                    </div>

                    {/* Center: Smooth Pill Box (Desktop) */}
                    <div className="bg-white/80 backdrop-blur-md shadow-sm border border-pine-teal/10 rounded-2xl hidden md:flex items-center p-1.5 gap-2 z-50">
                        {desktopLinks.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={`cursor-none cursor-target px-5 py-1.5 rounded-xl font-tt-commons font-medium text-sm transition-all duration-300 ${isActive
                                        ? 'bg-pine-teal text-floral-white shadow-md'
                                        : 'text-pine-teal hover:bg-pine-teal/10'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex-1 flex justify-end items-center gap-3 z-50">
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="group w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-pine-teal/10 hover:bg-pine-teal transition-all md:hidden"
                            aria-label="Toggle Menu"
                        >
                            <div className="w-4 h-3 relative flex flex-col justify-between items-center pointer-events-none">
                                <span className={`w-full h-[1.5px] bg-pine-teal group-hover:bg-floral-white transition-all duration-300 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
                                <span className={`w-full h-[1.5px] bg-pine-teal group-hover:bg-floral-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`}></span>
                                <span className={`w-full h-[1.5px] bg-pine-teal group-hover:bg-floral-white transition-all duration-300 origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`}></span>
                            </div>
                        </button>

                        {/* Quiz Button */}
                        <Link
                            href="/quiz"
                            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 border border-transparent ${isMobileMenuOpen
                                ? 'bg-canary-yellow hover:bg-white'
                                : 'bg-blush-pop hover:bg-pine-teal'
                                } `}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-floral-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                {/* Add a subtle line underneath indicating a write off effect for aesthetic */}
                                <line x1="19" y1="21" x2="5" y2="21" stroke="currentColor" strokeWidth={1} strokeLinecap="round" />
                            </svg>
                        </Link>
                    </div>

                </div>
            </nav>

            {/* Full-Screen Mobile Menu Overlay */}
            <div
                ref={menuRef}
                className="fixed inset-0 bg-blush-pop/95 backdrop-blur-lg z-40 flex flex-col justify-center px-8 opacity-0 pointer-events-none md:hidden"
            >
                <div className="flex flex-col">
                    {navLinks.map((link, i) => {
                        const isActive = pathname === link.path;
                        return (
                            <Link
                                key={link.name}
                                href={link.path}
                                ref={(el: any) => linksRef.current[i] = el}
                                className={`text-5xl font-tt-commons font-bold transition-colors py-6 border-b border-pine-teal/10 text-pine-teal hover:text-white`}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                </div>

                <div className="absolute bottom-12 left-8 right-8">
                    <p className="text-sm font-tt-commons font-medium text-pine-teal/50 pb-4 border-b border-pine-teal/10 mb-4">
                        Kenali Batas. Sebelum Terlambat.
                    </p>
                    <div className="flex gap-6">
                        <Link href="https://twitter.com" className="text-pine-teal hover:text-white transition-colors cursor-none cursor-target" aria-label="X (Twitter)">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961h-1.91z"></path></svg>
                        </Link>
                        <Link href="https://instagram.com" className="text-pine-teal hover:text-white transition-colors cursor-none cursor-target" aria-label="Instagram">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
