import { motion } from 'framer-motion';
import { buttonVariants } from '@/components/ui/button';
import { AnimatedSection, itemVariants } from '@/components/common/AnimatedSection';

export function AnimatedCTA() {
    return (
        <AnimatedSection className="py-16">
            <div className="container mx-auto px-4 text-center">
                <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4">
                    Interested in Working Together?
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    className="text-muted-foreground mb-8 max-w-2xl mx-auto"
                >
                    I'm always open to discussing new projects, creative ideas, or opportunities to
                    be part of your vision.
                </motion.p>
                <motion.div variants={itemVariants}>
                    <a
                        href="/contact"
                        className={
                            buttonVariants({ variant: 'secondary', size: 'lg' }) +
                            ' flex items-center mx-auto w-fit'
                        }
                    >
                        Let's Get Discuss
                    </a>
                </motion.div>
            </div>
        </AnimatedSection>
    );
}
