import http from "http";
import { API_PORT } from "./config";
import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index";
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
import { CORS_URL } from "./config";
import sequelize from "./database";

const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
//print in the console every time exists a request
app.use(morgan("dev"));
//Middleware to set the headers
app.use((req, res, next) => {
  // update to match the domain you will make the request from
  //!this will have to change in deployment to match the frontend domain
  res.header("Access-Control-Allow-Origin", CORS_URL);
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header("Access-Control-Allow-Credentials", "true");
  //configure the type of headers the backend is going to accept
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  //the diferents methods for the request
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  //the execution has to continue
  next();
});

app.use("/", router);

const server = http.createServer(app);
// server.listen(API_PORT, () => {
//   console.log(`API started at http://localhost:${API_PORT}`);
// });

sequelize.sync({ force: false }).then(() => {
  server.listen(API_PORT, () => {
    console.log(`API started at http://localhost:${API_PORT}`);
  });
});
