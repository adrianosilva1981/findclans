import { Request, Response, NextFunction } from "express";
import { verify, Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";
import UserRepository from "../modules/repository/UserRepository";

dotenv.config();
const saltKey = process.env.SALT_KEY as Secret;

interface IPayload {
  id: number
}

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing!");
  }

  const [, token] = authHeader.split(" ");

  try {
    const identy = verify(token, saltKey) as IPayload;
    const userRepository = new UserRepository()
    const user = await userRepository.getById(identy.id)
    if (!user) {
      throw new Error("Unauthorized");
    }

    req.user = {
      id: Number(identy.id)
    }

    next()
  } catch (err) {
    return res.status(401).json({ message: (err as Error).message });
  }
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing!");
  }

  const [, token] = authHeader.split(" ");

  try {
    const identy = verify(token, saltKey) as IPayload;
    const userRepository = new UserRepository()
    const user = await userRepository.getById(identy.id)
    if (!user) {
      throw new Error("Unauthorized");
    }

    if (!user.admin) {
      throw new Error("Only admin level");
    }

    req.user = {
      id: Number(identy.id)
    }

    next()
  } catch (err) {
    return res.status(401).json({ message: (err as Error).message });
  }
};

export default {
  authorize,
  isAdmin,
};
