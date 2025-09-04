import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import {
    TbCode,
    TbBrain,
    TbShieldLock,
    TbRouter,
    TbDeviceMobileCode,
    TbApi,
    TbChartDots3,
    TbBrandPython,
    TbBug,
    TbCloudLock,
    TbCpu2,
    TbCloudDataConnection,
    TbDatabaseCog,
    TbServerCog,
    TbWorldCode,
    TbFileDatabase,
    TbShieldCheckeredFilled
} from 'react-icons/tb';
import type { SkillCard } from '@/lib/data';
import { Badge } from '../ui/badge';

const cards: SkillCard[] = [
    {
        id: 'fullstack',
        title: 'Fullstack Software Engineer',
        description:
            'Building robust end-to-end applications, from interactive user interfaces to scalable backend architectures.',
        icon: <TbCode className="w-6 h-6" />,
        features: [
            { icon: <TbWorldCode className="w-4 h-4" />, text: 'Web App' },
            { icon: <TbDeviceMobileCode className="w-4 h-4" />, text: 'Mobile App' },
            { icon: <TbApi className="w-4 h-4" />, text: 'Backend' },
            { icon: <TbDatabaseCog className="w-4 h-4" />, text: 'Database' },
            { icon: <TbServerCog className="w-4 h-4" />, text: 'DevOps' },
        ],
        glowColor: '#3b82f6',
    },
    {
        id: 'data-ai',
        title: 'Data Science & AI Engineer',
        description:
            'Developing machine learning models and AI solutions, from data analysis to model implementation in production environments.',
        icon: <TbBrain className="w-6 h-6" />,
        features: [
            { icon: <TbBrandPython className="w-4 h-4" />, text: 'Pandas, Scikit' },
            { icon: <TbFileDatabase className="w-4 h-4" />, text: 'Big Data' },
            { icon: <TbChartDots3 className="w-4 h-4" />, text: 'ML Models' },
        ],
        glowColor: '#f97316',
    },
    {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        description:
            'Protecting digital infrastructure with vulnerability analysis, penetration testing, and security protocol implementation.',
        icon: <TbShieldLock className="w-6 h-6" />,
        features: [
            { icon: <TbBug className="w-4 h-4" />, text: 'Ethical Hacking' },
            { icon: <TbShieldCheckeredFilled className="w-4 h-4" />, text: 'Pentesting' },
            { icon: <TbCloudLock className="w-4 h-4" />, text: 'Network & Cloud Security' },
        ],
        glowColor: '#ef4444',
    },
    {
        id: 'iot',
        title: 'IoT Engineer',
        description:
            'Designing and building connected device ecosystems, integrating hardware, firmware, and cloud platforms.',
        icon: <TbRouter className="w-6 h-6" />,
        features: [
            { icon: <TbCpu2 className="w-4 h-4" />, text: 'Microcontrollers (ESP32)' },
            {
                icon: <TbCloudDataConnection className="w-4 h-4" />,
                text: 'MQTT & Cloud Integration',
            },
        ],
        glowColor: '#8b5cf6',
    },
];

const CardContent = ({ card }: { card: SkillCard }) => (
    <div
        className={`
            relative flex flex-col h-full bg-opacity-10 border-opacity-100
            backdrop-blur-sm rounded-2xl p-8 border
            transition-all duration-300 ease-in-out
        `}
        style={{
            backgroundColor: card.glowColor + '15',
            borderColor: card.glowColor,
            boxShadow: `0 0 0 1px inset ${card.glowColor}`,
        }}
    >
        {/* Icon with enhanced animation */}
        <motion.div
            animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 text-white shadow-lg"
            style={{
                backgroundColor: card.glowColor,
                boxShadow: `0 8px 24px ${card.glowColor}25`,
            }}
        >
            {card.icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {card.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8 flex-grow">
            {card.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
            {card.features.map((feature, featureIndex) => (
                <Badge
                    key={featureIndex}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                    <div className="text-gray-600 dark:text-gray-400">{feature.icon}</div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {feature.text}
                    </span>
                </Badge>
            ))}
        </div>
    </div>
);

type AnimatedCardProps = {
    card: SkillCard;
    index: number;
    scrollYProgress: MotionValue<number>;
    numCards: number;
};

const AnimatedCard = ({ card, index, scrollYProgress, numCards }: AnimatedCardProps) => {
    // Calculate the scroll range for this specific card to appear.
    // Each card will animate in its own "slice" of the total scroll progress.
    const animationStart = 0.2 + (index / numCards) * 0.6; // Start animation later for subsequent cards
    const animationEnd = animationStart + (1 / numCards) * 0.4; // The duration of the fade-in animation

    // Create a transform for opacity and scale that is specific to this card.
    // It will animate from 0 to 1 and then stay at 1.
    const opacity = useTransform(scrollYProgress, [animationStart, animationEnd], [0, 1]);
    const scale = useTransform(scrollYProgress, [animationStart, animationEnd], [0.95, 1]);

    return (
        <motion.div style={{ opacity, scale }}>
            <CardContent card={card} />
        </motion.div>
    );
};


const SkillPreview = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <div className="min-h-screen py-10">
            <section ref={containerRef} className="px-8">
                <div className="max-w-7xl mx-auto relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        {cards.map((card, index) => (
                            <AnimatedCard
                                key={card.id}
                                card={card}
                                index={index}
                                scrollYProgress={scrollYProgress}
                                numCards={cards.length}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SkillPreview;
