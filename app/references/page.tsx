"use client";

export default function References() {
    const references = [
        {
            title: "Bottled Water Microplastic Contamination",
            sources: [
                {
                    text: "U.S. PIRG. (2024). Does Bottled Water Contain Plastic Particles?",
                    link: "https://pirg.org/articles/does-bottled-water-contain-plastic-particles/",
                },
            ],
        },
        {
            title: "Plastic Utensils and Kitchen Microplastic Sources",
            sources: [
                {
                    text: "Koelmans, A. A., et al. (2024). Investigating sources of microplastic contamination in home kitchens.",
                    link: "https://pubmed.ncbi.nlm.nih.gov/38641111/",
                },
                {
                    text: "ResearchGate. Beyond the Food on Your Plate: Investigating sources of microplastic contamination in home kitchens.",
                    link: "https://www.researchgate.net/publication/382541572_Beyond_the_Food_on_Your_Plate_Investigating_sources_of_microplastic_contamination_in_home_kitchens",
                },
                {
                    text: "MDPI. (2022). How Many Microplastics Do We Ingest When Using Disposable Drink Cups. Applied Sciences, 12(5), 2535.",
                    link: "https://www.mdpi.com/2076-3417/12/5/2535",
                },
            ],
        },
        {
            title: "Mobile Phone Case Microplastic Shedding",
            sources: [
                {
                    text: "Yang, X., et al. (2022). Wear-induced microplastic release from mobile phone protective cases. Journal of Hazardous Materials, 436, 129191.",
                    link: "https://www.sciencedirect.com/science/article/pii/S0304389422017058",
                },
            ],
        },
        {
            title: "Reusable Plastic Cups",
            sources: [
                {
                    text: "ResearchGate. How Many Microplastics Do We Ingest When Using Disposable Drink Cups.",
                    link: "https://www.researchgate.net/publication/363530166_How_Many_Microplastics_Do_We_Ingest_When_Using_Disposable_Drink_Cups",
                },
                {
                    text: "PMC (NIH). Microplastic release during cup usage.",
                    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10076389/",
                },
                {
                    text: "SpringerLink. Release of microplastics from reusable drinking cups.",
                    link: "https://link.springer.com/article/10.1007/s11356-023-25433-7",
                },
            ],
        },
        {
            title: "Toothbrush Microplastic Shedding",
            sources: [
                {
                    text: "Zhang, T., et al. (2024). Microplastic release from nylon-6 toothbrush bristles during brushing. Environmental Research, 234, 117512.",
                    link: "https://www.sciencedirect.com/science/article/pii/S0269749123015129",
                },
            ],
        },
    ];

    return (
        <main className="min-h-screen flex flex-col bg-white">
            <nav className="bg-green-900 p-4 flex justify-center space-x-4">
                <button
                    className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => (window.location.href = "/")}
                >
                    Home
                </button>
                <button
                    className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => (window.location.href = "/about")}
                >
                    About
                </button>
                <button
                    className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => (window.location.href = "/references")}
                >
                    References
                </button>
                <button
                    className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => (window.location.href = "/future-work")}
                >
                    Future Work
                </button>
            </nav>
            <div className="flex flex-col items-center justify-start flex-1 text-center mt-4 px-4">
                <h1 className="text-4xl font-bold text-black mb-4">References</h1>
                <div className="text-left">
                    {references.map((ref, index) => (
                        <div key={index} className="mb-6">
                            <h2 className="text-2xl font-semibold text-black mb-2">{ref.title}</h2>
                            <ul className="list-disc list-inside">
                                {ref.sources.map((source, idx) => (
                                    <li key={idx}>
                                        <a
                                            href={source.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {source.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}