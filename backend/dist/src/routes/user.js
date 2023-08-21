"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
const { User } = db_1.default.models;
router.post("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, lastName, username, password } = req.body;
        if (!username || !password || !name || !lastName) {
            return res.status(400).send({ error: "Missing field" });
        }
        try {
            yield User.create({
                name,
                lastName,
                username,
                password,
            });
            return res.status(201).send({ msg: "User created successfully" });
        }
        catch (err) {
            console.log("Error in user post:", err.errors[0].message);
            if (err.errors[0].message === "username must be unique") {
                res.status(400).send({ error: "username must be unique" });
            }
            else {
                res.status(500).send({ error: "Unexpected error" });
            }
        }
    });
});
router.post("/login", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ error: "Missing username or password" });
        }
        try {
            const userData = yield User.findOne({
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
        }
        catch (err) {
            console.log("Error in user/login:", err);
            res.status(500).send({ error: "Unexpected error" });
        }
    });
});
exports.default = router;
