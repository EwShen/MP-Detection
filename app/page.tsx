"use client";

import React, { useState, useRef, useEffect } from "react";
import "./home.css";

export default function Home() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [error, setError] = useState("");
    const [cameraActive, setCameraActive] = useState(false);
    const streamRef = useRef<MediaStream | null>(null);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true); // Trigger the fade-in effect when the component mounts
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            console.log("Selected file:", event.target.files[0]);
        }
    };

    const startRecording = async () => {
        if (!isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }

                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        setRecordedChunks((prev) => [...prev, event.data]);
                    }
                };

                mediaRecorder.start();
                setIsRecording(true);
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        }
    };

    const stopRecording = () => {
        if (isRecording && mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach((track) => track.stop());
                videoRef.current.srcObject = null;
            }
            setIsRecording(false);

            const blob = new Blob(recordedChunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            console.log("Recorded video URL:", url);
        }
    };

    const startCamera = async () => {
        setError("");
        try {
            if (navigator.mediaDevices?.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setCameraActive(true);
            } else {
                setError("getUserMedia is not supported in this browser.");
            }
        } catch (err) {
            console.error("Error accessing webcam:", err);
            setError("Error accessing webcam: " + (err as Error).message);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => {
                track.stop();
            });
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
            setCameraActive(false);
        }
    };

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
            <div className="flex flex-col items-center justify-start flex-1 text-center mt-4">
                <div className={`text-container ${fadeIn ? "fade-in" : ""}`}>
                    <p className="text-3xl text-black mt-30 mb-6">
                        "The Human Brain May Contain as Much as a Spoon’s Worth of Microplastics"
                        <br />
                        <span className="block text-center mt-2">- Smithsonian Magazine</span>
                    </p>
                </div>
                    <h1 className="text-4xl font-bold text-black mt-120 mb-4">SafeSwap</h1>
                    <p className="text-lg text-black mb-6">
                        Choose to upload an image of a food item or use your camera to scan it.
                    </p>

                <div className="flex space-x-4">
                    <label className="bg-green-700 hover:bg-green-600 text-shadow-black font-semibold py-2 px-6 rounded cursor-pointer">
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                    <button
                        className="bg-green-700 hover:bg-green-600 text-shadow-black font-semibold py-2 px-6 rounded"
                        onClick={isRecording ? stopRecording : startRecording}
                    >
                        {isRecording ? "Stop Recording" : "Start Recording"}
                    </button>
                </div>

                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="mt-4"
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        display: cameraActive || isRecording ? "block" : "none",
                        border: cameraActive && !isRecording ? "2px solid black" : "none",
                    }}
                ></video>

                {selectedFile && (
                    <p className="mt-4 text-black">
                        Selected file: {selectedFile.name}
                    </p>
                )}
            </div>
        </main>
    );
}
