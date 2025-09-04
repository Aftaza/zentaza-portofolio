import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

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
                    backgroundColor: Math.random() > 0.5 ? '#388bff30' : '#a371f730',
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

// Tipe untuk props Character
interface CharacterProps {
    char: string;
    index: number;
    count: MotionValue<number>;
}

// Sub-komponen untuk setiap karakter agar lebih rapi dan optimal
const Character: React.FC<CharacterProps> = ({ char, index, count }) => {
    // Transisi opacity dan Y yang lebih halus.
    // Karakter akan mulai fade-in dan bergerak naik saat scroll 'mendekati' index-nya.
    const opacity = useTransform(count, [index - 0.5, index], [0.1, 1], { clamp: true });
    const y = useTransform(count, [index - 0.5, index], [10, 0], { clamp: true });

    return (
        <motion.span
            className="relative inline-block"
            style={{ y }}
        >
            {/* Lapisan 1: Teks OUTLINE (selalu terlihat) */}
            <span
                className="text-transparent"
                style={{ WebkitTextStroke: '0.2px var(--foreground)' }}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>

            {/* Lapisan 2: Teks SOLID/BULK (dianimasikan) */}
            <motion.span
                className="absolute top-0 left-0"
                style={{ opacity }}
            >
                {char === ' ' ? '\u00A0' : char}
            </motion.span>
        </motion.span>
    );
};


const ScrollControlledTyping: React.FC<ScrollControlledTypingProps> = ({
    text,
    className = '',
}) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start center', 'end center'],
    });

    const count = useTransform(scrollYProgress, [0, 1], [0, text.length]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    // [FIX UTAMA] Pecah teks menjadi kata-kata, bukan karakter
    const words = text.split(' ');
    let charIndex = 0;

    return (
        <div ref={targetRef} className="relative h-[250vh]">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ scale, opacity }}
                    className={`absolute inset-0 ${className}`}
                />
                <Particles />

                {/* Decorative elements */}
                <motion.div
                    className="absolute top-20 left-20 w-32 h-32 rounded-full"
                    animate={{ x: [0, 50, -30, 0], y: [0, -30, 20, 0], scale: [1, 1.2, 0.8, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-yellow-500/20 blur-xl"
                    animate={{ x: [0, -40, 30, 0], y: [0, 25, -15, 0], scale: [1, 0.8, 1.3, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative z-10 flex flex-col justify-between items-center w-full max-w-6xl h-full p-6 md:p-8">
                    
                    <div className="flex-grow flex items-center justify-center">
                        <motion.p
                            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight flex flex-wrap justify-center items-center text-center"
                            aria-hidden="true"
                        >
                            {/* [FIX UTAMA] Lakukan map pada array 'words' */}
                            {words.map((word, wordIndex) => (
                                <span key={`word-${wordIndex}`} className="inline-block mr-[0.25em]"> {/* Wrapper untuk setiap kata */}
                                    {word.split('').map((char) => {
                                        // Gunakan charIndex untuk menjaga urutan animasi global
                                        const currentIndex = charIndex;
                                        charIndex++;
                                        return <Character key={`char-${currentIndex}`} char={char} index={currentIndex} count={count} />;
                                    })}
                                </span>
                            ))}
                        </motion.p>
                    </div>

                    <motion.div
                        className="w-full max-w-sm text-center"
                        style={{ opacity }}
                    >
                        <div className="w-full h-1 bg-background/20 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
                                style={{
                                    scaleX: scrollYProgress,
                                    transformOrigin: 'center'
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
