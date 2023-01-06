import express from "express";
import { isLoggedIn } from "../middlewares/verification";
import {
  generateTokens,
  login,
  logout,
  refreshToken,
  updateInfo,
  updatePassword,
} from "../controllers/auth";
const router = express.Router();

router.route("/").post(login).get(isLoggedIn, logout);

router.route("/password").post(isLoggedIn, updatePassword);
router.route("/info").post(isLoggedIn, updateInfo);

router.route("/refreshToken").get(isLoggedIn, refreshToken);
router.route("/generateTokens").get(isLoggedIn, generateTokens);

export = router;
