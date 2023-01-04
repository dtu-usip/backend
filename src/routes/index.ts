// Route imports
import authRoutes from "./auth";
import gradeRoutes from "./grades";
import studentRoutes from "./students";

import express from "express";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/grade", gradeRoutes);
router.use("/student", studentRoutes);

export = router;
