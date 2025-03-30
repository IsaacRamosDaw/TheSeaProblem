
module.exports = (app) => {
  const user = require('../controllers/userC.js');
  var router = require("express").Router();

  //List all users
  router.get("/",  user.findAll);

  // // Get one user
  router.get("/:id", user.findOne);

  // //Create an user
  router.post("/", user.create);

  // // Update a user
  router.put("/:id", user.update);

  // //Delete user
  router.delete("/:id", user.delete);

  app.use("/users", router);
};
