import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import type { Carousel3DProps } from '@/lib/data';
import ProjectCard from '@/components/common/ProjectCard';

// --- Komponen Utama ---
const ProjectStack = ({
    items,
    title = 'From Textile to Intelligence',
    subtitle = 'Customer Cases',
    tagline = 'Explore how our textile sensor technology is revolutionizing multiple industries with intelligent fabric solutions tailored to specific needs.',
}: Carousel3DProps) => {
    // Menggunakan props yang sama
    const containerRef = useRef<HTMLDivElement>(null);

    // Menggunakan useScroll dari Framer Motion untuk melacak progress scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'], // Animasi berjalan dari awal hingga akhir section
    });

    return (
        // Container tinggi untuk memberikan ruang scroll
        <div ref={containerRef} className="relative min-h-[300vh] bg-background mb-20">
            <section
                id="project-stack"
                // Container sticky yang menjadi "panggung" animasi
                className="w-full mx-auto flex flex-col items-center justify-start sticky top-0 h-screen py-10 md:py-12"
            >
                {/* Header Section */}
                <motion.div
                    className="text-center mb-5 px-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
                    <h3 className="text-xl md:text-2xl text-gray-600 mb-6">{subtitle}</h3>
                    <p className="text-gray-500 max-w-3xl mx-auto">{tagline}</p>
                </motion.div>

                {/* Cards Container */}
                <div className="relative flex-grow w-full flex items-center justify-center h-[550px] perspective-1000">
                    {items.map((item, index) => (
                        <ProjectCard
                            key={item.id}
                            item={item}
                            index={index}
                            scrollYProgress={scrollYProgress}
                            totalItems={items.length}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProjectStack;
