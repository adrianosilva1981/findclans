import { Request, Response } from "express";
import UserUseCases from "./UserUseCases";

const userUseCase = new UserUseCases();

export class UserController {
  async find(req: Request, res: Response) {
    const { body } = req;
    const result = await userUseCase.find(body);

    return res.status(200).json(result);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await userUseCase.getById(id);
    return res.status(200).json(result);
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    const result = await userUseCase.create(body);

    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { body } = req;
    const result = await userUseCase.update(id, body);

    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await userUseCase.delete(id);

    return res.status(200).json(result);
  }
}
