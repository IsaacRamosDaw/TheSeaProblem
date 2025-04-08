import {envConfig} from './env.config'

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