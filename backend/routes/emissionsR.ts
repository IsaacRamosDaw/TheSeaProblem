import EmissionsController from "../controllers/emissionsC";
import { type Express, Router } from "express";

export default (app: Express) => {
  const router = Router();

  //List all users
  router.get("/", EmissionsController.findAll);

  // // Get one user
  router.get("/:id", EmissionsController.findOneById);

  // //Create an user
  router.post("/", EmissionsController.create);

  // // Update a user
  router.put("/:id", EmissionsController.updateById);

  // //Delete user
  router.delete("/:id", EmissionsController.destroyById);

  app.use("/api/EmissionsController", router);
};