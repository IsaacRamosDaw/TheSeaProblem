import express from "express";
import {db} from './models/index';
import cors, { CorsOptions } from "cors";

// controllers
import OurReports from "./controllers/reportsC";
import 'dotenv/config'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors("http://localhost:5173/" as CorsOptions));

// app.get("/", (req, res) => {
//   res.json({message: "Welcome to marine polution application"})
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

db.sequelize.sync({ force: true }).then(() => {
  console.log("Reiniciada la base de datos");
});

// Routes
app.get("/api/ourReports", OurReports.findAll)

export default app;