//! Llama al .env
require('dotenv').config();

//! Estas son las configuraciones al iniciar la comunicación con la db,
//! NO ES UNA SOLICITUD, ME REFIERO A PARAMETROS CUANDO HACES LA CONEXIÓN A LA DB, en el db.config.js se entenderá mejor

//! Creo un objeto para tener todos los datos agrupados, aquí también deberían estar las de test y la de producción 
const config = {
  development: {
    username: process.env.MYSQL_USER_DEV,
    password: process.env.MYSQL_PASSWORD_DEV,
    database: process.env.MYSQL_DATABASE_DEV,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
};

//! El modo en el que se ejecutará la base de datos, en nuestro caso development porque lo estamos creando 
const env = process.env.NODE_ENV || 'development';

//! Exportamos el código  
module.exports = config[env];
//? ve al db.config.js 