import {db} from '../models/index';
import {Request, Response} from 'express';

const User = db.user;

const findAll = (req:Request, res:Response) => {
  User.findAll()
  .then(users => {
    if (users.length === 0) {
      return res.status(404).send({message: 'No users found'});
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
  const id = req.params.id;
  
    if (!id) {
      return res.status(404).send({ message: "Id is undefined" });
    }

  User.findByPk(id)
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    res.json(user);
    })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving users."
    })
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

const destroy = (req:Request, res:Response) => {
  const id = req.params.id;
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
  destroy,
  user: db.user,
};

export default OurReports;