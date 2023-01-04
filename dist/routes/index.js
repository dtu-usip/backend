"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Route imports
const auth_1 = __importDefault(require("./auth"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use("/auth", auth_1.default);
module.exports = router;
//# sourceMappingURL=index.js.map