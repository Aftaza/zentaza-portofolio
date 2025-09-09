import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfo = () => {
    const contactDetails = [
        {
            icon: <Mail className="h-6 w-6 text-primary" />,
            title: 'Email',
            content: 'zen.bisnis17@gmail.com',
            href: 'mailto:zen.bisnis17@gmail.com',
        },
        {
            icon: <Phone className="h-6 w-6 text-primary" />,
            title: 'Phone',
            content: '+62-857-9166-3369',
            href: 'tel:+6285791663369',
        },
        {
            icon: <MapPin className="h-6 w-6 text-primary" />,
            title: 'Location',
            content: 'Malang, Indonesia',
        },
    ];

    return (
        <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-semibold">Contact Information</h2>

            <div className="space-y-6">
                {contactDetails.map((detail, index) => (
                    <motion.div
                        key={detail.title}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                        <div className="mt-1 mr-4">{detail.icon}</div>
                        <div>
                            <h3 className="text-lg font-medium mb-1">{detail.title}</h3>
                            {detail.href ? (
                                <a
                                    href={detail.href}
                                    className="text-muted-foreground hover:text-accent hover:underline transition-colors ease-in-out duration-800"
                                >
                                    {detail.content.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </a>
                            ) : (
                                <p className="text-muted-foreground">
                                    {detail.content.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ContactInfo;
