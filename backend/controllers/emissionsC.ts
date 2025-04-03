import { db } from "../models/index";
import { EmissionsSchema } from "@/shared/schemas/emission-schema";
import { Request, Response } from "express";

const findAll = (_req: Request, res: Response) => {
  db.emissions.findAll().then(emissionss => {
    if (emissionss.length === 0) {
      res.status(202).json([]);
      return;
    }

    res.json(emissionss);
  })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving emissionss.",
      });
    });
};

const findOneById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }

  db.emissions.findByPk(id).then(emissions => {
    if (!emissions) {
      return res.status(404).send({ message: "Emissions Not found." });
    }

    res.status(200).json(emissions);
  })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving emissionss.",
      });
    });
};

const create = (req: Request, res: Response) => {
  const emissions = req.body;

  const cleanEmissions = EmissionsSchema.safeParse(emissions);

  if (!cleanEmissions.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: cleanEmissions.error.errors,
    });
    return;
  }

  db.emissions.create(cleanEmissions.data).then(emission => {
      res.status(201).json(emission);
  })
  .catch((error) => {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while creating the emissions.",
    });
  });
};

const updateById = (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    res.status(404).json({ message: "ID is required" });
    return;
  }

  const emission = req.body;

  // Validate the incoming data
  const cleanEmission = EmissionsSchema.safeParse(emission);
  if (!cleanEmission.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: cleanEmission.error.errors,
    });
    return;
  }

  db.emissions.update(cleanEmission.data, { where: { id } }).then(emission => {
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
  })
}

const destroyById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }

  db.users.destroy({ where: { id: id } }).then(user => {
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

const Emissions = {
  create,
  findAll,
  findOneById,
  updateById,
  destroyById,
};

export default Emissions;
