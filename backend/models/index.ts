//!Nos traemos todo el objeto que representa una conexión a la db
import { dbConfig } from '../db/db.config';
import reports from './reportsM';
import emissions from './emissionsM';
import user from './userM';
import company from './companyM';

//!Creamos el objeto sequelize, que para que entiendas lo que sucede abajo es literalmente decir "Conectate a esta db"
import { Sequelize } from 'sequelize'; // Use ES module syntax
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Dialect } from 'sequelize';


//! Creamos la conexión
//! Cuando hice las practicas, hicimos varias conexiones a db con php, se hace con mysqli, búscalo que es lo mismo que vas a ver abajo
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "mysql",
  // operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  }
});

//! Los vamos añadiendo
const db: {
  reports: ReturnType<typeof reports>;
  emissions: ReturnType<typeof emissions>;
  user: ReturnType<typeof user>;
  company: ReturnType<typeof company>;
  sequelize: Sequelize;
} = {
    sequelize,
    reports: reports(sequelize),
    emissions: emissions(sequelize),
    user: user(sequelize),
    company: company(sequelize)
  };

//? Ve a models/reportsM.js
db.reports = reports(sequelize);
db.emissions = emissions(sequelize);
db.user = user(sequelize);
db.company = company(sequelize);
db.sequelize = sequelize;

export {db};
