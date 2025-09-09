import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

// Grid Background Component - Modified for section background
export interface GridBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    gridSize?: number;
    gridColor?: string;
    darkGridColor?: string;
    showFade?: boolean;
    fadeIntensity?: number;
    children?: React.ReactNode;
    // New props for section usage
    asSectionBackground?: boolean;
}

export const GridBackground = ({
    className,
    children,
    gridSize = 20,
    gridColor = '#e4e4e7',
    darkGridColor = '#262626',
    showFade = true,
    fadeIntensity = 20,
    asSectionBackground = false,
    ...props
}: GridBackgroundProps) => {
    const [currentGridColor, setCurrentGridColor] = useState(gridColor);

    useEffect(() => {
        const prefersDarkMode =
            window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDarkModeActive =
            document.documentElement.classList.contains('dark') || prefersDarkMode;
        setCurrentGridColor(isDarkModeActive ? darkGridColor : gridColor);

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'class') {
                    const updatedIsDarkModeActive =
                        document.documentElement.classList.contains('dark');
                    setCurrentGridColor(updatedIsDarkModeActive ? darkGridColor : gridColor);
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return function () {
            return observer.disconnect();
        };
    }, [gridColor, darkGridColor]);

    // Default to section usage for cleaner implementation
    const containerClasses = cn(
        'relative bg-white dark:bg-black overflow-hidden',
        className
    );

    return (
        <div className={containerClasses} {...props}>
            {/* Grid Pattern Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundSize: gridSize + 'px ' + gridSize + 'px',
                    backgroundImage:
                        'linear-gradient(to right, ' +
                        currentGridColor +
                        ' 1px, transparent 1px), ' +
                        'linear-gradient(to bottom, ' +
                        currentGridColor +
                        ' 1px, transparent 1px)',
                }}
            />

            {/* Fade Effect */}
            {showFade && (
                <div
                    className="pointer-events-none absolute inset-0 bg-background"
                    style={{
                        maskImage:
                            'radial-gradient(ellipse at center, transparent ' +
                            fadeIntensity +
                            '%, black)',
                        WebkitMaskImage:
                            'radial-gradient(ellipse at center, transparent ' +
                            fadeIntensity +
                            '%, black)',
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default GridBackground;