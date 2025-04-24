'use client';

import Link from 'next/link';
import { Perfume } from '@/types/perfumes';
import { Heart, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/stores/cartStore';
import { useFavoritesStore } from '@/lib/stores/favoritesStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { toggleFavorite, getFavoriteStatus } from '@/lib/api/favorites';

interface PerfumeCardProps {
  perfume: Perfume;
  userId?: string;
}

export default function PerfumeCard({ perfume, userId = 'testUser123' }: PerfumeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);
  const { addFavorite, removeFavorite } = useFavoritesStore();

  useEffect(() => {
    setMounted(true);
    const checkFavoriteStatus = async () => {
      try {
        const { isFavorite: favoriteStatus } = await getFavoriteStatus(userId, perfume.documentId);
        setIsFavorite(favoriteStatus);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    checkFavoriteStatus();
  }, [perfume.documentId, userId]);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    setLoading(true);
    try {
      const { isFavorite: newStatus } = await toggleFavorite(userId, perfume.documentId);
      setIsFavorite(newStatus);

      if (newStatus) {
        addFavorite(perfume); // Esto ya maneja el incremento del contador
      } else {
        removeFavorite(perfume.documentId); // Esto ya maneja el decremento del contador
      }

      toast(newStatus ? 'Añadido a favoritos' : 'Removido de favoritos', {
        description: newStatus
          ? `${perfume.name} ha sido añadido a tus favoritos`
          : `${perfume.name} ha sido removido de tus favoritos`,
        action: {
          label: 'Ver',
          onClick: () => {},
        },
      });
    } catch (error) {
      toast.error('Error actualizando favoritos', {
        description: 'Hubo un error actualizando favoritos, por favor intenta otra vez.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    addToCart(perfume, 1);

    toast('Añadido al carrito', {
      description: `${perfume.name} ha sido añadido al carrito`,
      action: {
        label: 'Ver Carrito',
        onClick: () => {
        },
      },
    });
  };

  const descriptionText = perfume.description[0]?.children[0]?.text || '';
  const imageUrl = typeof perfume.imageUrl === 'string'
    ? perfume.imageUrl
    : perfume.imageUrl.url;
  const firstCategory = perfume.categories[0]?.name || '';

  return (
    <motion.div
      className="product-card relative rounded-lg overflow-hidden h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/perfumes/${perfume.documentId}`} className="block h-full">
        <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={perfume.name} 
            className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
          />

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 rounded-full h-8 w-8 bg-white/70 hover:bg-white dark:bg-gray-900/70 dark:hover:bg-gray-900",
              mounted && isFavorite && "text-red-500"
            )}
            onClick={handleFavoriteClick}
            disabled={loading}
          >
            <Heart className={cn(
              "h-4 w-4",
              mounted && isFavorite && "fill-red-500",
              loading && "opacity-50"
            )} />
          </Button>

          {/* Category Badge */}
          {firstCategory && (
            <Badge className="absolute bottom-2 left-2 bg-white/80 text-primary hover:bg-white/90 dark:bg-gray-900/80 dark:text-accent dark:hover:bg-gray-900/90">
              {firstCategory}
            </Badge>
          )}
        </div>

        <div className="product-card-glass p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-serif text-lg font-medium">{perfume.name}</h3>
              <p className="text-sm text-muted-foreground">{perfume.brand}</p>
            </div>
            <p className="font-medium">${perfume.price}</p>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {descriptionText}
          </p>

          <div className={cn(
            "transition-all duration-300 transform", 
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Button 
              variant="outline" 
              className={cn(
                "w-full border border-primary bg-transparent text-primary",
                "hover:bg-primary hover:text-primary-foreground",
                "flex items-center justify-center gap-2",
                "transition-colors duration-200"
              )}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Añadir al carro</span>
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
