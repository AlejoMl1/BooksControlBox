import { DB_HOST, PORT, DB_NAME, DB_USER, DB_PASSWORD } from "./config";
import { Sequelize } from "sequelize";

const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT}/${DB_NAME}`;

const objectSequelize = {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
//*both ways works the connection
// export default new Sequelize({
//   dialect: "postgres",
//   host: DB_HOST,
//   port: DB_PORT,
//   database: DB_NAME,
//   username: DB_USER,
//   password: DB_PASSWORD,
// });

export default new Sequelize(DATABASE_URL, objectSequelize);
