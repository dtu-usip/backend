// Route imports
import authRoutes from "./auth";

import express from "express";
const router = express.Router();

router.use("/auth", authRoutes);

export = router;
