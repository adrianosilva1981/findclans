import { Users } from "@prisma/client";
import UserRepository from '../repository/UserRepository';

export default class UserUseCases {

  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async find(object: object): Promise<Object[]> {
    const users = await this.userRepository.find(object)
    return users.map(user => ({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      birthday: user.birthday,
    }))
  }

  async getById(id: number): Promise<Object | null> {
    const user = await this.userRepository.getById(id)
    if (user) {
      return {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        birthday: user.birthday,
      }
    }
    return null
  }

  async create(user: Users): Promise<Object> {
    const {
      id,
      name,
      avatar,
      birthday,
    } = await this.userRepository.create(user)

    return {
      id,
      name,
      avatar,
      birthday,
    }
  }

  async update(Id: number, user: Users): Promise<Object> {
    const {
      id,
      name,
      avatar,
      birthday,
    } = await this.userRepository.update(Id, user)

    return {
      id,
      name,
      avatar,
      birthday,
    }
  }

  async delete(id:number): Promise<Object> {
    return await this.userRepository.delete(id)
  }

}
