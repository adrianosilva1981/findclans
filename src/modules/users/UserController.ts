import { Users } from "@prisma/client";
import { Request, Response } from "express";
import UserDT from "../../domain/dts/UserDT";
import UserUseCases from "./UserUseCases";
import JwtUtil from "../../utils/JwtUtil";

const userUseCase = new UserUseCases();

export class UserController {
  async find(req: Request, res: Response) {
    try {
      const { body } = req;
      let results: any = await userUseCase.find(body);

      results = results.map((user: Users) => {
        return UserDT.convertPublicUserData(user);
      });

      return res.status(200).json(results);
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500).json({ message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await userUseCase.getById(id);

      if (!result) return res.status(404).json({ message: "User not found" });

      return res.status(200).json(UserDT.convertPublicUserData(result));
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500).json({ message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { body } = req;
      const result = await userUseCase.create(body);

      return res.status(201).json(UserDT.convertPublicUserData(result));
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500).json({ message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new Error("Token missing!");
      }

      const [, token] = authHeader.split(" ");
      const id = Number(req.params.id);
      const jwtUtil = new JwtUtil();

      const userData = await jwtUtil.decodeToken(token);
      if (!(<any>userData)?.admin && id !== (<any>userData)?.id) {
        throw new Error("RESTRICT ACCESS LEVEL");
      }

      const { body } = req;
      const safeData = UserDT.convertUserDatatoUpdate(body);
      const result = await userUseCase.update(id, safeData);

      return res.status(200).json(UserDT.convertPublicUserData(result));
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500).json({ message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await userUseCase.delete(id);

      return res.status(200).json({ message: "OK" });
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500).json({ message });
    }
  }

  async updateAcess(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new Error("Token missing!");
      }
      const [, token] = authHeader.split(" ");
      const jwtUtil = new JwtUtil();
      const userData = await jwtUtil.decodeToken(token);
      if (!(<any>userData)?.admin && id !== (<any>userData)?.id) {
        throw new Error("RESTRICT ACCESS LEVEL");
      }

      const {
        body: { email, password },
      } = req;

      const result = await userUseCase.updateAcess(id, { email, password });

      return res.status(200).json(UserDT.convertPublicUserData(result));
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500).json({ message });
    }
  }

  async getUserFavoriteCharacters(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { page = null, rows = null } = req.query;
      const results = await userUseCase.getUserFavoriteCharacters(
        Number(id),
        Number(page),
        Number(rows)
      );

      return res.status(200).json(results);
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500).json({ message });
    }
  }

  async createUserFavoriteCharacter(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new Error("Token missing!");
      }
      const [, token] = authHeader.split(" ");
      const jwtUtil = new JwtUtil();

      const userData = await jwtUtil.decodeToken(token);
      if ((<any>userData)?.id !== req.body.userId) {
        throw new Error("RESTRICT ACCESS LEVEL");
      }

      const { body } = req;
      const result = await userUseCase.createUserFavorite(body);
      return res.status(201).json(result);
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500).json({ message });
    }
  }

  async deleteFavoriteCharacter(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await userUseCase.deleteFavoriteCharacter(Number(id));
      return res.status(200).json(result);
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500).json({ message });
    }
  }

  async getUserFavoriteClans(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { page = null, rows = null } = req.query;
      const result = await userUseCase.getUserFavoriteClans(
        Number(id),
        Number(page),
        Number(rows)
      );
      return res.status(200).json(result);
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500);
    }
  }

  async createUserFavoriteClan(req: Request, res: Response) {
    try {
      const { body } = req;
      const result = await userUseCase.createUserFavoriteClan(body);
      return res.status(201).json(result);
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500);
    }
  }

  async deleteFavoriteClan(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await userUseCase.deleteFavoriteClan(Number(id));
      return res.status(200).json(result);
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500);
    }
  }

  async uploadImage(req: Request, res: Response) {
    try {
      const { files } = req;
      const image = await userUseCase.uploadImage(files, req.user.id);
      return res.status(200).json({ image });
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500).json({ message });
    }
  }

  async recoveryPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const response = await userUseCase.recoveryPassword(email);
      return res.status(200).json({ response });
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500).json({ message });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const response = await userUseCase.resetPassword(req)
      return res.status(200).json({ response });
    } catch (error) {
      const message = (error as Error).message;
      return res.status(500).json({ message });

    }
  }
}
