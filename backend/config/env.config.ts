export const config = {
  development: {
    username: process.env.MYSQL_USER_DEV || "root",
    password: process.env.MYSQL_PASSWORD_DEV || "1234",
    database: process.env.MYSQL_DATABASE_DEV || "test",
    host: process.env.DB_HOST || "localhost",
  },
};
console.log(config["development"]);
// Sort this out later
export const envConfig = config["development"];
