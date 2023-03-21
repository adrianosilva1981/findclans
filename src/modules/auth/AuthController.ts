import { Request, Response } from "express";
import AuthUseCases from "../auth/AuthUseCases";

const authUseCases = new AuthUseCases();


export class AuthController {

  async auth(req: Request, res: Response) {
    const { email, password } = req.body
    const response = await authUseCases.auth(email, password)

    return res.status(200).json(response);
  }

}