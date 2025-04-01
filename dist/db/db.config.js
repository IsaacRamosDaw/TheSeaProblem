"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
//! Nos traemos el código de antes
const env_config_1 = require("./env.config");
//! Ahora creamos el objeto que representa la conexión a la db, con los parámetros que ya definimos anteriormente
exports.dbConfig = {
    HOST: env_config_1.envConfig.host,
    USER: env_config_1.envConfig.username,
    PASSWORD: env_config_1.envConfig.password,
    DB: env_config_1.envConfig.database,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
//? Ve al models/index.js
