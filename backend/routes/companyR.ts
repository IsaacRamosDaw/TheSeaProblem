import Companies from "../controllers/companyC";
import { type Express, Router } from "express";

export default (app: Express) => {
  const router = Router();

  router.get("/", Companies.findAll);

  router.get("/:id", Companies.findOneById);

  router.post("/", Companies.create);

  router.put("/:id", Companies.updateById);

  router.delete("/:id", Companies.destroyById);

  app.use("/api/companies", router);
};
