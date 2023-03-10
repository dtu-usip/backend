import express from "express";
import { isLoggedIn } from "../middlewares/verification";
import {
  addGrade,
  removeGrade,
  totalNumberOfGrades,
  updateGrade,
  viewGrades,
} from "../controllers/grades";
const router = express.Router();

router
  .route("/")
  .get(isLoggedIn, viewGrades)
  .post(isLoggedIn, addGrade)
  .put(isLoggedIn, updateGrade)
  .delete(isLoggedIn, removeGrade);
router.route("/totalCount").get(isLoggedIn, totalNumberOfGrades);

export = router;
