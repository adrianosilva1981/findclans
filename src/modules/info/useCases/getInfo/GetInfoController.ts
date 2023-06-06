import { Request, Response } from "express";
import GetInfo from "./GetInfo";

export abstract class GetInfoController {
  static async handle(req: Request, res: Response) {
    const getInfo = new GetInfo();
    const { name, version, production } = getInfo.execute();

    return res.status(200).json({ name, version, production });
  }
}
