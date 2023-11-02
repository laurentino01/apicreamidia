import Router, { Response, Request } from "express";
import { UserService } from "./UserService";
import { User } from "./UserDomain";
import bcrypt from "bcrypt";
import { InMemoryDataBase } from "../repositories/inMemoryDataBase";
import { UserDto } from "./dto/UserDto";
import { mongoConnect } from "../middlewares/mongoConnect";
import { MongoRepository } from "../repositories/MongoRepository";
import jwt from "jsonwebtoken";
import { verifyUser } from "../middlewares/verifyUser";
import { AuthService } from "./AuthService";

const router = Router();

function resOk(req: Request, res: Response, props: any) {
  return res.status(200).json({
    statusCode: 200,
    body: {
      props,
    },
  });
}

router.get(
  "/dashboard",
  mongoConnect,
  verifyUser,
  async (req: Request, res: Response) => {
    const payload = req.headers["user-payload"];

    if (!payload) {
      res.status(401).json({
        message: "Não autorizado",
      });
    }

    resOk(req, res, { payload });
  }
);

router.get("/login", mongoConnect, async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const db = new MongoRepository();
  const userService = new UserService(db);
  const authService = new AuthService(userService);

  const token = await authService.login(email, password);

  if (token instanceof Error) {
    res.status(401).json({
      statusCode: 401,
      message: "Não Autorizado!",
    });
  }

  res.header("x-auth-token", token as string);
  res.status(200).json({
    statusCode: 200,
    "x-auth-token": token,
  });
});

function badRequest(req: Request, res: Response, props: any) {
  return res.status(400).json({
    statusCode: 400,
    body: {
      props,
    },
  });
}

/* create */
router.post("/", mongoConnect, async (req: Request, res: Response) => {
  const { email, password }: Omit<User, "id"> = req.body;
  const salt = 10;
  const encryptedPassword = await bcrypt.hash(password, salt);
  const mongoDb = new MongoRepository();

  const user = new User(email, encryptedPassword);
  const userService = new UserService(mongoDb);
  const resDb = await userService.add(user);

  if (resDb instanceof Error) {
    badRequest(req, res, { message: resDb });
  }

  resOk(req, res, { message: resDb });
});

/* update */
router.put("/", mongoConnect, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password }: UserDto = req.body;
  const service = new UserService(new InMemoryDataBase());

  const resDb = service.update(id, { email, password });

  if (resDb instanceof Error) {
    badRequest(req, res, { resDb });
  }

  resOk(req, res, { resDb });
});

/* view all */

/* view one */
router.get("/:id", mongoConnect, async (req: Request, res: Response) => {
  const id = req.params.id;

  const db = new MongoRepository();
  const service = new UserService(db);

  const resDb = await service.viewOne(id);

  if (resDb instanceof Error) {
    badRequest(req, res, { resDb });
  }
  resOk(req, res, { resDb });
});

/* delete */
router.delete("/:id", mongoConnect, async (req: Request, res: Response) => {
  const { id } = req.params;

  const db = new MongoRepository();
  const service = new UserService(db);

  const resDb = await service.remove(id);

  if (resDb instanceof Error) {
    badRequest(req, res, { resDb });
  }
  resOk(req, res, { resDb });
});

export default router;
