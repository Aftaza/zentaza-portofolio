import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useScroll, useTransform } from 'framer-motion';
import { badgeVariants } from './ui/badge';
import type { Carousel3DProps } from '@/lib/data';

const Carousel3D = ({
    items,
    autoRotate = false,
    rotateInterval = 4000,
    cardHeight = 500,
    title = 'From Textile to Intelligence',
    subtitle = 'Customer Cases',
    tagline = 'Explore how our textile sensor technology is revolutionizing multiple industries with intelligent fabric solutions tailored to specific needs.',
}: Carousel3DProps) => {
    const [active, setActive] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(false);

    // Framer Motion scroll tracking - hanya untuk container ini
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'], // Lebih presisi
    });

    // Intersection observer untuk mendeteksi kapan komponen berada di viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Transform scroll progress ke active index - hanya jika scroll enabled
    const activeIndex = useTransform(
        scrollYProgress, 
        [0, 1], 
        [0, items.length - 1]
    );

    // Update active state berdasarkan scroll - hanya jika di dalam viewport
    useEffect(() => {
        if (!scrollEnabled) return;

        const unsubscribe = activeIndex.onChange((latest) => {
            const roundedIndex = Math.round(latest);
            if (roundedIndex !== active && roundedIndex >= 0 && roundedIndex < items.length) {
                setActive(roundedIndex);
            }
        });

        return () => unsubscribe();
    }, [activeIndex, active, items.length, scrollEnabled]);

    // Update active state berdasarkan scroll
    useEffect(() => {
        // Logika `scrollEnabled` dihapus, karena `useScroll` sudah terikat pada `containerRef`.
        const unsubscribe = activeIndex.onChange((latest) => {
            const roundedIndex = Math.round(latest);
            if (roundedIndex !== active && roundedIndex >= 0 && roundedIndex < items.length) {
                setActive(roundedIndex);
            }
        });
        return () => unsubscribe();
    }, [activeIndex, active, items.length]);

    // Auto-rotate hanya ketika komponen terlihat dan tidak di-hover
    useEffect(() => {
        // Logika `scrollEnabled` dihapus
        if (autoRotate && isInView && !isHovering) {
            const interval = setInterval(() => {
                // Jangan auto-rotate jika pengguna sedang scrolling di tengah-tengah
                if (scrollYProgress.get() > 0 && scrollYProgress.get() < 1) return;
                setActive((prev) => (prev + 1) % items.length);
            }, rotateInterval);
            return () => clearInterval(interval);
        }
    }, [isInView, isHovering, autoRotate, rotateInterval, items.length, scrollYProgress]);


    // Manual navigation dengan keyboard
    useEffect(() => {
        if (!isInView) return;
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setActive((prev) => (prev - 1 + items.length) % items.length);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                setActive((prev) => (prev + 1) % items.length);
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isInView, items.length]);

    const getCardAnimationProps = (index: number) => {
        const isActive = index === active;
        const isNext = index === (active + 1) % items.length;
        const isPrev = index === (active - 1 + items.length) % items.length;

        if (isActive) {
            return {
                scale: 1,
                x: 0,
                opacity: 1,
                zIndex: 20,
                rotateY: 0,
            };
        } else if (isNext) {
            return {
                scale: 0.95,
                x: '40%',
                opacity: 0.6,
                zIndex: 10,
                rotateY: -15,
            };
        } else if (isPrev) {
            return {
                scale: 0.95,
                x: '-40%',
                opacity: 0.6,
                zIndex: 10,
                rotateY: 15,
            };
        } else {
            return {
                scale: 0.9,
                x: 0,
                opacity: 0,
                zIndex: 0,
                rotateY: 0,
            };
        }
    };

    return (
        <div ref={containerRef} className="relative min-h-[300vh]">
            <section
                id="carousel3d"
                className="bg-transparent min-w-full mx-auto flex items-center justify-center sticky top-0 h-screen"
            >
                <div className="w-full px-4 sm:px-6 lg:px-8 min-w-[350px] md:min-w-[1000px] max-w-7xl">
                    {/* Header Section */}
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            {title}
                        </h2>
                        <h3 className="text-xl md:text-2xl text-gray-600 mb-6">{subtitle}</h3>
                        <p className="text-gray-500 max-w-3xl mx-auto">{tagline}</p>
                    </motion.div>

                    <div
                        className="relative overflow-hidden h-[550px] perspective-1000"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        ref={carouselRef}
                    >
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            {items.map((item, index) => {
                                const animProps = getCardAnimationProps(index);

                                return (
                                    <motion.div
                                        key={item.id}
                                        className="absolute top-0 w-full max-w-md"
                                        animate={animProps}
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                        style={{
                                            transformStyle: 'preserve-3d',
                                        }}
                                    >
                                        <Card
                                            className={`overflow-hidden bg-background h-[${cardHeight}px] border shadow-lg 
                                            hover:shadow-xl flex flex-col transition-shadow duration-300`}
                                        >
                                            <motion.div
                                                className="relative bg-black p-6 flex items-center justify-center h-48 overflow-hidden"
                                                style={{
                                                    backgroundImage: `url(${item.imageUrl})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="absolute inset-0 bg-black/50" />
                                                <motion.div
                                                    className="relative z-10 text-center text-white"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <h3 className="text-2xl font-bold mb-2">
                                                        {item.brand.toUpperCase()}
                                                    </h3>
                                                    <motion.div
                                                        className="w-12 h-1 bg-white mx-auto mb-2"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: 48 }}
                                                        transition={{ delay: 0.4, duration: 0.5 }}
                                                    />
                                                    <p className="text-sm">{item.title}</p>
                                                </motion.div>
                                            </motion.div>

                                            <CardContent className="p-6 flex flex-col flex-grow">
                                                <motion.h3
                                                    className="text-xl font-bold mb-1 text-foreground"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    {item.title}
                                                </motion.h3>
                                                <motion.p
                                                    className="text-gray-500 text-sm font-medium mb-2"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    {item.brand}
                                                </motion.p>
                                                <motion.p
                                                    className="text-gray-600 text-sm flex-grow"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.5 }}
                                                >
                                                    {item.description}
                                                </motion.p>

                                                <motion.div
                                                    className="mt-4"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.6 }}
                                                >
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {item.tags.map((tag, idx) => (
                                                            <motion.span
                                                                key={idx}
                                                                className={`px-2 py-1 text-xs ${badgeVariants({ variant: 'outline' })}`}
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{
                                                                    delay: 0.7 + idx * 0.1,
                                                                }}
                                                                whileHover={{ scale: 1.05 }}
                                                            >
                                                                {tag}
                                                            </motion.span>
                                                        ))}
                                                    </div>

                                                    <a
                                                        href={item.link}
                                                        className="text-gray-500 flex items-center hover:underline relative group"
                                                        onClick={() => {
                                                            if (item.link.startsWith('/')) {
                                                                window.scrollTo(0, 0);
                                                            }
                                                        }}
                                                    >
                                                        <span className="relative z-10">
                                                            Learn more
                                                        </span>
                                                        <motion.div
                                                            whileHover={{ x: 4 }}
                                                            transition={{
                                                                type: 'spring',
                                                                stiffness: 400,
                                                            }}
                                                        >
                                                            <ArrowRight className="ml-2 w-4 h-4 relative z-10" />
                                                        </motion.div>
                                                        <motion.span
                                                            className="absolute left-0 bottom-0 h-0.5 bg-gray-500"
                                                            initial={{ width: 0 }}
                                                            whileHover={{ width: '100%' }}
                                                            transition={{ duration: 0.3 }}
                                                        />
                                                    </a>
                                                </motion.div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Progress Indicators */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
                            {items.map((_, idx) => (
                                <motion.button
                                    key={idx}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        active === idx
                                            ? 'bg-gray-500'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                                    animate={{
                                        width: active === idx ? 20 : 8,
                                        opacity: active === idx ? 1 : 0.6,
                                    }}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setActive(idx)}
                                    aria-label={`Go to item ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Scroll Indicator - hanya tampil ketika scroll enabled */}
                        <motion.div
                            className="absolute top-4 right-4 text-gray-400 text-sm z-30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isInView ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center space-x-2">
                                <span>Scroll to explore</span>
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="w-1 h-6 bg-gray-300 rounded-full"
                                />
                            </div>
                        </motion.div>

                        {/* Navigation Arrows - untuk manual control */}
                        <button
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
                            onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
                            aria-label="Previous item"
                        >
                            <ArrowRight className="w-5 h-5 rotate-180 text-gray-600" />
                        </button>
                        
                        <button
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
                            onClick={() => setActive((prev) => (prev + 1) % items.length)}
                            aria-label="Next item"
                        >
                            <ArrowRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Carousel3D;