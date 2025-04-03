import request from "supertest";
import app, { server } from "../server";
import { db } from "../models/index";
import type { User } from "../../shared/types/db-models";

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

const userReport: User = {
  id: 1,
  name: "name",
  lastname: "lastname",
  email: "email@email.com",
  password: "password",
};

const invalidMockUser = {id: 1, username: "username"};

describe("findOneById user" , () => {
    afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.sequelize.close(); // Close Sequelize connection
    server.close(); // Close the server
  });

  
})













