// Route imports
import authRoutes from "./auth";
import gradeRoutes from "./grades";
import studentRoutes from "./students";
import teacherRoutes from "./teachers";

import express from "express";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/grade", gradeRoutes);
router.use("/student", studentRoutes);
router.use("/teacher", teacherRoutes);

export = router;
