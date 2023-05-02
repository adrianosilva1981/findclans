import { Characters } from "@prisma/client";
import CharacterRepository from "../repository/CharacterRepository";
import ParamsValidator from "../../utils/ParamsValidator";

export default class CharacterUseCases {
  private characterRepository: CharacterRepository;

  constructor() {
    this.characterRepository = new CharacterRepository();
  }

  async find(query: any): Promise<Characters[]> {
    const paginator = ParamsValidator.paginator(query);
    const { take, skip } = paginator;

    const treatedQuery = {
      where: {
        name: {
          contains: query.name || "",
          mode: "insensitive",
        },
      },
      take,
      skip,
      include: { clan: true },
    };

    if (query.status) {
      treatedQuery.where = {
        ...treatedQuery.where,
        ...{ status: query.status }
      }
    }

    if (query.patent) {
      treatedQuery.where = {
        ...treatedQuery.where,
        ...{ patent: query.patent }
      }
    }

    if (query.sex) {
      treatedQuery.where = {
        ...treatedQuery.where,
        ...{ sex: query.sex }
      }
    }

    if (query.clan) {
      treatedQuery.where = {
        ...treatedQuery.where,
        ...{
          clan: {
            name: {
              contains: query.clan || "",
              mode: "insensitive",
            },
          },
        },
      };
    }

    return await this.characterRepository.find(treatedQuery);
  }

  async getById(id: number): Promise<Characters | null> {
    return await this.characterRepository.getById(id);
  }

  async create(character: Characters): Promise<Characters> {
    return await this.characterRepository.create(character);
  }

  async update(id: number, characters: Characters): Promise<Characters> {
    return await this.characterRepository.update(id, characters);
  }

  async delete(id: number): Promise<Object> {
    return await this.characterRepository.delete(id);
  }
}
