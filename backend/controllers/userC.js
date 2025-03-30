const db = require('../models');
const User = db.user;

exports.findAll = (req, res) => {
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
    })
  })
};

exports.findOne = (req, res) => {
  User.findOne()
  .then(users => {
    })
  .catch(error => {
  })
};
exports.create = (req, res) => {
  User.create()
  .then(users => {
    })
  .catch(error => {
  })
};

exports.update = (req, res) => {
  User.update()
  .then(users => {
    })
  .catch(error => {
  })
};

exports.delete = (req, res) => {
  User.destroy()
  .then(users => {
    })
  .catch(error => {
  })
};