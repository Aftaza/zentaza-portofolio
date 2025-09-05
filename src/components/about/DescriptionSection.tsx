import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import AnimatedProfileCard from '@/components/common/ProfileCard';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

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

export function DescriptionSection() {
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="md:col-span-2" variants={itemVariants}>
                <motion.h2 className="text-2xl font-semibold mb-4" variants={itemVariants}>
                    My Journey
                </motion.h2>
                <motion.p className="text-muted-foreground mb-4" variants={itemVariants}>
                    I'm a passionate Fullstack Developer with expertise spanning Software
                    Engineering, Data Science/AI, Cybersecurity, and IoT. With over 5 years of
                    experience in the tech industry, I've had the opportunity to work on diverse
                    projects that have shaped my skills and approach to problem-solving.
                </motion.p>
                <motion.p className="text-muted-foreground mb-4" variants={itemVariants}>
                    My journey began with a hobby in high school, then pursuing a bachelor's degree
                    in Computer Engineering, followed by indirect practical experience in startups
                    and large companies. I have developed a unique ability to bridge the gap between
                    technical implementation and business requirements.
                </motion.p>
                <motion.p className="text-muted-foreground" variants={itemVariants}>
                    When I'm not coding, you can find me contributing to open-source projects,
                    writing technical articles, or exploring the latest advancements in AI and
                    cybersecurity.
                </motion.p>
            </motion.div>
            <motion.div className="flex flex-col items-center" variants={itemVariants}>
                <AnimatedProfileCard variant="circular" />
                <Button asChild variant="outline">
                    <a href="/cv.pdf" download>
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
                    </a>
                </Button>
            </motion.div>
        </motion.div>
    );
}
