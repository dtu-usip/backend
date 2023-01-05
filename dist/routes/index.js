"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Route imports
const auth_1 = __importDefault(require("./auth"));
const grades_1 = __importDefault(require("./grades"));
const students_1 = __importDefault(require("./students"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use("/auth", auth_1.default);
router.use("/grade", grades_1.default);
router.use("/student", students_1.default);
module.exports = router;
//# sourceMappingURL=index.js.map