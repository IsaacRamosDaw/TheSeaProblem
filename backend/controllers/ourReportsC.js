//! Esto es lo mismo que llamar al models/index.js
const db = require('../models');
//! llamamos al objeto de los modelos y lo usamos para realizar acciones en cada controlador.
const OurReports = db.ourReports;
//! Acción para cada uno (No están terminadas); 
//?Cuando termines ve al frontend src/app.js
exports.findAll = (req, res) => {
  OurReports.findAll()
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

exports.findOne = (req, res) => {
  OurReports.findOne()
  .then(reports => {
    })
  .catch(error => {
  })
};
exports.create = (req, res) => {
  OurReports.create()
  .then(reports => {
    })
  .catch(error => {
  })
};

exports.update = (req, res) => {
  OurReports.update()
  .then(reports => {
    })
  .catch(error => {
  })
};

exports.delete = (req, res) => {
  OurReports.destroy()
  .then(reports => {
    })
  .catch(error => {
  })
};