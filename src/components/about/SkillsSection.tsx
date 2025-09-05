import React, { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Code, BrainCircuit, ShieldCheck, Router } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils'; // Pastikan path ini benar

gsap.registerPlugin(ScrollTrigger);

// Tipe data untuk setiap kartu keahlian
interface SkillCardItem {
    icon: LucideIcon;
    title: string;
    skills: { name: string; level: string }[];
    image: string;
}

// Data keahlian Anda, diadaptasi untuk carousel
const skillData: SkillCardItem[] = [
    {
        icon: Code,
        title: 'Software Engineering',
        skills: [
            { name: 'JavaScript/TypeScript', level: 'Expert' },
            { name: 'React/Vue', level: 'Expert' },
            { name: 'Node.js/Python', level: 'Advanced' },
            { name: 'Cloud (AWS/GCP)', level: 'Advanced' },
        ],
        image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        icon: BrainCircuit,
        title: 'Data Science & AI',
        skills: [
            { name: 'Python (Pandas, NumPy)', level: 'Advanced' },
            { name: 'Machine Learning', level: 'Intermediate' },
            { name: 'TensorFlow/PyTorch', level: 'Intermediate' },
            { name: 'Data Visualization', level: 'Advanced' },
        ],
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        icon: ShieldCheck,
        title: 'Cybersecurity',
        skills: [
            { name: 'OWASP Top 10', level: 'Expert' },
            { name: 'Secure Coding', level: 'Advanced' },
            { name: 'Penetration Testing', level: 'Intermediate' },
            { name: 'Compliance (GDPR, HIPAA)', level: 'Advanced' },
        ],
        image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        icon: Router,
        title: 'IoT Solutions',
        skills: [
            { name: 'Embedded Systems', level: 'Advanced' },
            { name: 'Arduino/Raspberry Pi', level: 'Expert' },
            { name: 'MQTT/CoAP Protocols', level: 'Advanced' },
            { name: 'Edge Computing', level: 'Intermediate' },
        ],
        image: 'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
];

export function SkillsSection3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const [isDesktop, setIsDesktop] = useState(false);

    // Cek ukuran layar
    useLayoutEffect(() => {
        const checkDesktop = () => setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Animasi GSAP
    useLayoutEffect(() => {
        if (!isDesktop) return; // Hanya jalankan di desktop

        const ctx = gsap.context(() => {
            const scrollContainer = scrollContainerRef.current;
            const container = containerRef.current;
            if (!scrollContainer || !container || cardRefs.current.length === 0) return;

            const scrollWidth = scrollContainer.scrollWidth;
            const containerWidth = container.offsetWidth;
            const cardWidth = cardRefs.current[0]?.offsetWidth || 0;

            // Offset agar kartu pertama berada di tengah saat awal
            const viewportOffset = (containerWidth - cardWidth) / 2;
            const finalOffset = scrollWidth - containerWidth + viewportOffset;

            gsap.set(scrollContainer, { x: viewportOffset });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(scrollContainer, {
                x: -finalOffset,
                ease: 'none',
            });

            gsap.to(progressBarRef.current, {
                width: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: () => `+=${scrollWidth}`,
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isDesktop]);

    // Render kartu
    const renderSkillCards = () =>
        skillData.map((category, index) => (
            <div
                key={index}
                ref={(el) => {
                    if (el) cardRefs.current[index] = el;
                }}
                className="feature-card flex-shrink-0 w-[90vw] md:w-[600px] h-full p-4 group"
            >
                <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src={category.image}
                        alt={`${category.title} background`}
                        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 z-10"></div>
                    <div className="relative z-20 h-full p-6 lg:p-8 flex flex-col justify-end text-white">
                        <div className="mb-4">
                            <category.icon className="w-10 h-10 mb-2 text-white/80" />
                            <h3 className="text-3xl font-bold">{category.title}</h3>
                        </div>
                        <ul className="space-y-2 text-white/90 border-t border-white/20 pt-4">
                            {category.skills.map((skill, skillIndex) => (
                                <li
                                    key={skillIndex}
                                    className="flex justify-between items-center text-sm"
                                >
                                    <span>{skill.name}</span>
                                    <span className="font-medium px-2 py-0.5 rounded bg-white/10 text-white/80">
                                        {skill.level}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        ));

    return (
        <section className="bg-background text-foreground relative">
            <div className="container mx-auto px-4 text-center py-10">
                <h2 className="text-3xl font-bold">Skills & Expertise</h2>
                <p className="text-muted-foreground mt-2 md:block hidden">
                    As you scroll, my core competencies will be revealed.
                </p>
            </div>

            {/* Desktop Carousel */}
            <div
                ref={containerRef}
                className="relative h-screen py-20 hidden md:flex flex-col gap-0 z-10 overflow-hidden 
                       [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]"
            >
                <div ref={scrollContainerRef} className="flex items-center h-full">
                    {renderSkillCards()}
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-1.5 bg-muted z-50 overflow-hidden rounded-full">
                    <div
                        ref={progressBarRef}
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                        style={{ width: '0%' }}
                    ></div>
                </div>
            </div>

            {/* Mobile Grid */}
            <div className="md:hidden grid grid-cols-1 gap-6 container mx-auto px-4 pb-16">
                {skillData.map((category, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Re-render card content for mobile without refs */}
                        <div className="feature-card w-full h-full group">
                            <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src={category.image}
                                    alt={`${category.title} background`}
                                    className="absolute inset-0 w-full h-full object-cover z-0"
                                />
                                <div className="absolute inset-0 bg-black/60 z-10"></div>
                                <div className="relative z-20 h-full p-6 lg:p-8 flex flex-col justify-end text-white">
                                    <div className="mb-4">
                                        <category.icon className="w-10 h-10 mb-2 text-white/80" />
                                        <h3 className="text-3xl font-bold">{category.title}</h3>
                                    </div>
                                    <ul className="space-y-2 text-white/90 border-t border-white/20 pt-4">
                                        {category.skills.map((skill, skillIndex) => (
                                            <li
                                                key={skillIndex}
                                                className="flex justify-between items-center text-sm"
                                            >
                                                <span>{skill.name}</span>
                                                <span className="font-medium px-2 py-0.5 rounded bg-white/10 text-white/80">
                                                    {skill.level}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
