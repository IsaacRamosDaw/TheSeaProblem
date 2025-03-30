require('dotenv').config();

const config = {
  development: {
    username: process.env.MYSQL_USER_DEV,
    password: process.env.MYSQL_PASSWORD_DEV,
    database: process.env.MYSQL_DATABASE_DEV,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];