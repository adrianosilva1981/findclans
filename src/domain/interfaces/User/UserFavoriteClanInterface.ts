import { Users_Favorites_Clans } from "@prisma/client";

export default interface UserFavoriteClanInterface {
  getUserFavorites(userId: number): Promise<Users_Favorites_Clans[] | null>
  create(userId: number, clanId: number): Promise<Users_Favorites_Clans>
  delete(id: number): Promise<Object>
}