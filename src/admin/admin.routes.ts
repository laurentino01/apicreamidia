import Router, { Response, Request } from "express";
import { UserService } from "./UserService";
import { User } from "./UserDomain";
import bcryt from "bcrypt";
import { InMemoryDataBase } from "../repositories/inMemoryDataBase";
import { UserDto } from "./dto/UserDto";

const router = Router();

function resOk(req: Request, res: Response, props: any) {
  return res.status(200).json({
    statusCode: 200,
    body: {
      props,
    },
  });
}

/* create */
router.post("/", async (req: Request, res: Response) => {
  const { email, password }: Omit<User, "id"> = req.body;
  const salt = 10;
  const encryptedPassword = await bcryt.hash(password, salt);
  const inMemoryDb = new InMemoryDataBase();

  const user = new User(email, encryptedPassword);
  const userService = new UserService(inMemoryDb, user);
  userService.add();

  resOk(req, res, { message: inMemoryDb.inMemoryDataBase });
});

router.put("/", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password }: UserDto = req.body;
  const service = new UserService(new InMemoryDataBase());

  const response = service.update(id, { email, password });

  return res.status(200).json({
    statusCode: 200,
    body: {
      message: response,
      data: new InMemoryDataBase().inMemoryDataBase,
    },
  });
});

router.get("/", async (req: Request, res: Response) => {
  return;
});

export default router;
