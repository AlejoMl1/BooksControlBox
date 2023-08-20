const { Router } = require("express");
const { User } = require("../db");

const router = Router();

router.post("/signup", async function (req, res, next) {
  let { name, lastName, username, password } = req.body;
  if (!username || !password || !name || !lastName) {
    return res.status(400).send({ error: "Missing field" });
  }
  try {
    await User.create({
      name,
      lastName,
      username,
      password,
    });

    return res.status(201).send({ msg: "User created successfully" });
  } catch (err) {
    console.log("Error in user post:", err.errors[0].message);
    if (err.errors[0].message === "username must be unique") {
      res.status(400).send({ error: "username must be unique" });
    } else {
      res.status(500).send({ error: "Unexpected error" });
    }
  }
});
router.post("/login", async function (req, res, next) {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ error: "Missing username or password" });
  }
  try {
    const userData = await User.findOne({
      where: { username, password },
    });
    userData
      ? res.status(200).send({
          data: {
            name: userData.dataValues.name,
            lastName: userData.dataValues.lastName,
          },
          msg: "Credentials Match",
        })
      : res.status(401).send({ msg: "Username or password doesnt match" });
  } catch (err) {
    console.log("Error in user/login:", err.errors[0].message);
    res.status(500).send({ error: "Unexpected error" });
  }
});

module.exports = router;
