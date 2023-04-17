import { Users_Favorites_Clans } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import UserFavoriteClanInterface from "../../domain/interfaces/User/UserFavoriteClanInterface";

export default class UserFavoriteClanRepository implements UserFavoriteClanInterface {
  private userId: number;

  constructor(id: number) {
    this.userId = id
  }

  async find(object: {}, take: number, skip: number = 0): Promise<Users_Favorites_Clans[] | null> {
    return await prisma.users_Favorites_Clans.findMany({ where: object, take, skip, include: { clan: true } })
  }

  async getUserFavorites(userId: number): Promise<Users_Favorites_Clans[] | null> {
    return await prisma.users_Favorites_Clans.findMany({ where: { userId: this.userId } })
  }

  async create(clanId: number): Promise<Users_Favorites_Clans> {
    return await prisma.users_Favorites_Clans.create({ data: { userId: this.userId, clanId } })
  }

  async delete(id: number): Promise<Users_Favorites_Clans> {
    return await prisma.users_Favorites_Clans.delete({ where: { id } })
  }
}