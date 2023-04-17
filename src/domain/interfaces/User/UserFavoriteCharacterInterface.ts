import { Users_Favorites_Characters } from "@prisma/client";

export default interface UserFavoriteCharacterInterface {
  find(object: {}, take: number): Promise<Users_Favorites_Characters[] | null>
  create(character: number): Promise<Users_Favorites_Characters>
  delete(id: number): Promise<Object>
  getUserFavorites(): Promise<Users_Favorites_Characters[] | null>
}