// AuroraText.jsx
import React, { useState, useEffect } from 'react';

// Method 1: Inject CSS ke head secara otomatis
const injectAuroraStyles = () => {
    const styleId = 'aurora-text-styles';

    // Cek apakah style sudah ada
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
    @keyframes gradient-x {
      0%, 100% {
        background-size: 200% 200%;
        background-position: left center;
      }
      50% {
        background-size: 200% 200%;
        background-position: right center;
      }
    }
    
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    
    @keyframes aurora-pulse {
      0%, 100% {
        opacity: 0.4;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.05);
      }
    }
    
    @keyframes floating-particles {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: translateY(-20px) rotate(360deg);
        opacity: 0;
      }
    }
    
    .animate-gradient-x {
      animation: gradient-x 3s ease infinite;
      background-size: 200% 200%;
    }
    
    .animate-shimmer {
      animation: shimmer 2s ease-in-out infinite;
      background-size: 200% 100%;
    }
    
    .animate-aurora-pulse {
      animation: aurora-pulse 2s ease-in-out infinite;
    }
    
    .animate-floating-particles {
      animation: floating-particles 3s ease-in-out infinite;
    }
  `;

    document.head.appendChild(style);
};

// Hook untuk auto-inject styles
const useAuroraStyles = () => {
    useEffect(() => {
        injectAuroraStyles();

        // Cleanup function (opsional)
        return () => {
            const existingStyle = document.getElementById('aurora-text-styles');
            if (existingStyle) {
                // Hanya hapus jika tidak ada komponen aurora lain yang aktif
                // existingStyle.remove();
            }
        };
    }, []);
};

// Komponen Aurora Text
export const AuroraText = ({
    text = 'Aurora Text',
    className = '',
    size = 'text-6xl',
    speed = 'normal',
}) => {
    useAuroraStyles(); // Auto-inject styles

    const animationDuration = speed === 'slow' ? '4s' : speed === 'fast' ? '2s' : '3s';

    return (
        <div className={`relative inline-block ${className}`}>
            {/* Background glow effect */}
            <div className="absolute inset-0 blur-lg opacity-30">
                <span
                    className={`${size} font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-aurora-pulse`}
                    style={{ animationDuration }}
                >
                    {text}
                </span>
            </div>

            {/* Main text with aurora animation */}
            <span
                className={`
          ${size} font-bold relative z-10
          bg-gradient-to-r from-purple-400 via-pink-400 via-blue-400 to-cyan-400 
          bg-clip-text text-transparent
          animate-gradient-x
          drop-shadow-lg
        `}
                style={{ animationDuration }}
            >
                {text}
            </span>

            {/* Overlay shimmer effect */}
            <div className="absolute inset-0 z-20 opacity-40">
                <span
                    className={`
          ${size} font-bold
          bg-gradient-to-r from-transparent via-white to-transparent 
          bg-clip-text text-transparent
          animate-shimmer
        `}
                >
                    {text}
                </span>
            </div>
        </div>
    );
};

export const EnhancedAuroraText = ({
    text = 'Enhanced Aurora',
    className = '',
    size = 'text-6xl',
}) => {
    useAuroraStyles(); // Auto-inject styles
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative inline-block cursor-pointer ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Multiple background layers for depth */}
            <div className="absolute inset-0 blur-xl opacity-20">
                <span
                    className={`${size} font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-aurora-pulse`}
                >
                    {text}
                </span>
            </div>

            <div className="absolute inset-0 blur-md opacity-40">
                <span
                    className={`${size} font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-bounce`}
                >
                    {text}
                </span>
            </div>

            {/* Main text */}
            <span
                className={`
        ${size} font-bold relative z-10 transition-all duration-500
        bg-gradient-to-r from-purple-300 via-pink-300 via-blue-300 to-cyan-300 
        bg-clip-text text-transparent
        ${isHovered ? 'animate-ping' : 'animate-aurora-pulse'}
        drop-shadow-2xl
      `}
            >
                {text}
            </span>

            {/* Animated particles effect */}
            <div className="absolute inset-0 z-5">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-floating-particles"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export const InteractiveAuroraText = ({
    text = 'Interactive Aurora',
    className = '',
    size = 'text-5xl',
}) => {
    useAuroraStyles(); // Auto-inject styles
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    return (
        <div
            className={`relative inline-block cursor-crosshair ${className}`}
            onMouseMove={handleMouseMove}
        >
            {/* Dynamic gradient based on mouse position */}
            <span
                className={`
          ${size} font-bold relative z-10
          bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 
          bg-clip-text text-transparent
          transition-all duration-300 ease-out
          drop-shadow-lg
          animate-gradient-x
        `}
                style={{
                    filter: `hue-rotate(${mousePos.x * 3.6}deg) brightness(${
                        1 + mousePos.y * 0.01
                    })`,
                }}
            >
                {text}
            </span>

            {/* Mouse follower glow */}
            <div
                className="absolute w-32 h-32 bg-gradient-radial from-cyan-400 via-pink-400 to-transparent rounded-full opacity-30 blur-xl pointer-events-none transition-all duration-300"
                style={{
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </div>
    );
};

// Export default untuk kemudahan import
export default AuroraText;
