import { Request, Response } from "express";
import ClanUseCases from "./ClanUseCases";

const clanUseCase = new ClanUseCases();

export class ClanController {
  async find(req: Request, res: Response) {
    try {
      const { name = '' } = req.query;
      const results = await clanUseCase.find(String(name));

      return res.status(200).json(results);
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await clanUseCase.getById(id);

      if (!result) return res.status(404).json({ message: 'Clan not found' })

      return res.status(200).json(result)
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { body } = req;
      const result = await clanUseCase.create(body);

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
      const result = await clanUseCase.update(id, body);

      return res.status(200).json(result);
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await clanUseCase.delete(id);

      return res.status(200).json({ message: 'OK' });
    } catch (error) {
      const message = (error as Error).message
      return res.status(500).json({ message });
    }
  }
}
