import { Users } from "@prisma/client";
import Encryptor from "../../utils/Encryptor";
import ParamsValidator from "../../utils/ParamsValidator";
import UserRepository from "../repository/UserRepository";

export default class UserUseCases {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async find(object: object): Promise<Users[]> {
    return this.userRepository.find(object);
  }

  async getById(id: number): Promise<Users | null> {
    return this.userRepository.getById(id);
  }

  async create(user: Users): Promise<Users> {
    const keys = ["name", "email", "avatar", "password", "birthday"];
    const errors: string[] = ParamsValidator.validator(keys, user);

    if (errors.length)
      throw new Error(`Some params are missing: '${errors.join("', '")}'`);

    const doesExistsUser = await this.userRepository.find({
      email: user.email,
    });
    if (doesExistsUser.length) throw new Error("User already exists");

    const encryptor = new Encryptor();
    user.password = encryptor.encrypt(user.password);

    return this.userRepository.create(user);
  }

  async update(Id: number, user: Users): Promise<Users> {
    return this.userRepository.update(Id, user);
  }

  async updateAcess(Id: number, data: any): Promise<Users> {
    const keys = ["email", "password"];
    const errors: string[] = ParamsValidator.validator(keys, data);

    if (errors.length)
      throw new Error(`Some params are missing: '${errors.join("', '")}'`);

    const user = await this.userRepository.find({ email: data.email, id: Id });
    if (!user.length) throw new Error("Email not found");

    const encryptor = new Encryptor();
    data.password = encryptor.encrypt(data.password);

    delete data.email

    return this.userRepository.update(Id, data);
  }

  async delete(id: number): Promise<Users> {
    return this.userRepository.delete(id);
  }
}
