"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const ExpressError_1 = __importDefault(require("./utils/ExpressError"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
// Admin Bro for UI
const admin_bro_1 = __importDefault(require("admin-bro"));
const admin_options_1 = __importDefault(require("./admin.options"));
const admin_router_1 = __importDefault(require("./admin.router"));
// Route imports
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Admin Bro
const admin = new admin_bro_1.default(admin_options_1.default);
const adminRouter = (0, admin_router_1.default)(admin);
app.use(admin.options.rootPath, adminRouter);
app.use((0, express_session_1.default)({
    secret: process.env.COOKIE_SECRET || "secret",
    resave: true,
    saveUninitialized: true,
}));
app.enable("trust proxy");
app.use((0, morgan_1.default)("common"));
app.use(express_1.default.json({ limit: "5mb" }));
app.use(express_1.default.urlencoded({ limit: "5mb", extended: true }));
app.use((0, cors_1.default)());
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/gradingSystem";
// Connect to MongoDB
mongoose_1.default.connect(dbUrl);
const db = mongoose_1.default.connection;
db.on("error", // tslint:disable-next-line:no-console
console.error.bind(console, "connection error:"));
db.once("open", () => {
    // tslint:disable-next-line:no-console
    console.log("Database connected");
});
// Routes
app.use("/", routes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to USIP Student Grading System");
});
// Errors
app.all("*", (req, res, next) => {
    next(new ExpressError_1.default("Page Not Found", 404));
});
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message)
        err.message = "Oh No, Something Went Wrong!";
    if (statusCode === 403 ||
        statusCode === 404 ||
        process.env.NODE_ENV !== "production") {
        res.status(statusCode).send({ err });
    }
    else {
        res.status(500).send({ success: false, message: "Something went wrong" });
    }
});
const port = process.env.PORT || 4000;
// start the express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
    console.log(`View Admin Dashboard at http://localhost:${port}/admin`);
});
//# sourceMappingURL=index.js.map