import request from "supertest";
import app, { server } from "../server";
import { db } from "../models/index";
import type { Company } from "../../shared/types/db-models";

jest.mock("../models/index", () => ({
  db: {
    companies: {
      create: jest.fn(),
      findAll: jest.fn(),
      findByPk: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    },
    sequelize: {
      authenticate: jest.fn(),
      sync: jest.fn().mockResolvedValue({}),
      close: jest.fn(),
    },
  },
}));

const mockCompany: Company = {
  id: 1,
  companyName: "name",
  taxId: "tax",
  address: "adress",
  userId: 1,
  industrialSector: "sector",
  relatedActivitiesDescription: "acrtivities",
}

const invalidMockCompany = { id: 1, name: "company" };

describe("findOneById company", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  it("should return an companies if found", async () => {
    (db.companies.findByPk as jest.Mock).mockResolvedValue(mockCompany);

    const res = await request(app).get("/api/companies/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockCompany);
    expect(db.companies.findByPk).toHaveBeenCalledWith(1);
  });

  it("should return 500 when no companies is found", async () => {
    (db.companies.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/api/companies/99");

    expect(response.status).toBe(500);
    expect(db.companies.findByPk).toHaveBeenCalledWith(99);
  });

  it("should handle database errors properly", async () => {
    (db.companies.findByPk as jest.Mock).mockRejectedValue(new Error("DB error"));
    const response = await request(app).get("/api/companies/1");

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
    (db.companies.create as jest.Mock).mockResolvedValue(invalidMockCompany);

    const res = await request(app)
      .post("/api/companies")
      .send({ title: "Sample user" });

    expect(res.status).toBe(400);
    expect(db.companies.create).not.toHaveBeenCalled();
  });

  it("should create a company with valid properties", async () => {
    (db.companies.create as jest.Mock).mockResolvedValue(mockCompany);

    const response = await request(app).post("/api/companies").send(mockCompany);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockCompany);
    expect(db.companies.create).toHaveBeenCalledWith(mockCompany);
  });

  it("should return 400 for invalid data", async () => {
    const response = await request(app)
      .post("/api/companies")
      .send({ invalidField: "Invalid Data" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid data");
  });

  it("should handle database errors properly", async () => {
    (db.companies.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    const response = await request(app).post("/api/companies").send(mockCompany);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Some error occurred while creating the company.");
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
    const response = await request(app).put("/api/companies/").send(mockCompany);

    expect(response.status).toBe(404);
  });

  it("should return 400 for invalid data", async () => {
    const response = await request(app)
      .put("/api/companies/1")
      .send({ invalidField: "Invalid Data" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid data");
  });

  it("should update a user with valid properties", async () => {
    (db.companies.update as jest.Mock).mockResolvedValue(mockCompany);

    const response = await request(app).put("/api/companies/1").send(mockCompany);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCompany);
    expect(db.companies.update).toHaveBeenCalledWith(mockCompany, {
      where: { id: "1" },
    });
  });

  it("should handle database errors properly", async () => {

    (db.companies.update as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).put("/api/companies/1").send(mockCompany);

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
    (db.companies.findAll as jest.Mock).mockResolvedValue([mockCompany]);
    const response = await request(app).get("/api/companies");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockCompany]);
    expect(db.companies.findAll).toHaveBeenCalled();
  });

  it("should handle database errors properly", async () => {
    (db.companies.findAll as jest.Mock).mockRejectedValue(new Error("DB error"));
    const response = await request(app).get("/api/companies");
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "DB error");
  });

  it("should return empty array if no users are found", async () => {
    (db.companies.findAll as jest.Mock).mockResolvedValue([]);
    const response = await request(app).get("/api/companies");
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
    const response = await request(app).delete('/api/companies/');

    expect(response.status).toBe(404);
  });

  it("should delete a report by ID", async () => {
    (db.companies.destroy as jest.Mock).mockResolvedValue(1);

    const response = await request(app).delete("/api/companies/1");

    expect(response.status).toBe(204);
    expect(db.companies.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("should handle database errors properly", async () => {
    (db.companies.destroy as jest.Mock).mockRejectedValue(new Error("DB error"));

    const response = await request(app).delete("/api/companies/1");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "DB error");
  });
});