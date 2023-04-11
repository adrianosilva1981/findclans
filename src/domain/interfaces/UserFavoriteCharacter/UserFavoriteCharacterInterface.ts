import { Users_Favorites_Characters } from "@prisma/client";

export default interface UserFavoriteCharacterInterface {
  create(userId: number, character: number): Promise<Users_Favorites_Characters>
  delete(userId: number, character: number): Promise<Object>
  getUserFavorites(userId: number): Promise<Users_Favorites_Characters | null>
}