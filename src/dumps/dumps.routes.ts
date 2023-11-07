import Router from "express";

import { mongoConnect } from "../middlewares/mongoConnect";
import { DumpService } from "./dumpService";
import { DumpDomain } from "./DumpDomain";
import { MongoDumpRepository } from "../repositories/MongoDumpRepository";

const router = Router();

/* Create . */
router.post("/", mongoConnect, async (req, res, next) => {
  const { dumpUrl, image, userId }: DumpDomain = req.body;

  const dump = new DumpDomain(dumpUrl, image, userId);
  const dumpRepository = new MongoDumpRepository(dump);
  const service = new DumpService(dump, dumpRepository);

  const resDb = await service.add();

  res.status(200).json({
    statusCode: 200,
    body: {
      message: resDb,
    },
  });
});

export default router;
