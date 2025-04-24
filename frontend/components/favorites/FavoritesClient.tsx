'use client';
import { useEffect } from 'react';
import { useFavoritesStore } from '@/lib/stores/favoritesStore';
import PerfumeCard from '@/components/perfumes/PerfumeCard';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Perfume } from '@/types/perfumes';

interface Props {
  perfumes: Perfume[];
  userId: string;
}

export default function FavoritesClient({ perfumes, userId }: Props) {
  const { setFavorites, favorites, count } = useFavoritesStore();

  useEffect(() => {
    setFavorites(perfumes);
  }, [perfumes, setFavorites]);

  return (
    <div className="container mx-auto px-4 py-16">
      <form action="/api/clear-favorites" method="POST">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-medium">Tus favoritos ({count})</h1>
         
        </div>
      </form>

      <Separator className="mb-12" />

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((perfume) => (
            <PerfumeCard key={perfume.documentId} perfume={perfume} userId={userId} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Ningún favorito todavía.</p>
      )}
    </div>
  );
}
