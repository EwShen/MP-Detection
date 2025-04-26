"use client";

export default function FutureWork() {
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
                <h1 className="text-4xl font-bold text-black mb-4">Future Developments</h1>
                <p className="text-lg text-black mb-6">
                    Future developments will focus on expanding the microplastic database by incorporating a broader range of consumer products and material types. Additionally, we aim to optimize the system for deployment on embedded devices such as Raspberry Pi microcomputers. This would enable practical, low-cost field applications, including microplastic source detection at grocery markets, restaurants, and waste management sites.
                </p>
                <p className="text-lg text-black mb-6">
                    Integrating portable detection units with cloud-based data aggregation could facilitate large-scale mapping of microplastic contamination patterns, informing policy decisions and supporting global mitigation strategies. Improvements in material classification accuracy, object segmentation, and real-time feedback capabilities are also planned to enhance user interaction and data reliability.
                </p>
            </div>
        </main>
    );
}