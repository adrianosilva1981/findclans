import { Request, Response } from "express";
import UserUseCases from "./UserUseCases";

const userUseCase = new UserUseCases();

export class UserController {
  async find(req: Request, res: Response) {
    try {
      const { body } = req;
      const results = await userUseCase.find(body);

      return res.status(200).json(results);
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await userUseCase.getById(id);

      if (!result) return res.status(404).json({ message: 'User not found' })

      return res.status(200).json(result)
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { body } = req;
      const result = await userUseCase.create(body);

      return res.status(201).json(result);
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { body } = req;
      const result = await userUseCase.update(id, body);

      return res.status(200).json(result);
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await userUseCase.delete(id);

      return res.status(200).json({ message: 'OK' });
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }
}
