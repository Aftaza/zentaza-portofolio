import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  type Variants 
} from 'framer-motion';

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

const itemVariants: Variants = {
    hidden: { 
        x: -50, 
        opacity: 0,
        scale: 0.95 
    },
    visible: (index: number) => ({
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            delay: index * 0.2,
            ease: [0.25, 0.1, 0.25, 1.0],
        },
    }),
};

export function ExperienceSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start center", "end center"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    // Track which experience is currently in view
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((v) => {
            const newIndex = Math.floor(v * experiences.length);
            if (newIndex !== activeIndex && newIndex >= 0 && newIndex < experiences.length) {
                setActiveIndex(newIndex);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, activeIndex]);

    return (
        <motion.section
            ref={scrollRef}
            className="mb-12 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h2 
                className="text-2xl font-semibold mb-8 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                Professional Experience
            </motion.h2>
            
            <div className="relative max-w-4xl mx-auto">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 w-0.5 h-full bg-border/30" />
                
                {/* Animated Progress Line */}
                <motion.div
                    className="absolute left-8 top-0 w-0.5 z-10 origin-top"
                    style={{
                        height: progressHeight,
                        background: "linear-gradient(to bottom, #22d3ee, #6366f1, #a855f7)",
                        boxShadow: `
                            0 0 10px rgba(99,102,241,0.4),
                            0 0 20px rgba(168,85,247,0.2)
                        `,
                    }}
                />
                
                {/* Traveling Glow at Progress Head */}
                <motion.div
                    className="absolute left-8 z-20"
                    style={{
                        top: progressHeight,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <motion.div
                        className="w-3 h-3 rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(99,102,241,0.5) 40%, rgba(34,211,238,0) 70%)",
                            boxShadow: `
                                0 0 10px 3px rgba(168, 85, 247, 0.6),
                                0 0 20px 6px rgba(99, 102, 241, 0.4),
                                0 0 30px 10px rgba(34, 211, 238, 0.2)
                            `,
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>

                {/* Experience Items */}
                <div className="relative z-30">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                experienceRefs.current[index] = el;
                            }}
                            className="relative mb-16 pl-20"
                        >
                            {/* Timeline Dot */}
                            <motion.div
                                className="absolute -left-[31px] top-6 z-30"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <motion.div
                                    className={`w-4 h-4 rounded-full border-4 bg-background flex items-center justify-center ${
                                        index <= activeIndex 
                                            ? "border-primary shadow-lg" 
                                            : "border-border bg-card"
                                    }`}
                                    animate={
                                        index <= activeIndex
                                            ? {
                                                scale: [1, 1.3, 1],
                                                boxShadow: [
                                                    "0 0 0px rgba(99,102,241,0)",
                                                    "0 0 15px rgba(99,102,241,0.6)",
                                                    "0 0 0px rgba(99,102,241,0)",
                                                ],
                                            }
                                            : {}
                                    }
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                        ease: "easeInOut",
                                    }}
                                />
                            </motion.div>

                            {/* Experience Card */}
                            <motion.div
                                className="bg-card border border-border/40 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
                                custom={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, margin: "-100px" }}
                                variants={itemVariants}
                                whileHover={{ 
                                    scale: 1.02, 
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                                    <motion.h3
                                        className="text-xl font-semibold text-foreground"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        {exp.title}
                                    </motion.h3>
                                    <motion.span
                                        className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mt-2 md:mt-0 inline-block"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 400 }}
                                    >
                                        {exp.period}
                                    </motion.span>
                                </div>
                                
                                <motion.p
                                    className="text-primary font-medium mb-3 flex items-center"
                                    initial={{ opacity: 0.7 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                    {exp.company}
                                </motion.p>
                                
                                <motion.p
                                    className="text-muted-foreground leading-relaxed"
                                    initial={{ opacity: 0.8 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    {exp.description}
                                </motion.p>

                                {/* Subtle hover glow effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-lg pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ 
                                        opacity: 1,
                                        background: "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05))",
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}