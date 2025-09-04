import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';
import type { SkillCard } from '@/lib/data';

interface SkillCardProps {
  card: SkillCard;
}

const SkillCardComponent: React.FC<SkillCardProps> = ({ card }) => (
  <div
    className={`
      relative flex flex-col h-full bg-opacity-10 border-opacity-100
      backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border
      transition-all duration-300 ease-in-out
    `}
    style={{
      backgroundColor: card.glowColor + '15',
      borderColor: card.glowColor,
      boxShadow: `0 0 0 1px inset ${card.glowColor}`,
    }}
  >
    {/* Icon with enhanced animation */}
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl mb-4 sm:mb-6 text-white shadow-lg"
      style={{
        backgroundColor: card.glowColor,
        boxShadow: `0 8px 24px ${card.glowColor}25`,
      }}
    >
      {card.icon}
    </motion.div>

    {/* Title */}
    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
      {card.title}
    </h3>

    {/* Description */}
    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 flex-grow">
      {card.description}
    </p>

    {/* Features */}
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {card.features.map((feature, featureIndex) => (
        <Badge
          key={featureIndex}
          className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <div className="text-gray-600 dark:text-gray-400 w-3 h-3 sm:w-4 sm:h-4">{feature.icon}</div>
          <span className="text-[0.65rem] sm:text-xs font-medium text-gray-600 dark:text-gray-400">
            {feature.text}
          </span>
        </Badge>
      ))}
    </div>
  </div>
);

export default SkillCardComponent;