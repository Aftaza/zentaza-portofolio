import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { blogPosts, getAllTags } from '@/lib/allData';
import type { BlogPost } from '@/lib/data';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogContainer: React.FC = () => {
    const [posts] = useState<BlogPost[]>(blogPosts);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const allTags = getAllTags();

    // Filter posts based on search query and active tag
    useEffect(() => {
        let result = posts;

        // Apply search filter
        if (searchQuery) {
            result = result.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Apply tag filter
        if (activeTag !== 'all') {
            result = result.filter((post) => post.tags.includes(activeTag));
        }

        setFilteredPosts(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchQuery, activeTag, posts]);

    // Get posts for current page
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    // Handle search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Handle filter
    const handleFilter = (tag: string) => {
        setActiveTag(tag);
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {/* Search */}
            <motion.div
                className="relative mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </motion.div>

            {/* Filter */}
            <motion.div
                className="flex flex-wrap gap-2 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <Button
                    variant={activeTag === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilter('all')}
                >
                    All
                </Button>
                {allTags.map((tag) => (
                    <Button
                        key={tag}
                        variant={activeTag === tag ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleFilter(tag)}
                    >
                        {tag}
                    </Button>
                ))}
            </motion.div>

            {/* Articles List */}
            <motion.div
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {paginatedPosts.length > 0 ? (
                    paginatedPosts.map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            No articles found matching your criteria.
                        </p>
                    </div>
                )}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <nav className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant="outline"
                                size="sm"
                                className={
                                    currentPage === page ? 'bg-primary text-primary-foreground' : ''
                                }
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </Button>
                    </nav>
                </motion.div>
            )}
        </div>
    );
};

export default BlogContainer;
