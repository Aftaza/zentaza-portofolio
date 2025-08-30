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