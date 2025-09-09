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
        x: -30, 
        opacity: 0,
        scale: 0.95 
    },
    visible: (index: number) => ({
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            delay: index * 0.15,
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
            className="mb-8 md:mb-12 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h2 
                className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                Professional Experience
            </motion.h2>
            
            <div className="relative max-w-4xl mx-auto">
                {/* Timeline Line */}
                <div className="absolute left-4 md:left-8 top-0 w-0.5 h-full bg-border/30" />
                
                {/* Animated Progress Line */}
                <motion.div
                    className="absolute left-4 md:left-8 top-0 w-0.5 z-10 origin-top"
                    style={{
                        height: progressHeight,
                        background: "linear-gradient(to bottom, #22d3ee, #6366f1, #a855f7)",
                        boxShadow: `
                            0 0 8px rgba(99,102,241,0.4),
                            0 0 16px rgba(168,85,247,0.2)
                        `,
                    }}
                />
                
                {/* Traveling Glow at Progress Head */}
                <motion.div
                    className="absolute left-4 md:left-8 z-20"
                    style={{
                        top: progressHeight,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <motion.div
                        className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(99,102,241,0.5) 40%, rgba(34,211,238,0) 70%)",
                            boxShadow: `
                                0 0 8px 2px rgba(168, 85, 247, 0.6),
                                0 0 16px 4px rgba(99, 102, 241, 0.4),
                                0 0 24px 8px rgba(34, 211, 238, 0.2)
                            `,
                        }}
                        animate={{
                            scale: [1, 1.3, 1],
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
                            className="relative mb-12 md:mb-16 pl-12 md:pl-20"
                        >
                            {/* Timeline Dot */}
                            <motion.div
                                className="absolute -left-[13px] md:-left-[31px] top-5 md:top-6 z-30"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <motion.div
                                    className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 md:border-4 bg-background flex items-center justify-center ${
                                        index <= activeIndex 
                                            ? "border-primary shadow-lg" 
                                            : "border-border bg-card"
                                    }`}
                                    animate={
                                        index <= activeIndex
                                            ? {
                                                scale: [1, 1.2, 1],
                                                boxShadow: [
                                                    "0 0 0px rgba(99,102,241,0)",
                                                    "0 0 10px rgba(99,102,241,0.6)",
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
                                className="bg-card border border-border/40 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300"
                                custom={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, margin: "-100px" }}
                                variants={itemVariants}
                            >
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 md:mb-3">
                                    <motion.h3
                                        className="text-lg md:text-xl font-semibold text-foreground mb-1"
                                    >
                                        {exp.title}
                                    </motion.h3>
                                    <motion.span
                                        className="text-xs md:text-sm font-medium text-primary bg-primary/10 px-2 py-1 md:px-3 md:py-1 rounded-full mt-1 md:mt-0 inline-block"
                                    >
                                        {exp.period}
                                    </motion.span>
                                </div>
                                
                                <motion.p
                                    className="text-primary font-medium mb-2 md:mb-3 text-sm md:text-base flex items-center"
                                >
                                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mr-1.5 md:mr-2"></span>
                                    {exp.company}
                                </motion.p>
                                
                                <motion.p
                                    className="text-muted-foreground leading-relaxed text-sm md:text-base"
                                >
                                    {exp.description}
                                </motion.p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}