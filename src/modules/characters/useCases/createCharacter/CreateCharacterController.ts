import { Request, Response } from "express";
import CreateCharacter from "./CreateCharacter";

export abstract class CreateCharacterController {

  static async handle(req: Request, res: Response) {
    const {} = req.body;

    const createUserUseCase = new CreateCharacter();

    // const result = await createUserUseCase.execute({});

    return res.status(201).json('create user works!');
  }

}