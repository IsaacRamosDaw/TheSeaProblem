import request from "supertest";
import app, { server } from "../server";
import { db } from "../models/index";
import type { Emission } from "../../shared/types/db-models";

jest.mock("../auth", () => ({
  checkJwt: jest.fn((req, res, next) => next()),
}));

jest.mock("../models/index", () => ({
  db: {
    emissions: {
      findByPk: jest.fn(),
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

const mockEmission: Emission = {
  id: 1,
  volume: 200,
  frequency: "Frequency",
  dischargePoint: "Discharge",
  reductionTarget: "Target",
  companyId: 2,
  pollutionType: "Plastic",
  date: "10-12-2012",
};

const invalidMockEmission = { id: 1, name: "emission" };

describe("findOneById emission", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  it("should return an emission if found", async () => {
    (db.emissions.findByPk as jest.Mock).mockResolvedValue(mockEmission);

    const res = await request(app).get("/api/emissions/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockEmission);
    expect(db.emissions.findByPk).toHaveBeenCalledWith(1);
  });

  it("should return 500 when no emission is found", async () => {
    (db.emissions.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/api/emissions/99");

    expect(response.status).toBe(500);
    expect(db.emissions.findByPk).toHaveBeenCalledWith(99);
  });

  it("should handle database errors properly", async () => {
    (db.emissions.findByPk as jest.Mock).mockRejectedValue(
      new Error("DB error"),
    );
    const response = await request(app).get("/api/emissions/1");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "DB error");
  });
});

describe("create Company", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  it("should not create a company with invalid properties", async () => {
    (db.emissions.create as jest.Mock).mockResolvedValue(invalidMockEmission);

    const res = await request(app)
      .post("/api/emissions")
      .send({ title: "Sample user" });

    expect(res.status).toBe(400);
    expect(db.emissions.create).not.toHaveBeenCalled();
  });

  it("should create a company with valid properties", async () => {
    (db.emissions.create as jest.Mock).mockResolvedValue(mockEmission);

    const response = await request(app)
      .post("/api/emissions")
      .send(mockEmission);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockEmission);
    expect(db.emissions.create).toHaveBeenCalledWith(mockEmission);
  });

  it("should return 400 for invalid data", async () => {
    const response = await request(app)
      .post("/api/emissions")
      .send({ invalidField: "Invalid Data" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid data");
  });

  it("should handle database errors properly", async () => {
    (db.emissions.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    const response = await request(app)
      .post("/api/emissions")
      .send(mockEmission);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "DB error");
  });
});

describe("updateById company", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  it("should return 404 if ID is not provided", async () => {
    const response = await request(app)
      .put("/api/emissions/")
      .send(mockEmission);

    expect(response.status).toBe(404);
  });

  it("should return 400 for invalid data", async () => {
    const response = await request(app)
      .put("/api/emissions/1")
      .send({ invalidField: "Invalid Data" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid data");
  });

  it("should update a user with valid properties", async () => {
    (db.emissions.update as jest.Mock).mockResolvedValue(mockEmission);

    const response = await request(app)
      .put("/api/emissions/1")
      .send(mockEmission);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockEmission);
    expect(db.emissions.update).toHaveBeenCalledWith(mockEmission, {
      where: { id: "1" },
    });
  });

  it("should handle database errors properly", async () => {
    (db.emissions.update as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).put("/api/emissions/1").send(mockEmission);

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "DB error");
  });
});

describe("findAll Companies", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close(); // Close Sequelize connection
    server.close(); // Close the server
  });

  it("should return all Companies", async () => {
    (db.emissions.findAll as jest.Mock).mockResolvedValue([mockEmission]);
    const response = await request(app).get("/api/emissions");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockEmission]);
    expect(db.emissions.findAll).toHaveBeenCalled();
  });

  it("should handle database errors properly", async () => {
    (db.emissions.findAll as jest.Mock).mockRejectedValue(
      new Error("DB error"),
    );
    const response = await request(app).get("/api/emissions");
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "DB error");
  });

  it("should return empty array if no users are found", async () => {
    (db.emissions.findAll as jest.Mock).mockResolvedValue([]);
    const response = await request(app).get("/api/emissions");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("destroyById Companies", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  it("should return 404 if ID is not provided", async () => {
    const response = await request(app).delete("/api/emissions/");

    expect(response.status).toBe(404);
  });

  it("should delete a emission by ID", async () => {
    (db.emissions.destroy as jest.Mock).mockResolvedValue(1);

    const response = await request(app).delete("/api/emissions/1");

    expect(response.status).toBe(204);
    expect(db.emissions.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("should handle database errors properly", async () => {
    (db.emissions.destroy as jest.Mock).mockRejectedValue(
      new Error("DB error"),
    );

    const response = await request(app).delete("/api/emissions/1");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "DB error");
  });
});
