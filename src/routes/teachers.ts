import express from "express";
import { isLoggedIn } from "../middlewares/verification";
import { getCourses } from "../controllers/teachers";
const router = express.Router();

router.route("/course").get(isLoggedIn, getCourses);

export = router;
