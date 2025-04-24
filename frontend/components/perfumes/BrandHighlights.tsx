'use client';

import { BRANDS } from '@/lib/data';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BrandHighlights() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 px-4 sm:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {BRANDS.map((brand) => (
        <motion.div 
          key={brand.name} 
          variants={itemVariants}
          whileHover="hover"
          className="group"
        >
          <Link 
            href={`/brands/${brand.name.toLowerCase()}`}
            className="block h-full"
          >
            <div className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center relative overflow-hidden">
              {/* Efecto de fondo sutil */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Logo con efecto de iluminación */}
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary relative group-hover:bg-primary/20 transition-colors duration-300">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300" />
                <span className="text-3xl font-serif z-10">{brand.logo}</span>
              </div>
              
              {/* Contenido de texto */}
              <div className="relative z-10">
                <h3 className="font-serif text-xl font-medium mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {brand.name}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {brand.products} products
                </p>
              </div>
              
              {/* Efecto de borde inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}