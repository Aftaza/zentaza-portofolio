import React, { useRef, useState, useEffect } from 'react';
import { ExternalLink, User, Calendar } from 'lucide-react';
import { motion, useMotionValue, useTransform, useMotionTemplate, useSpring } from 'framer-motion';
import type { ProfileCardProps } from '@/lib/data';

const HeroProfileCard: React.FC<ProfileCardProps> = ({
    image = '/assets/profile.webp',
    title = 'Fullstack Developer',
    subtitle = 'Software Engineer • Data Science/AI • Cybersecurity • IoT',
    author = 'Zentaza',
    year = '2025',
    category = 'Developer',
    description = 'A Fullstack Developer with cross-disciplinary experience: building modern web applications, developing AI/Data Science-based solutions, strengthening systems with cybersecurity, and designing IoT solutions for industrial needs.',
    tags = ['Fullstack', 'Software Engineer', 'AI/ML', 'Cybersecurity', 'IoT', 'Cloud', 'DevOps'],
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const floatingY = useMotionValue(0);
    const floatingRotate = useMotionValue(0);
    const animationRef = useRef<number>(0);

    // Motion values for mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring configuration for smooth animations
    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Transform values for 3D rotation
    const rotateX = useTransform(y, [-300, 300], [15, -15]);
    const rotateY = useTransform(x, [-300, 300], [-15, 15]);

    // Transform values for translation
    const translateX = useTransform(x, [-300, 300], [-8, 8]);
    const translateY = useTransform(y, [-300, 300], [-8, 8]);

    // Scale transform
    const scale = useMotionValue(1);

    // Create motion template for transform
    const transform = useMotionTemplate`
    perspective(1000px) 
    rotateX(${rotateX}deg) 
    rotateY(${rotateY}deg) 
    translateX(${translateX}px) 
    translateY(${translateY}px) 
    scale(${scale})
  `;

    // Shadow transforms
    const shadowX = useTransform(x, [-300, 300], [-25, 25]);
    const shadowY = useTransform(y, [-300, 300], [-10, 35]);
    const shadowBlur = useTransform(scale, [1, 1.1], [20, 40]);

    const boxShadow = useMotionTemplate`
    ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.3)
  `;

    // Handle mouse movement
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        scale.set(1.05);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
        scale.set(1);
    };

    // Floating animation effect
    useEffect(() => {
        const animate = () => {
            const time = Date.now() / 1000;
            floatingY.set(Math.sin(time * 0.5) * 5);
            floatingRotate.set(Math.sin(time * 0.3) * 2);
            animationRef.current = requestAnimationFrame(animate);
        };

        if (!isHovered) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            floatingY.set(0);
            floatingRotate.set(0);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isHovered, floatingY, floatingRotate]);

    return (
        <div className="flex items-center justify-center p-8">
            <motion.div
                ref={cardRef}
                style={{ 
                    transform: useMotionTemplate`${transform} translateY(${floatingY}px) rotate(${floatingRotate}deg)`,
                }}
                className="relative w-full max-w-md mx-auto cursor-pointer select-none rounded-3xl"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Main Card */}
                <motion.div className="relative group rounded-3xl" style={{ boxShadow }}>
                    {/* Card Container */}
                    <motion.div
                        className="relative bg-white rounded-3xl overflow-hidden"
                        whileHover={{
                            boxShadow: '0 25px 50px rgba(147, 51, 234, 0.25)',
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 overflow-hidden rounded-3xl">
                            <motion.div
                                animate={{
                                    x: ['-100%', '100%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            />
                        </div>

                        {/* Image Container */}
                        <div className="relative aspect-[3/4] overflow-hidden">
                            <motion.img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.7, ease: 'easeOut' },
                                }}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: 'translateZ(50px)',
                                }}
                            />

                            {/* Gradient Overlay */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                                initial={{ opacity: 0.6 }}
                                whileHover={{
                                    opacity: 0.8,
                                    transition: { duration: 0.5 },
                                }}
                            />

                            {/* Category Badge */}
                            <div className="absolute top-6 left-6">
                                <motion.span
                                    className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-full shadow-lg"
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: 'rgba(255, 255, 255, 1)',
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {category}
                                </motion.span>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <motion.div
                                    initial={{ y: 16, opacity: 0.9 }}
                                    whileHover={{
                                        y: 0,
                                        opacity: 1,
                                        transition: { duration: 0.5, ease: 'easeOut' },
                                    }}
                                >
                                    <motion.h1
                                        className="text-3xl font-bold text-white mb-2 leading-tight"
                                        whileHover={{
                                            x: 4,
                                            transition: { duration: 0.3 },
                                        }}
                                    >
                                        {title}
                                    </motion.h1>

                                    <motion.p
                                        className="text-lg text-gray-200 mb-4"
                                        whileHover={{
                                            x: 2,
                                            transition: { duration: 0.3, delay: 0.1 },
                                        }}
                                    >
                                        {subtitle}
                                    </motion.p>

                                    {/* Meta Information */}
                                    <motion.div
                                        className="flex items-center space-x-6 mb-4"
                                        whileHover={{
                                            x: 2,
                                            transition: { duration: 0.3, delay: 0.15 },
                                        }}
                                    >
                                        <div className="flex items-center space-x-2 text-gray-300">
                                            <User size={16} />
                                            <span className="text-sm">{author}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-300">
                                            <Calendar size={16} />
                                            <span className="text-sm">{year}</span>
                                        </div>
                                    </motion.div>

                                    {/* Description */}
                                    <motion.p
                                        className="text-gray-300 text-sm leading-relaxed mb-6"
                                        initial={{ y: 8, opacity: 0 }}
                                        whileHover={{
                                            y: 0,
                                            opacity: 1,
                                            transition: {
                                                duration: 0.7,
                                                delay: 0.2,
                                                ease: 'easeOut',
                                            },
                                        }}
                                    >
                                        {description}
                                    </motion.p>

                                    {/* Tags */}
                                    <motion.div
                                        className="flex flex-wrap gap-2"
                                        initial={{ y: 8, opacity: 0 }}
                                        whileHover={{
                                            y: 0,
                                            opacity: 1,
                                            transition: {
                                                duration: 0.7,
                                                delay: 0.3,
                                                ease: 'easeOut',
                                            },
                                        }}
                                    >
                                        {tags.map((tag, index) => (
                                            <motion.span
                                                key={index}
                                                className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30"
                                                whileHover={{
                                                    scale: 1.05,
                                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                                    transition: {
                                                        duration: 0.3,
                                                        delay: index * 0.1,
                                                    },
                                                }}
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3D Shadow Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl -z-10"
                        style={{
                            x: useTransform(x, [-300, 300], [4, -4]),
                            y: useTransform(y, [-300, 300], [2, 8]),
                            scale: useTransform(scale, [1, 1.05], [1, 1.1]),
                            opacity: useTransform(scale, [1, 1.05], [0.6, 0.8]),
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroProfileCard;