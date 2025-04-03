// emissionsC.ts
import { Request, Response } from 'express';
import { db } from '../models/index';

const findAll = (_req: Request, res: Response) => {
  db.emissions
    .findAll()
    .then((emission) => {
      if (emission.length === 0) {
        res.status(200).json([]);
        return;
      }
      res.status(200).json(emission);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving emissions.',
      });
    });
};

const findOneById = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: 'ID is required' });
    return;
  }
  db.emissions
    .findOne({ where: { id } })
    .then((emission) => {
      if (!emission) {
        throw new Error(`Unable to locate emission with id: ${id}`);
      }
      res.status(200).json(emission);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || `Some error occurred while retrieving emission ${id}.`,
      });
    });
};

const create = (req: Request, res: Response) => {
  db.emissions
    .create(req.body)
    .then((emission) => {
      res.status(201).json(emission);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || 'Some error occurred while creating emission.',
      });
    });
};

const updateById = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: 'ID is required' });
    return;
  }
  db.emissions
    .update(req.body, { where: { id } })
    .then((emission) => {
      if (!emission) {
        throw new Error(`Unable to locate emission with id: ${id}`);
      }
      res.status(200).json(emission);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || `Some error occurred while updating emission ${id}.`,
      });
    });
};

const destroyById = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: 'ID is required' });
    return;
  }
  db.emissions
    .destroy({ where: { id } })
    .then((emission) => {
      if (!emission) {
        throw new Error(`Unable to locate emission with id: ${id}`);
      }
      res.status(204).json({ message: 'Emission deleted' });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || `Some error occurred while deleting emission ${id}.`,
      });
    });
};

const Emissions = {
  findAll,
  findOneById,
  create,
  updateById,
  destroyById,
};

export default Emissions;