import express from "express";
import { db } from "./models/index";
import cors, { CorsOptions } from "cors";

import UserR from "./routes/userR";
import ReportsR from "./routes/reportsR";
import CompanyR from "./routes/companyR";
import EmissionsR from "./routes/emissionsR";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;

export const server = app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

// change to alter:true in production ?
db.sequelize.sync({ force: true }).then(() => {
  console.log("Reboot of the db");
});

// Routes
UserR(app);
ReportsR(app);
CompanyR(app);
EmissionsR(app);
// ProfileR(app);
export default app;
