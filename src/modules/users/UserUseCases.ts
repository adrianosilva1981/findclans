import { Users } from "@prisma/client";
import UserRepository from '../repository/UserRepository';

export default class UserUseCases {

  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async find(object: {}): Promise<Users[]> {
    return await this.userRepository.find(object)
  }

  async getById(id: number): Promise<Users | null> {
    return await this.userRepository.getById(id)
  }

  async create(user: Users): Promise<Users> {
    return await this.userRepository.create(user)
  }

  async update(id:number, user: Users): Promise<Users> {
    return await this.userRepository.update(id, user)
  }

  async delete(id:number): Promise<Object> {
    return await this.userRepository.delete(id)
  }

}
