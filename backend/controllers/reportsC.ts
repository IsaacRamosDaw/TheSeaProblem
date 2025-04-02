import {db} from '../models/index';
import {Request, Response} from 'express';
import { Reports } from '@/shared/types/db-models';

const findAll = (_req:Request, res:Response) => {
  
  db.reports.findAll().then(report => {
    if (report.length === 0) return res.status(404).send({ message: 'No users found' });

      res.json(report);
    })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Reportss."
    })
  })
};

const findOne = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id) return res.status(400).send({ message: "Invalid report ID." });
  
  db.reports.findByPk(id).then(report => {
    if (!report) return res.status(404).send({ message: "Report not found." });
    
      res.json(report);
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving the report."
      });
    });
};

const create = (req: Request, res: Response) => {
  const report: Reports = req.body;

  db.reports.create(report).then(report => {
    res.status(201).json(report);
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the report."
    });
  });
};

// We either don't do this or we define explicit updates
// const update = (req, res) => {
//   db.ourReports.update()
//   .then(reports => {
//     })
//   .catch(error => {
//   })
// };

const destroy = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id) return res.status(400).send({ message: "Invalid report ID." });
  
  db.reports.destroy({ where: { id } }).then(deleted => {
    if (!deleted) return res.status(404).send({ message: "Report not found." });
      
      res.json({ message: "Report deleted successfully." });
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || "Some error occurred while deleting the report."
      });
    });
};

const Reports = {
  findAll,
  findOne,
  create,
  destroy,
  reports: db.reports,
};

export default Reports;