import React from 'react';
import { motion } from 'framer-motion';
import { FaTiktok, FaGithub, FaLinkedin} from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

const SocialLinks = () => {
    const socialLinks = [
        {
            name: 'GitHub',
            icon: <FaGithub className="h-5 w-5" />,
            url: 'https://github.com/Aftaza',
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin className="h-5 w-5" />,
            url: 'https://id.linkedin.com/in/m-alfian-taftazani-2a456124b',
        },
        {
            name: 'Tiktok',
            icon: <FaTiktok className="h-5 w-5" />,
            url: 'https://www.tiktok.com/@zentaza_official',
        },
    ];

    return (
        <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <h3 className="text-lg font-medium mb-4">Connect with me</h3>
            <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                    <motion.div
                        key={link.name}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                        <Button variant="outline" size="icon" asChild>
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.name}
                            >
                                {link.icon}
                            </a>
                        </Button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default SocialLinks;
