import { Router, Request, Response } from "express";
import User, { UserMap } from "../models/user";
import database from "../database";

const router = Router();
// // GET - users
// router.get("/", async (req: Request, res: Response) => {
//   // TO DO
//   const result: string[] = [];
//   res.status(200).json({ users: result });
// });
// // GET - users/:id
// router.get("/:id", async (req: Request, res: Response) => {
//   // TO DO
//   const result: string = "";
//   res.status(200).json({ user: result });
// });
// // POST - users
// router.post("/", async (req: Request, res: Response) => {
//   // TO DO
//   res.status(201).json({ user: {} });
// });

router.post("/signup", async function (req: Request, res: Response) {
  UserMap(database);
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
  UserMap(database);
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
      : res.status(401).send({ msg: "Username or password doesn't match" });
  } catch (err) {
    console.log("Error in user/login:", err);
    res.status(500).send({ error: "Unexpected error" });
  }
});
export default router;
