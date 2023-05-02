import { Request, Response } from "express";
import CharacterUseCases from "./CharacterUseCases";

const characterUserUseCase = new CharacterUseCases();

export class CharacterController {

  async find(req: Request, res: Response) {
    try {
      const { query } = req
      const results = await characterUserUseCase.find(query);

      return res.status(200).json(results);
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const result = await characterUserUseCase.getById(id);

      if (!result) return res.status(404).json({ message: 'Character not found' })

      return res.status(200).json(result);
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { body } = req;
      const result = await characterUserUseCase.create(body);

      return res.status(201).json(result);
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const { body } = req;
      const result = await characterUserUseCase.update(id, body);

      return res.status(200).json(result);
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      await characterUserUseCase.delete(id);

      return res.status(200).json({ message: 'OK' });
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }
}