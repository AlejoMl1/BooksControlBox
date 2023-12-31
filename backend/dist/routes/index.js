"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const bookRoutes_1 = __importDefault(require("./bookRoutes"));
const reviewRoutes_1 = __importDefault(require("./reviewRoutes"));
const router = (0, express_1.Router)();
router.use("/user", userRoutes_1.default);
router.use("/book", bookRoutes_1.default);
router.use("/review", reviewRoutes_1.default);
module.exports = router;
//# sourceMappingURL=index.js.map