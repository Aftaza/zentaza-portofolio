import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, X } from 'lucide-react';

interface NavItem {
    href: string;
    label: string;
    isActive?: boolean;
}

interface AnimatedNavbarProps {
    currentPath: string;
    navItems: NavItem[];
}

const AnimatedNavbar: React.FC<AnimatedNavbarProps> = ({ currentPath, navItems }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Animation variants
    const navVariants: Variants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    const logoVariants: Variants = {
        hidden: { x: -30, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                delay: 0.2,
                ease: 'easeOut',
            },
        },
    };

    const navItemsVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const navItemVariants: Variants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    const mobileMenuVariants: Variants = {
        hidden: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
        visible: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        },
    };

    const mobileItemVariants: Variants = {
        hidden: { x: -30, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        },
    };

    const underlineVariants: Variants = {
        hidden: { scaleX: 0 },
        visible: {
            scaleX: 1,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <motion.nav
            className="border-b border-border backdrop-blur-lg sticky top-0 z-50"
            variants={navVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div className="flex-shrink-0 flex items-center" variants={logoVariants}>
                        <motion.a
                            href="/"
                            className="text-xl text-primary font-bold relative inline-block"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 },
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.span
                                className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat"
                                whileHover={{
                                    backgroundSize: '100% 2px',
                                    transition: { duration: 0.3, ease: 'easeOut' },
                                }}
                            >
                                Zentaza
                            </motion.span>
                        </motion.a>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.div className="hidden md:block" variants={navItemsVariants}>
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    className="px-3 py-2 text-sm font-medium text-foreground relative transition-all duration-300 ease-in-out hover:text-primary group"
                                    variants={navItemVariants}
                                    whileHover={{
                                        y: -2,
                                        transition: { duration: 0.2 },
                                    }}
                                    whileTap={{ y: 0 }}
                                >
                                    {item.label}
                                    <motion.span
                                        className="absolute bottom-0 left-1/2 h-0.5 bg-primary transform -translate-x-1/2 origin-center"
                                        variants={underlineVariants}
                                        initial={currentPath === item.href ? 'visible' : 'hidden'}
                                        whileHover="visible"
                                        style={{
                                            width: currentPath === item.href ? '100%' : '0%',
                                        }}
                                    />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Theme Toggle and Mobile menu button */}
                    <motion.div
                        className="flex items-center"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.6,
                                delay: 0.4,
                                ease: 'easeOut',
                            },
                        }}
                    >
                        <ThemeToggle className="mr-2 cursor-pointer" />
                        <div className="md:hidden">
                            <motion.div whileTap={{ scale: 0.9 }}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleMobileMenu}
                                    aria-label="Toggle menu"
                                >
                                    <motion.div
                                        animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {isMobileMenuOpen ? (
                                            <X className="h-6 w-6" />
                                        ) : (
                                            <Menu className="h-6 w-6" />
                                        )}
                                    </motion.div>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="md:hidden overflow-hidden"
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    className="block px-3 py-2 text-base font-medium text-foreground relative transition-all duration-300 ease-in-out hover:text-primary group"
                                    variants={mobileItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: index * 0.1 }}
                                    onClick={closeMobileMenu}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {item.label}
                                    <motion.span
                                        className="absolute bottom-0 left-3 h-0.5 bg-primary transition-all duration-300 ease-in-out"
                                        variants={underlineVariants}
                                        initial={currentPath === item.href ? 'visible' : 'hidden'}
                                        whileHover="visible"
                                        style={{
                                            width:
                                                currentPath === item.href
                                                    ? 'calc(100% - 24px)'
                                                    : '0%',
                                        }}
                                    />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default AnimatedNavbar;
