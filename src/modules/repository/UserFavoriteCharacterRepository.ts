import { Users_Favorites_Characters } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import UserFavoriteCharacterInterface from "../../domain/interfaces/User/UserFavoriteCharacterInterface";

export default class UserFavoriteCharacterRepository implements UserFavoriteCharacterInterface {
  private userId: number;

  constructor(id: number) {
    this.userId = id
  }

  async find(object: {}, take: number, skip: number = 0): Promise<Users_Favorites_Characters[] | null> {
    return await prisma.users_Favorites_Characters.findMany({ where: object, take, skip, include: { characters: true } })
  }

  async create(characterId: number): Promise<Users_Favorites_Characters> {
    return await prisma.users_Favorites_Characters.create({ data: { userId: this.userId, characterId } })
  }
  async delete(id: number): Promise<Object> {
    return await prisma.users_Favorites_Characters.delete({ where: { id } })

  }
  async getUserFavorites(): Promise<Users_Favorites_Characters[] | null> {
    return await prisma.users_Favorites_Characters.findMany({ where: { userId: this.userId } })
  }
}