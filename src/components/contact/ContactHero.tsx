import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ContactHero = () => {
    return (
        <motion.div
            className="rounded-2xl p-8 md:p-12 border border-border"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-2xl">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Let's work together
                </motion.h2>

                <motion.p
                    className="text-lg text-muted-foreground mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Have a project in mind or want to discuss potential opportunities? I'm always
                    open to new ideas and collaborations. Let's create something amazing together.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Button size="lg" asChild>
                        <a href="mailto:zen.bisnis17@gmail.com">
                            Get in Touch
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    </Button>

                    <Button size="lg" variant="outline" asChild>
                        <a href="/cv.pdf" download>
                            View My CV
                        </a>
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ContactHero;
