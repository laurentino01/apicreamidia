import express from "express";
import cors from "cors";
import { routes } from "./routes";
import * as dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

routes(app);

app.listen(3000, () => console.log("server on " + 3000));
