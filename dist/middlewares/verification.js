"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/auth/user"));
const token_1 = __importDefault(require("../models/auth/token"));
const session_1 = __importDefault(require("../models/auth/session"));
const models_1 = require("../utils/models");
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.JWT_SECRET;
    const token = req.headers.token;
    try {
        const tokenInDb = yield token_1.default.findOne({
            token,
        }).populate(models_1.SESSION);
        if (!tokenInDb) {
            next(new ExpressError_1.default("Invalid Token", 400));
            return;
        }
        if (tokenInDb.session instanceof session_1.default && !tokenInDb.session.isActive) {
            next(new ExpressError_1.default("Session inactive", 400));
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (decoded.exp < Date.now()) {
            next(new ExpressError_1.default("Token Expired", 400));
            return;
        }
        if (!decoded.session) {
            next(new ExpressError_1.default("Session not found", 400));
            return;
        }
        if (tokenInDb.session instanceof session_1.default &&
            decoded.session !== tokenInDb.session.id) {
            next(new ExpressError_1.default("Invalid Session", 400));
            return;
        }
        const user = yield user_1.default.findById(decoded.id);
        if (!user) {
            next(new ExpressError_1.default("User not found", 404));
            return;
        }
        req.session =
            tokenInDb.session instanceof session_1.default
                ? tokenInDb.session
                : null;
        req.token = tokenInDb;
        req.user = user;
        next();
    }
    catch (error) {
        console.log("error", error);
        next(new ExpressError_1.default(`You are not authorized: ${error}`, 403));
        return;
    }
});
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=verification.js.map