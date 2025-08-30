import React, { useEffect, useRef, useState } from 'react';
import {
    TbCode,
    TbBrain,
    TbShieldLock,
    TbRouter,
    TbBrandReact,
    TbDatabase,
    TbChartDots3,
    TbBrandPython,
    TbBug,
    TbCloudLock,
    TbCpu2,
    TbCloudDataConnection,
} from 'react-icons/tb';
import type { SkillCard } from '@/lib/data';
import { Badge } from './ui/badge';

const SkillPreview: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showOverlay, setShowOverlay] = useState(false);

    const cards: SkillCard[] = [
        {
            id: 'fullstack',
            title: 'Fullstack Software Engineer',
            description:
                'Membangun aplikasi web end-to-end yang tangguh, dari antarmuka pengguna interaktif hingga arsitektur backend yang scalable.',
            icon: <TbCode className="w-6 h-6" />,
            features: [
                { icon: <TbBrandReact className="w-4 h-4" />, text: 'React/Next.js' },
                { icon: <TbDatabase className="w-4 h-4" />, text: 'MySql/MongoDB' },
            ],
            glowColor: '#3b82f6', // Biru
        },
        {
            id: 'data-ai',
            title: 'Data Science & AI Engineer',
            description:
                'Mengembangkan model machine learning dan solusi AI, mulai dari analisis data hingga implementasi model di lingkungan produksi.',
            icon: <TbBrain className="w-6 h-6" />,
            features: [
                { icon: <TbBrandPython className="w-4 h-4" />, text: 'Pandas, Scikit' },
                { icon: <TbChartDots3 className="w-4 h-4" />, text: 'ML Models' },
            ],
            glowColor: '#f97316', // Oranye
        },
        {
            id: 'cybersecurity',
            title: 'Cybersecurity',
            description:
                'Melindungi infrastruktur digital dengan analisis kerentanan, penetration testing, dan implementasi protokol keamanan.',
            icon: <TbShieldLock className="w-6 h-6" />,
            features: [
                { icon: <TbBug className="w-4 h-4" />, text: 'Ethical Hacking & Pentesting' },
                { icon: <TbCloudLock className="w-4 h-4" />, text: 'Network & Cloud Security' },
            ],
            glowColor: '#ef4444', // Merah
        },
        {
            id: 'iot',
            title: 'IoT Engineer',
            description:
                'Merancang dan membangun ekosistem perangkat terhubung, mengintegrasikan hardware, firmware, dan platform cloud.',
            icon: <TbRouter className="w-6 h-6" />,
            features: [
                { icon: <TbCpu2 className="w-4 h-4" />, text: 'Microcontrollers (ESP32)' },
                {
                    icon: <TbCloudDataConnection className="w-4 h-4" />,
                    text: 'MQTT & Cloud Integration',
                },
            ],
            glowColor: '#8b5cf6', // Ungu
        },
    ];

    useEffect(() => {
        const container = containerRef.current;
        const overlay = overlayRef.current;

        if (!container || !overlay) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setMousePosition({ x, y });
            setShowOverlay(true);

            overlay.style.setProperty('--x', `${x}px`);
            overlay.style.setProperty('--y', `${y}px`);
            overlay.style.setProperty('--opacity', '1');
        };

        const handleMouseLeave = () => {
            setShowOverlay(false);
            overlay.style.setProperty('--opacity', '0');
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const CardContent: React.FC<{ card: SkillCard; isOverlay?: boolean }> = ({
        card,
        isOverlay = false,
    }) => (
        <div
            className={`
        relative flex flex-col h-full
        ${isOverlay ? 'bg-opacity-10 border-opacity-100' : 'bg-card'}
        backdrop-blur-sm rounded-2xl p-8 border
        transition-all duration-300 ease-in-out
      `}
            style={
                isOverlay
                    ? {
                          backgroundColor: card.glowColor + '15',
                          borderColor: card.glowColor,
                          boxShadow: `0 0 0 1px inset ${card.glowColor}`,
                      }
                    : {}
            }
        >
            {/* Icon */}
            <div
                className={`
          inline-flex items-center justify-center
          w-12 h-12 rounded-xl mb-6 text-white
          shadow-lg transition-all duration-1000 ease-in-out
          ${!isOverlay ? 'group-hover:scale-110' : ''}
        `}
                style={{
                    backgroundColor: card.glowColor,
                    boxShadow: `0 8px 24px ${card.glowColor}25`,
                }}
            >
                {card.icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-4">{card.title}</h3>

            {/* Description */}
            <p className="text-muted-foreground text-base leading-relaxed mb-8 flex-grow">
                {card.description}
            </p>

            {/* Features */}
            <div className="flex justify-start gap-2 items-center">
                {card.features.map((feature, index) => (
                    <Badge
                        variant="outline"
                        key={index}
                        className="flex items-center gap-3 text-gray-500"
                    >
                        <div className="text-muted-foreground">{feature.icon}</div>
                        <span className="text-xs font-medium text-muted-foreground">
                            {feature.text}
                        </span>
                    </Badge>
                ))}
            </div>
        </div>
    );

    return (
        <section className="min-h-full px-8">
            <div className="max-w-7xl mx-auto relative">
                <div ref={containerRef} className="relative">
                    {/* Normal Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch p-5">
                        {cards.map((card) => (
                            <div key={card.id} className="group cursor-pointer">
                                <CardContent card={card} />
                            </div>
                        ))}
                    </div>

                    {/* Glow Overlay */}
                    <div
                        ref={overlayRef}
                        className="absolute inset-0 pointer-events-none select-none opacity-0 transition-all duration-400 ease-out p-5"
                        style={{
                            WebkitMask:
                                'radial-gradient(25rem 25rem at var(--x, 0) var(--y, 0), #000 1%, transparent 50%)',
                            mask: 'radial-gradient(25rem 25rem at var(--x, 0) var(--y, 0), #000 1%, transparent 50%)',
                            opacity: showOverlay ? 'var(--opacity)' : '0',
                        }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                            {cards.map((card) => (
                                <div key={`overlay-${card.id}`}>
                                    <CardContent card={card} isOverlay={true} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillPreview;
