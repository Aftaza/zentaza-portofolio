import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import type { Carousel3DItem } from '@/lib/data';
import { Badge } from '../ui/badge';

interface ProjectCardProps {
    project: Carousel3DItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <a href={project.link} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
            <div className="bg-muted h-48 flex items-center justify-center">
                {project.imageUrl ? (
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-4xl">
                        {project.brand.includes('Data')
                            ? '📊'
                            : project.brand.includes('Cyber')
                            ? '🔒'
                            : project.brand.includes('IoT')
                            ? '🏠'
                            : project.brand.includes('Software')
                            ? '🛒'
                            : '💻'}
                    </span>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded whitespace-nowrap">
                        {project.brand}
                    </span>
                </div>
                <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                        <Badge key={index} variant='outline'>
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="flex gap-2 mt-auto">
                    <Button variant="outline" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1" />
                            Code
                        </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Demo
                        </a>
                    </Button>
                </div>
            </div>
        </a>
    );
};
