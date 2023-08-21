import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from "./config";
import { Sequelize } from "sequelize";

const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const objectSequelize = {
  logging: false,
  native: false,
};
// export default new Sequelize({
//   dialect: "postgres",
//   host: DB_HOST,
//   port: DB_PORT,
//   database: DB_NAME,
//   username: DB_USER,
//   password: DB_PASSWORD,
// });

export default new Sequelize(DATABASE_URL, objectSequelize);
