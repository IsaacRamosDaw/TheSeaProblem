import { dbConfig } from '../db/db.config';
import reports from './reportsM';
import emissions from './emissionsM';
import companies from './companyM';
import user from './usersM';

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
  companies: ReturnType<typeof companies>;
  users: ReturnType<typeof user>;
  sequelize: Sequelize;
} = {
    sequelize,
    reports: reports(sequelize),
    emissions: emissions(sequelize),
    companies: companies(sequelize),
    users: user(sequelize),
  };

//? Ve a models/reportsM.js
db.users = user(sequelize);
db.reports = reports(sequelize);
db.emissions = emissions(sequelize);
db.companies = companies(sequelize);
db.sequelize = sequelize;

export {db};
