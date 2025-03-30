const express = require("express");
const db = require('./models');
// const cors = require("cors");
var path = require("path");
// require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! Preguntar 
// app.use(cors({origin: }))
// var corsOptions = {
//   origin: "*",
// }
// app.use(cors(corsOptions));

// Ruta de bienvenida 
app.get("/", (req, res) => {
  res.json({message: "Welcome to marine polution application"})
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db");
});

// Routes
require("./routes/userR")(app);

module.exports = app;