import React from 'react';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/lib/data';

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
    return (
        <motion.article
            className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
        >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h2 className="text-2xl font-semibold mb-2 md:mb-0">
                    <a href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                    </a>
                </h2>
                <span className="text-sm text-muted-foreground">{post.date}</span>
            </div>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.article>
    );
};

export default BlogCard;
