import Reports from "../controllers/reportsC";
import { type Express, Router } from "express";

export default (app: Express) => {
  const router = Router();

  //List all users
  router.get("/", Reports.findAll);

  // // Get one user
  router.get("/:id", Reports.findOneById);

  // //Create an user
  router.post("/", Reports.create);

  // // Update a user
  router.put("/:id", Reports.updateById);

  // //Delete user
  router.delete("/:id", Reports.destroyById);

  app.use("/api/reports", router);
};
