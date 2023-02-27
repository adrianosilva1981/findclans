import { prisma } from '../../../../../prisma/client';
import { CharacterDTO } from '../../dtos/CharacterDTO';

export default class CreateCharacter  {

 async execute(characters: Array<CharacterDTO>): Promise<Object> {
  return await prisma.character.createMany({ data: characters })
 }

}
