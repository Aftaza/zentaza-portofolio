import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const experiences = [
  {
    title: "Senior Fullstack Developer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Implemented CI/CD pipelines and mentored junior developers."
  },
  {
    title: "Software Engineer",
    company: "Digital Solutions Ltd.",
    period: "2020 - 2022",
    description: "Developed and maintained multiple client projects using Python, Django, and React. Integrated third-party APIs and implemented security best practices."
  },
  {
    title: "Junior Developer",
    company: "StartUp Ventures",
    period: "2018 - 2020",
    description: "Built MVPs for startup clients using various technologies. Gained experience in full development lifecycle from conception to deployment."
  }
];

export function ExperienceSection() {
  return (
    <motion.section 
      className="mb-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 
        className="text-2xl font-semibold mb-6"
        variants={itemVariants}
      >
        Experience
      </motion.h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            className="border-l-2 border-primary pl-4 py-1"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <motion.h3 
                className="text-xl font-medium"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {exp.title}
              </motion.h3>
              <motion.span 
                className="text-sm text-muted-foreground"
                whileHover={{ scale: 1.05 }}
              >
                {exp.period}
              </motion.span>
            </div>
            <motion.p 
              className="text-primary"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              {exp.company}
            </motion.p>
            <motion.p 
              className="text-muted-foreground mt-2"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {exp.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}