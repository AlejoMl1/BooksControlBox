import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
require("dotenv").config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DEVELOPMENT = process.env.DEVELOPMENT;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const objectSequelize = DEVELOPMENT
  ? {
      logging: false,
      native: false,
    }
  : {
      logging: false,
      native: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    };

const sequelize = new Sequelize(DATABASE_URL, objectSequelize);

const basename = path.basename(__filename);

const modelDefiners: any[] = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const modelDefiner = require(path.join(__dirname, "/models", file));
    modelDefiners.push(modelDefiner);
  });

// Define and associate models using the define method
modelDefiners.forEach((modelDefiner) => {
  modelDefiner(sequelize);
});

// Capitalize the names of the models ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

// Define and associate models using the define method
capsEntries.forEach(([modelName, model]: any) => {
  sequelize.define(modelName, model.initAttributes, model.options);
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

export default sequelize;
