//!Nos traemos todo el objeto que representa una conexión a la db
import { dbConfig } from '../db/db.config';
import ourReports from './ourReportsM';
import user from './userM';
import UserModel, { initUserModel } from './TestUserM'


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

// order of InferAttributes & InferCreationAttributes is important.
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare name: string;
  // other attributes...
}

//! Y ahora creamos el objeto db que contendrá los modelos de cada tabla

initUserModel(sequelize);
//! Los vamos añadiendo
const db: {
  ourReports: ReturnType<typeof ourReports>;
  user: ReturnType<typeof user>;
  userModel: typeof UserModel;
  sequelize: Sequelize;
} = {
    sequelize,
    ourReports: ourReports(sequelize),
    user: user(sequelize),
    userModel: UserModel,
  };

//? Ve a models/ourReportsM.js
db.ourReports = ourReports(sequelize);
db.userModel = UserModel;
db.user = user(sequelize);
db.sequelize = sequelize;

export {db};
