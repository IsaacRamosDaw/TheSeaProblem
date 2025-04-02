import request from "supertest";
import app, { server } from "../server";
import { db } from "../models/index";

jest.mock("../models/index", () => ({
  db: {
    reports: {
      findOne: jest.fn(),
    },
    sequelize: {
      authenticate: jest.fn(),
      sync: jest.fn().mockResolvedValue({}),
      close: jest.fn(),
    },
  },
}));

describe("findOne Report", () => {
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
    expect(db.reports.findOne).toHaveBeenCalledWith({ where: { id: "99" } });
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
