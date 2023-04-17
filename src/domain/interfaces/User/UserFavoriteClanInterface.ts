import { Users_Favorites_Clans } from "@prisma/client";

export default interface UserFavoriteClanInterface {
  find(object: {}, take: number): Promise<Users_Favorites_Clans[] | null>
  getUserFavorites(userId: number): Promise<Users_Favorites_Clans[] | null>
  create(userId: number, clanId: number): Promise<Users_Favorites_Clans>
  delete(id: number): Promise<Object>
}