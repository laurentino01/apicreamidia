import Router, { Response, Request } from "express";
import { UserService } from "./UserService";
import { User } from "./UserDomain";
import bcrypt from "bcrypt";
import { MongoRepository } from "../repositories/MongoUserRepository";
import { HttpHandler } from "../utils/HttpHandler";
import { verifyUser } from "../middlewares/verifyUser";

const router = Router();

const http = new HttpHandler();

/* Create User */
router.post("/create", async (req: Request, res: Response) => {
  const { name, email, password, role }: Omit<User, "id"> = req.body;
  const salt = 10;
  const encryptedPassword = await bcrypt.hash(password, salt);
  const mongoDb = new MongoRepository();

  const user = new User(name, email, encryptedPassword, role);
  const userService = new UserService(mongoDb);
  const resDb = await userService.add(user);

  if (resDb instanceof Error) {
    if (resDb.message === "409") {
      return http.conflict(res, "Email já cadastrado!");
    }

    return http.badRequest(res, resDb);
  }

  return http.ok(res, resDb);
});

/* update */
/* router.put("/", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password }: UserDto = req.body;
  const service = new UserService();

  const resDb = service.updateById(id, { email, password });

  if (resDb instanceof Error) {
    http.badRequest(res, resDb);
  }

  http.ok(res, resDb);
});
 */

/* view all */
router.get("/", async (req: Request, res: Response) => {
  const db = new MongoRepository();
  const service = new UserService(db);

  const resDb = await service.findAll();

  if (resDb instanceof Error) {
    http.badRequest(res, resDb);
  }
  http.ok(res, resDb);
});

/* view one */
router.get("/user/profile", async (req: Request, res: Response) => {
  const payload = req.headers["x-auth-token"];

  /* const db = new MongoRepository();
  const service = new UserService(db);

  const resDb = await service.findByIdOrEmail(payload as string); */

  /*  if (resDb instanceof Error) {
    http.badRequest(res, resDb);
  } */
  http.ok(res, payload);
});

/* delete */
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const db = new MongoRepository();
  const service = new UserService(db);

  const resDb = await service.remove(id);

  if (resDb instanceof Error) {
    if (resDb.message === "404") {
      return http.notFound(res, "Usuário não encontrado!");
    }
    return http.badRequest(res, "Bad Request");
  }
  return http.ok(res, resDb);
});

export default router;
