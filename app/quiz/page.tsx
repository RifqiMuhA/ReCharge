"use client";
import { useState } from 'react';

export default function Quiz() {
    const [started, setStarted] = useState(false);

    return (
        <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center flex flex-col items-center min-h-[60vh] justify-center">
            <h1 className="text-4xl font-bold font-tt-commons text-pine-teal mb-4">Cek Tingkat Burnout Anda</h1>
            <p className="text-lg text-pine-teal/80 font-geometric mb-10">Evaluasi singkat 5 menit untuk mengetahui apakah Anda sedang menuju fase burnout.</p>

            {!started ? (
                <button
                    onClick={() => setStarted(true)}
                    className="bg-canary-yellow text-pine-teal px-10 py-4 rounded-full text-xl font-bold font-tt-commons shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                    Mulai Evaluasi
                </button>
            ) : (
                <div className="bg-white w-full rounded-3xl p-8 shadow-sm border border-pine-teal/10 text-left">
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-blush-pop mb-2 font-tt-commons">Pertanyaan 1/10</h3>
                        <p className="text-xl font-geometric text-pine-teal">Seberapa sering Anda merasa kelelahan secara emosional sehabis bekerja?</p>
                    </div>
                    <div className="space-y-3 flex flex-col">
                        {['Tidak Pernah', 'Jarang', 'Kadang-kadang', 'Sering', 'Selalu'].map((option) => (
                            <button key={option} className="w-full text-left px-6 py-4 rounded-xl border-2 border-floral-white bg-floral-white/50 hover:border-pearl-aqua hover:bg-pearl-aqua/10 transition-colors font-tt-commons text-lg text-pine-teal">
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
