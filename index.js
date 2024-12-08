import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import cors from "cors";
import session from "express-session";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import QuizRoutes from "./Kanbas/Quizzes/routes.js";
import QuestionRoutes from "./Kanbas/Questions/routes.js";
import "dotenv/config";
import mongoose from "mongoose";

// MongoDB Connection
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);

// Express App Initialization
const app = express();

// CORS Configuration
app.use(
    cors({
        credentials: true,
        origin: [
            process.env.NETLIFY_URL || "https://kanbas-react-web-app-a6-dingwen.netlify.app",
            "http://localhost:3000", // Local testing URL
        ],
    })
);

// Session Configuration
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
    cookie: {},
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none", // Enable cross-site cookies
        secure: true, // Ensure cookies are only sent over HTTPS
        domain: process.env.NODE_SERVER_DOMAIN || undefined, // Specify domain if necessary
    };
}

app.use(session(sessionOptions));

// Middleware to Parse JSON
app.use(express.json());

// Routing
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
QuizRoutes(app);
QuestionRoutes(app);
Lab5(app);
Hello(app);

// Server Listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
