import { Users } from "@prisma/client";

export default interface UserInterface {
  find(object: {}): Promise<Users[]>
  getById(id: number): Promise<Users | null>
  create(user: Users): Promise<Users>
  update(id:number, user: Users): Promise<Users>
  delete(id:number): Promise<Object>
}