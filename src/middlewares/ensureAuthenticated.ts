import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IToken {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const { sub: user_id } = verify(token, "hushhush") as IToken;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User does not exist.");
    }

    next();
  } catch (error) {
    throw new Error(error.message);
  }
}
