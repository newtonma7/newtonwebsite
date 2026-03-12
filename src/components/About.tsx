'use client'

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const CAROUSEL_WIDTH = 190;

export default function About(){
    const images = [
        "/images/headshot.webp",
        "/images/hike1.webp",
        "/images/bonsai.webp",
        "/images/eugene.webp",
        "/images/pony.webp",
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

    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    return (
        <div className="flex flex-row gap-8 w-full max-w-[640px] mx-auto items-start -translate-x-12">
            <div className="w-[190px] shrink-0 flex flex-col items-center">
                <div className="relative w-full aspect-2/3 overflow-hidden rounded-lg shadow-lg">
                    {/* Preload next/prev images in background so they're ready when user clicks */}
                    <div className="absolute inset-0 z-0 opacity-0 pointer-events-none" aria-hidden>
                        <Image
                            src={images[nextIndex]}
                            alt=""
                            fill
                            className="object-cover"
                            sizes={`${CAROUSEL_WIDTH}px`}
                        />
                        <Image
                            src={images[prevIndex]}
                            alt=""
                            fill
                            className="object-cover"
                            sizes={`${CAROUSEL_WIDTH}px`}
                        />
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={images[currentIndex]}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="relative w-full h-full z-10"
                        >
                            <Image
                                src={images[currentIndex]}
                                alt={`Image ${currentIndex + 1}`}
                                className="object-cover"
                                fill
                                sizes={`${CAROUSEL_WIDTH}px`}
                                priority={currentIndex === 0}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {images.length > 1 && (
                    <div className="mt-3 flex w-full items-center justify-between text-xs text-zinc-500">
                        <button
                            onClick={goToPrevious}
                            className="flex items-center gap-1 rounded-full border border-zinc-300 px-2 py-1 hover:border-[#E31637] hover:text-zinc-800 transition-colors duration-500"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>prev</span>
                        </button>

                        <span className="tracking-wide">
                            {currentIndex + 1} / {images.length}
                        </span>

                        <button
                            onClick={goToNext}
                            className="flex items-center gap-1 rounded-full border border-zinc-300 px-2 py-1 hover:border-[#E31637] hover:text-zinc-800 transition-colors duration-500"
                            aria-label="Next image"
                        >
                            <span>next</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
            
            <div className="flex-1 text-zinc-900 flex flex-col gap-4 mb-6">
                <ul className="flex flex-col gap-3 justify-center items-start list-disc list-inside text-lg leading-normal lowercase mr-auto [&_li]:whitespace-nowrap">
                    <li>
                        <span>currently:</span>
                        <ul className="mt-1 ml-4 flex flex-col gap-1 list-disc list-inside text-lg">
                            <li>
                                student software developer for vt university libraries
                                <ul className="mt-1 ml-4 flex flex-col gap-1 list-disc list-inside text-lg">
                                <span className=" text-zinc-800"><li>building SIP application for data archival</li></span>
                                </ul>
                            </li>
                            <li>undergraduate researcher at vt <span className=" text-zinc-400">(BURGS XR vulnerabilities)</span></li>
                            <li>training to be a future 10x dev</li>
                        </ul>
                    </li>
                    <li>student at virginia tech, graduating <span className="red-underline">may 2027</span>
                        <ul className="mt-1 ml-4 flex flex-col gap-1 list-disc list-inside text-lg">
                        <span className=" text-zinc-800"><li>double major in computer science and computational modeling & data analytics</li></span>
                        </ul>
                    </li>
                    <li>interested in software engineering roles, full stack, applied data science, and exploring new things!</li>
                    <li>outside of work i enjoy hiking, lifting, tennis, eating, thrifting, and music</li>
                </ul>
            </div>
        </div>
    )
}