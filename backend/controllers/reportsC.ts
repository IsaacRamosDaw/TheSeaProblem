//! Esto es lo mismo que llamar al models/index.js
import {db} from '../models/index';
import {Request, Response} from 'express';
//! Acción para cada uno (No están terminadas);
//?Cuando termines ve al frontend src/app.js


const findAll = (_req:Request, res:Response) => {
  db.reports.findAll()
  .then(report => {
    if (report.length === 0) {
      return res.status(204).send();
    }
    res.json(report);
    })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Reportss."
    })
  })
};

const findOne = (req:Request, res:Response) => {
  db.reports.findOne()
  .then(report => {
    })
  .catch(error => {
  })
};
const create = (req:Request, res:Response) => {
  db.reports.create()
  .then(report => {
    })
  .catch(error => {
  })
};

// We either don't do this or we define explicit updates
// const update = (req, res) => {
//   db.ourReports.update()
//   .then(reports => {
//     })
//   .catch(error => {
//   })
// };

const deleteRecord = (req:Request, res:Response) => {
  db.reports.destroy()
  .then(report => {
    })
  .catch(error => {
  })
};

//! llamamos al objeto de los modelos y lo usamos para realizar acciones en cada controlador.
const Reports = {
  findAll,
  findOne,
  create,
  delete: deleteRecord,
  ourReports: db.reports,
};

export default Reports;