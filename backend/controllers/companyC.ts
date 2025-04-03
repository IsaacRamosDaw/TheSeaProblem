import { db } from "../models";
import { Request, Response } from "express";
import { Company } from "@/shared/types/db-models";


const findAll = (req: Request, res: Response) => {
  db.company.findAll().then(companies => {
    if (companies.length === 0) return res.status(404).send({ message: 'No companies found' });

    res.json(companies);
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving companies."
    })
  })
};

const findOne = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id) return res.status(404).send({ message: "Id is undefined" });

  db.company.findByPk(id).then(company => {
    if (!company) return res.status(404).send({ message: "company Not found." }); 
    
    res.json(company);
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving companys."
    })
  })
};

const create = (req: Request, res: Response) => {
  const company: Company = req.body;

  db.company.create(company).then(company => {
    res.json(company);
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the company."
    })
  })
};

// const update = (req, res) => {
//   db.company.update()
//   .then(users => {
//     })
//   .catch(error => {
//   })
// };

const destroy = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id) return res.status(404).send({ message: "Id is undefined" });

  db.company.destroy({ where: { id: id } }).then(() => {
    res.json({message: "Company deleted succesfully"})
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting the company."
    })
  })
};

const CompanyController = {
  findAll,
  findOne,
  create,
  destroy,
  companny: db.company,
};

export default CompanyController;