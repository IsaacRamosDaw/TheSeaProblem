<<<<<<< HEAD
import EmissionsController from "../controllers/emissionsC";
=======
import Emissions from "../controllers/emissionsC";
>>>>>>> 9e37b44436f93fea2eb527baf9c305113cdb122b
import { type Express, Router } from "express";

export default (app: Express) => {
  const router = Router();

<<<<<<< HEAD
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
=======
  router.get("/",  Emissions.findAll);

  router.get("/:id", Emissions.findOneById);

  router.post("/", Emissions.create);

  router.put("/:id", Emissions.updateById);

  router.delete("/:id", Emissions.destroyById);

  app.use("/api/emissions", router);
};
>>>>>>> 9e37b44436f93fea2eb527baf9c305113cdb122b
