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
exports.refreshToken = exports.generateTokens = exports.createSession = exports.updateInfo = exports.updatePassword = exports.logout = exports.login = void 0;
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/auth/user"));
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const constants_1 = require("../utils/constants");
const token_1 = __importDefault(require("../models/auth/token"));
const session_1 = __importDefault(require("../models/auth/session"));
const createToken = (type, userId, sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.JWT_SECRET;
    const expireDate = Date.now() +
        (type === constants_1.ACCESS_TOKEN
            ? constants_1.ACCESS_TOKEN_EXPIRATION
            : constants_1.REFRESH_TOKEN_EXPIRATION);
    const token = jsonwebtoken_1.default.sign({
        id: userId,
        session: sessionId,
        type,
    }, secret, { expiresIn: expireDate });
    const tokenInDb = new token_1.default({
        token,
        type,
        user: userId,
        expiresAt: new Date(expireDate),
        session: sessionId,
    });
    yield tokenInDb.save();
    return {
        token,
        db: tokenInDb,
    };
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { username, password } = req.body;
        const user = yield user_1.default.findOne({
            username,
        });
        if (!user) {
            next(new ExpressError_1.default("Invalid credentials", 403));
            return;
        }
        const validPassword = (0, bcrypt_1.compare)(password, user.password);
        if (!validPassword) {
            next(new ExpressError_1.default("Invalid credentials", 403));
            return;
        }
        const role = user.role ? "student" : "staff";
        const response = yield (0, exports.createSession)(user, (_b = (_a = req === null || req === void 0 ? void 0 : req.device) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.toLowerCase(), req === null || req === void 0 ? void 0 : req.ip);
        res.status(200).json({
            success: true,
            user: Object.assign(Object.assign({}, user), { role }),
            access: response.access,
            refresh: response.refresh,
        });
    }
    catch (e) {
        console.log("There was an error>> ", e);
        next(new ExpressError_1.default("There was an error", 500, e));
        return;
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sessionId = req.session._id;
        yield session_1.default.findByIdAndUpdate(sessionId, { isActive: false });
        // Delete any existing tokens
        // on the current session
        yield token_1.default.deleteMany({
            session: sessionId,
        });
        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    }
    catch (error) {
        next(new ExpressError_1.default(error.toString(), 500));
    }
});
exports.logout = logout;
const updatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = "userId";
        const { password, newPassword } = req.body;
        if (password !== newPassword) {
            next(new ExpressError_1.default("Passwords don't match", 400));
            return;
        }
        const salt = yield (0, bcrypt_1.genSalt)(10);
        const new_password = yield (0, bcrypt_1.hash)(req.body.password, salt);
        yield user_1.default.findByIdAndUpdate(userId, {
            password: new_password,
        });
        res.status(200).json({
            success: true,
            message: "Succesfully updated password",
        });
    }
    catch (e) {
        console.log("There was an error>> ", e);
        next(new ExpressError_1.default("There was an error", 500, e));
        return;
    }
});
exports.updatePassword = updatePassword;
const updateInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = "userId";
        const { email, phone } = req.body;
        yield user_1.default.findByIdAndUpdate(userId, {
            email,
            phone,
        });
        res.status(200).json({
            success: true,
            message: "Succesfully updated user",
        });
    }
    catch (e) {
        console.log("There was an error>> ", e);
        next(new ExpressError_1.default("There was an error", 500, e));
        return;
    }
});
exports.updateInfo = updateInfo;
const createSession = (user, device = "desktop", ip) => __awaiter(void 0, void 0, void 0, function* () {
    const geo = geoip_lite_1.default.lookup(ip);
    const city = geo === null || geo === void 0 ? void 0 : geo.city;
    const session = new session_1.default({
        user: user._id,
        device,
        city,
        ip,
    });
    // Create tokens
    const access = yield createToken(constants_1.ACCESS_TOKEN, user._id, session._id);
    const refresh = yield createToken(constants_1.REFRESH_TOKEN, user._id, session._id);
    yield session.save();
    return {
        access: access.token,
        refresh: refresh.token,
    };
});
exports.createSession = createSession;
const generateTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    try {
        const tokenType = (_c = req === null || req === void 0 ? void 0 : req.token) === null || _c === void 0 ? void 0 : _c.type;
        const userId = (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d._id;
        const sessionId = (_e = req === null || req === void 0 ? void 0 : req.session) === null || _e === void 0 ? void 0 : _e._id;
        if (tokenType !== constants_1.ACCESS_TOKEN) {
            next(new ExpressError_1.default("Invalid Token Type", 400));
        }
        // Delete any existing tokens
        // on the current session
        yield token_1.default.deleteMany({
            session: sessionId,
        });
        // Create a new tokens
        const access = yield createToken(constants_1.ACCESS_TOKEN, userId, sessionId);
        const refresh = yield createToken(constants_1.REFRESH_TOKEN, userId, sessionId);
        res.status(200).json({
            success: true,
            access: access.token,
            refresh: refresh.token,
        });
    }
    catch (error) {
        next(new ExpressError_1.default(`There was an error ${error.toString()}`, 500));
    }
});
exports.generateTokens = generateTokens;
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    try {
        const tokenType = (_f = req === null || req === void 0 ? void 0 : req.token) === null || _f === void 0 ? void 0 : _f.type;
        const userId = (_g = req === null || req === void 0 ? void 0 : req.user) === null || _g === void 0 ? void 0 : _g._id;
        const sessionId = (_h = req === null || req === void 0 ? void 0 : req.session) === null || _h === void 0 ? void 0 : _h._id;
        if (tokenType !== constants_1.REFRESH_TOKEN) {
            next(new ExpressError_1.default("Invalid Token Type", 400));
        }
        // Delete any existing access tokens
        // on the current session
        yield token_1.default.deleteMany({
            session: sessionId,
            type: constants_1.ACCESS_TOKEN,
        });
        // Create a new access token
        const access = yield createToken(constants_1.ACCESS_TOKEN, userId, sessionId);
        res.status(200).json({
            success: true,
            access: access.token,
        });
    }
    catch (error) {
        next(new ExpressError_1.default(`There was an error ${error.toString()}`, 500));
    }
});
exports.refreshToken = refreshToken;
//# sourceMappingURL=auth.js.map