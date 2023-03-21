import { Users } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import UserInterface from "../../domain/interfaces/User/UserInterface";
import Encryptor from "../../utils/Encryptor";

export default class UserRepository implements UserInterface {
  async find(object: {}): Promise<Users[]> {
    return await prisma.users.findMany({ where: object })
  }

  async getById(id: number): Promise<Users | null> {
    return await prisma.users.findUnique({ where: { id } })
  }

  async create(user: Users): Promise<Users> {
    const encryptor = new Encryptor()
    user.password = encryptor.encrypt(user.password)
    return await prisma.users.create({ data: user })
  }

  async update(id:number, user: Users): Promise<Users> {
    return await prisma.users.update({ data: user, where: { id } })
  }

  async delete(id:number): Promise<Object> {
    return await prisma.users.delete({ where: { id } })
  }
}