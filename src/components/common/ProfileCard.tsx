import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate, useSpring } from 'framer-motion';
import type { ProfileCardProps } from '@/lib/data';

// Extend the interface to include variant prop
interface ExtendedProfileCardProps extends ProfileCardProps {
    variant?: 'rectangular' | 'circular';
}

const AnimatedProfileCard: React.FC<ExtendedProfileCardProps> = ({
    image = '/assets/profile.webp',
    title = 'Fullstack Developer',
    subtitle = 'Software Engineer • Data Science/AI • Cybersecurity • IoT',
    author = 'Zentaza',
    year = '2025',
    category = 'Developer',
    description = 'A Fullstack Developer with cross-disciplinary experience: building modern web applications, developing AI/Data Science-based solutions, strengthening systems with cybersecurity, and designing IoT solutions for industrial needs.',
    tags = ['Fullstack', 'Software Engineer', 'AI/ML', 'Cybersecurity', 'IoT', 'Cloud', 'DevOps'],
    variant = 'rectangular',
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

    // Dynamic classes based on variant
    const containerClasses = variant === 'circular' 
        ? "relative w-full max-w-[200px] md:max-w-sm mx-auto cursor-pointer select-none rounded-full aspect-square"
        : "relative w-full max-w-xs md:max-w-md mx-auto cursor-pointer select-none rounded-xl md:rounded-2xl";

    const cardClasses = variant === 'circular'
        ? "relative group rounded-full aspect-square"
        : "relative group rounded-xl md:rounded-2xl";

    const cardContainerClasses = variant === 'circular'
        ? "relative bg-white rounded-full overflow-hidden aspect-square"
        : "relative bg-white rounded-xl md:rounded-2xl overflow-hidden";

    const shimmerClasses = variant === 'circular'
        ? "absolute inset-0 overflow-hidden rounded-full"
        : "absolute inset-0 overflow-hidden rounded-xl md:rounded-2xl";

    const imageAspectClasses = variant === 'circular'
        ? "relative aspect-square overflow-hidden rounded-full"
        : "relative aspect-[3/4] overflow-hidden";

    const shadowClasses = variant === 'circular'
        ? "absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full blur-xl -z-10"
        : "absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl md:rounded-2xl blur-xl -z-10";

    const renderRectangularContent = () => (
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
            <motion.div
                initial={{ y: 12, opacity: 0.9 }}
                whileHover={{
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.5, ease: 'easeOut' },
                }}
            >
                <motion.h1
                    className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 leading-tight"
                    whileHover={{
                        x: 3,
                        transition: { duration: 0.3 },
                    }}
                >
                    {title}
                </motion.h1>

                <motion.p
                    className="text-xs sm:text-sm md:text-base text-gray-200 mb-2 sm:mb-3"
                    whileHover={{
                        x: 1.5,
                        transition: { duration: 0.3, delay: 0.1 },
                    }}
                >
                    {subtitle}
                </motion.p>

                <motion.p
                    className="text-gray-300 text-[0.6rem] xs:text-xs sm:text-sm leading-relaxed mb-2 sm:mb-4"
                    initial={{ y: 6, opacity: 0 }}
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

                <motion.div
                    className="flex flex-wrap gap-1 sm:gap-1.5"
                    initial={{ y: 6, opacity: 0 }}
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
                            className="px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 bg-white/20 backdrop-blur-sm text-white text-[0.5rem] xs:text-[0.6rem] sm:text-xs rounded-full border border-white/30"
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
    );

    return (
        <div className="flex items-center justify-center p-2 sm:p-4 md:p-6">
            <motion.div
                ref={cardRef}
                style={{ 
                    transform: useMotionTemplate`${transform} translateY(${floatingY}px) rotate(${floatingRotate}deg)`,
                }}
                className={containerClasses}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Main Card */}
                <motion.div className={cardClasses} style={{ boxShadow }}>
                    {/* Card Container */}
                    <motion.div
                        className={cardContainerClasses}
                        whileHover={{
                            boxShadow: '0 20px 40px rgba(147, 51, 234, 0.25)',
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Shimmer Effect */}
                        <div className={shimmerClasses}>
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
                        <div className={imageAspectClasses}>
                            <motion.img
                                src={image}
                                alt={title}
                                className={variant === 'circular' 
                                    ? "w-full h-full object-cover object-top scale-125 translate-y-4 md:translate-y-8" 
                                    : "w-full h-full object-cover"
                                }
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.7, ease: 'easeInOut' },
                                }}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: 'translateZ(30px)',
                                }}
                            />

                            {/* Gradient Overlay - Only for rectangular */}
                            {variant === 'rectangular' && (
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                                    initial={{ opacity: 0.6 }}
                                    whileHover={{
                                        opacity: 0.8,
                                        transition: { duration: 0.5 },
                                    }}
                                />
                            )}

                            {/* Category Badge */}
                            {variant === 'rectangular' && (
                                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6">
                                    <motion.span
                                        className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-white/90 backdrop-blur-sm text-gray-800 text-[0.6rem] xs:text-xs sm:text-sm font-semibold rounded-full shadow-md md:shadow-lg"
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: 'rgba(255, 255, 255, 1)',
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {category}
                                    </motion.span>
                                </div>
                            )}

                            {/* Content Overlay - Only for rectangular */}
                            {variant === 'rectangular' && renderRectangularContent()}
                        </div>
                    </motion.div>

                    {/* 3D Shadow Effect */}
                    <motion.div
                        className={shadowClasses}
                        style={{
                            x: useTransform(x, [-300, 300], [3, -3]),
                            y: useTransform(y, [-300, 300], [1.5, 6]),
                            scale: useTransform(scale, [1, 1.05], [1, 1.05]),
                            opacity: useTransform(scale, [1, 1.05], [0.5, 0.7]),
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AnimatedProfileCard;