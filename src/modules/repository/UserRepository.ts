import { Users } from "@prisma/client";
import UserInterface from "../../domain/interfaces/User/UserInterface";
import { prisma } from "../../../prisma/client";

export default class UserRepository implements UserInterface {
  async find(object: {}): Promise<Users[]> {
    return await prisma.characters.findMany({ where: object })
  }

  async getById(id: number): Promise<Users | null> {
    return await prisma.characters.findUnique({ where: { id } })
  }

  async create(user: Users): Promise<Users> {
    return await prisma.characters.create({ data: user })
  }

  async update(id:number, user: Users): Promise<Users> {
    return await prisma.characters.update({ data: user, where: { id } })
  }

  async delete(id:number): Promise<Object> {
    return await prisma.characters.delete({ where: { id } })
  }
}