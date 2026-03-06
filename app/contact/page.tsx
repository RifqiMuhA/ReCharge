export default function Contact() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold font-tt-commons text-pine-teal mb-8 text-center">Hubungi Kami</h1>
            <form className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-pine-teal/10">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-pine-teal font-tt-commons mb-1">Nama</label>
                    <input type="text" id="name" className="w-full rounded-xl border-gray-300 shadow-sm focus:border-pearl-aqua focus:ring-pearl-aqua bg-floral-white/50 px-4 py-3 outline-none" placeholder="Nama Anda" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-pine-teal font-tt-commons mb-1">Email</label>
                    <input type="email" id="email" className="w-full rounded-xl border-gray-300 shadow-sm focus:border-pearl-aqua focus:ring-pearl-aqua bg-floral-white/50 px-4 py-3 outline-none" placeholder="email@contoh.com" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-pine-teal font-tt-commons mb-1">Pesan</label>
                    <textarea id="message" rows={4} className="w-full rounded-xl border-gray-300 shadow-sm focus:border-pearl-aqua focus:ring-pearl-aqua bg-floral-white/50 px-4 py-3 outline-none" placeholder="Tulis pesan Anda..."></textarea>
                </div>
                <button type="submit" className="w-full bg-pine-teal text-floral-white font-bold font-tt-commons rounded-xl px-4 py-3 hover:bg-pearl-aqua hover:text-pine-teal transition-all duration-300">
                    Kirim Pesan
                </button>
            </form>
        </div>
    );
}
