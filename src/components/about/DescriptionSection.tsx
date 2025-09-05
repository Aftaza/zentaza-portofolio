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
        // Container dengan height yang lebih besar untuk memberikan ruang scroll
        <div ref={containerRef} className="relative bg-background" style={{ height: '400vh' }}>
            {/* Section yang akan "sticky" di tengah viewport */}
            <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center p-4 bg-background">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* --- Kontainer Teks (dari kiri) --- */}
                    <motion.div
                        className="md:col-span-2 space-y-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <motion.h2 
                            className="text-4xl font-semibold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            My Journey
                        </motion.h2>
                        
                        <motion.p 
                            className="text-muted-foreground mb-6 text-lg leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            I'm a passionate Fullstack Developer with expertise spanning Software
                            Engineering, Data Science/AI, Cybersecurity, and IoT. With over 5 years of
                            experience in the tech industry, I've had the opportunity to work on diverse
                            projects that have shaped my skills and approach to problem-solving.
                        </motion.p>

                        {/* Paragraf dengan animasi scroll bertahap */}
                        <div className="space-y-4">
                            {revealingParagraphs.map((text, index) => (
                                <ScrollRevealParagraph key={index} index={index} containerRef={containerRef}>
                                    {text}
                                </ScrollRevealParagraph>
                            ))}
                        </div>
                    </motion.div>

                    {/* --- Kontainer Profile Card (dari kanan) --- */}
                    <motion.div
                        className="flex flex-col items-center justify-start"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                    >
                        <motion.div 
                            className="mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <AnimatedProfileCard variant="circular" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Button asChild variant="outline" className="w-fit">
                                <a href="/cv.pdf" download>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download CV
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

// Komponen terpisah untuk paragraf yang direveal dengan scroll
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
    const startProgress = 0.3 + delay;
    const endProgress = startProgress + 0.25;

    // Transformasi animasi
    const opacity = useTransform(scrollYProgress, [startProgress, endProgress], [0, 1]);
    const y = useTransform(scrollYProgress, [startProgress, endProgress], [30, 0]);
    const scale = useTransform(scrollYProgress, [startProgress, endProgress], [0.98, 1]);

    return (
        <motion.p
            style={{ opacity, y, scale }}
            className="text-muted-foreground text-lg leading-relaxed"
        >
            {children}
        </motion.p>
    );
}