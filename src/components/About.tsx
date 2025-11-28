'use client'

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function About(){
    // Add all your image paths here
    const images = [
        "/headshot.jpg",
        "/hike1.jpg",
        "/bonsai.JPG",
        "/eugene.JPG",
        "/pony.JPG",
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
        <div className="flex flex-row gap-8">
            <div className="w-[300px]">
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
            
            <div>hello</div>
        </div>
    )
}