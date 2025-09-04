import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import HeroProfileCard from '@/components/home/ProfileCard';
import AuroraText from '@/components/Auroratext';
import { TypeAnimation } from 'react-type-animation';

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
    return (
        <motion.div
            className="container mx-auto px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Kolom Kiri */}
                <div className="flex-1 text-center lg:text-left">
                    <motion.div variants={itemVariants} className="flex items-start gap-3 mb-6">
                        <span className="text-4xl md:text-6xl text-start font-bold">Hi, I'm</span>
                        <AuroraText text="Zentaza" />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="h-20 md:h-24 mb-8 flex items-center justify-center lg:justify-start"
                    >
                        <TypeAnimation
                            sequence={[
                                'Fullstack Developer Specializing in • Software Engineering',
                                1000,
                                'Fullstack Developer Specializing in • Data Science/AI',
                                1000,
                                'Fullstack Developer Specializing in • Cybersecurity',
                                1000,
                                'Fullstack Developer Specializing in • IoT Engineering',
                                1000,
                            ]}
                            wrapper="p"
                            speed={50}
                            className="text-2xl md:text-3xl text-muted-foreground max-w-2xl leading-tight"
                            repeat={Infinity}
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
                                ' flex items-center'
                            }
                        >
                            View My Work <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                        <a
                            href="/contact"
                            className={
                                buttonVariants({ variant: 'outline', size: 'lg' }) +
                                ' flex items-center'
                            }
                        >
                            Get in Touch
                        </a>
                    </motion.div>
                </div>

                {/* Kolom Kanan */}
                <motion.div variants={itemVariants} className="flex-1 w-full">
                    <HeroProfileCard />
                </motion.div>
            </div>
        </motion.div>
    );
}
