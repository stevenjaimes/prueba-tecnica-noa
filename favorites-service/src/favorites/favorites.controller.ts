import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ToggleFavoriteDto } from './dto/toggle-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('toggle')
  toggleFavorite(@Body() toggleFavoriteDto: ToggleFavoriteDto) {
    return this.favoritesService.toggleFavorite(
      toggleFavoriteDto.userId,
      toggleFavoriteDto.resourceId
    );
  }

  @Get('user/:userId')
  getUserFavorites(@Param('userId') userId: string) {
    return this.favoritesService.getUserFavorites(userId);
  }

  @Get('status/:userId/:resourceId')
  checkFavoriteStatus(
    @Param('userId') userId: string,
    @Param('resourceId') resourceId: string
  ) {
    return this.favoritesService.checkFavoriteStatus(userId, resourceId);
  }
}