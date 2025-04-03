import Companies from "../controllers/companyC";
import { type Express, Router } from "express";

export default (app: Express) => {
  const router = Router();

//   //List all companies
router.get("/",  Companies.findAll);

//   // Get one company
router.get("/:id", Companies.findOneById);

//   //Create an company
router.post("/", Companies.create);

//   // Update a company
router.put("/:id", Companies.updateById);

//   //Delete company
router.delete("/:id", Companies.destroyById);

app.use("/api/companies", router);
};
