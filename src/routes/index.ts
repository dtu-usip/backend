// Route imports
import authRoutes from "./auth";
import gradeRoutes from "./grades";
import gradeDashboardRoutes from "./gradeDashboard";
import studentRoutes from "./students";
import teacherRoutes from "./teachers";

import express from "express";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/grade", gradeRoutes);
router.use("/grade-dashboard", gradeDashboardRoutes);
router.use("/student", studentRoutes);
router.use("/teacher", teacherRoutes);

export = router;
