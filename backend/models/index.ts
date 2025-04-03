import { dbConfig } from '../db/db.config';
import reports from './reportsM';
import emissions from './emissionsM';
import user from './userM';
import companies from './companyM';

import { Sequelize } from 'sequelize'; // Use ES module syntax
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Dialect } from 'sequelize';


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

const db: {
  reports: ReturnType<typeof reports>;
  emissions: ReturnType<typeof emissions>;
  user: ReturnType<typeof user>;
  companies: ReturnType<typeof companies>;
  sequelize: Sequelize;
} = {
    sequelize,
    reports: reports(sequelize),
    emissions: emissions(sequelize),
    user: user(sequelize),
    companies: companies(sequelize)
  };

//? Ve a models/reportsM.js
db.user = user(sequelize);
db.reports = reports(sequelize);
db.emissions = emissions(sequelize);
db.companies = companies(sequelize);
db.sequelize = sequelize;

export {db};
