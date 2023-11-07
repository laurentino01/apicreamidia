import { Express } from "express";
import dumpsRoutes from "./dumps/dumps.routes";
import adminRoutes from "./admin/admin.routes";
import { verifyUser } from "./middlewares/verifyUser";
import { mongoConnect } from "./middlewares/mongoConnect";

export function routes(app: Express) {
  app.use("/admin", mongoConnect, adminRoutes);
  app.use("/dumps", mongoConnect, dumpsRoutes);
}
