//! Este es el inicio. 

//! Creamos el objeto del servidor
const express = require("express");
//! Llamamos al objeto que exportamos en models/index.js
const db = require('./models');
//! Esto es para las solicitudes proventientes del frontend
const cors = require("cors");
//! Esto es para las imagenes, más adelante veremos sobre esto 
var path = require("path");
//! permite usar el archivo env 
require("dotenv").config();

//! Ve al archivo .env.example. duplicalo y dejalo como ".env"
//? Abre el archivo, lee los comentarios para entenderlo y vuelve 

//* Ahora que has vuelto sigamos
//! Creamos el servidor
const app = express();

//! Que el servidor entienda que tiene que recibir datos en formato JSON
app.use(express.json());
//! No sé exactamente que hacía esto, pero está en los pdf de tiburcio
app.use(express.urlencoded({ extended: true }));

//! dirección de la que se permiten las solicitudes, yo la he creado como un objeto, se puede de otras maneras
var corsOptions = {
  origin: "http://localhost:5173/",
}
app.use(cors(corsOptions.origin));

//! Esto está en la explicación de tiburcio, pero como ya manejamos las rutas en el frontend se puede comentar,
//! sirve para comprobar si el servidor está arrancado
// app.get("/", (req, res) => {
//   res.json({message: "Welcome to marine polution application"})
// });

//! Creamos la variable del puerto, si no la encuentra en el archivo .env, pues usa el 8080
const PORT = process.env.PORT || 8080;


//! Inicializamos el servidor
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

//! Reinicio de la db cada vez que arrranca, cuando tenga las migraciones no hará falta que reinicie
db.sequelize.sync({ force: true }).then(() => {
  console.log("Reiniciada la base de datos");
});

//! Rutas para ejecutar los controladores de cada modelo
// Routes
require("./routes/ourReportsR")(app);
require("./routes/userR")(app);

//! Exportación del servidor.
module.exports = app;
//? Ve al archivo db/env.config.js