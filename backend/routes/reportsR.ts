import Reports from "../controllers/reportsC";
import { type Express, Router } from "express";

export default (app: Express) => {
  const router = Router();

  router.get("/", Reports.findAll);

  router.get("/:id", Reports.findOneById);

  router.post("/", Reports.create);

  router.put("/:id", Reports.updateById);

  router.delete("/:id", Reports.destroyById);

  app.use("/api/reports", router);
};
