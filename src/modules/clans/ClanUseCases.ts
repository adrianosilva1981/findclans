import { Clans } from "@prisma/client";
import ParamsValidator from "../../utils/ParamsValidator";
import ClanRepository from "../repository/ClanRepository";

export default class ClanUseCases {
  private clanRepository: ClanRepository;

  constructor() {
    this.clanRepository = new ClanRepository();
  }

  async find(object: object): Promise<Object[]> {
    return await this.clanRepository.find(object);
  }

  async getById(id: number): Promise<Object | null> {
    return await this.clanRepository.getById(id);
  }

  async create(clan: Clans): Promise<Object> {
    const keys = ["name", "webpage", "icon"];
    const errors: string[] = ParamsValidator.validator(keys, clan);

    if (errors.length)
      throw new Error(`Some params are missing: '${errors.join("', '")}'`);

    return await this.clanRepository.create(clan);
  }

  async update(Id: number, clan: Clans): Promise<Object> {
    return await this.clanRepository.update(Id, clan);
  }

  async delete(id: number): Promise<Object> {
    return await this.clanRepository.delete(id);
  }
}
