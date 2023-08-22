import { Router, Request, Response } from "express";
import User from "../models/User";
import Book from "../models/Book";
import Review from "../models/Review";

const router = Router();
router.post("/", async function (req: Request, res: Response) {
  try {
    const { userUuid, bookUuid, rating, reviewText } = req.body;
    // Check if the provided userUuid and bookUuid are valid and exist in the database
    const user = await User.findByPk(userUuid);
    const book = await Book.findByPk(bookUuid);

    if (!user || !book) {
      return res.status(404).json({ error: "User or book not found" });
    }
    // Create a new review
    const newReview = await Review.create({
      userUuid,
      bookUuid,
      rating,
      reviewText,
    });

    return res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the review" });
  }
});

router.get("/", async function (req: Request, res: Response) {
  try {
    const { reviewUuid } = req.body;
    // Check if the provided reviewUuid is valid
    const review = await Review.findOne({
      where: {
        reviewUuid, // Assuming your review model has a 'reviewUuid' field
      },
    });

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    return res.status(200).json({ review });
  } catch (error) {
    console.error("Error getting review:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while getting the review" });
  }
});

router.get("/byBook", async function (req: Request, res: Response) {
  try {
    const { bookUuid } = req.query;
    // Check if the provided bookUuid is valid
    const book = await Book.findOne({
      where: {
        bookUuid, // Assuming your book model has a 'bookUuid' field
      },
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Find all reviews for the given bookUuid
    const reviews = await Review.findAll({
      where: {
        bookUuid,
      },
    });

    return res.status(200).json({ data: reviews });
  } catch (error) {
    console.error("Error getting reviews:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while getting the reviews" });
  }
});

export default router;
