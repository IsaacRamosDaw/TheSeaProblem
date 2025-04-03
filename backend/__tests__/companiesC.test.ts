import request from "supertest";
import app, { server } from "../server";
import { db } from "../models/index";
import type { Report, User, Company } from "../../shared/types/db-models";

jest.mock("../models/index", () => ({
  db: {
    companies: {
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

const mockUser: User = {
  id: 1,
  name: "user",
  lastname: "test",
  email: "user@example.com",
  password: "password",
};

const mockCompany: Company = {
  id: 1,
  companyName: "Company 1",
  taxId: "K123456789",
  address: "123 Main St",
  userId: 1,
  industrialSector: "Manufacturing",
  relatedActivitiesDescription: "Manufacturing of cars",
};

const invalidMockCompany = { id: 1, companyName: "Company 1" };

describe("findOneById Company", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  it("should return a company if found", async () => {  
    (db.companies.findOne as jest.Mock).mockResolvedValue(mockCompany);

    const res = await request(app).get("/api/companies/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockCompany);
    expect(db.companies.findOne).toHaveBeenCalledWith({ where: { id: "1" } });
  });

  it("should return 500 when no company is found", async () => {
    (db.companies.findOne as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/api/companies/99");        

    expect(res.status).toBe(500);
    expect(db.companies.findOne).toHaveBeenCalledWith({ 
        where: { id: "99" },
    });
  });

  it("should handle database errors properly", async () => {   
    (db.companies.findOne as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).get("/api/companies/1");

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "DB error");
  });

  it("should return the company with the correct id", async () => {
    const mockCompany = { id: 1, companyName: "Company 1" };
    (db.companies.findOne as jest.Mock).mockResolvedValue(mockCompany);

    const res = await request(app).get("/api/companies/1");

    expect(res.body.id).toBe(1);
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
      .send(invalidMockCompany);

    expect(res.status).toBe(400);
    expect(db.companies.create).not.toHaveBeenCalled();
  });

  it("should create a company with valid properties", async () => {
    (db.companies.create as jest.Mock).mockResolvedValue(mockCompany);

    const res = await request(app).post("/api/companies").send(mockCompany);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockCompany);
    expect(db.companies.create).toHaveBeenCalledWith(mockCompany);
  });       
  
  it("should return 400 for invalid data", async () => {
    const res = await request(app)
      .post("/api/companies")
      .send({ invalidField: "Invalid Data" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid data");
  });

  it("should handle database errors properly", async () => {
    (db.companies.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).post("/api/companies").send(mockCompany);

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "Error creating company");
  });
});

describe("updateById Company", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });
  
  it("should return 404 if ID is not provided", async () => {
    const res = await request(app).put("/api/companies/").send(mockCompany);

    expect(res.status).toBe(404);
  });

  it("should return 400 for invalid data", async () => {
    const res = await request(app)
      .put("/api/companies/1")
      .send({ invalidField: "Invalid Data" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid data");
  });

  it("should update a company with valid properties", async () => {
    (db.companies.update as jest.Mock).mockResolvedValue(mockCompany);

    const res = await request(app).put("/api/companies/1").send(mockCompany);

    expect(res.status).toBe(200);   
    expect(res.body).toEqual(mockCompany);
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

describe("findAll Company", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });
  
  it("should return all companies", async () => {
    (db.companies.findAll as jest.Mock).mockResolvedValue([mockCompany]);

    const res = await request(app).get("/api/companies");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockCompany]);
    expect(db.companies.findAll).toHaveBeenCalled();
  });

  it("should handle database errors properly", async () => {
    (db.companies.findAll as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).get("/api/companies");

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "DB error");
  });

  it("should return empty array if no companies are found", async () => {
    (db.companies.findAll as jest.Mock).mockResolvedValue([]);

    const res = await request(app).get("/api/companies");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe("destroyById Company", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  it("should return 404 if ID is not provided", async () => {   
    const res = await request(app).delete("/api/companies/");

    expect(res.status).toBe(404);
  });

  it("should delete a company by ID", async () => { 
    (db.companies.destroy as jest.Mock).mockResolvedValue(1);

    const res = await request(app).delete("/api/companies/1");

    expect(res.status).toBe(204);
    expect(db.companies.destroy).toHaveBeenCalledWith({
      where: { id: "1" },
    });
  });

  it("should handle database errors properly", async () => {
    (db.companies.destroy as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).delete("/api/companies/1");

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "DB error");
  });
});
