import { Express } from "express";
import dumpsRoutes from "./dumps/dumps.routes";
import adminRoutes from "./admin/admin.routes";

export function routes(app: Express) {
  app.use("/dumps", dumpsRoutes);
  app.use("/admin", adminRoutes);
}
