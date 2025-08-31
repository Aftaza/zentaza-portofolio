import type { Carousel3DItem } from "./data";

export const portofolioItems: Carousel3DItem[] = [
    {
        id: 1,
        title: "E-Commerce Platform",
        brand: "Fullstack Development",
        description: "Modern e-commerce solution built with React, Node.js, and MongoDB. Features real-time inventory management, payment integration, and responsive design.",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        imageUrl: "/images/project-ecommerce.jpg",
        link: "/portfolio/ecommerce-platform"
    },
    {
        id: 2,
        title: "AI-Powered Analytics Dashboard",
        brand: "Data Science/AI",
        description: "Machine learning dashboard for business intelligence with predictive analytics, real-time data visualization, and automated reporting.",
        tags: ["Python", "TensorFlow", "React", "D3.js"],
        imageUrl: "/images/project-ai-dashboard.jpg",
        link: "/portfolio/ai-dashboard"
    },
    {
        id: 3,
        title: "Cybersecurity Monitoring System",
        brand: "Cybersecurity",
        description: "Advanced security monitoring platform with threat detection, vulnerability assessment, and incident response automation.",
        tags: ["Python", "Docker", "Elasticsearch", "React"],
        imageUrl: "/images/project-security.jpg",
        link: "/portfolio/security-system"
    },
    {
        id: 4,
        title: "IoT Smart Home Hub",
        brand: "IoT Engineering",
        description: "Centralized IoT management system for smart home devices with real-time monitoring, automation, and mobile app integration.",
        tags: ["Arduino", "React Native", "Node.js", "MQTT"],
        imageUrl: "/images/project-iot.jpg",
        link: "/portfolio/iot-hub"
    },
    {
        id: 5,
        title: "Social Media Management Tool",
        brand: "Software Engineering",
        description: "Comprehensive social media management platform with content scheduling, analytics, and multi-platform integration.",
        tags: ["Vue.js", "Laravel", "Redis", "API Integration"],
        imageUrl: "/images/project-social.jpg",
        link: "/portfolio/social-media-tool"
    }
]