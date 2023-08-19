const { Router } = require("express");
const { User } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post("/", async function (req, res, next) {
  let { username, password } = req.body;
  if (!username)
    return res.status(400).send({ error: "Missing field 'username'" });
  if (!password)
    return res.status(400).send({ error: "Missing field 'password'" });
  try {
    const userCreated = await User.create({
      // estas tienen que estar definidas
      username,
      password,
    });

    return res.status(201).send({ msg: "User created successfully" });
  } catch (err) {
    // console.log("error:", err);
    // console.log("error!!!!:", err.errors[0].ValidationErrorItem.message);
    console.log("error!!!!:", err.errors[0].message);
    if (err.errors[0].message === "username must be unique") {
      res.status(400).send({ error: "username must be unique" });
    } else {
      res.status(500).send({ error: "Unexpected error" });
    }
  }
});

module.exports = router;
