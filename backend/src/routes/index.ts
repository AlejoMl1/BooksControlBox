import { Router } from "express";
import userRoutes from "./userRoutes";
import bookRoutes from "./bookRoutes";
import reviewRoutes from "./reviewRoutes";

const router = Router();

router.use("/user", userRoutes);
router.use("/book", bookRoutes);
router.use("/review", reviewRoutes);

export = router;
