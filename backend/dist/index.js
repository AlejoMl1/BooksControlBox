"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./routes/index"));
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const database_1 = __importDefault(require("./database"));
const User_1 = __importStar(require("./models/User"));
const Book_1 = __importStar(require("./models/Book"));
const Review_1 = __importStar(require("./models/Review"));
(0, User_1.initUserModel)(database_1.default);
(0, Book_1.initBookModel)(database_1.default);
(0, Review_1.initReviewModel)(database_1.default);
User_1.default.hasMany(Review_1.default, { foreignKey: "userUuid" }); // Define User-Review relationship
Book_1.default.hasMany(Review_1.default, { foreignKey: "bookUuid" }); // Define Book-Review relationship
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(cookieParser());
//print in the console every time exists a request
app.use(morgan("dev"));
//Middleware to set the headers
app.use((req, res, next) => {
    // update to match the domain you will make the request from
    //!this will have to change in deployment to match the frontend domain
    res.header("Access-Control-Allow-Origin", config_1.CORS_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    //configure the type of headers the backend is going to accept
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //the diferents methods for the request
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    //the execution has to continue
    next();
});
app.use("/", index_1.default);
const server = http_1.default.createServer(app);
database_1.default.sync({ force: false }).then(() => {
    server.listen(config_1.API_PORT, () => {
        console.log(`API started at http://localhost:${config_1.API_PORT}`);
    });
});
//# sourceMappingURL=index.js.map