import Companies from "../controllers/companyC";
import { type Express, Router } from "express";
import { checkJwt } from "../auth";

export default (app: Express) => {
  const router = Router();

  router.get("/", checkJwt, Companies.findAll);

  router.get("/:id", checkJwt, Companies.findOneById);

  router.post("/", checkJwt, Companies.create);

  router.put("/:id", checkJwt, Companies.updateById);

  router.delete("/:id", checkJwt, Companies.destroyById);

  app.use("/api/companies", router);
};
