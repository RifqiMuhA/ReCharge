export default function Content() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold font-tt-commons text-pine-teal mb-8">Content & Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-pine-teal/10">
                        <div className="h-48 bg-pearl-aqua/20 rounded-xl mb-4 w-full"></div>
                        <h2 className="text-xl font-bold font-tt-commons text-pine-teal mb-2">Dummy Article {item}</h2>
                        <p className="text-pine-teal/70 font-geometric mb-4">Mengenal tanda-tanda awal burnout dan cara mengatasinya...</p>
                        <button className="text-blush-pop font-bold font-tt-commons hover:text-canary-yellow transition-colors">Read More &rarr;</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
