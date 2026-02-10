'use client'

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function About(){
    const images = [
        "/headshot.webp",
        "/hike1.webp",
        "/bonsai.webp",
        "/eugene.webp",
        "/pony.webp",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="flex flex-row gap-8 w-237.5">
            <div className="w-70">
                <div className="relative w-full aspect-2/3">
                    <Image 
                        src={images[currentIndex]} 
                        alt={`Image ${currentIndex + 1}`}
                        className="rounded-lg shadow-lg object-cover"
                        fill
                    />
                    
                    {images.length > 1 && (
                        <button
                            onClick={goToPrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/15 hover:bg-black/10 text-white rounded-full p-2 transition-all"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}

                    {images.length > 1 && (
                        <button
                            onClick={goToNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/15 hover:bg-black/10 text-white rounded-full p-2 transition-all"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
            
            <div className="flex-1 text-zinc-900 flex flex-col gap-4">
                <h2 className="text-5xl font-bold mb-2">Hey!
                </h2>
                <div className=" flex flex-col gap-8 justify-center items-center">
                    <p className="leading-relaxed text-xl mr-auto">
                        I&apos;m a Computer Science student at Virginia Tech graduating May 2027.
                    </p>
                    <p className="leading-relaxed text-xl">
                        I&apos;m double majoring in Computer Science and Computational Modeling & Data Analytics.
                    </p>
                    <p className="leading-relaxed text-xl">
                        I&apos;m interested in full stack development, data science, and love to explore new things.
                    </p>
                    <p className="leading-relaxed text-xl">
                        Outside of work, I enjoy lifting, playing tennis, pickleball, thrifting, and listening to music.
                    </p>
                    <button className="bg-red-500 font-bold text-white px-4 py-2 rounded-md mt-4 mr-24 mb-4">Resume</button>
                </div>
            </div>
        </div>
    )
}