
//! Esto es lo mismo que llamar al models/index.js
import { ReportSchema } from "../../shared/schemas/report-schema";
import { db } from "../models/index";
import { Request, Response } from "express";
//! Acción para cada uno (No están terminadas);
//?Cuando termines ve al frontend src/app.js

const findAll = (_req: Request, res: Response) => {
  db.reports
    .findAll()
    .then((report) => {
      if (report.length === 0) {
        res.status(200).json([]);
        return;
      }
      res.status(200).json(report);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving Reportss.",
      });
    });
};

const findOneById = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }
  db.reports
    .findOne({ where: { id } })
    .then((report) => {
      if (!report) {
        throw new Error(`Unable to locate report with id: ${id}`);
      }
      res.status(200).json(report);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || `Some error occurred while retrieving report ${id}.`,
      });
    });
};

const create = (req: Request, res: Response) => {
  const reportData = req.body;

  // Validate the incoming data
  const result = ReportSchema.safeParse(reportData);

  if (!result.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: result.error.errors,
    });
    return;
  }

  // If validation passes, proceed to create the report

  db.reports
    .create(result.data)
    .then((report) => {
      res.status(201).json(report);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error creating report",
        error: error.message,
      });
    });
};

const updateById = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "ID is required" });
    return;
  }
  const reportData = req.body;

  // Validate the incoming data
  const result = ReportSchema.safeParse(reportData);
  if (!result.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: result.error.errors,
    });
    return;
  }

  db.reports
    .update(result.data, { where: { id } })
    .then((report) => {
      if (!report) {
        throw new Error(`Unable to locate report with id: ${id}`);
      }

      res.status(200).json(report);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || `Some error occurred while updating report ${id}.`,
      });
    });
};

const destroyById = (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "ID is required" });
    return;
  }
  db.reports
    .destroy({ where: { id } })
    .then((report) => {
      if (!report) {
        throw new Error(`Unable to locate report with id: ${id}`);
      }
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || `Some error occurred while deleting report ${id}.`,
      });
    });
};

const Reports = {
  findAll,
  findOneById,
  /**
   * Create a new report. Requires a POST request with the report data in the body.
   * The data is validated using the ReportSchema before being saved to the database.
   */
  create,
  /**
   * Update an existing report by ID. Requires a PUT request with the report data in the body.
   * The data is validated using the ReportSchema before being updated in the database.
   */
  updateById,
  destroyById,
};

export default Reports;
