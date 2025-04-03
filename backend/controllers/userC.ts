import { db } from '../models/index';
import { Request, Response } from 'express';
import { User } from '@/shared/types/db-models';


const findAll = (req: Request, res: Response) => {
  db.user.findAll().then(users => {
    if (users.length === 0) return res.status(404).send({ message: 'No users found' });

      res.json(users);
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving users."
      })
    })
};

const findOne = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id) return res.status(404).send({ message: "Id is undefined" });

  db.user.findByPk(id).then(user => {
    if (!user) return res.status(404).send({ message: "User Not found." });
    
    res.json(user);
  })
    .catch(error => {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving users."
      })
    })
};

const create = (req: Request, res: Response) => {
  const user: User = req.body;

  db.user.create(user).then(users => {
      res.json(users);
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the user."
    })
  })
};

// const update = (req, res) => {
//   db.user.update()
//   .then(users => {
//     })
//   .catch(error => {
//   })
// };

const destroy = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(404).send({ message: "Id is undefined" });

  db.user.destroy({ where: { id: id } }).then(() => {
    res.json({message: "User deleted succesfully"})
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting the user."
    })
  })
};

const UserController = {
  findAll,
  findOne,
  create,
  destroy,
  user: db.user,
};

export default UserController;