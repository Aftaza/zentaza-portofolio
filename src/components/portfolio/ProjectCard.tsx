import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import type { Carousel3DItem } from '@/lib/data';
import { Badge } from '../ui/badge';

interface ProjectCardProps {
    project: Carousel3DItem;
    index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    return (
        <motion.a
            className="bg-card rounded-lg border border-border overflow-hidden h-full flex flex-col"
            href={project.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
            whileHover={{
                y: -10,
                boxShadow:
                    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                transition: { duration: 0.2 },
            }}
        >
            <motion.div
                className="bg-muted h-48 flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                {project.imageUrl ? (
                    <motion.img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    />
                ) : (
                    <motion.span className="text-4xl" whileHover={{ scale: 1.1 }}>
                        {project.brand.includes('Data')
                            ? '📊'
                            : project.brand.includes('Cyber')
                            ? '🔒'
                            : project.brand.includes('IoT')
                            ? '🏠'
                            : project.brand.includes('Software')
                            ? '🛒'
                            : '💻'}
                    </motion.span>
                )}
            </motion.div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <motion.h3 className="text-xl font-semibold" whileHover={{ x: 5 }}>
                        {project.title}
                    </motion.h3>
                    <motion.span
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                    >
                        {project.brand}
                    </motion.span>
                </div>
                <motion.p
                    className="text-muted-foreground mb-4 flex-grow"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                >
                    {project.description}
                </motion.p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                        <Badge variant='outline'>
                            <motion.span
                                key={tagIndex}
                                whileHover={{
                                    scale: 1.1,
                                    backgroundColor: 'hsl(var(--primary) / 0.2)',
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                {tag}
                            </motion.span>
                        </Badge>
                    ))}
                </div>
                <div className="flex gap-2 mt-auto">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm" asChild>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 mr-1" />
                                Code
                            </a>
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm" asChild>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Demo
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.a>
    );
};
