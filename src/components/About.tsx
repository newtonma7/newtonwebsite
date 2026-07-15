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
        <div className="w-full flex justify-center">
          <div className="flex flex-row gap-8 items-stretch rounded-2xl border border-zinc-200/40 bg-white/5 backdrop-blur-sm shadow-[0_1px_4px_rgba(0,0,0,0.05)] px-8 py-8">
            <div className="w-[190px] shrink-0 flex flex-col items-center pb-[25px]">
                <div className="relative w-full flex-1 min-h-0 overflow-hidden rounded-lg shadow-lg">
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
            
            <div className="w-[420px] text-zinc-900 flex flex-col gap-6 lowercase">
                <section className="flex flex-col gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                        currently
                    </h3>
                    <hr className="border-t border-zinc-200" />
                    <ul className="flex flex-col gap-1.5 list-disc list-inside text-lg leading-snug marker:text-zinc-900">
                        <li>federal software developer intern at IBM</li>
                        <li>break through tech AI fellow + code path alum</li>
                        <li>training to be a future 10x dev</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                        education
                    </h3>
                    <hr className="border-t border-zinc-200" />
                    <ul className="flex flex-col gap-1.5 list-disc list-inside text-lg leading-snug marker:text-zinc-900">
                        <li>cs student at virginia tech, graduating <span className="red-underline">may 2027</span></li>
                        <li>B.S. in computer science + math minor</li>
                        <li>aws solutions architect certified (AWS-SAA)</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                        other
                    </h3>
                    <hr className="border-t border-zinc-200" />
                    <ul className="flex flex-col gap-1.5 list-disc list-inside text-lg leading-snug marker:text-zinc-900">
                        <li>interested in full-stack, agentic ai + ML, and web design</li>
                        <li>outside of work i enjoy eating, hiking, and music!</li>
                    </ul>
                </section>
            </div>
          </div>
        </div>
    )
}