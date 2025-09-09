import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import AnimatedProfileCard from '@/components/common/ProfileCard';

// Teks untuk paragraf yang akan di-render
const revealingParagraphs = [
    "My journey began with a hobby in high school, then pursuing a bachelor's degree in Computer Engineering, followed by indirect practical experience in startups and large companies. I have developed a unique ability to bridge the gap between technical implementation and business requirements.",
    "When I'm not coding, you can find me contributing to open-source projects, writing technical articles, or exploring the latest advancements in AI and cybersecurity.",
];

export function DescriptionSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        // Container dengan height yang berbeda untuk mobile dan desktop
        <div ref={containerRef} className="relative bg-background mt-12 mb-12 md:mt-0 md:h-[200vh]">
            {/* Section yang akan "sticky" di tengah viewport */}
            <div className="md:sticky md:top-0 md:left-0 w-full md:h-screen flex items-center justify-center p-4 bg-background">
                <motion.div
                    className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8 items-center md:items-start max-w-6xl w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* --- Profile Card Section (Mobile: Top, Desktop: Right) --- */}
                    <motion.div
                        className="order-1 md:order-2 md:col-span-1 flex flex-col items-center justify-center md:justify-start w-full"
                        initial={{ opacity: 0, y: -30, x: 0 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ 
                            duration: 0.8, 
                            ease: 'easeOut', 
                            delay: 0.2
                        }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.div 
                            className="mb-4 md:mb-6 w-full max-w-[200px] md:max-w-xs"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <AnimatedProfileCard variant="circular" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <Button asChild variant="outline" className="w-fit text-sm md:text-base">
                                <a href="/cv.pdf" download>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download CV
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* --- Text Content Section (Mobile: Bottom, Desktop: Left) --- */}
                    <motion.div
                        className="order-2 md:order-1 md:col-span-2 space-y-4 text-center md:text-left"
                        initial={{ opacity: 0, y: 30, x: 0 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ 
                            duration: 0.8, 
                            ease: 'easeOut', 
                            delay: 0.6
                        }}
                    >
                        <motion.h2 
                            className="text-2xl md:text-4xl font-semibold mb-3 md:mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            My Journey
                        </motion.h2>
                        
                        <motion.p 
                            className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-lg leading-relaxed max-w-none md:max-w-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                        >
                            I'm a passionate Fullstack Developer with expertise spanning Software
                            Engineering, Data Science/AI, Cybersecurity, and IoT. With over 5 years of
                            experience in the tech industry, I've had the opportunity to work on diverse
                            projects that have shaped my skills and approach to problem-solving.
                        </motion.p>

                        {/* Paragraf dengan animasi scroll bertahap - Hanya untuk desktop */}
                        <div className="space-y-4 hidden md:block">
                            {revealingParagraphs.map((text, index) => (
                                <ScrollRevealParagraph key={index} index={index} containerRef={containerRef}>
                                    {text}
                                </ScrollRevealParagraph>
                            ))}
                        </div>

                        {/* Paragraf statis untuk mobile */}
                        <div className="space-y-4 md:hidden">
                            {revealingParagraphs.map((text, index) => (
                                <motion.p
                                    key={index}
                                    className="text-muted-foreground text-sm leading-relaxed"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.2 + (index * 0.2) }}
                                >
                                    {text}
                                </motion.p>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

// Komponen terpisah untuk paragraf yang direveal dengan scroll (hanya untuk desktop)
function ScrollRevealParagraph({ 
    children, 
    index, 
    containerRef 
}: React.PropsWithChildren<{ 
    index: number; 
    containerRef: React.RefObject<HTMLDivElement | null>; 
}>) {
    // Menggunakan scroll progress dari container utama
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Timing berbeda untuk setiap paragraf
    const delay = index * 0.1; // Delay bertambah untuk setiap paragraf
    const startProgress = 0.1 + delay;
    const endProgress = startProgress + 0.15; // Sedikit lebih lama untuk transisi yang lebih smooth

    // Transformasi animasi
    const opacity = useTransform(scrollYProgress, [startProgress, endProgress], [0, 1]);
    const y = useTransform(scrollYProgress, [startProgress, endProgress], [30, 0]);
    const scale = useTransform(scrollYProgress, [startProgress, endProgress], [0.98, 1]);

    return (
        <motion.p
            style={{ opacity, y, scale }}
            className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed"
        >
            {children}
        </motion.p>
    );
}