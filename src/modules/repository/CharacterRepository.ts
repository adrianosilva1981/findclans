import CharacterInterface from "../../domain/interfaces/Character/CharacterInterface";
import { CharacterDTO } from "../../domain/interfaces/Character/CharacterDTO";
import { prisma } from "../../../prisma/client";

export default class CharacterRepository implements CharacterInterface {
  async find(object: Object): Promise<Array<Object> | null> {
    return await prisma.characters.findMany({ where: object })
  }

  async getById(id: number): Promise<Object | null> {
    return await prisma.characters.findUnique({ where: { id } })
  }

  async create(characters: CharacterDTO[]): Promise<Object> {
    return await prisma.characters.createMany({ data: characters })
  }

  async update(id: number, object: Object): Promise<Object> {
    return await prisma.characters.updateMany({ data: object, where: { id } })
  }

  async delete(id: number): Promise<Object> {
    return await prisma.characters.delete({ where: { id } })
  }
}