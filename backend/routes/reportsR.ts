import Reports from "../controllers/reportsC";
import { type Express, Router } from "express";
import { checkJwt } from "../auth";

export default (app: Express) => {
  const router = Router();

  router.get("/", checkJwt, Reports.findAll);

  router.get("/:id", Reports.findOneById);

  router.post("/", Reports.create);

  router.put("/:id", Reports.updateById);

  router.delete("/:id", Reports.destroyById);

  app.use("/api/reports", router);
};
