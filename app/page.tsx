export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <h1 className="text-5xl md:text-7xl font-bold font-tt-commons text-pine-teal mb-6 text-center">
        Kenali Batas.<br />Sebelum Terlambat.
      </h1>
      <p className="text-xl md:text-2xl text-pine-teal/80 text-center max-w-2xl font-geometric mb-10">
        Platform edukasi dan dukungan kesehatan mental untuk mencegah burnout di tempat kerja dan kehidupan sehari-hari.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-blush-pop text-pine-teal px-8 py-3 rounded-full text-lg font-bold font-tt-commons hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          Mulai Quiz Burnout
        </button>
        <button className="bg-pearl-aqua/30 text-pine-teal px-8 py-3 rounded-full text-lg font-bold font-tt-commons border-2 border-pearl-aqua hover:bg-pearl-aqua hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          Pelajari Lebih Lanjut
        </button>
      </div>
    </div>
  );
}
