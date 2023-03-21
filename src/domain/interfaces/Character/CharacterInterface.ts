import { Characters } from "@prisma/client";

export default interface CharacterInterface {
  find(object: object): Promise<Characters[]>
  getById(id: number): Promise<Characters | null>
  create(character: Characters): Promise<Characters>
  update(id:number, characters: Characters): Promise<Characters>
  delete(id:number): Promise<Object>
}