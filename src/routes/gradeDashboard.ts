import express from "express";
import { isLoggedIn } from "../middlewares/verification";
import {
  getGradeDashboardData,
  saveGrades,
} from "../controllers/gradeDashboard";
const router = express.Router();

router
  .route("/")
  .get(isLoggedIn, getGradeDashboardData)
  .post(isLoggedIn, saveGrades);

export = router;
