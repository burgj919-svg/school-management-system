import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// --- MODELS ---
import { LessonModel } from "./models/Lesson.js";
import { BankModel } from "./models/BankPayments.js";
import { SalaryModel } from "./models/Salary.js";
import { PhotoModel } from "./models/ProfilePhoto.js";

// --- ROUTES ---
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import adminManagerRoutes from "./routes/adminManagerRoutes.js";
import timetableRouter from "./routes/timetableRouter.js";
import InstituenoticeRouter from "./routes/InstituenoticeRouter.js";
import LessonMaterialRouter from "./routes/LessonMaterialRouter.js";
import paymentRouters from "./routes/paymentRouters.js";
import QAFeedbackRouter from "./routes/QA&FeedbackRouter.js";
import salaryRouters from "./routes/salaryRouters.js";
import classRouter from "./routes/classRouter.js";
import subjectRouter from "./routes/subjectRouter.js";
import attendanceRouters from "./routes/attendanceRouters.js";
import EnrollmentsRouter from "./routes/EnrollmentsRouter.js";

dotenv.config();
const app = express();

// Database connection function call
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CORS & MIDDLEWARES ---
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Static Assets
app.use("/files", express.static(path.join(__dirname, "files")));
app.use("/files2", express.static(path.join(__dirname, "files2")));
app.use("/files3", express.static(path.join(__dirname, "files3")));
app.use("/ProfilePhotos", express.static(path.join(__dirname, "ProfilePhotos")));

// --- MULTER STORAGE ---
const createMulterStorage = (dest) => multer.diskStorage({
    destination: (req, file, cb) => cb(null, dest),
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});

const upload = multer({ storage: createMulterStorage("./files") });
const upload2 = multer({ storage: createMulterStorage("./files2") });
const upload3 = multer({ storage: createMulterStorage("./files3") });
const upload4 = multer({ storage: createMulterStorage("./ProfilePhotos") });

// --- CENTRAL ROUTE MANAGER ---
app.use("/api/v1", studentRoutes);
app.use("/api/v1", teacherRoutes);
app.use("/api/auth", adminManagerRoutes);
app.use("/api/classes", classRouter);
app.use("/api/timetable", timetableRouter);
app.use("/api/notices", InstituenoticeRouter);
app.use("/api/lessons", LessonMaterialRouter);
app.use("/api/payments", paymentRouters);
app.use("/api/feedback", QAFeedbackRouter);
app.use("/api/salaries", salaryRouters);
app.use("/api/subjects", subjectRouter);
app.use("/api/attendance", attendanceRouters);
app.use("/api/enrollments", EnrollmentsRouter);

// --- FRONTEND INTEGRATION ---
// Serve frontend build files
const frontendDistPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDistPath));

// Catch-all route to serve React app for non-API requests
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDistPath, "index.html"));
});

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});

// --- LOCAL SERVER INITIALIZATION ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
