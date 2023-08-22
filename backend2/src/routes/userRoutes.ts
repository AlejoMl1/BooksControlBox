import { Router, Request, Response } from "express";
import User from "../models/User";

const router = Router();

router.post("/signup", async function (req: Request, res: Response) {
  let { name, lastName, username, password } = req.body;
  if (!username || !password || !name || !lastName) {
    return res.status(400).send({ error: "Missing field" });
  }
  try {
    const newUser = await User.create({
      name,
      lastName,
      username,
      password,
    });

    return res.status(201).send({
      data: { userUuid: newUser.userUuid },
      msg: "User created successfully",
    });
  } catch (err: any) {
    console.log("Error in user post:", err.errors[0].message);
    if (err.errors[0].message === "username must be unique") {
      res.status(400).send({ error: "username must be unique" });
    } else {
      res.status(500).send({ error: "Unexpected error" });
    }
  }
});

router.post("/login", async function (req: Request, res: Response) {
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
            userUuid: userData.dataValues.userUuid,
            name: userData.dataValues.name,
            lastName: userData.dataValues.lastName,
          },
        })
      : res.status(401).send({ msg: "Username or password doesn't match" });
  } catch (err) {
    console.log("Error in user/login:", err);
    res.status(500).send({ error: "Unexpected error" });
  }
});
export default router;
