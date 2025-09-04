import { motion, type Variants } from 'framer-motion';
import { buttonVariants } from '@/components/ui/button';

// Varian untuk container, akan mengatur stagger pada turunannya
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Jeda antar elemen
        },
    },
};

// Varian untuk setiap item di dalam container
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

export function AnimatedCTA() {
    return (
        <motion.section
            className="py-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible" // Memicu 'visible' saat masuk viewport
            viewport={{ amount: 0.4 }} // Animasi berjalan setiap kali 40% elemen terlihat
        >
            <div className="container mx-auto px-4 text-center">
                <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
                    Interested in Working Together?
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    className="text-muted-foreground mb-8 max-w-2xl mx-auto"
                >
                    I'm always open to discussing new projects, creative ideas, or opportunities to
                    be part of your vision.
                </motion.p>
                <motion.div variants={itemVariants}>
                    <a
                        href="/contact"
                        className={
                            buttonVariants({ variant: 'secondary', size: 'lg' }) +
                            ' flex items-center mx-auto w-fit'
                        }
                    >
                        Let's Get Discuss
                    </a>
                </motion.div>
            </div>
        </motion.section>
    );
}
