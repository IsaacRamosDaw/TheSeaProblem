import express from "express";
import { db } from "./models/index";
import cors, { CorsOptions } from "cors";

import ReportsR from "./routes/reportsR";
import UserR from "./routes/userR";
import "dotenv/config";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors("http://localhost:5173/" as CorsOptions));

// app.get("/", (req, res) => {
//   res.json({message: "Welcome to marine polution application"})
// });

const PORT = process.env.PORT || 8080;

//! Inicializamos el servidor
export const server = app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

db.sequelize.sync({ force: true }).then(() => {
  console.log("Reiniciada la base de datos");
});

// Routes
ReportsR(app);
UserR(app);

export default app;
