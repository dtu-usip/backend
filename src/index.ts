import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import ExpressError from "./utils/ExpressError";
import Cors from "cors";
import session from "express-session";
import morgan from "morgan";

// Admin Bro for UI
import AdminBro from "admin-bro";
import options from "./admin.options";
import buildAdminRouter from "./admin.router";

// Route imports
import routes from "./routes";

dotenv.config();

const app = express();

// Admin Bro
const admin = new AdminBro(options);
const adminRouter = buildAdminRouter(admin);

app.use(admin.options.rootPath, adminRouter);

app.use(
  session({
    secret: process.env.COOKIE_SECRET || "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.enable("trust proxy");
app.use(morgan("common"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(Cors());
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/gradingSystem";

// Connect to MongoDB
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on(
  "error", // tslint:disable-next-line:no-console
  console.error.bind(console, "connection error:")
);
db.once("open", () => {
  // tslint:disable-next-line:no-console
  console.log("Database connected");
});

// Routes
app.use("/", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to USIP Student Grading System");
});

// Errors
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use(
  (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!";
    // if (
    //   statusCode === 403 ||
    //   statusCode === 404 ||
    //   process.env.NODE_ENV !== "production"
    // ) {
      res.status(statusCode).send({ err });
    // } else {
    //   res.status(500).send({ success: false, message: "Something went wrong" });
    // }
  }
);

const port = process.env.PORT || 4000;
// start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
  console.log(`View Admin Dashboard at http://localhost:${port}/admin`);
});
