//! Nos traemos el código de antes
import {envConfig} from './env.config'
//! Ahora creamos el objeto que representa la conexión a la db, con los parámetros que ya definimos anteriormente
export const dbConfig = {
  HOST: envConfig.host,
  USER: envConfig.username,
  PASSWORD: envConfig.password,
  DB: envConfig.database,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
//? Ve al models/index.js