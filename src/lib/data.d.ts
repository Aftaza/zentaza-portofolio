import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons/lib";

export interface ProfileCardProps {
    image?: string;
    title?: string;
    subtitle?: string;
    author?: string;
    year?: string;
    category?: string;
    description?: string;
    tags?: string[];
}

export interface SkillCard {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    features: Array<{
        icon: React.ReactNode;
        text: string;
    }>;
    glowColor: string;
}

export interface Carousel3DItem {
    id: number;
    title: string;
    brand: string;
    description: string;
    tags: string[];
    imageUrl: string;
    link: string;
    github: string;
    demo: string;
}

export interface Carousel3DProps {
    items: Carousel3DItem[];
    autoRotate?: boolean;
    rotateInterval?: number;
    cardHeight?: number;
    title?: string;
    subtitle?: string;
    tagline?: string;
}

export interface CertificationImage {
    src: string;
    alt: string;
    title: string;
    issuer: string;
    date: string;
    credentialId?: string;
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
}

export interface CertificationsMarqueeProps {
    certifications: CertificationImage[];
    className?: string;
    cols?: number; // default is 4
    onCertificationClick?: (cert: CertificationImage, index: number) => void;
}

export interface SkillCardItem {
    icon: LucideIcon;
    title: string;
    skills: { name: string; skillIcon: IconType[] }[];
    image: string;
}
