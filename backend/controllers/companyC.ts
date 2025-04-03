import { db } from "../models";
import { Request, Response } from "express";
import { CompanySchema } from "@/shared/schemas/company-schema";

const findAll = (_req: Request, res: Response) => {
  db.company.findAll().then(companies => {
    if (companies.length === 0) {
      res.status(202).json([]);
      return;
    }

    res.status(200).json(companies);
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving companies."
    })
  })
};

const findOneById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }

  db.company.findByPk(id).then(company => {
    if (!company) {
      throw new Error(`Unable to locate User with id: ${id}`);
    }
    
    res.status(200).json(company);
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving company."
    })
  })
};

const create = (req: Request, res: Response) => {
  const company = req.body;

  const cleanCompany = CompanySchema.safeParse(company);

  if (!cleanCompany.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: cleanCompany.error.errors,
    });

    return;
  }

  db.company.create(cleanCompany.data).then(company => {
    res.status(201).json(company);
  })
  .catch(error => {
    res.status(500).send({
      message: "Some error occurred while creating the company.",
      error: error.message
    })
  })
};

const updateById = (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    res.status(404).json({ message: "ID is required" });
    return;
  }

  const user = req.body;
  const cleanCompany = CompanySchema.safeParse(user);

  if (!cleanCompany.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: cleanCompany.error.errors,
    });
    return;
  }

  db.reports.update(cleanCompany.data, { where: { id } }).then(user => {
    if (!user) {
      throw new Error(`Unable to locate company with id: ${id}`);
    }

    res.status(200).json(user);
  })
  .catch((error) => {
    res.status(500).send({
      message:
        error.message || `Some error occurred while updating company with id: ${id}.`,
    });
  })
}

const destroyById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }

  db.company.destroy({ where: { id: id } }).then((user) => {
    if (!user) {
      throw new Error(`Unable to locate company with id: ${id}`);
    }
  
    res.status(204).send();
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting the user."
    })
  })
};

const Companies = {
  create,
  findAll,
  findOneById,
  updateById,
  destroyById,
};

export default Companies;