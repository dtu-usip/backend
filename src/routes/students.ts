import express from "express";
import { isLoggedIn } from "../middlewares/verification";
import { studentList, studentsInCourse } from "../controllers/students";
const router = express.Router();

router.route("/").get(isLoggedIn, studentList);
router.route("/course").get(isLoggedIn, studentsInCourse);

export = router;
