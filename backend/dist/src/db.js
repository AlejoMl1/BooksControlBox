"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
const sequelize = new sequelize_1.Sequelize(DATABASE_URL, objectSequelize);
const basename = path_1.default.basename(__filename);
const modelDefiners = [];
fs_1.default.readdirSync(path_1.default.join(__dirname, "/models"))
    .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
    .forEach((file) => {
    const modelDefiner = require(path_1.default.join(__dirname, "/models", file));
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
capsEntries.forEach(([modelName, model]) => {
    sequelize.define(modelName, model.initAttributes, model.options);
    if (model.associate) {
        model.associate(sequelize.models);
    }
});
exports.default = sequelize;
