import Companies from "../controllers/companyC";
import { type Express, Router } from "express";
import { checkJwt } from "../auth";

export default (app: Express) => {
  const router = Router();

  // Aplicar el middleware de autenticación a todas las rutas
  router.use(checkJwt);

  // how to use checkJwt middleware in express
  // router.get("/someRoute", checkJwt, someFunc);

  router.get("/", Companies.findAll);

  router.get("/:id", Companies.findOneById);

  router.post("/", Companies.create);

  router.put("/:id", Companies.updateById);

  router.delete("/:id", Companies.destroyById);

  app.use("/api/companies", router);
};
