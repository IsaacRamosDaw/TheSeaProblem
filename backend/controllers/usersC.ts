import { db } from '../models/index';
import { UsersSchema } from '../../shared/schemas/user-schema';
import { Request, Response } from 'express';


const findAll = (_req: Request, res: Response) => {
  db.users.findAll().then(users => {
    if (users.length === 0) {
      res.status(202).json([]);
      return;
    }

    res.status(200).json(users);
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving users."
    })
  })
};

const findOneById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }

  db.users.findByPk(id).then(user => {
    if (!user) {
      throw new Error(`Unable to locate User with id: ${id}`);
    }
    
    res.status(200).json(user);
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving users."
    })
  })
};

const create = (req: Request, res: Response) => {
  const user = req.body;

  const cleanUser = UsersSchema.safeParse(user);

  if (!cleanUser.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: cleanUser.error.errors,
    });
    return;
  }

  db.users.create(cleanUser.data).then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    res.status(500).send({
      message: "Some error occurred while creating the user.",
      error: error.message
    })
  })
};

const updateById = (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    res.status(404).json({ message: "ID is required" });
    return;
  }
  const user = req.body;

  // Validate the incoming data
  const cleanUser = UsersSchema.safeParse(user);
  if (!cleanUser.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: cleanUser.error.errors,
    });
    return;
  }

  db.reports
    .update(cleanUser.data, { where: { id } })
    .then((user) => {
      if (!user) {
        throw new Error(`Unable to locate user with id: ${id}`);
      }

      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || `Some error occurred while updating user ${id}.`,
      });
    })
}

const destroyById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }

  db.users.destroy({ where: { id: id } }).then((user) => {
    if (!user) {
      throw new Error(`Unable to locate report with id: ${id}`);
    }
  
    res.status(204).send();
  })
  .catch(error => {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting the user."
    })
  })
};

const Users = {
  create,
  findAll,
  findOneById,
  updateById,
  destroyById,
};

export default Users;