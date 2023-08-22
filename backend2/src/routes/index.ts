import { Router } from "express";
import userRoutes from "./userRoutes";
import bookRoutes from "./bookRoutes";

const router = Router();

router.use("/user", userRoutes);
router.use("/book", bookRoutes);

export = router;
