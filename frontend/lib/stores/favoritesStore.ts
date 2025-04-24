import { create } from 'zustand';
import { Perfume } from '@/types/perfumes';

interface FavoritesState {
  favorites: Perfume[];
  count: number;
  setFavorites: (favorites: Perfume[]) => void;
  addFavorite: (perfume: Perfume) => void;
  removeFavorite: (perfumeId: string) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  count: 0,

  setFavorites: (favorites) =>
    set(() => ({
      favorites,
      count: favorites.length,
    })),

  addFavorite: (perfume) =>
    set((state) => {
      const updated = [...state.favorites, perfume];
      return {
        favorites: updated,
        count: updated.length,  
      };
    }),

  removeFavorite: (perfumeId) =>
    set((state) => {
      const updated = state.favorites.filter((p) => p.documentId !== perfumeId);
      return {
        favorites: updated,
        count: updated.length,  
      };
    }),

  clearFavorites: () =>
    set(() => ({
      favorites: [],
      count: 0,
    })),
}));
