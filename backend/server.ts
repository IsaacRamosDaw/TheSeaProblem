//! Este es el inicio.

//! Creamos el objeto del servidor
import express from "express";
//! Llamamos al objeto que exportamos en models/index.js
import {db} from './models/index';
//! Esto es para las solicitudes proventientes del frontend
import cors, { CorsOptions } from "cors";
//! Esto es para las imagenes, más adelante veremos sobre esto

// controllers
import OurReports from "./controllers/reportsC";

//! permite usar el archivo env
import 'dotenv/config'


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

app.use(cors("http://localhost:5173/" as CorsOptions));

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
app.get("/api/ourReports", OurReports.findAll)


//! Exportación del servidor.
export default app;
//? Ve al archivo db/env.config.js