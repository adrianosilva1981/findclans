import { CharacterDTO } from "./CharacterDTO"

export default interface CharacterInterface {
  find(object: {}): Promise<Object[] | null>
  getById(id: number): Promise<Object | null>
  create(characters: CharacterDTO[]): Promise<Object>
  update(id:number, object: {}): Promise<Object>
  delete(id:number): Promise<Object>
}