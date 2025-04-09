import Emissions from "../controllers/emissionsC";
import { type Express, Router } from "express";

export default (app: Express) => {
  const router = Router();

  //List all users
  router.get("/", Emissions.findAll);

  router.post("/", Emissions.create);

  router.put("/:id", Emissions.updateById);

  router.delete("/:id", Emissions.destroyById);

  app.use("/api/emissions", router);
};
