"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//! Esto es lo mismo que llamar al models/index.js
const index_1 = require("../models/index");
//! Acción para cada uno (No están terminadas);
//?Cuando termines ve al frontend src/app.js
const findAll = (req, res) => {
    index_1.db.ourReports.findAll()
        .then(reports => {
        if (reports.length === 0) {
            return res.status(204).send();
        }
        res.json(reports);
    })
        .catch(error => {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving OurReportss."
        });
    });
};
const findOne = (req, res) => {
    index_1.db.ourReports.findOne()
        .then(reports => {
    })
        .catch(error => {
    });
};
const create = (req, res) => {
    index_1.db.ourReports.create()
        .then(reports => {
    })
        .catch(error => {
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
const deleteRecord = (req, res) => {
    index_1.db.ourReports.destroy()
        .then(reports => {
    })
        .catch(error => {
    });
};
//! llamamos al objeto de los modelos y lo usamos para realizar acciones en cada controlador.
const OurReports = {
    findAll,
    findOne,
    create,
    delete: deleteRecord,
    ourReports: index_1.db.ourReports,
};
exports.default = OurReports;
