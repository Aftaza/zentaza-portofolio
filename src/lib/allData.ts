import type { Carousel3DItem, CertificationImage } from './data';

export const portofolioItems: Carousel3DItem[] = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        brand: 'Fullstack Development',
        description:
            'Modern e-commerce solution built with React, Node.js, and MongoDB. Features real-time inventory management, payment integration, and responsive design.',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        imageUrl: '/images/project-ecommerce.jpg',
        link: '/portfolio/ecommerce-platform',
    },
    {
        id: 2,
        title: 'AI-Powered Analytics Dashboard',
        brand: 'Data Science/AI',
        description:
            'Machine learning dashboard for business intelligence with predictive analytics, real-time data visualization, and automated reporting.',
        tags: ['Python', 'TensorFlow', 'React', 'D3.js'],
        imageUrl: '/images/project-ai-dashboard.jpg',
        link: '/portfolio/ai-dashboard',
    },
    {
        id: 3,
        title: 'Cybersecurity Monitoring System',
        brand: 'Cybersecurity',
        description:
            'Advanced security monitoring platform with threat detection, vulnerability assessment, and incident response automation.',
        tags: ['Python', 'Docker', 'Elasticsearch', 'React'],
        imageUrl: '/images/project-security.jpg',
        link: '/portfolio/security-system',
    },
    {
        id: 4,
        title: 'IoT Smart Home Hub',
        brand: 'IoT Engineering',
        description:
            'Centralized IoT management system for smart home devices with real-time monitoring, automation, and mobile app integration.',
        tags: ['Arduino', 'React Native', 'Node.js', 'MQTT'],
        imageUrl: '/images/project-iot.jpg',
        link: '/portfolio/iot-hub',
    },
    {
        id: 5,
        title: 'Social Media Management Tool',
        brand: 'Software Engineering',
        description:
            'Comprehensive social media management platform with content scheduling, analytics, and multi-platform integration.',
        tags: ['Vue.js', 'Laravel', 'Redis', 'API Integration'],
        imageUrl: '/images/project-social.jpg',
        link: '/portfolio/social-media-tool',
    },
];

export const certifications: CertificationImage[] = [
    {
        src: '/images/certs/aws-solutions-architect.jpg',
        alt: 'AWS Certified Solutions Architect Associate',
        title: 'AWS Certified Solutions Architect - Associate',
        issuer: 'Amazon Web Services',
        date: 'December 2023',
        credentialId: 'AWS-ASA-123456789',
        href: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
        target: '_blank',
    },
    {
        src: '/images/certs/google-cloud-architect.jpg',
        alt: 'Google Cloud Professional Cloud Architect',
        title: 'Professional Cloud Architect',
        issuer: 'Google Cloud',
        date: 'November 2023',
        credentialId: 'GCP-PCA-987654321',
        href: 'https://cloud.google.com/certification/cloud-architect',
        target: '_blank',
    },
    {
        src: '/images/certs/azure-fundamentals.jpg',
        alt: 'Microsoft Azure Fundamentals AZ-900',
        title: 'Azure Fundamentals (AZ-900)',
        issuer: 'Microsoft',
        date: 'October 2023',
        credentialId: 'MS-AZ900-456789123',
        href: 'https://docs.microsoft.com/en-us/learn/certifications/azure-fundamentals/',
        target: '_blank',
    },
    {
        src: '/images/certs/kubernetes-cka.jpg',
        alt: 'Certified Kubernetes Administrator',
        title: 'Certified Kubernetes Administrator (CKA)',
        issuer: 'Cloud Native Computing Foundation',
        date: 'September 2023',
        credentialId: 'CNCF-CKA-789123456',
        href: 'https://www.cncf.io/certification/cka/',
        target: '_blank',
    },
    {
        src: '/images/certs/docker-dca.jpg',
        alt: 'Docker Certified Associate',
        title: 'Docker Certified Associate (DCA)',
        issuer: 'Docker Inc.',
        date: 'August 2023',
        credentialId: 'DOCKER-DCA-321654987',
        href: 'https://www.docker.com/certification/',
        target: '_blank',
    },
    {
        src: '/images/certs/mongodb-developer.jpg',
        alt: 'MongoDB Certified Developer Associate',
        title: 'MongoDB Certified Developer Associate',
        issuer: 'MongoDB University',
        date: 'July 2023',
        credentialId: 'MONGO-DEV-654987321',
        href: 'https://university.mongodb.com/certification/developer/associate',
        target: '_blank',
    },
    {
        src: '/images/certs/meta-react-advanced.jpg',
        alt: 'Meta React Advanced Certification',
        title: 'Advanced React Development',
        issuer: 'Meta (Facebook)',
        date: 'June 2023',
        credentialId: 'META-REACT-147258369',
        href: 'https://www.coursera.org/professional-certificates/meta-react-native',
        target: '_blank',
    },
    {
        src: '/images/certs/nodejs-jsnad.jpg',
        alt: 'Node.js Certified Developer',
        title: 'Node.js Application Developer (JSNAD)',
        issuer: 'OpenJS Foundation',
        date: 'May 2023',
        credentialId: 'OPENJS-JSNAD-963852741',
        href: 'https://openjsf.org/certification/jsnad/',
        target: '_blank',
    },
    {
        src: '/images/certs/terraform-associate.jpg',
        alt: 'HashiCorp Certified Terraform Associate',
        title: 'Terraform Associate (003)',
        issuer: 'HashiCorp',
        date: 'April 2023',
        credentialId: 'HASHI-TERRA-852741963',
        href: 'https://www.hashicorp.com/certification/terraform-associate',
        target: '_blank',
    },
    {
        src: '/images/certs/github-actions.jpg',
        alt: 'GitHub Actions Certification',
        title: 'GitHub Actions Certified',
        issuer: 'GitHub',
        date: 'March 2023',
        credentialId: 'GITHUB-ACTIONS-741963852',
        href: 'https://docs.github.com/en/actions',
        target: '_blank',
    },
    {
        src: '/images/certs/redis-certified.jpg',
        alt: 'Redis Certified Developer',
        title: 'Redis Certified Developer',
        issuer: 'Redis Labs',
        date: 'February 2023',
        credentialId: 'REDIS-DEV-159753486',
        href: 'https://university.redis.com/certification/',
        target: '_blank',
    },
    {
        src: '/images/certs/graphql-certified.jpg',
        alt: 'GraphQL Certified Developer',
        title: 'GraphQL Certified Developer',
        issuer: 'GraphQL Foundation',
        date: 'January 2023',
        credentialId: 'GRAPHQL-DEV-357951486',
        href: 'https://graphql.org/community/',
        target: '_blank',
    },
];

// Helper functions for certification data
export const getCertificationsByIssuer = (issuer: string) => {
    return certifications.filter((cert) => cert.issuer === issuer);
};

export const getLatestCertifications = (count: number = 6) => {
    return certifications.slice(0, count);
};

export const getVerifiedCertifications = () => {
    return certifications.filter((cert) => cert.credentialId);
};

export const getAllIssuers = () => {
    return [...new Set(certifications.map((cert) => cert.issuer))];
};
