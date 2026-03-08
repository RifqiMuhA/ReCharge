'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Anya R.',
    role: 'Fresh Graduate',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Anya&backgroundColor=ffabd2',
    quote:
      'Awalnya saya kira saya cuma kurang semangat. Setelah isi quiz ReCharge, baru sadar kalau saya sudah burnout cukup parah. Setidaknya sekarang saya tahu harus mulai dari mana.',
    accent: '#FFABD2',
  },
  {
    name: 'Dimas K.',
    role: 'Pekerja Kantor, 3 Tahun',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Dimas&backgroundColor=fff946',
    quote:
      'Artikelnya membantu banget. Bahasa yang dipakai tidak menghakimi, lebih kayak ngobrol sama teman yang ngerti. Saya jadi nggak merasa sendirian.',
    accent: '#FFF946',
  },
  {
    name: 'Lila M.',
    role: 'Mahasiswa Tingkat Akhir',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Lila&backgroundColor=8ddede',
    quote:
      'Tombol darurat di pojok kanan itu beneran bikin tenang. Rasanya ada "jaring pengaman" kalau sewaktu-waktu saya butuh bantuan cepat.',
    accent: '#8DDEDE',
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-28 bg-floral-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-blush-pop font-tt-commons text-sm tracking-[0.25em] uppercase mb-4">
            Cerita nyata
          </span>
          <h2 className="text-4xl md:text-6xl font-tt-commons font-bold text-pine-teal leading-tight">
            Kamu tidak sendiri.
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white rounded-3xl p-8 shadow-sm border border-pine-teal/5 group hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Quote mark */}
              <div
                className="absolute top-6 right-7 text-6xl font-tt-commons font-bold leading-none opacity-15 select-none"
                style={{ color: t.accent }}
              >
                "
              </div>

              {/* Quote */}
              <p className="text-pine-teal/70 font-geometric text-base leading-relaxed mb-8 relative z-10">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2"
                  style={{ borderColor: t.accent }}
                >
                  {/* DiceBear SVG avatar via img tag (external URL) */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-tt-commons font-bold text-pine-teal text-sm">{t.name}</p>
                  <p className="font-geometric text-pine-teal/40 text-xs">{t.role}</p>
                </div>
                {/* Accent dot */}
                <div
                  className="ml-auto w-2 h-2 rounded-full"
                  style={{ backgroundColor: t.accent }}
                />
              </div>

              {/* Bottom accent bar on hover */}
              <div
                className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: t.accent }}
              />
            </motion.div>
          ))}
        </div>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="text-pine-teal/40 font-geometric text-sm">
            Bergabung bersama{' '}
            <span className="font-tt-commons font-bold text-pine-teal">1.000+</span> orang yang sudah mulai
            perjalanan pemulihan mereka
          </p>
        </motion.div>
      </div>
    </section>
  );
}
