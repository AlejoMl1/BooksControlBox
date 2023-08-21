const { Router } = require("express");
const axios = require("axios");
const user = require("./user.js");
const { User } = require("../db");
require("dotenv").config();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.use("/user", user);

export default router;
// module.exports = router;
