"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
const User = index_1.db.user;
const findAll = (req, res) => {
    User.findAll()
        .then(users => {
        if (users.length === 0) {
            return res.status(204).send();
        }
        res.json(users);
    })
        .catch(error => {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving users."
        });
    });
};
const findOne = (req, res) => {
    User.findOne()
        .then(users => {
    })
        .catch(error => {
    });
};
const create = (req, res) => {
    User.create()
        .then(users => {
    })
        .catch(error => {
    });
};
// const update = (req, res) => {
//   User.update()
//   .then(users => {
//     })
//   .catch(error => {
//   })
// };
const deleteRecord = (req, res) => {
    User.destroy()
        .then(users => {
    })
        .catch(error => {
    });
};
const OurReports = {
    findAll,
    findOne,
    create,
    delete: deleteRecord,
    user: index_1.db.user,
};
exports.default = OurReports;
