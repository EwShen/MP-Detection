"use client";

export default function About() {
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
                <h1 className="text-4xl font-bold text-black mb-4">About</h1>
                <section className="text-left mb-6">
                    <h2 className="text-2xl font-semibold text-black mb-2">Background and Summary</h2>
                    <p className="text-lg text-black">
                        Recent studies estimate that the human brain may contain as much as a spoon’s worth of microplastics over a lifetime.
                        As global dependence on plastics increases unsustainably, microplastic exposure's health and ecological impacts have emerged as critical areas of concern.
                        Microplastics, tiny plastic particles typically less than 5 millimeters in size, fragment from everyday consumer products such as water bottles, toothbrushes, utensils, and food packaging.
                    </p>
                </section>
                <section className="text-left mb-6">
                    <h2 className="text-2xl font-semibold text-black mb-2">Health</h2>
                    <p className="text-lg text-black">
                        Microplastic exposure is associated with a range of adverse health outcomes, including dementia, birth defects, inflammatory diseases, and potential carcinogenesis.
                        The bioaccumulation of microplastics in human tissues, including the circulatory and central nervous systems, highlights the urgent need for detection, monitoring, and prevention strategies.
                    </p>
                </section>
                <section className="text-left">
                    <h2 className="text-2xl font-semibold text-black mb-2">What We Use</h2>
                    <p className="text-lg text-black">
                        Our project proposes a microplastic detection tool utilizing computer vision technologies, specifically OpenCV and YOLOv8, to recognize and quantify potential microplastic sources through image analysis.
                        Our system integrates a custom microplastic database with real-time scanning capability, enabling users to assess commonly encountered objects for microplastic shedding risk.
                        By providing accessible detection tools, we aim to increase public awareness about the pervasive threat of microplastic contamination.
                    </p>
                </section>
            </div>
        </main>
    );
}