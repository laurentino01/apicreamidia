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

const router = Router();
const http = new HttpHandler();

/* create */
router.post("/", verifyUser, async (req, res, next) => {
  const { dumpUrl, image, highlight }: DumpDomain = req.body;

  const dump = new DumpDomain(dumpUrl, image, highlight);
  const db = new MongoDumpRepository();
  const service = new DumpService(dump, db);

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

  const newDump = new DumpDomain(dumpUrl, image, highlight);
  const db = new MongoDumpRepository();
  const service = new DumpService(newDump, db);

  const resDb = await service.updateById(id);

  if (resDb instanceof Error) {
    http.unauthorized(res, resDb);
  }

  http.ok(res, resDb);
});

export default router;
