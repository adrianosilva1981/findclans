import { prisma } from "../../../prisma/client";
import { Characters } from "@prisma/client";
import CharacterInterface from "../../domain/interfaces/Character/CharacterInterface";

export default class CharacterRepository implements CharacterInterface {
  async find(object: object): Promise<Characters[]> {
    return await prisma.characters.findMany({ where: object })
  }

  async getById(id: number): Promise<Characters | null> {
    return await prisma.characters.findUnique({ where: { id } })
  }

  async create(character: Characters): Promise<Characters> {
    return await prisma.characters.create({ data: character })
  }

  async update(id: number, character: Characters): Promise<Characters> {
    return await prisma.characters.update({ data: character, where: { id } })
  }

  async delete(id: number): Promise<Object> {
    return await prisma.characters.delete({ where: { id } })
  }
}