import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import type { Carousel3DItem } from '@/lib/data';

interface PortfolioSectionProps {
    projects: Carousel3DItem[];
    itemsPerPage?: number;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
    projects,
    itemsPerPage = 6,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Get unique categories from projects
    const categories = ['All', ...new Set(projects.map((project) => project.brand))];

    // Filter projects by category
    const filteredProjects =
        selectedCategory === 'All'
            ? projects
            : projects.filter((project) => project.brand === selectedCategory);

    // Calculate pagination
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of portfolio section
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle category change
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to first page when category changes
    };

    return (
        <div className="max-w-6xl mx-auto p-5 my-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">My Portfolio</h1>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Projects Grid */}
            {paginatedProjects.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {paginatedProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>

                            <div className="flex gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No projects found in this category.</p>
                </div>
            )}
        </div>
    );
};
