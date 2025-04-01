//! Esto es lo mismo que llamar al models/index.js
import {db} from '../models/index';
import {Request, Response} from 'express';
//! Acción para cada uno (No están terminadas);
//?Cuando termines ve al frontend src/app.js

const findAll = (req:Request, res:Response) => {
  db.ourReports.findAll()
  .then(reports => {
    if (reports.length === 0) {
      return res.status(204).send();
    }
    res.json(reports);
    })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving OurReportss."
    })
  })
};

const findOne = (req:Request, res:Response) => {
  db.ourReports.findOne()
  .then(reports => {
    })
  .catch(error => {
  })
};
const create = (req:Request, res:Response) => {
  db.ourReports.create()
  .then(reports => {
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
  db.ourReports.destroy()
  .then(reports => {
    })
  .catch(error => {
  })
};

//! llamamos al objeto de los modelos y lo usamos para realizar acciones en cada controlador.
const OurReports = {
  findAll,
  findOne,
  create,
  delete: deleteRecord,
  ourReports: db.ourReports,
};

export default OurReports;