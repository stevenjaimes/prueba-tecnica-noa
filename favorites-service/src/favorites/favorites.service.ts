import { Injectable } from '@nestjs/common';
import { Favorite } from './interfaces/favorite.interface';

@Injectable()
export class FavoritesService {
  private favorites: Favorite[] = [];

  toggleFavorite(userId: string, resourceId: string): { isFavorite: boolean } {
    const index = this.favorites.findIndex(
      fav => fav.userId === userId && fav.resourceId === resourceId
    );

    if (index === -1) {
      this.favorites.push({
        userId,
        resourceId,
        createdAt: new Date()
      });
      return { isFavorite: true };
    } else {
      this.favorites.splice(index, 1);
      return { isFavorite: false };
    }
  }

  getUserFavorites(userId: string): string[] {
    return this.favorites
      .filter(fav => fav.userId === userId)
      .map(fav => fav.resourceId);
  }

  checkFavoriteStatus(userId: string, resourceId: string): { isFavorite: boolean } {
    const isFavorite = this.favorites.some(
      fav => fav.userId === userId && fav.resourceId === resourceId
    );
    return { isFavorite };
  }
}