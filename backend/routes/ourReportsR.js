
module.exports = (app) => {
  const ourReports = require('../controllers/ourReportsC.js');
  var router = require("express").Router();

  //List all ourReportss
  router.get("/",  ourReports.findAll);

  // // Get one ourReports
  router.get("/:id", ourReports.findOne);

  // //Create an ourReports
  router.post("/", ourReports.create);

  // // Update a ourReports
  router.put("/:id", ourReports.update);

  // //Delete ourReports
  router.delete("/:id", ourReports.delete);

  app.use("/ourReports", router);
};
