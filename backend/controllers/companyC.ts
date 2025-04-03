import { CompanySchema } from "@/shared/schemas/company-schema";
import { db } from "../models";
import { Request, Response } from "express";


const findAll = (_req: Request, res: Response) => {
  db.companies
    .findAll()
    .then((company) => {
      if (company.length === 0) {
        res.status(200).json([]);
        return;
      }
      res.status(200).json(company);
    })
    .catch(error => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving companies.",
      });
    });
};

const findOneById = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }
  db.companies
    .findOne({ where: { id } })
    .then((company) => {
      if (!company) {
        throw new Error(`Unable to locate company with id: ${id}`);
      }
      res.status(200).json(company);
    })
    .catch(error => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving companys.",
      });
    });
};

const create = (req: Request, res: Response) => {
  const companyData = req.body;

  const result = CompanySchema.safeParse(companyData);

  if (!result.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: result.error.errors,
    });
    return;
  }

  db.companies
    .create(result.data)
    .then((company) => {
      res.status(201).json(company);
    })
    .catch((error) => { 
      res.status(500).json({
        message: "Error creating company",
        error: error.message,
      });
    });
};

const updateById = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }
  const companyData = req.body;

  const result = CompanySchema.safeParse(companyData);
  if (!result.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: result.error.errors,
    });
    return;
  }

  db.companies
    .update(result.data, { where: { id } })
    .then((company) => {
      if (!company) {
        throw new Error(`Unable to locate company with id: ${id}`);
      }
      res.status(200).json(company);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || `Some error occurred while updating company ${id}.`,
      });
    });
};


// const update = (req, res) => {
//   db.company.update()
//   .then(users => {
//     })
//   .catch(error => {
//   })
// };

const destroyById = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }
  db.companies
    .destroy({ where: { id } })
    .then((company) => {
      if (!company) {
        throw new Error(`Unable to locate company with id: ${id}`);
      }
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while deleting the company.",
      });
    });
};

const Companies = {
  findAll,
  findOneById,
  create,
  updateById,
  destroyById,
};

export default Companies;