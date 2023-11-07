import Router, { Response, Request } from "express";
import { UserService } from "./UserService";
import { User } from "./UserDomain";
import bcrypt from "bcrypt";
import { InMemoryDataBase } from "../repositories/inMemoryDataBase";
import { UserDto } from "./dto/UserDto";
import { MongoRepository } from "../repositories/MongoRepository";
import { AuthService } from "./AuthService";
import { HttpHandler } from "../utils/HttpHandler";

const router = Router();

const http = new HttpHandler();

/* function resOk(req: Request, res: Response, props: any) {
  return res.status(200).json({
    statusCode: 200,
    body: {
      props,
    },
  });
}

function badRequest(req: Request, res: Response, props: any) {
  return res.status(400).json({
    statusCode: 400,
    body: {
      props,
    },
  });
} */

router.get("/login", async (req: Request, res: Response) => {
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

/* create */
router.post("/", async (req: Request, res: Response) => {
  const { email, password }: Omit<User, "id"> = req.body;
  const salt = 10;
  const encryptedPassword = await bcrypt.hash(password, salt);
  const mongoDb = new MongoRepository();

  const user = new User(email, encryptedPassword);
  const userService = new UserService(mongoDb);
  const resDb = await userService.add(user);

  if (resDb instanceof Error) {
    http.badRequest(res, resDb);
  }

  http.ok(res, resDb);
});

/* update */
router.put("/", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password }: UserDto = req.body;
  const service = new UserService(new InMemoryDataBase());

  const resDb = service.update(id, { email, password });

  if (resDb instanceof Error) {
    http.badRequest(res, resDb);
  }

  http.ok(res, resDb);
});

/* view all */
router.get("/", async (req: Request, res: Response) => {
  const db = new MongoRepository();
  const service = new UserService(db);

  const resDb = await service.viewAll();

  if (resDb instanceof Error) {
    http.badRequest(res, resDb);
  }
  http.ok(res, resDb);
});

/* view one */
router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const db = new MongoRepository();
  const service = new UserService(db);

  const resDb = await service.viewOne(id);

  if (resDb instanceof Error) {
    http.badRequest(res, resDb);
  }
  http.ok(res, resDb);
});

/* delete */
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const db = new MongoRepository();
  const service = new UserService(db);

  const resDb = await service.remove(id);

  if (resDb instanceof Error) {
    http.badRequest(res, resDb);
  }
  http.ok(res, resDb);
});

export default router;
