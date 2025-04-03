import companies from "../controllers/companyC";
import { type Express, Router } from "express";

export default (app: Express) => {
  const router = Router();

  router.get("/",  companies.findAll);

  router.get("/:id", companies.findOneById);

  router.post("/", companies.create);

  router.put("/:id", companies.updateById);

  router.delete("/:id", companies.destroyById);

  app.use("/api/companies", router);
};
