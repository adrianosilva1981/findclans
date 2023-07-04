import { Clans } from "@prisma/client";

export default interface ClanInterface {
  find(name: string): Promise<Clans[]>
  getById(id: number): Promise<Clans | null>
  create(clan: Clans): Promise<Clans>
  update(id:number, clans: Clans): Promise<Clans>
  delete(id:number): Promise<Object>
}