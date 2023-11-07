import { NextFunction, Request, Response } from "express";
import { MongoRepository } from "../repositories/MongoRepository";
import { UserService } from "../admin/UserService";
import { AuthService } from "../admin/AuthService";
import { HttpHandler } from "../utils/HttpHandler";

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
    return new HttpHandler().unauthorized(res, "Não Autorizado!");
  }

  req.headers["user-payload"] = payload as string;

  next();
  return;
}
