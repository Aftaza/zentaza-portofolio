import { TypeAnimation } from 'react-type-animation';
import React from 'react';

interface AnimatedTextProps {
  texts: string[];
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ texts, className = '' }) => {
  // Create sequence from texts array
  const sequence = texts.flatMap(text => [text, 1000]);
  
  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="p"
      speed={50}
      className={className}
      repeat={Infinity}
    />
  );
};

export default AnimatedText;