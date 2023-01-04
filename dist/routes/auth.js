"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const verification_1 = require("../middlewares/verification");
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
router.route("/").post(auth_1.login).get(auth_1.logout);
router.route("/password").post(auth_1.updatePassword);
router.route("/info").post(auth_1.updateInfo);
router.route("/refreshToken").get(verification_1.isLoggedIn, auth_1.refreshToken);
router.route("/generateTokens").get(verification_1.isLoggedIn, auth_1.generateTokens);
module.exports = router;
//# sourceMappingURL=auth.js.map