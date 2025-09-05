import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import AnimatedProfileCard from '@/components/common/ProfileCard';
import AuroraText from '@/components/Auroratext';
import AnimatedText from '@/components/common/AnimatedText';

// Terapkan tipe Variants secara eksplisit
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Jeda 0.2 detik antara setiap item
        },
    },
};

// Terapkan tipe Variants secara eksplisit
const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

export function AnimatedHero() {
    const specializations = [
        'Fullstack Developer Specializing in • Software Engineering',
        'Fullstack Developer Specializing in • Data Science/AI',
        'Fullstack Developer Specializing in • Cybersecurity',
        'Fullstack Developer Specializing in • IoT Engineering'
    ];

    return (
        <motion.div
            className="container mx-auto px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
                {/* Kolom Kiri */}
                <div className="flex-1 w-full text-center lg:text-left">
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-start gap-3 mb-6">
                        <span className="text-4xl md:text-5xl lg:text-6xl font-bold">Hi, I'm</span>
                        <AuroraText text="Zentaza" className="text-4xl md:text-5xl lg:text-6xl" />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="h-auto min-h-[6rem] md:min-h-[7rem] lg:min-h-[8rem] mb-8 flex items-center justify-center lg:justify-start"
                    >
                        <AnimatedText 
                            texts={specializations}
                            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl leading-tight"
                        />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                    >
                        <a
                            href="/portfolio"
                            className={
                                buttonVariants({ variant: 'shine', size: 'lg' }) +
                                ' flex items-center justify-center'
                            }
                        >
                            View My Work <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                        <a
                            href="/contact"
                            className={
                                buttonVariants({ variant: 'outline', size: 'lg' }) +
                                ' flex items-center justify-center'
                            }
                        >
                            Get in Touch
                        </a>
                    </motion.div>
                </div>

                {/* Kolom Kanan */}
                <motion.div variants={itemVariants} className="flex-1 w-full">
                    <AnimatedProfileCard variant='rectangular' />
                </motion.div>
            </div>
        </motion.div>
    );
}
