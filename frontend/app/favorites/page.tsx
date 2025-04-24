import FavoritesClient from '@/components/favorites/FavoritesClient';
import { getUserFavorites } from '@/lib/api/favorites';
import { getPerfumeById } from '@/lib/get-products';
import { Perfume } from '@/types/perfumes';


const userId = 'testUser123';

export default async function FavoritesPage() {
  let perfumes: Perfume[] = [];

  try {
    const favoriteIds: string[] = await getUserFavorites(userId);

    if (favoriteIds.length > 0) {
      const perfumePromises = favoriteIds.map((id) => getPerfumeById(id));
      const resolved = await Promise.all(perfumePromises);
      perfumes = resolved.filter(Boolean); 
    }
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    perfumes = [];
  }

  return <FavoritesClient perfumes={perfumes} userId={userId} />;
}