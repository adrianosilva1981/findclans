import { Character } from '@prisma/client';
import { prisma } from '../../../../../prisma/client';
import { CharacterDTO } from '../../dtos/CharacterDTO';

export default class CreateCharacter  {

 async execute(character: Array<CharacterDTO>): Promise<Object> {
  return await prisma.character.createMany({ data: character })
 }

}
