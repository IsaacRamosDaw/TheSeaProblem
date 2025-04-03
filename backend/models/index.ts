import { dbConfig } from '../db/db.config';
import reports from './reportsM';
import emissions from './emissionsM';
import user from './usersM';
import company from './companyM';

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
  users: ReturnType<typeof user>;
  company: ReturnType<typeof company>;
  sequelize: Sequelize;
} = {
    sequelize,
    reports: reports(sequelize),
    emissions: emissions(sequelize),
    users: user(sequelize),
    company: company(sequelize)
  };

//? Ve a models/reportsM.js
db.users = user(sequelize);
db.reports = reports(sequelize);
db.emissions = emissions(sequelize);
db.company = company(sequelize);
db.sequelize = sequelize;

export {db};
