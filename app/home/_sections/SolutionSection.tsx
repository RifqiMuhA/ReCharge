'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
  {
    title: 'Quiz Burnout',
    description: 'Cek level burnout kamu dalam 5 menit. Berdasarkan skala MBI yang tervalidasi secara ilmiah.',
    href: '/quiz',
    accent: '#FFABD2',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    size: 'large',
  },
  {
    title: 'Artikel & Edukasi',
    description: 'Konten kesehatan mental yang ditulis dengan bahasa yang mudah dipahami.',
    href: '/content',
    accent: '#FFF946',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    size: 'small',
  },
  {
    title: 'Tombol Darurat',
    description: 'Akses cepat ke hotline kesehatan mental jika kamu sedang krisis.',
    href: '/contact',
    accent: '#8DDEDE',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    size: 'small',
  },
  {
    title: 'Tentang ReCharge',
    description: 'Pelajari lebih lanjut tentang misi kami dan orang-orang di balik platform ini.',
    href: '/about',
    accent: '#FFABD2',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    size: 'medium',
  },
];

export default function SolutionSection() {
  return (
    <section className="py-28 bg-floral-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="inline-block text-blush-pop font-tt-commons text-sm tracking-[0.25em] uppercase mb-4">
              Apa yang kami tawarkan
            </span>
            <h2 className="text-4xl md:text-6xl font-tt-commons font-bold text-pine-teal leading-tight">
              ReCharge hadir
              <br />
              untuk kamu.
            </h2>
          </div>
          <p className="text-pine-teal/50 font-geometric text-base max-w-sm leading-relaxed">
            Semua yang kamu butuhkan untuk memahami dan mengelola kesehatan mentalmu, dalam satu platform.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Large card (Quiz) - spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="md:col-span-2"
          >
            <Link
              href={features[0].href}
              className="group relative bg-[#2D4739] rounded-3xl p-8 h-full min-h-[280px] flex flex-col justify-between overflow-hidden block hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Accent blob */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 translate-x-16 -translate-y-16 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundColor: features[0].accent, filter: 'blur(40px)' }}
              />
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${features[0].accent}30`, color: features[0].accent }}
                >
                  {features[0].icon}
                </div>
                <h3 className="text-floral-white font-tt-commons font-bold text-3xl mb-3">
                  {features[0].title}
                </h3>
                <p className="text-floral-white/50 font-geometric text-base max-w-md leading-relaxed">
                  {features[0].description}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-8">
                <span
                  className="font-tt-commons font-bold text-sm px-5 py-2.5 rounded-full transition-colors group-hover:opacity-90"
                  style={{ backgroundColor: features[0].accent, color: '#2D4739' }}
                >
                  Mulai Sekarang
                </span>
                <motion.div
                  className="w-10 h-10 rounded-full border flex items-center justify-center text-floral-white border-floral-white/20"
                  whileHover={{ x: 4 }}
                >
                  →
                </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* Small card (Artikel) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              href={features[1].href}
              className="group relative bg-pine-teal/5 border border-pine-teal/10 rounded-3xl p-7 h-full min-h-[280px] flex flex-col justify-between overflow-hidden block hover:bg-pine-teal/10 transition-colors duration-300"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${features[1].accent}40`, color: '#2D4739' }}
                >
                  {features[1].icon}
                </div>
                <h3 className="text-pine-teal font-tt-commons font-bold text-2xl mb-3">{features[1].title}</h3>
                <p className="text-pine-teal/50 font-geometric text-sm leading-relaxed">{features[1].description}</p>
              </div>
              <span className="font-tt-commons text-sm text-pine-teal/60 group-hover:text-pine-teal transition-colors">
                Baca artikel →
              </span>
            </Link>
          </motion.div>

          {/* Small card (Crisis Button) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link
              href={features[2].href}
              className="group relative bg-pine-teal/5 border border-pine-teal/10 rounded-3xl p-7 h-full min-h-[220px] flex flex-col justify-between overflow-hidden block hover:bg-[#8DDEDE]/10 transition-colors duration-300"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${features[2].accent}40`, color: '#2D4739' }}
                >
                  {features[2].icon}
                </div>
                <h3 className="text-pine-teal font-tt-commons font-bold text-2xl mb-3">{features[2].title}</h3>
                <p className="text-pine-teal/50 font-geometric text-sm leading-relaxed">{features[2].description}</p>
              </div>
              <span className="font-tt-commons text-sm text-pine-teal/60 group-hover:text-pine-teal transition-colors">
                Hubungi sekarang →
              </span>
            </Link>
          </motion.div>

          {/* Medium card (About) - spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Link
              href={features[3].href}
              className="group relative bg-blush-pop/20 border border-blush-pop/20 rounded-3xl p-7 h-full min-h-[220px] flex flex-col justify-between overflow-hidden block hover:bg-blush-pop/30 transition-colors duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blush-pop/30 flex items-center justify-center mb-6 text-pine-teal">
                  {features[3].icon}
                </div>
                <h3 className="text-pine-teal font-tt-commons font-bold text-2xl mb-3">{features[3].title}</h3>
                <p className="text-pine-teal/60 font-geometric text-sm leading-relaxed max-w-sm">{features[3].description}</p>
              </div>
              <span className="font-tt-commons text-sm text-pine-teal/60 group-hover:text-pine-teal transition-colors">
                Kenali kami →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
