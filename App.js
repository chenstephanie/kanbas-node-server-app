import express from 'express'
import mongoose from "mongoose";
import session from "express-session";
import Hello from './Hello.js'
import Lab5 from './Lab5.js'
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import UserRoutes from "./Users/routes.js";
import cors from "cors";
import "dotenv/config";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL.split(",")
  })
);
app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));

CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
Hello(app)
Lab5(app)

app.listen(process.env.PORT || 4000);
