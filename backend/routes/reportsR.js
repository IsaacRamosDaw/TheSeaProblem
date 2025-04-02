import { Router } from 'express';
import { request, response} from 'express';
module.exports = (app) => {
  const reports = require('../controllers/reportsC.ts');
  var router = require("express").Router();

  //List all users
  router.get("/",  reports.findAll);

  // // Get one user
  router.get("/:id", reports.findOne);

  // //Create an user
  router.post("/", reports.create);

  // // Update a user
  router.put("/:id", reports.update);

  // //Delete user
  router.delete("/:id", reports.delete);

  app.use("/reports", router);
};
