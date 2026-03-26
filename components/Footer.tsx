import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-pine-teal text-[#F5F5ED] min-h-[90vh] flex flex-col justify-between p-8 md:p-16 relative overflow-hidden mt-auto">
            {/* Top / Main Section */}
            <div className="flex flex-col md:flex-row justify-between items-start mt-12 w-full max-w-7xl mx-auto flex-grow">
                {/* Left Side: Brand Name & Minimalist SVG */}
                <div className="flex flex-col items-start gap-12 w-full md:w-1/2">
                    <h2 className="text-7xl lg:text-9xl font-tt-commons font-bold tracking-tight text-[#F5F5ED]">recharge<span className="animate-blink">_</span></h2>

                    {/* Minimalist Sparkle/Star SVG (Aesthetic Awwwards style) */}
                    <div className="hidden md:block opacity-70 mt-4 cursor-target">
                        <svg width="160" height="160" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 10 C50 40 60 50 90 50 C60 50 50 60 50 90 C50 60 40 50 10 50 C40 50 50 40 50 10" className="text-blush-pop" />
                            <circle cx="20" cy="20" r="1.5" fill="currentColor" />
                            <circle cx="80" cy="75" r="1" fill="currentColor" />
                            <circle cx="85" cy="25" r="1.5" fill="currentColor" />
                            <path d="M70 30 L74 34 M74 30 L70 34" stroke="currentColor" strokeWidth="0.8" />
                            <path d="M25 70 L29 74 M29 70 L25 74" stroke="currentColor" strokeWidth="0.8" />
                        </svg>
                    </div>
                </div>

                {/* Right Side: Numbered Nav Links */}
                <div className="flex flex-col items-start md:items-end w-full md:w-1/2 mt-20 md:mt-0 gap-6">
                    {[
                        { num: '01', name: 'HOME', path: '/' },
                        { num: '02', name: 'CONTENT', path: '/content' },
                        { num: '03', name: 'ABOUT', path: '/about' },
                        { num: '04', name: 'CONTACT', path: '/contact' },
                        { num: '05', name: 'QUIZ', path: '/quiz' }
                    ].map((item) => (
                        <div key={item.num} className="group flex items-center gap-8 w-full md:w-3/4 md:justify-end border-b border-[#F5F5ED]/10 pb-4 hover:border-blush-pop/50 transition-colors cursor-target py-2">
                            <span className="text-lg font-geometric text-[#F5F5ED]/40 group-hover:text-blush-pop transition-colors">{item.num}</span>
                            <Link href={item.path} className="text-4xl md:text-5xl font-tt-commons font-light tracking-wide text-[#F5F5ED]/80 group-hover:text-[#F5F5ED] transition-colors">
                                {item.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs font-geometric text-[#F5F5ED]/40 uppercase tracking-widest mt-24 border-t border-[#F5F5ED]/10 pt-8">
                <div className="flex items-center gap-6">
                    <span>Follow Us</span>
                    <Link href="https://twitter.com" className="cursor-target hover:text-[#F5F5ED] transition-colors" aria-label="X (Twitter)">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961h-1.91z"></path></svg>
                    </Link>
                    <Link href="https://instagram.com" className="cursor-target hover:text-[#F5F5ED] transition-colors" aria-label="Instagram">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
