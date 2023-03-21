import { Request, Response } from "express";
import CharacterUseCases from "./CharacterUseCases";

const characterUserUseCase = new CharacterUseCases();

export class CharacterController {

  async find(req: Request, res: Response) {
    const { body } = req
    const result = await characterUserUseCase.find(body);

    return res.status(200).json(result);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id)
    const result = await characterUserUseCase.getById(id);

    return res.status(200).json(result);
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    const result = await characterUserUseCase.create(body);

    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id)
    const { body } = req;
    const result = await characterUserUseCase.update(id, body);

    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id)
    const result = await characterUserUseCase.delete(id);

    return res.status(200).json(result);
  }
}