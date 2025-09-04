import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { badgeVariants } from './ui/badge';
import type { Carousel3DProps } from '@/lib/data'; // Anda bisa rename type ini jika mau

// --- Helper Component untuk Kartu ---
// Memisahkan logika kartu membuat kode lebih bersih.
// Setiap kartu sekarang 'tahu' cara menganimasikan dirinya sendiri berdasarkan scrollYProgress global.
const ProjectCard = ({
    item,
    index,
    scrollYProgress,
    totalItems,
}: {
    item: Carousel3DProps['items'][0];
    index: number;
    scrollYProgress: MotionValue<number>;
    totalItems: number;
}) => {
    const cardStart = index / totalItems;
    const cardEnd = (index + 1) / totalItems;
    const stackPoint1 = (index + 2) / totalItems;
    const stackPoint2 = (index + 3) / totalItems;
    const disappearPoint = (index + 4) / totalItems;

    // Opasitas untuk seluruh motion.div kartu
    const mainOpacity = useTransform(
        scrollYProgress,
        [cardStart, cardEnd, stackPoint2, disappearPoint],
        [0, 1, 1, 0] // Opasitas 0 saat di awal, 1 saat aktif dan 2 di belakang, lalu 0
    );

    const scale = useTransform(
        scrollYProgress,
        [cardStart, cardEnd, stackPoint1, stackPoint2],
        [0.85, 1, 0.95, 0.9]
    );

    const y = useTransform(
        scrollYProgress,
        [cardStart, cardEnd, stackPoint1, stackPoint2],
        [100, 0, 40, 80]
    );

    // Opasitas untuk konten di CardContent (hanya untuk teks)
    // Ini akan membuat teks lebih buram saat kartu tidak aktif
    const contentOpacity = useTransform(
        scrollYProgress,
        [cardStart, cardEnd, stackPoint1],
        [0, 1, 0] // 0.5 di awal, 1 saat aktif, 0.7 saat di tumpukan
    );

    // Pointer events: auto saat kartu aktif, none saat tidak aktif
    const pointerEvents = useTransform(
        scrollYProgress,
        [cardStart, cardEnd, cardEnd + 0.001], // Sedikit setelah kartu aktif
        ['none', 'auto', 'none']
    );

    return (
        <motion.div
            className="absolute top-0 w-full max-w-2xl"
            style={{
                scale,
                y,
                opacity: mainOpacity, // Opasitas keseluruhan
                zIndex: index,
                pointerEvents: pointerEvents as any, // Penting untuk mencegah klik pada kartu belakang
            }}
        >
            <Card className="overflow-hidden bg-background text-foreground border shadow-lg flex flex-col h-[500px]">
                {/* Header Gambar */}
                <div
                    className="relative bg-black p-6 flex items-center justify-center h-48 overflow-hidden"
                    style={{
                        backgroundImage: `url(${item.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                    <motion.div // Tambahkan motion.div untuk opacity header
                        className="relative z-10 text-center text-white"
                        style={{ opacity: contentOpacity }} // Opasitas juga diterapkan pada header teks
                    >
                        <h3 className="text-2xl font-bold mb-2">{item.brand.toUpperCase()}</h3>
                        <div className="w-12 h-1 bg-white mx-auto mb-2" />
                        <p className="text-sm">{item.title}</p>
                    </motion.div>
                </div>

                {/* Konten CardContent */}
                <CardContent className="p-6 flex flex-col flex-grow bg-card">
                    {' '}
                    {/* Tambahkan bg-card di sini */}
                    <motion.div style={{ opacity: contentOpacity }}>
                        {' '}
                        {/* Opasitas pada seluruh CardContent */}
                        <h3 className="text-xl font-bold mb-1 ">{item.title}</h3>
                        <p className="text-muted-foreground text-sm font-medium mb-2">
                            {item.brand}
                        </p>
                        <p className="text-muted-foreground text-sm flex-grow">
                            {item.description}
                        </p>
                        <div className="mt-4">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className={`px-2 py-1 text-xs ${badgeVariants({
                                            variant: 'outline',
                                        })}`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <a
                                href={item.link}
                                className="text-muted-foreground flex items-center hover:underline relative group"
                            >
                                <span className="relative z-10">Learn more</span>
                                <ArrowRight className="ml-2 w-4 h-4 relative z-10" />
                            </a>
                        </div>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

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
