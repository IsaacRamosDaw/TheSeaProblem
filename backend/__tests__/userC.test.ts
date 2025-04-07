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

  it("should return a user if found", async () => {
    (db.users.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).get("/api/users/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUser);
    expect(db.users.findByPk).toHaveBeenCalledWith(1);
  });

  it("should return 500 when no users is found", async () => {
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
    const mockUser = { id: 1, title: "Sample user" };
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
      .post("/api/users")
      .send({ title: "Sample user" });

    expect(res.status).toBe(400);
    expect(db.users.create).not.toHaveBeenCalled();
  });

  it("should create a user with valid properties", async () => {
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

  it("should handle database errors properly", async () => {
    (db.users.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    const response = await request(app).post("/api/users").send(mockUser);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Some error occurred while creating the user.");
  });
});

describe("updateById user", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close(); 
    server.close(); 
  });

  it("should return 404 if ID is not provided", async () => {
    const response = await request(app).put("/api/users/").send(mockUser);

    expect(response.status).toBe(404);
  });

  it("should return 400 for invalid data", async () => {
    const response = await request(app)
      .put("/api/users/1")
      .send({ invalidField: "Invalid Data" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid data");
  });

  it("should update a user with valid properties", async () => {
    (db.users.update as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).put("/api/users/1").send(mockUser);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(db.users.update).toHaveBeenCalledWith(mockUser, {
      where: { id: "1" },
    });
  });

  it("should handle database errors properly", async () => {

    (db.users.update as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).put("/api/users/1").send(mockUser);

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "DB error");
  });  
});

describe("findAll Users", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close(); // Close Sequelize connection
    server.close(); // Close the server
  });

  it("should return all Users", async () => {
    (db.users.findAll as jest.Mock).mockResolvedValue([mockUser]);
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockUser]);
    expect(db.users.findAll).toHaveBeenCalled();
  });

  it("should handle database errors properly", async () => {
    (db.users.findAll as jest.Mock).mockRejectedValue(new Error("DB error"));
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "DB error");
  });

  it("should return empty array if no users are found", async () => {
    (db.users.findAll as jest.Mock).mockResolvedValue([]);
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("destroyById Users", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close(); 
    server.close(); 
  });

  it("should return 404 if ID is not provided", async () => {
    const response = await request(app).delete(`/api/users/`);

    expect(response.status).toBe(404);
  });

  it("should delete a report by ID", async () => {
    (db.users.destroy as jest.Mock).mockResolvedValue(1);

    const response = await request(app).delete("/api/users/1");

    expect(response.status).toBe(204);
    expect(db.users.destroy).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("should handle database errors properly", async () => {
    (db.users.destroy as jest.Mock).mockRejectedValue(new Error("DB error"));

    const response = await request(app).delete("/api/users/1");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "DB error");
  });
});













