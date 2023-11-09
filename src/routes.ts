import { Express } from "express";
import dumpsRoutes from "./dumps/dumps.controller";
import userRoutes from "./user/user.controller";
import authRoutes from "./auth/auth.controller";
import { mongoConnect } from "./middlewares/mongoConnect";

export function routes(app: Express) {
  app.use("/user", mongoConnect, userRoutes);
  app.use("/dumps", mongoConnect, dumpsRoutes);
  app.use("/auth", mongoConnect, authRoutes);
}
