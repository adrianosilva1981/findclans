import { Characters } from "@prisma/client";
import CharacterRepository from '../repository/CharacterRepository';

export default class CharacterUseCases {

  private characterRepository: CharacterRepository

  constructor (){
    this.characterRepository = new CharacterRepository()
  }

  async find(object: {}): Promise<Characters[]> {
    return await this.characterRepository.find(object)
  }

  async getById(id: number): Promise<Characters | null> {
    return await this.characterRepository.getById(id)
  }

  async create(character: Characters): Promise<Characters> {
    return await this.characterRepository.create(character)
  }

  async update(id:number, characters: Characters): Promise<Characters> {
    return await this.characterRepository.update(id, characters)
  }

  async delete(id:number): Promise<Object> {
    return await this.characterRepository.delete(id)
  }

}
