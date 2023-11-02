import Router, { Response, Request } from "express";
import { UserService } from "./UserService";
import { User } from "./UserDomain";
import bcryt from "bcrypt";
import { InMemoryDataBase } from "../repositories/inMemoryDataBase";
import { UserDto } from "./dto/UserDto";
import { mongoConnect } from "../middlewares/mongoConnect";
import { MongoRepository } from "../repositories/MongoRepository";

const router = Router();

function resOk(req: Request, res: Response, props: any) {
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
}

/* create */
router.post("/", mongoConnect, async (req: Request, res: Response) => {
  const { email, password }: Omit<User, "id"> = req.body;
  const salt = 10;
  const encryptedPassword = await bcryt.hash(password, salt);
  const mongoDb = new MongoRepository();

  const user = new User(email, encryptedPassword);
  const userService = new UserService(mongoDb, user);
  const resDb = await userService.add();

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
router.get("/", mongoConnect, async (req: Request, res: Response) => {
  const db = new MongoRepository();
  const service = new UserService(db);

  const resDb = await service.viewAll();

  if (resDb instanceof Error) {
    badRequest(req, res, { resDb });
  }
  resOk(req, res, { resDb });
});

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
