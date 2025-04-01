//! Llama al .env
import 'dotenv/config'

//! Estas son las configuraciones al iniciar la comunicación con la db,
//! NO ES UNA SOLICITUD, ME REFIERO A PARAMETROS CUANDO HACES LA CONEXIÓN A LA DB, en el db.config.js se entenderá mejor

//! Creo un objeto para tener todos los datos agrupados, aquí también deberían estar las de test y la de producción
export const config = {
  development: {
    username: process.env.MYSQL_USER_DEV || 'root',
    password: process.env.MYSQL_PASSWORD_DEV || 'root',
    database: process.env.MYSQL_DATABASE_DEV || 'test',
    host: process.env.DB_HOST || 'localhost',
  }
};

//! El modo en el que se ejecutará la base de datos, en nuestro caso development porque lo estamos creando

//! Exportamos el código

// Sort this out later
export const envConfig =  config['development'];
//? ve al db.config.js