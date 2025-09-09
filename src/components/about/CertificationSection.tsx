import type { CertificationImage, CertificationsMarqueeProps } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

export const CertificationsSection: React.FC<CertificationsMarqueeProps> = ({
    certifications,
    className = '',
    cols = 4,
    onCertificationClick,
}) => {
    const [selectedCert, setSelectedCert] = useState<CertificationImage | null>(null);

    // Gandakan daftar sertifikasi untuk loop animasi yang mulus
    const duplicatedCertifications = [...certifications, ...certifications];
    const groupSize = Math.ceil(duplicatedCertifications.length / cols);
    const certificationGroups = Array.from({ length: cols }, (_, index) =>
        duplicatedCertifications.slice(index * groupSize, (index + 1) * groupSize)
    );

    const handleCertificationClick = (cert: CertificationImage, globalIndex: number) => {
        if (onCertificationClick) {
            onCertificationClick(cert, globalIndex);
        }
        setSelectedCert(cert);
    };

    const closeModal = () => {
        setSelectedCert(null);
    };

    return (
        <section className={`relative my-10 w-full h-screen overflow-hidden bg-background pointer-events-none ${className}`}>
            {/* Judul dan Teks Instruksi */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute top-16 sm:top-24 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4 text-center pointer-events-none"
            >
                <h2 className="text-4xl sm:text-5xl font-bold">
                    Certifications
                </h2>
                <p className="mt-4 text-lg">
                    Click on any certificate to view details.
                </p>
            </motion.div>

            {/* Fade edges agar menyatu dengan background */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute top-0 bottom-0 left-0 w-48 bg-gradient-to-r from-background to-transparent" />
                <div className="absolute top-0 bottom-0 right-0 w-48 bg-gradient-to-l from-background to-transparent" />
            </div>

            {/* Kontainer 3D Marquee */}
            <div
                className="wrelative z-10 w-full h-full flex items-center justify-center"
                style={{
                    transform: 'rotateX(55deg) rotateY(0deg) rotateZ(45deg) scale(0.9)',
                    transformStyle: 'preserve-3d',
                }}
            >
                <div className="grid grid-cols-4 gap-64 md:gap-40 w-full pointer-events-auto">
                    {certificationGroups.map((certsInGroup, idx) => (
                        <motion.div
                            key={`column-${idx}`}
                            animate={{
                                // Animasi menggerakkan seluruh kolom ke atas dan ke bawah
                                y: idx % 2 === 0 ? [0, -250] : [-250, 0],
                            }}
                            transition={{
                                duration: idx % 2 === 0 ? 25 : 35,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                ease: 'linear',
                            }}
                            // FIX: Menggunakan flex-col dengan gap untuk memberi jarak, persis seperti referensi
                            className="flex flex-col items-center gap-8"
                        >
                            {certsInGroup.map((cert, certIdx) => {
                                const globalIndex = idx * groupSize + certIdx;
                                return (
                                    <motion.div
                                        key={`cert-${globalIndex}`}
                                        className="relative group cursor-pointer"
                                        onClick={() => handleCertificationClick(cert, globalIndex)}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -10,
                                            zIndex: 50,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 20,
                                        }}
                                    >
                                        <div className="relative w-[250px] aspect-[4/3] bg-card rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-600">
                                            <img
                                                src={cert.src}
                                                alt={cert.alt}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            {/* Efek kilau saat hover */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/30 to-transparent -skew-x-12 transition-transform duration-700 group-hover:transform group-hover:translate-x-full transform -translate-x-full" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal/Popup for Certificate Details */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm pointer-events-auto"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-600"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-2 transition-colors duration-200"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-600 dark:text-gray-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            {/* Certificate Image */}
                            <div className="relative">
                                <img
                                    src={selectedCert.src}
                                    alt={selectedCert.alt}
                                    className="w-full aspect-[4/3] object-cover rounded-t-2xl"
                                />
                                {selectedCert.credentialId && (
                                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        Verified Certificate
                                    </div>
                                )}
                            </div>

                            {/* Certificate Details */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                    {selectedCert.title}
                                </h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <svg
                                            className="w-5 h-5 mr-3 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                        <span className="font-medium">Issued by:</span>
                                        <span className="ml-2">{selectedCert.issuer}</span>
                                    </div>

                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <svg
                                            className="w-5 h-5 mr-3 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2m-6 0h8"
                                            />
                                        </svg>
                                        <span className="font-medium">Date:</span>
                                        <span className="ml-2">{selectedCert.date}</span>
                                    </div>

                                    {selectedCert.credentialId && (
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <svg
                                                className="w-5 h-5 mr-3 text-purple-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <span className="font-medium">Credential ID:</span>
                                            <span className="ml-2 font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                {selectedCert.credentialId}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    {selectedCert.href && (
                                        <motion.a
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            href={selectedCert.href}
                                            target={selectedCert.target || '_blank'}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium transition-colors duration-200 text-center flex items-center justify-center gap-2"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                />
                                            </svg>
                                            View Original
                                        </motion.a>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={closeModal}
                                        className="px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors duration-200"
                                    >
                                        Close
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};