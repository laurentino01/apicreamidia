import { Express } from "express";
import dumpsRoutes from "./dumps/dumps.controller";
import adminRoutes from "./admin/admin.controller";
import { mongoConnect } from "./middlewares/mongoConnect";

export function routes(app: Express) {
  app.use("/admin", mongoConnect, adminRoutes);
  app.use("/dumps", mongoConnect, dumpsRoutes);
}
