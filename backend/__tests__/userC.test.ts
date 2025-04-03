import request from "supertest";
import app, { server } from "../server";
import { db } from "../models/index";
import type { User } from "../../shared/types/db-models";

jest.mock("../models/index", () => ({
  db: {
    users: {
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

const mockUser: User = {
  id: 1,
  name: "name",
  lastname: "lastname",
  email: "email@email.com",
  password: "password",
};

const invalidMockUser = { id: 1, username: "username" };

describe("findOneById user", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close(); // Close Sequelize connection
    server.close(); // Close the server
  });

  it("should return a report if found", async () => {
    const mockUser = { id: 1, title: "Sample Report" };
    (db.users.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).get("/api/users/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUser);
    expect(db.users.findByPk).toHaveBeenCalledWith(1);
  });

  it("should return 500 when no reports is found", async () => {
    (db.users.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/api/users/99");

    expect(response.status).toBe(500);
    expect(db.users.findByPk).toHaveBeenCalledWith(99);
  });

  it("should handle database errors properly", async () => {
    (db.users.findByPk as jest.Mock).mockRejectedValue(new Error("DB error"));

    const response = await request(app).get("/api/users/1");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "DB error");
  });

  it("should return the user with the correct id", async () => {
    const mockUser = { id: 1, title: "Sample Report" };
    (db.users.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).get("/api/users/1");

    expect(response.body.id).toBe(1);
  });
});

describe("create User", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close(); // Close Sequelize connection
    server.close(); // Close the server
  });

  it("should not create a user with invalid properties", async () => {
    (db.users.create as jest.Mock).mockResolvedValue(invalidMockUser);

    const res = await request(app)
      .post("/api/reports")
      .send({ title: "Sample Report" });

    expect(res.status).toBe(400);
    expect(db.users.create).not.toHaveBeenCalled();
  });

  it("should create a report with valid properties", async () => {
    (db.users.create as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).post("/api/users").send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
    expect(db.users.create).toHaveBeenCalledWith(mockUser);
  });

  it("should return 400 for invalid data", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ invalidField: "Invalid Data" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid data");
  });

  // it("should handle database errors properly", async () => {
  //   (db.users.create as jest.Mock).mockRejectedValue(new Error("DB error"));

  //   const response = await request(app).post("/api/users").send(mockUser);

  //   expect(response.status).toBe(500);
  //   expect(response.body).toHaveProperty("message", "Error creating user");
  // });
});













