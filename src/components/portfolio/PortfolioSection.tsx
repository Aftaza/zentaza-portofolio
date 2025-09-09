import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className="max-w-6xl mx-auto">
            <motion.h1
                className="text-3xl md:text-4xl font-bold mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                My Portfolio
            </motion.h1>

            {/* Category Filter */}
            <motion.div
                className="flex flex-wrap gap-2 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {categories.map((category, index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Button
                            variant={selectedCategory === category ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleCategoryChange(category)}
                            className="transition-all duration-200"
                        >
                            {category}
                        </Button>
                    </motion.div>
                ))}
            </motion.div>

            {/* Projects Grid with Page Transitions */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`page-${currentPage}-${selectedCategory}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {paginatedProjects.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <AnimatePresence>
                                    {paginatedProjects.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.1,
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 20,
                                            }}
                                        >
                                            <ProjectCard project={project} index={index} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <motion.div
                                    className="flex justify-center items-center gap-2 mt-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>

                                    <div className="flex gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                            (page) => (
                                                <motion.div
                                                    key={page}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Button
                                                        variant={
                                                            currentPage === page
                                                                ? 'default'
                                                                : 'outline'
                                                        }
                                                        size="sm"
                                                        onClick={() => handlePageChange(page)}
                                                        className="transition-all duration-200"
                                                    >
                                                        {page}
                                                    </Button>
                                                </motion.div>
                                            )
                                        )}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </Button>
                                </motion.div>
                            )}
                        </>
                    ) : (
                        <motion.div
                            className="text-center py-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-muted-foreground">
                                No projects found in this category.
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
