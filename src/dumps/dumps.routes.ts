import Router from "express";

const router = Router();

/* GET users listinsg. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    statusCode: 200,
    body: {
      message: "OK",
    },
  });
});

export default router;
