import { Character } from '@prisma/client';
import { prisma } from '../../../../../prisma/client';
import { CharacterDTO } from '../../dtos/CharacterDTO';

export default class CreateCharacter  {

 async execute(character: CharacterDTO): Promise<Character> {
  return await prisma.character.create({ data: character })
 }

}
