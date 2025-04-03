import User from "../controllers/userC";
ifrom "express";

export default (app: Express) => {
  const router = Router();

  router.get("/",  User.findAll);

  router.get("/:id", User.findOneById);

  router.post("/", User.create);

  router.put("/:id", User.updateById);

  router.delete("/:id", User.destroyById);

  app.use("/api/users", router);
};
