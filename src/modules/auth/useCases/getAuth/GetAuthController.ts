import { Request, Response } from "express";
import GetInfo from "./GetAuth";

export abstract class GetAuthController {

  static async handle(req: Request, res: Response) {
    const { user, password } = req.body
    const getInfo = new GetInfo()
    const response = getInfo.execute(user, password)

    return res.status(200).json(response);
  }

}