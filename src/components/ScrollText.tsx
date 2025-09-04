// src/components/ScrollControlledTyping.tsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Tipe untuk props komponen
interface ScrollControlledTypingProps {
    text: string;
    className?: string;
}

// Sub-komponen untuk partikel agar JSX utama lebih bersih
const Particles: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    backgroundColor: Math.random() > 0.5 ? '#388bff30' : '#a371f730', // Electric Blue or Vibrant Purple with transparency
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: [0, 1, 0],
                    y: [0, -80 - Math.random() * 80],
                    scale: [0, 1, 0],
                }}
                transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 6,
                    ease: 'easeInOut',
                }}
            />
        ))}
    </div>
);

const ScrollControlledTyping: React.FC<ScrollControlledTypingProps> = ({
    text,
    className = '',
}) => {
    // 1. Ref untuk elemen container utama
    const targetRef = useRef<HTMLDivElement>(null);

    // 2. Melacak progress scroll pada elemen `targetRef`
    // Animasi dimulai saat tengah container bertemu tengah viewport
    // Animasi berakhir saat dasar container bertemu dasar viewport
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start center', 'end center'],
    });

    // 3. Transformasi progress (0-1) menjadi jumlah karakter (0-panjang teks)
    const count = useTransform(scrollYProgress, [0, 1], [0, text.length]);
    const roundedCount = useTransform(count, (latest) => Math.round(latest));

    // 4. Transformasi progress untuk efek visual lain
    // Scale effect untuk container
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        // Container ini harus lebih tinggi dari viewport untuk menciptakan durasi scroll.
        // Ini adalah kunci dari "scroll-locking" effect tanpa JavaScript.
        <div ref={targetRef} className="relative h-[250vh]">
            {/* Elemen sticky ini akan "menempel" di layar saat di-scroll,
          menciptakan ilusi bahwa halaman berhenti bergerak. */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{
                        scale,
                        opacity,
                    }}
                    className={`absolute inset-0 ${className}`}
                />
                <Particles />

                {/* Decorative elements */}
                <motion.div
                    className="absolute top-20 left-20 w-32 h-32 rounded-full"
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -30, 20, 0],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                <motion.div
                    className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-yellow-500/20 blur-xl"
                    animate={{
                        x: [0, -40, 30, 0],
                        y: [0, 25, -15, 0],
                        scale: [1, 0.8, 1.3, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                <div className="relative z-10 p-6 md:p-8 max-w-6xl text-center">

                    {/* Animated text overlay */}
                    <motion.p
                        className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight flex flex-wrap justify-center items-center"
                        aria-hidden="true"
                    >
                        {text.split('').map((char, index) => {
                            // Tentukan opacity untuk teks solid (bulk)
                            const charOpacity = useTransform(roundedCount, (latest) =>
                                index < latest ? 1 : 0
                            );

                            // Tentukan Y-offset untuk efek "muncul"
                            const charY = useTransform(roundedCount, (latest) =>
                                index < latest ? 0 : 20
                            );

                            return (
                                // Container untuk setiap karakter
                                <motion.span
                                    key={`char-${index}`}
                                    className="relative inline-block"
                                    style={{ y: charY }}
                                >
                                    {/* Lapisan 1: Teks OUTLINE (selalu terlihat) */}
                                    <span
                                        className="text-transparent"
                                        style={{ WebkitTextStroke: '1px var(--foreground))' }}
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>

                                    {/* Lapisan 2: Teks SOLID/BULK (dianimasikan opacity-nya) */}
                                    <motion.span
                                        className="absolute top-0 left-0"
                                        style={{ opacity: charOpacity }}
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                </motion.span>
                            );
                        })}
                    </motion.p>

                    {/* Progress indicator */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                        style={{ opacity }}
                    >
                        <div className="w-64 h-1 bg-background/20 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
                                style={{
                                    scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]),
                                }}
                            />
                        </div>
                        <p className="text-foreground/60 text-sm mt-2 font-medium">
                            Scroll to reveal the message
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ScrollControlledTyping;
