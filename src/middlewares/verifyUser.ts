import { NextFunction, Request, Response } from "express";
import { MongoRepository } from "../repositories/MongoRepository";
import { UserService } from "../admin/UserService";
import { AuthService } from "../admin/AuthService";

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["x-auth-token"];

  const db = new MongoRepository();
  const userService = new UserService(db);
  const authService = new AuthService(userService);

  const payload = await authService.verifyToken(token);

  if (payload instanceof Error) {
    next();
    return new Error("Não autorizado");
  }

  req.headers["user-payload"] = payload as string;

  next();
}
