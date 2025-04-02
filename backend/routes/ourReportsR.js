
//! Ruta para cada acción que queramos con la tabla de nuestros reportes 
module.exports = (app) => {
  const reports = require('../controllers/reportsC.ts');
  var router = require("express").Router();

  //List all reportss
  router.get("/",  reports.findAll);

  // Get one reports
  router.get("/:id", reports.findOne);

  //Create an reports
  router.post("/", reports.create);

  // Update a reports
  router.put("/:id", reports.update);

  //Delete reports
  router.delete("/:id", reports.delete);

  app.use("/ourReports", router);
};
