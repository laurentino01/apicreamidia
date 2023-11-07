import Router from "express";

import { mongoConnect } from "../middlewares/mongoConnect";

import { DumpDomain } from "./DumpDomain";

import { User } from "../admin/UserDomain";
import { MongoRepository } from "../repositories/MongoRepository";
import { UserService } from "../admin/UserService";
import { MongoDumpRepository } from "../repositories/MongoDumpRepository";
import { DumpService } from "./dumpService";
import { verifyUser } from "../middlewares/verifyUser";
import { HttpHandler } from "../utils/HttpHandler";
import { DumpDto } from "./dto/DumpDto";

const router = Router();
const http = new HttpHandler();

/* create */
router.post("/", verifyUser, async (req, res, next) => {
  const { dumpUrl, image, highlight }: DumpDomain = req.body;

  const dump = new DumpDomain(dumpUrl, image, highlight);
  const db = new MongoDumpRepository();
  const service = new DumpService(db, dump);

  const resDb = await service.add();

  if (resDb instanceof Error) {
    http.unauthorized(res, resDb);
  }

  http.ok(res, resDb);
});

/* update */
router.put("/:id", verifyUser, async (req, res, next) => {
  const { id } = req.params;
  const { dumpUrl, image, highlight }: DumpDomain = req.body;

  const newDump = new DumpDto(dumpUrl, image, highlight);
  const db = new MongoDumpRepository();
  const service = new DumpService(db, newDump);

  const resDb = await service.updateById(id);

  if (resDb instanceof Error) {
    if (resDb.message === "404") {
      return http.notFound(res, "dump não encontrado");
    }

    return http.badRequest(res, resDb.message);
  }

  http.ok(res, resDb);
});

/*find all */

router.get("/", async (req, res, next) => {
  const db = new MongoDumpRepository();

  const service = new DumpService(db);
  const resDb = await service.findAll();

  if (resDb instanceof Error) {
    http.badRequest(res, resDb);
  }

  http.ok(res, resDb);
});

/* find get by id */
router.get("/:id", verifyUser, async (req, res, next) => {
  const { id } = req.params;

  const db = new MongoDumpRepository();

  const service = new DumpService(db);
  const resDb = await service.findById(id);

  if (resDb instanceof Error) {
    if (resDb.message === "404") {
      return http.notFound(res, "dump não encontrado");
    }
    return http.badRequest(res, resDb.message);
  }

  return http.ok(res, resDb);
});

/* find all */
router.delete("/:id", verifyUser, async (req, res, next) => {
  const { id } = req.params;

  const db = new MongoDumpRepository();

  const service = new DumpService(db);
  const resDb = await service.removeById(id);

  if (resDb instanceof Error) {
    if (resDb.message === "404") {
      return http.notFound(res, "dump não encontrado");
    }

    return http.badRequest(res, resDb);
  }

  return http.ok(res, resDb);
});
export default router;
