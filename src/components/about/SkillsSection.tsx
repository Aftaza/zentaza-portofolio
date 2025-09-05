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

const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
    hover: {
        y: -5,
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
};

const skillCategories = [
    {
        title: 'Software Engineering',
        icon: '💻',
        skills: [
            { name: 'JavaScript/TypeScript', level: 'Expert' },
            { name: 'React/Vue', level: 'Expert' },
            { name: 'Node.js/Python', level: 'Advanced' },
            { name: 'Cloud (AWS/GCP)', level: 'Advanced' },
        ],
    },
    {
        title: 'Data Science & AI',
        icon: '📈',
        skills: [
            { name: 'Python (Pandas, NumPy)', level: 'Advanced' },
            { name: 'Machine Learning', level: 'Intermediate' },
            { name: 'TensorFlow/PyTorch', level: 'Intermediate' },
            { name: 'Data Visualization', level: 'Advanced' },
        ],
    },
    {
        title: 'Cybersecurity',
        icon: '🔒',
        skills: [
            { name: 'OWASP Top 10', level: 'Expert' },
            { name: 'Secure Coding', level: 'Advanced' },
            { name: 'Penetration Testing', level: 'Intermediate' },
            { name: 'Compliance (GDPR, HIPAA)', level: 'Advanced' },
        ],
    },
    {
        title: 'IoT Solutions',
        icon: '🌐',
        skills: [
            { name: 'Embedded Systems', level: 'Advanced' },
            { name: 'Arduino/Raspberry Pi', level: 'Expert' },
            { name: 'MQTT/CoAP Protocols', level: 'Advanced' },
            { name: 'Edge Computing', level: 'Intermediate' },
        ],
    },
];

export function SkillsSection() {
    return (
        <motion.section initial="hidden" animate="visible" variants={containerVariants}>
            <motion.h2 className="text-2xl font-semibold mb-6" variants={itemVariants}>
                Skills & Expertise
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={index}
                        className="bg-card rounded-lg p-6 border border-border"
                        variants={cardVariants}
                        whileHover="hover"
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h3
                            className="text-xl font-semibold mb-4 flex items-center"
                            whileHover={{ x: 5 }}
                        >
                            <span className="mr-2">{category.icon}</span> {category.title}
                        </motion.h3>
                        <ul className="space-y-2">
                            {category.skills.map((skill, skillIndex) => (
                                <motion.li
                                    key={skillIndex}
                                    className="flex justify-between"
                                    whileHover={{ x: 3 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <span>{skill.name}</span>
                                    <span className="text-muted-foreground">{skill.level}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
