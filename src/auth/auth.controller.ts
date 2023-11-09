import Router, { Response, Request } from "express";
import { HttpHandler } from "../utils/HttpHandler";
import { MongoRepository } from "../repositories/MongoUserRepository";
import { UserService } from "../user/UserService";
import { AuthService } from "./AuthService";

const router = Router();
const http = new HttpHandler();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const db = new MongoRepository();
  const userService = new UserService(db);
  const authService = new AuthService(userService);

  const token = await authService.login(email, password);

  if (token instanceof Error) {
    http.unauthorized(res, "Não autorizado!");
  }

  res.header("x-auth-token", token as string);
  http.ok(res, { "x-auth-token": token });
});

export default router;
