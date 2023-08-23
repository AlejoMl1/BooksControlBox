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
const User_1 = __importDefault(require("../models/User"));
const Book_1 = __importDefault(require("../models/Book"));
const Review_1 = __importDefault(require("../models/Review"));
const router = (0, express_1.Router)();
router.post("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userUuid, bookUuid, rating, reviewText } = req.body;
            // Check if the provided userUuid and bookUuid are valid and exist in the database
            const user = yield User_1.default.findByPk(userUuid);
            const book = yield Book_1.default.findByPk(bookUuid);
            if (!user || !book) {
                return res.status(404).json({ error: "User or book not found" });
            }
            // Create a new review
            const newReview = yield Review_1.default.create({
                userUuid,
                bookUuid,
                rating,
                reviewText,
            });
            return res
                .status(201)
                .json({ message: "Review created successfully", review: newReview });
        }
        catch (error) {
            console.error("Error creating review:", error);
            return res
                .status(500)
                .json({ error: "An error occurred while creating the review" });
        }
    });
});
router.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { reviewUuid } = req.body;
            // Check if the provided reviewUuid is valid
            const review = yield Review_1.default.findOne({
                where: {
                    reviewUuid, // Assuming your review model has a 'reviewUuid' field
                },
            });
            if (!review) {
                return res.status(404).json({ error: "Review not found" });
            }
            return res.status(200).json({ review });
        }
        catch (error) {
            console.error("Error getting review:", error);
            return res
                .status(500)
                .json({ error: "An error occurred while getting the review" });
        }
    });
});
router.get("/byBook", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { bookUuid } = req.query;
            // Check if the provided bookUuid is valid
            const book = yield Book_1.default.findOne({
                where: {
                    bookUuid, // Assuming your book model has a 'bookUuid' field
                },
            });
            if (!book) {
                return res.status(404).json({ error: "Book not found" });
            }
            // Find all reviews for the given bookUuid
            const reviews = yield Review_1.default.findAll({
                where: {
                    bookUuid,
                },
            });
            return res.status(200).json({ data: reviews });
        }
        catch (error) {
            console.error("Error getting reviews:", error);
            return res
                .status(500)
                .json({ error: "An error occurred while getting the reviews" });
        }
    });
});
exports.default = router;
//# sourceMappingURL=reviewRoutes.js.map