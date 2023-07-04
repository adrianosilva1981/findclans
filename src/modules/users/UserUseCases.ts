import {
  Users,
  Users_Favorites_Characters,
  Users_Favorites_Clans,
} from "@prisma/client";
import Encryptor from "../../utils/Encryptor";
import ParamsValidator from "../../utils/ParamsValidator";
import UserFavoriteCharacterRepository from "../repository/UserFavoriteCharacterRepository";
import UserRepository from "../repository/UserRepository";
import dotenv from "dotenv";
import UserFavoriteClanRepository from "../repository/UserFavoriteClanRepository";
import fs from "fs";
import FileService from "../../services/FileService";
import AwsS3Service from "../../services/AwsS3Service";
import JwtUtil from "../../utils/JwtUtil";
import slugify from 'slugify'
import GeneralUtils from "../../utils/GeneralUtils";
import { prisma } from "../../../prisma/client";
import MailService from "../../services/MailService";
import { Request } from "express";

dotenv.config();

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

    delete data.email;

    return this.userRepository.update(Id, data);
  }

  async delete(id: number): Promise<Users> {
    return this.userRepository.delete(id);
  }

  async getUserFavoriteCharacters(
    userId: number,
    page: number,
    rows: number
  ): Promise<Users_Favorites_Characters[] | null> {
    const { PAGINATION_LIMIT = 20 } = process.env;
    const skip = page * rows;
    const finalLimit = rows || PAGINATION_LIMIT;
    const userFavoriteCharacterRepository = new UserFavoriteCharacterRepository(
      userId
    );
    return userFavoriteCharacterRepository.find(
      { userId },
      Number(finalLimit),
      skip
    );
  }

  async createUserFavorite(
    data: Users_Favorites_Characters
  ): Promise<Users_Favorites_Characters> {
    const keys = ["characterId", "userId"];
    const errors: string[] = ParamsValidator.validator(keys, data);

    if (errors.length)
      throw new Error(`Some params are missing: '${errors.join("', '")}'`);

    const { characterId, userId } = data;
    const userFavoriteCharacterRepository = new UserFavoriteCharacterRepository(
      data.userId
    );
    const favorites = await userFavoriteCharacterRepository.find(
      { characterId, userId },
      1
    );

    if (favorites?.length) return favorites[0];

    return userFavoriteCharacterRepository.create(data.characterId);
  }

  async deleteFavoriteCharacter(id: number): Promise<Object> {
    const userFavoriteCharacterRepository = new UserFavoriteCharacterRepository(
      0
    );
    return userFavoriteCharacterRepository.delete(id);
  }

  async getUserFavoriteClans(
    userId: number,
    page: number,
    rows: number
  ): Promise<Users_Favorites_Clans[] | null> {
    const { PAGINATION_LIMIT = 20 } = process.env;
    const skip = page * rows;
    const finalLimit = rows || PAGINATION_LIMIT;
    const userFavoriteClanRepository = new UserFavoriteClanRepository(userId);
    return userFavoriteClanRepository.find(
      { userId },
      Number(finalLimit),
      skip
    );
  }

  async createUserFavoriteClan(
    data: Users_Favorites_Clans
  ): Promise<Users_Favorites_Clans> {
    const keys = ["clanId", "userId"];
    const errors: string[] = ParamsValidator.validator(keys, data);

    if (errors.length)
      throw new Error(`Some params are missing: '${errors.join("', '")}'`);

    const { clanId, userId } = data;
    const userFavoriteClanRepository = new UserFavoriteClanRepository(
      data.userId
    );
    const favorites = await userFavoriteClanRepository.find(
      { clanId, userId },
      1
    );

    if (favorites?.length) return favorites[0];

    return userFavoriteClanRepository.create(data.clanId);
  }

  async deleteFavoriteClan(id: number): Promise<Object> {
    const userFavoriteClanRepository = new UserFavoriteClanRepository(0);
    return userFavoriteClanRepository.delete(id);
  }

  async uploadImage(files: any, id: number): Promise<any> {
    const path = `./tmp/${id}`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
      fs.chmodSync(path, '0777');
    }

    const { name, data } = files.image;

    const ext = GeneralUtils.getFileExtension(name)
    if (ext && !['jpg', 'jpeg', 'png'].includes(ext)) {
      throw new Error('Extension not allowed!')
    }

    const fileService = new FileService();
    const filePath = `${path}/${name}`
    const finalName = fs.existsSync(filePath)
      ? fileService.copyFileName(name)
      : name;

    const buffer = Buffer.from(data, 'base64');
    fileService.saveFile(finalName, buffer, String(id));

    const s3 = new AwsS3Service()
    const buckets = await s3.listObjects()

    if (!buckets?.find(el => el.Key === `${id}/`)) {
      await s3.putObject(`${id}/`)
    }

    const avatar = await s3.saveFile(slugify(name), filePath, String(id), { ACL:'public-read' })

    await prisma.users.update({ data: { avatar }, where: { id } })

    return avatar;
  }

  async recoveryPassword(email: string) {
    if(!email) {
      throw new Error('Email is required!')
    }

    const user = await this.userRepository.find({ email: email })

    if (!user.length) {
      throw new Error('Email not found!')
    }

    const data = {
      id: user[0].id,
      name: user[0].name,
      birthday: user[0].birthday,
      avatar: user[0].avatar,
      admin: user[0].admin
    }

    const jwtUtil = new JwtUtil()
    const { access_token: token } = jwtUtil.generateToken(data)

    const link = `${process.env.DOMAIN}/user/reset-password?token=${token}`
    const from = 'adriano.silva@semantix.ai'
    const subject = '[Find Clans] Reset Passord'
    let text = `Hi!\n\nTo reset your password from Find Clans, please make a POST request to the link below:\n${link}\n`
    text += `With the following json data: { "new_password": "*your new password here*", "confirm_new_password": "*your new password here again*" }\n`
    text += 'The link is valid for 30 minutes'

    let html = `<p>Hi!</p><p>To reset your password from Find Clans, please make a POST request to the link below:<br>${link}<br>`
    html += `With the following json data: <code>{ "new_password": "*your new password here*", "confirm_new_password": "*your new password here again*" }</code></p>`
    html += '<p>The link is valid for 30 minutes</p>'

    const mailService = new MailService()

    try {
      await mailService.sendMail(from, email, subject, text, html)
      return { link }
    } catch (error) {
      throw new Error('Error on send mail')
    }
  }

  async resetPassword(req: Request) {
    const { new_password, confirm_new_password } = req.body;
    const authHeader = req.headers.authorization;
    const [, token] = authHeader?.split(" ");

    if (!new_password) {
      throw new Error('new_password is required')
    }

    if (!confirm_new_password) {
      throw new Error('confirm_new_password is required')
    }

    if (new_password != confirm_new_password) {
      throw new Error('The passwords are differents')
    }

    const jwtUtil = new JwtUtil();
    const userData = await jwtUtil.decodeToken(token);

    if (!(<any>userData)?.id) {
      throw new Error("INVALID TOKEN");
    }

    const Id = Number((<any>userData)?.id);
    const encryptor = new Encryptor();
    const data = <Users>{
      password: encryptor.encrypt(new_password)
    }

    return this.userRepository.update(Id, data);

  }

}
