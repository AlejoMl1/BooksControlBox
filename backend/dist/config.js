"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_API_KEY = exports.CORS_URL = exports.API_PORT = exports.DB_PORT = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_NAME = exports.DB_USER = void 0;
require("dotenv").config();
exports.DB_USER = process.env.DB_USER;
exports.DB_NAME = String(process.env.DB_NAME);
exports.DB_PASSWORD = String(process.env.DB_PASSWORD);
exports.DB_HOST = String(process.env.DB_HOST);
exports.DB_PORT = Number(process.env.DB_PORT);
exports.API_PORT = Number(process.env.API_PORT);
exports.CORS_URL = String(process.env.CORS_URL);
exports.GOOGLE_API_KEY = String(process.env.GOOGLE_API_KEY);
//# sourceMappingURL=config.js.map