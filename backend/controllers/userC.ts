import {db} from '../models/index';
import {Request, Response} from 'express';

const User = db.user;

const findAll = (req:Request, res:Response) => {
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

const findOne = (req:Request, res:Response) => {
  User.findOne()
  .then(users => {
    })
  .catch(error => {
  })
};
const create = (req:Request, res:Response) => {
  User.create()
  .then(users => {
    })
  .catch(error => {
  })
};

// const update = (req, res) => {
//   User.update()
//   .then(users => {
//     })
//   .catch(error => {
//   })
// };

const deleteRecord = (req:Request, res:Response) => {
  User.destroy()
  .then(users => {
    })
  .catch(error => {
  })
};

const OurReports = {
  findAll,
  findOne,
  create,
  delete: deleteRecord,
  user: db.user,
};

export default OurReports;