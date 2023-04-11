import { Users, Users_Favorites_Clans } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import UserFavoriteClanInterface from "../../domain/interfaces/UserFavoriteClan/UserFavoriteClanInterface";

export default class UserFavoriteClanRepository implements UserFavoriteClanInterface {
  async getUserFavorites(userId: number): Promise<Users_Favorites_Clans[] | null> {
    return await prisma.users_Favorites_Clans.findMany({ where: { userId } })
  }

  async create(userId: number, clanId: number): Promise<Users_Favorites_Clans> {
    return await prisma.users_Favorites_Clans.create({ data: { userId, clanId } })
  }

  async delete(id: number): Promise<Users_Favorites_Clans> {
    return await prisma.users_Favorites_Clans.delete({ where: { id } })
  }
}