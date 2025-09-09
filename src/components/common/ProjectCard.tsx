import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { badgeVariants } from '../ui/badge';
import type { Carousel3DItem } from '@/lib/data';

interface ProjectCardProps {
  item: Carousel3DItem;
  index: number;
  scrollYProgress: MotionValue<number>;
  totalItems: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  item, 
  index, 
  scrollYProgress, 
  totalItems 
}) => {
  const cardStart = index / totalItems;
  const cardEnd = (index + 1) / totalItems;
  const stackPoint1 = (index + 2) / totalItems;
  const stackPoint2 = (index + 3) / totalItems;
  const disappearPoint = (index + 4) / totalItems;

  // Opasitas untuk seluruh motion.div kartu
  const mainOpacity = useTransform(
    scrollYProgress,
    [cardStart, cardEnd, stackPoint2, disappearPoint],
    [0, 1, 1, 0] // Opasitas 0 saat di awal, 1 saat aktif dan 2 di belakang, lalu 0
  );

  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardEnd, stackPoint1, stackPoint2],
    [0.85, 1, 0.95, 0.9]
  );

  const y = useTransform(
    scrollYProgress,
    [cardStart, cardEnd, stackPoint1, stackPoint2],
    [100, 0, 40, 80]
  );

  // Opasitas untuk konten di CardContent (hanya untuk teks)
  // Ini akan membuat teks lebih buram saat kartu tidak aktif
  const contentOpacity = useTransform(
    scrollYProgress,
    [cardStart, cardEnd, stackPoint1],
    [0, 1, 0] // 0.5 di awal, 1 saat aktif, 0.7 saat di tumpukan
  );

  // Pointer events: auto saat kartu aktif, none saat tidak aktif
  const pointerEvents = useTransform(
    scrollYProgress,
    [cardStart, cardEnd, cardEnd + 0.001], // Sedikit setelah kartu aktif
    ['none', 'auto', 'none']
  );

  return (
    <motion.div
      className="absolute top-0 w-full max-w-2xl"
      style={{
        scale,
        y,
        opacity: mainOpacity, // Opasitas keseluruhan
        zIndex: index,
        pointerEvents: pointerEvents as any, // Penting untuk mencegah klik pada kartu belakang
      }}
    >
      <Card className="overflow-hidden bg-background text-foreground border shadow-lg flex flex-col h-[400px] sm:h-[500px]">
        {/* Header Gambar */}
        <div
          className="relative bg-black p-4 sm:p-6 flex items-center justify-center h-32 sm:h-48 overflow-hidden"
          style={{
            backgroundImage: `url(${item.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <motion.div // Tambahkan motion.div untuk opacity header
            className="relative z-10 text-center text-white"
            style={{ opacity: contentOpacity }} // Opasitas juga diterapkan pada header teks
          >
            <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{item.brand.toUpperCase()}</h3>
            <div className="w-8 h-0.5 sm:w-12 sm:h-1 bg-white mx-auto mb-1 sm:mb-2" />
            <p className="text-xs sm:text-sm">{item.title}</p>
          </motion.div>
        </div>

        {/* Konten CardContent */}
        <CardContent className="p-4 sm:p-6 flex flex-col flex-grow bg-card">
          {' '}
          {/* Tambahkan bg-card di sini */}
          <motion.div style={{ opacity: contentOpacity }}>
            {' '}
            {/* Opasitas pada seluruh CardContent */}
            <h3 className="text-lg sm:text-xl font-bold mb-1">{item.title}</h3>
            <p className="text-muted-foreground text-xs sm:text-sm font-medium mb-2">
              {item.brand}
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm flex-grow">
              {item.description}
            </p>
            <div className="mt-3 sm:mt-4">
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-1.5 py-0.5 sm:px-2 sm:py-1 text-[0.65rem] sm:text-xs ${badgeVariants({
                      variant: 'outline',
                    })}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={item.link}
                className="text-muted-foreground flex items-center hover:underline relative group text-sm sm:text-base"
              >
                <span className="relative z-10">Learn more</span>
                <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 relative z-10" />
              </a>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;