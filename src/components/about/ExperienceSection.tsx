import React from 'react';
import { motion, type Variants } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
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

const experiences = [
    {
        title: 'Freelancer Design and Developer',
        company: 'Online Platform',
        period: '2022 - Present',
        description:
            'Built MVPs for startup clients using various technologies. Gained experience in full development lifecycle from conception to deployment.',
    },
    {
        title: 'Head Programmer Division',
        company: 'Robotiik Filkom UB.',
        period: '2023 - 2025',
        description:
            'Leading a team of programmers in designing architecture and developing various scalable projects for team and project management. Implementing various machine learning algorithms from the perspective of movement and vision, as well as providing intensive mentoring to 5+ junior developers, significantly improving team productivity.',
    },
    {
        title: 'IT Assistant CTF Competition',
        company: 'Hology 5.0 FIlkom UB',
        period: '2023',
        description:
            'Developing and maintaining the Capture The Flag (CTF) competition platform infrastructure that supports hundreds of participants. Implementing crucial security features and integrating APIs for real-time scoreboards using Python, Django, and React.',
    },
];

export function ExperienceSection() {
    return (
        <motion.section
            className="mb-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h2 className="text-2xl font-semibold mb-6" variants={itemVariants}>
                Experience
            </motion.h2>
            <div className="space-y-6">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        className="border-l-2 border-primary pl-4 py-1"
                        variants={itemVariants}
                    >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <motion.h3
                                className="text-xl font-medium"
                                whileHover={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {exp.title}
                            </motion.h3>
                            <motion.span
                                className="text-sm text-muted-foreground"
                                whileHover={{ scale: 1.05 }}
                            >
                                {exp.period}
                            </motion.span>
                        </div>
                        <motion.p
                            className="text-primary"
                            initial={{ opacity: 0.7 }}
                            whileHover={{ opacity: 1 }}
                        >
                            {exp.company}
                        </motion.p>
                        <motion.p
                            className="text-muted-foreground mt-2"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                        >
                            {exp.description}
                        </motion.p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
