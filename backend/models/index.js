//!Nos traemos todo el objeto que representa una conexión a la db
const dbConfig = require('../db/db.config');

//!Creamos el objeto sequelize, que para que entiendas lo que sucede abajo es literalmente decir "Conectate a esta db"
const Sequelize = require('sequelize');

//! Creamos la conexión
//! Cuando hice las practicas, hicimos varias conexiones a db con php, se hace con mysqli, búscalo que es lo mismo que vas a ver abajo
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  }
});

//! Y ahora creamos el objeto db que contendrá los modelos de cada tabla
const db = {};

//! Los vamos añadiendo
//? Ve a models/ourReportsM.js
db.ourReports = require('./ourReportsM.js')(sequelize);
db.user = require('./userM.js')(sequelize);
db.sequelize = sequelize;

module.exports = db;
