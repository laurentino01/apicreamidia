import express from "express";
import cors from "cors";
import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.listen(process.env.PORT || 3000, () =>
  console.log("server on " + process.env.PORT || 3000)
);
