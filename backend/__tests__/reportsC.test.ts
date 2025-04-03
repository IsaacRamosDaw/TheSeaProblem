import request from "supertest";
import app, { server } from "../server";
import { db } from "../models/index";
import type { Report } from "../../shared/types/db-models";

jest.mock("../models/index", () => ({
  db: {
    reports: {
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
      destroy: jest.fn(),
    },
    sequelize: {
      authenticate: jest.fn(),
      sync: jest.fn().mockResolvedValue({}),
      close: jest.fn(),
    },
  },
}));

const mockReport: Report = {
  id: 1,
  user: "user",
  shortDescription: "shortDescription",
  description: "description",
  location: "location",
  pollutionType: "Plastic",
  date: new Date().toDateString(),
};

const invalidMockReport = { id: 1, title: "Sample Report" };

describe("findOneById Report", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close(); // Close Sequelize connection
    server.close(); // Close the server
  });

  it("should return a report if found", async () => {
    const mockReport = { id: 1, title: "Sample Report" };
    (db.reports.findOne as jest.Mock).mockResolvedValue(mockReport);

    const res = await request(app).get("/api/reports/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockReport);
    expect(db.reports.findOne).toHaveBeenCalledWith({ where: { id: "1" } });
  });

  it("should return 500 when no report is found", async () => {
    (db.reports.findOne as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/api/reports/99");

    expect(res.status).toBe(500);
    expect(db.reports.findOne).toHaveBeenCalledWith({
      where: { id: "99" },
    });
  });

  it("should handle database errors properly", async () => {
    (db.reports.findOne as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).get("/api/reports/1");

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "DB error");
  });

  it("should return the report with the correct id", async () => {
    const mockReport = { id: 1, title: "Sample Report" };
    (db.reports.findOne as jest.Mock).mockResolvedValue(mockReport);

    const res = await request(app).get("/api/reports/1");

    expect(res.body.id).toBe(1);
  });
});

describe("create Report", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close(); // Close Sequelize connection
    server.close(); // Close the server
  });

  it("should not create a report with invalid properties", async () => {
    (db.reports.create as jest.Mock).mockResolvedValue(invalidMockReport);

    const res = await request(app)
      .post("/api/reports")
      .send({ title: "Sample Report" });

    expect(res.status).toBe(400);
    expect(db.reports.create).not.toHaveBeenCalled();
  });

  it("should create a report with valid properties", async () => {
    (db.reports.create as jest.Mock).mockResolvedValue(mockReport);

    const res = await request(app).post("/api/reports").send(mockReport);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockReport);
    expect(db.reports.create).toHaveBeenCalledWith(mockReport);
  });

  it("should return 400 for invalid data", async () => {
    const res = await request(app)
      .post("/api/reports")
      .send({ invalidField: "Invalid Data" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid data");
  });

  it("should handle database errors properly", async () => {
    (db.reports.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).post("/api/reports").send(mockReport);

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "Error creating report");
  });
});

describe("updateById Report", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close(); // Close Sequelize connection
    server.close(); // Close the server
  });

  it("should return 404 if ID is not provided", async () => {
    const res = await request(app).put("/api/reports/").send(mockReport);

    expect(res.status).toBe(404);
  });

  it("should return 400 for invalid data", async () => {
    const res = await request(app)
      .put("/api/reports/1")
      .send({ invalidField: "Invalid Data" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid data");
  });

  it("should update a report with valid properties", async () => {
    (db.reports.update as jest.Mock).mockResolvedValue(mockReport);

    const res = await request(app).put("/api/reports/1").send(mockReport);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockReport);
    expect(db.reports.update).toHaveBeenCalledWith(mockReport, {
      where: { id: "1" },
    });
  });

  it("should handle database errors properly", async () => {
    (db.reports.update as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).put("/api/reports/1").send(mockReport);

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "DB error");
  });
});

describe("findAll Report", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close(); // Close Sequelize connection
    server.close(); // Close the server
  });

  it("should return all reports", async () => {
    (db.reports.findAll as jest.Mock).mockResolvedValue([mockReport]);

    const res = await request(app).get("/api/reports");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockReport]);
    expect(db.reports.findAll).toHaveBeenCalled();
  });

  it("should handle database errors properly", async () => {
    (db.reports.findAll as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).get("/api/reports");

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "DB error");
  });

  it("should return empty array if no reports are found", async () => {
    (db.reports.findAll as jest.Mock).mockResolvedValue([]);

    const res = await request(app).get("/api/reports");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe("destroyById Report", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close(); // Close Sequelize connection
    server.close(); // Close the server
  });

  it("should return 404 if ID is not provided", async () => {
    const res = await request(app).delete(`/api/reports/`);

    expect(res.status).toBe(404);
  });

  it("should delete a report by ID", async () => {
    (db.reports.destroy as jest.Mock).mockResolvedValue(1);

    const res = await request(app).delete("/api/reports/1");

    expect(res.status).toBe(204);
    expect(db.reports.destroy).toHaveBeenCalledWith({
      where: { id: "1" },
    });
  });

  it("should handle database errors properly", async () => {
    (db.reports.destroy as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).delete("/api/reports/1");

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "DB error");
  });
});
