


import express from "express";
import cors from "cors";
import { verifyJWT, authorizeRoles } from "../middlewares/authMiddleware.js";
import {
  createSalary,
  getSalaries,
  getSalaryById,
  getSalaryByTeacherId,
  updateSalary,
  deleteSalary
} from "../controllers/salaryController.js";

const router = express.Router();

router.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

router.use(verifyJWT);

router.post("/createSalary", authorizeRoles("admin", "manager"), createSalary);
router.get("/all", authorizeRoles("admin", "manager", "teacher"), getSalaries);
router.get("/teacher/:teacherId", authorizeRoles("admin", "manager", "teacher"), getSalaryByTeacherId);
router.get("/:id", authorizeRoles("admin", "manager", "teacher"), getSalaryById);
router.put("/:id", authorizeRoles("admin", "manager"), updateSalary);
router.delete("/:id", authorizeRoles("admin", "manager"), deleteSalary);

// Backwards-compatible legacy paths
router.get('/users', authorizeRoles("admin", "manager", "teacher"), getSalaries);
router.get('/getUser/:id', authorizeRoles("admin", "manager", "teacher"), getSalaryById);
router.put('/updateUser/:id', authorizeRoles("admin", "manager"), updateSalary);
router.delete('/deleteUser/:id', authorizeRoles("admin", "manager"), deleteSalary);

export default router;