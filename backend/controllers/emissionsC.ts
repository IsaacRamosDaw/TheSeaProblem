import { db } from '../models/index';
import { Request, Response } from 'express';
import { Emissions } from '@/shared/types/db-models';

const findAll = (req: Request, res: Response) => {
    db.emissions.findAll().then(emissionss => {
      if (emissionss.length === 0) return res.status(404).send({ message: 'No Emissionss found' });
  
        res.json(emissionss);
      })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving Emissionss."
        })
      })
  };
  
  const findOne = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
  
    if (!id) return res.status(404).send({ message: "Id is undefined" });
  
    db.emissions.findByPk(id).then(emissions => {
      if (!emissions) {
        return res.status(404).send({ message: "Emissions Not found." });
      }
      res.json(emissions);
    })
      .catch(error => {
        res.status(500).send({
          message: error.message || "Some error occurred while retrieving Emissionss."
        })
      })
  };
  
  const create = (req: Request, res: Response) => {
    const emissions: Emissions = req.body;
  
    db.emissions.create(emissions).then(emissionss => {
        res.json(emissionss);
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the db.Emissions."
      })
    })
  };
  
  // const update = (req, res) => {
  //   db.Emissions.update()
  //   .then(Emissionss => {
  //     })
  //   .catch(error => {
  //   })
  // };
  
  const destroy = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (!id) return res.status(404).send({ message: "Id is undefined" });
  
    db.emissions.destroy({ where: { id: id } }).then(() => {
      res.json({message: "Emissions deleted succesfully"})
    })
    .catch(error => {
      res.status(500).send({
        message: error.message || "Some error occurred while deleting the Emissions."
      })
    })
  };
  
  const EmissionsController = {
    findAll,
    findOne,
    create,
    destroy,
    emissions: db.emissions,
  };
  
  export default EmissionsController;