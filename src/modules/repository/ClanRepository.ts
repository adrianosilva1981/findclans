import { Clans } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import ClanInterface from "../../domain/interfaces/Clan/ClanInterface";

export default class ClanRepository implements ClanInterface {
  async find(object: {}): Promise<Clans[]> {
    return await prisma.clans.findMany({ where: object })
  }

  async getById(id: number): Promise<Clans | null> {
    return await prisma.clans.findUnique({ where: { id } })
  }

  async create(user: Clans): Promise<Clans> {
    return await prisma.clans.create({ data: user })
  }

  async update(id:number, user: Clans): Promise<Clans> {
    return await prisma.clans.update({ data: user, where: { id } })
  }

  async delete(id:number): Promise<Object> {
    return await prisma.clans.delete({ where: { id } })
  }
}