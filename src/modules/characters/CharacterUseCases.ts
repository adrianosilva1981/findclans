import { CharacterDTO } from '../../domain/interfaces/Character/CharacterDTO';
import CharacterRepository from '../repository/CharacterRepository';

export default class CharacterUseCases {

  private characterRepository: CharacterRepository

  constructor (){
    this.characterRepository = new CharacterRepository()
  }

  async find(object: {}): Promise<Object | null> {
    return await this.characterRepository.find(object)
  }

  async getById(id: number): Promise<Object | null> {
    return await this.characterRepository.getById(id)
  }

  async create(characters: CharacterDTO[]): Promise<Object> {
    return await this.characterRepository.create(characters)
  }

  async update(id:number, object: {}): Promise<Object> {
    return await this.characterRepository.update(id, object)
  }

  async delete(id:number): Promise<Object> {
    return await this.characterRepository.delete(id)
  }

}
