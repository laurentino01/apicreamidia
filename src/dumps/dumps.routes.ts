import Router from "express";

import { mongoConnect } from "../middlewares/mongoConnect";

const router = Router();

/* GET users listinsg. */
router.post("/", mongoConnect, function (req, res, next) {
  //@ts-ignore
  const token = req.token;

  res.status(200).json({
    statusCode: 200,
    body: {
      message: token,
    },
  });
});

export default router;
