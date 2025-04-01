"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
//!Nos traemos todo el objeto que representa una conexión a la db
const db_config_1 = require("../db/db.config");
const ourReportsM_1 = __importDefault(require("./ourReportsM"));
const userM_1 = __importDefault(require("./userM"));
//!Creamos el objeto sequelize, que para que entiendas lo que sucede abajo es literalmente decir "Conectate a esta db"
const sequelize_1 = require("sequelize"); // Use ES module syntax
const sequelize_2 = require("sequelize");
//! Creamos la conexión
//! Cuando hice las practicas, hicimos varias conexiones a db con php, se hace con mysqli, búscalo que es lo mismo que vas a ver abajo
const sequelize = new sequelize_1.Sequelize(db_config_1.dbConfig.DB, db_config_1.dbConfig.USER, db_config_1.dbConfig.PASSWORD, {
    host: db_config_1.dbConfig.HOST,
    dialect: "mysql",
    // operatorAliases: false,
    pool: {
        max: db_config_1.dbConfig.pool.max,
        min: db_config_1.dbConfig.pool.min,
        acquire: db_config_1.dbConfig.pool.acquire,
        idle: db_config_1.dbConfig.pool.idle,
    }
});
// order of InferAttributes & InferCreationAttributes is important.
class User extends sequelize_2.Model {
}
//! Y ahora creamos el objeto db que contendrá los modelos de cada tabla
//! Los vamos añadiendo
const db = {
    sequelize,
    ourReports: (0, ourReportsM_1.default)(sequelize),
    user: (0, userM_1.default)(sequelize)
};
exports.db = db;
//? Ve a models/ourReportsM.js
db.ourReports = (0, ourReportsM_1.default)(sequelize);
db.user = (0, userM_1.default)(sequelize);
db.sequelize = sequelize;
