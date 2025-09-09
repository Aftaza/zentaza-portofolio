import React from 'react';
import { motion } from 'framer-motion';
import ContactInfo from './ContactInfo';
import SocialLinks from './SocialLinks';
import ContactHero from './ContactHero';

const ContactContainer = () => {
    return (
        <div className="max-w-6xl mx-auto my-10 md:my-5 px-5 md:px-10">
            <motion.h1
                className="text-3xl md:text-4xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Get In Touch
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left Column - Contact Information */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <ContactInfo />
                    <SocialLinks />
                </motion.div>

                {/* Right Column - Modern Contact Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <ContactHero />
                </motion.div>
            </div>
        </div>
    );
};

export default ContactContainer;
